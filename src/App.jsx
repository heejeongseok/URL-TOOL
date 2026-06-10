import { useState, useCallback, useEffect } from 'react';
import * as XLSX from 'xlsx';
import {
  TEMPLATES, LANDING_OPTIONS, DEFAULT_LANDING,
  BUJONG_CFG, AREA_EN, buildRows, buildFinalUrl,
  fetchLastKidNums, appendKeywords, fetchLandingUrlIndex, fetchSettings, appendFinalUrls
} from './data';
import './App.css';

const today = () => {
  const d = new Date();
  return String(d.getFullYear()).slice(2) + String(d.getMonth()+1).padStart(2,'0') + String(d.getDate()).padStart(2,'0');
};

function downloadXlsx(headers, data, sheetName, fileName) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
  ws['!cols'] = headers.map((_,i) => ({ wch: [8,6,10,8,12,8,12,10,10,50,60,14,10,130][i] || 20 }));
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, fileName);
}

function downloadEkaCsv(rows, fileName) {
  const lines = [
    ['광고상품','검색어','연결URL'],
    ...rows.map(r => ['네이버(브랜드검색)', r.searchName, r.baseUrl])
  ];
  const csv = lines.map(row => row.join(',')).join(String.fromCharCode(13,10));
  const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  const enc = new TextEncoder().encode(csv);
  const blob = new Blob([bom, enc], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = fileName; a.click();
  URL.revokeObjectURL(url);
}

function Chip({ label, active, color, onClick }) {
  return <button onClick={onClick} className={`chip ${active ? `chip-on chip-${color}` : ''}`}>{label}</button>;
}

// 랜딩 에디터 — 범용/보종 나란히
function LandingEditor({ dev, tpl, landing, onChange }) {
  const areas = TEMPLATES[dev][tpl] || [];
  if (!areas.length) return null;
  const isHighlight = val => val !== '산출페이지' && val !== '메인';
  const makeOpts = sel => LANDING_OPTIONS.map(l => <option key={l} selected={l===sel}>{l}</option>);

  return (
    <div className="landing-block-wrap">
      {['범용','보종'].map(bj => (
        <div key={bj} className="landing-block">
          <div className={`landing-header landing-header-${dev.toLowerCase()}`}>
            <span className={`badge badge-${dev.toLowerCase()}`}>{dev}</span>
            <span className={`badge badge-${bj==='범용'?'brand':'car'}`}>{bj}</span>
            <span className="landing-count">{areas.length}개</span>
          </div>
          <table className="landing-table">
            <tbody>
              {areas.map(area => {
                const val = landing[bj]?.[area] || DEFAULT_LANDING[dev]?.[tpl]?.[bj]?.[area] || '산출페이지';
                return (
                  <tr key={area} className={isHighlight(val) ? 'hl' : ''}>
                    <td className="area-name">{area}</td>
                    <td>
                      <select value={val} onChange={e => onChange(dev, bj, area, e.target.value)}>
                        {LANDING_OPTIONS.map(l => <option key={l}>{l}</option>)}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

function Step1({ onRowsBuilt, landingUrlIndex, landingIndexStatus, codeMap, codeMapStatus }) {
  const [sojae, setSojae] = useState('');
  const [date, setDate] = useState(today());
  const [bujong, setBujong] = useState('자동차');
  const [pcTpl, setPcTpl] = useState('일반형-5구');
  const [moTpl, setMoTpl] = useState('섬네일형-탭');
  const [landing, setLanding] = useState({ PC: { 범용:{}, 보종:{} }, MO: { 범용:{}, 보종:{} } });
  const [loading, setLoading] = useState(false);
  const [sheetStatus, setSheetStatus] = useState('');
  const [generated, setGenerated] = useState(false);

  const handleLandingChange = (dev, bj, area, val) => {
    setLanding(prev => ({
      ...prev,
      [dev]: { ...prev[dev], [bj]: { ...prev[dev][bj], [area]: val } }
    }));
  };

  const getEffectiveLanding = (dev) => {
    const tpl = dev === 'PC' ? pcTpl : moTpl;
    const areas = TEMPLATES[dev][tpl] || [];
    const result = { 범용: {}, 보종: {} };
    ['범용','보종'].forEach(bj => {
      areas.forEach(a => {
        result[bj][a] = landing[dev][bj][a] || DEFAULT_LANDING[dev]?.[tpl]?.[bj]?.[a] || '산출페이지';
      });
    });
    return result;
  };

  const generate = async () => {
    if (!sojae || !date) { alert('소재명과 날짜를 입력해주세요!'); return; }
    setLoading(true);
    try {
      const rows = buildRows({
        sojae, date, bujong, pcTpl, moTpl,
        landingPC: getEffectiveLanding('PC'),
        landingMO: getEffectiveLanding('MO'),
        landingUrlIndex,
        codeMap,
      });
      onRowsBuilt(rows);

      // 에카 업로드용 CSV — 광고상품/검색어/연결URL 3열, CP949 호환
      downloadEkaCsv(rows, `에카업로드_${sojae}_${date}.csv`);

      // 구글 시트에 키워드ID 누적 저장
      setSheetStatus('구글 시트에 키워드ID 저장 중...');
      const result = await appendKeywords(rows);
      if (result.success) {
        setSheetStatus(`✓ 구글 시트에 ${result.count}개 키워드ID 저장 완료!`);
      } else {
        setSheetStatus('⚠ 구글 시트 저장 실패 — 로컬 CSV는 정상 다운로드됨');
      }
      setGenerated(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="step-content">
      <div className="card">
        <div className="card-title">소재명 & 날짜</div>
        <div className="grid2">
          <div className="form-group"><label>소재명 <span className="required">*</span></label><input value={sojae} onChange={e=>setSojae(e.target.value)} placeholder="예: 출고대응"/></div>
          <div className="form-group"><label>날짜 <span className="required">*</span></label><input value={date} onChange={e=>setDate(e.target.value)} maxLength={6} placeholder="예: 260513"/></div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">보종</div>
        <div className="chip-row">
          {Object.keys(BUJONG_CFG).map(b => (
            <Chip key={b} label={{'자동차':'🚗 자동차','이륜차':'🏍 이륜차','법인차':'🏢 법인차','화물차':'🚚 화물차','원데이':'📅 원데이','톡보험':'💬 톡보험'}[b]} active={bujong===b} color="dark" onClick={()=>setBujong(b)}/>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">템플릿</div>
        <div className="tpl-section">
          <span className="badge badge-pc">PC</span>
          <div className="chip-row">
            {Object.keys(TEMPLATES.PC).map(t => <Chip key={t} label={t==='일반형-5구'?'일반형-5구 ★':t} active={pcTpl===t} color="pc" onClick={()=>setPcTpl(t)}/>)}
          </div>
        </div>
        <div className="tpl-section" style={{marginTop:'.625rem'}}>
          <span className="badge badge-mo">MO</span>
          <div className="chip-row">
            {Object.keys(TEMPLATES.MO).map(t => <Chip key={t} label={t==='섬네일형-탭'?'섬네일형-탭 ★':t} active={moTpl===t} color="mo" onClick={()=>setMoTpl(t)}/>)}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title-row">
          <span className="card-title">영역별 랜딩 설정</span>
          <span className="card-hint">
            <span className="hl-dot"></span> 산출페이지·메인 외 랜딩 표시
          </span>
        </div>
        <LandingEditor dev="PC" tpl={pcTpl} landing={landing.PC} onChange={handleLandingChange}/>
        <div style={{height:'.75rem'}}/>
        <LandingEditor dev="MO" tpl={moTpl} landing={landing.MO} onChange={handleLandingChange}/>
      </div>

      <div className="card">
        <div className="card-title">랜딩URL 인덱스</div>
        <div className={`sheet-status ${landingUrlIndex ? 'ok' : ''}`}>{landingIndexStatus}</div>
        {landingUrlIndex && (
          <details style={{marginTop:'.5rem'}}>
            <summary style={{fontSize:'11px',color:'var(--text-3)',cursor:'pointer'}}>불러온 랜딩 목록 확인 (클릭)</summary>
            <div style={{marginTop:'.5rem',display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.5rem'}}>
              <div>
                <div style={{fontSize:'11px',fontWeight:600,color:'var(--pc)',marginBottom:'.25rem'}}>PC</div>
                {Object.entries(landingUrlIndex.PC).map(([name, url]) => (
                  <div key={name} style={{fontSize:'11px',padding:'2px 0',borderBottom:'1px solid var(--border-light)'}}>
                    <span style={{fontWeight:500}}>{name}</span>
                    <span style={{color:'var(--text-3)',marginLeft:'.5rem',wordBreak:'break-all'}}>{url}</span>
                  </div>
                ))}
              </div>
              <div>
                <div style={{fontSize:'11px',fontWeight:600,color:'var(--mo)',marginBottom:'.25rem'}}>MO</div>
                {Object.entries(landingUrlIndex.MO).map(([name, url]) => (
                  <div key={name} style={{fontSize:'11px',padding:'2px 0',borderBottom:'1px solid var(--border-light)'}}>
                    <span style={{fontWeight:500}}>{name}</span>
                    <span style={{color:'var(--text-3)',marginLeft:'.5rem',wordBreak:'break-all'}}>{url}</span>
                  </div>
                ))}
              </div>
            </div>
          </details>
        )}
      </div>

      <button className="btn btn-primary btn-lg" onClick={generate} disabled={loading}>
        {loading ? '생성 중...' : '⬇ 에카 업로드용 파일 생성 & 다운로드'}
      </button>
      {generated && <div className="success-msg">✓ 에카업로드_{sojae}_{date}.xlsx 다운로드 완료! 키워드ID 구글 시트에 저장됨.</div>}
    </div>
  );
}

function Step2({ rows1 }) {
  const [ekaFile, setEkaFile] = useState(null);
  const [ekaMap, setEkaMap] = useState({});
  const [done, setDone] = useState(false);
  const [errCount, setErrCount] = useState(0);

  const handleEkaFile = useCallback((file) => {
    setEkaFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const ab = new Uint8Array(e.target.result);
      // BOM(EF BB BF) 있으면 UTF-8, 없으면 euc-kr 시도
      let text;
      if (ab[0] === 0xEF && ab[1] === 0xBB && ab[2] === 0xBF) {
        text = new TextDecoder('utf-8').decode(ab.slice(3));
      } else {
        try { text = new TextDecoder('euc-kr').decode(ab); }
        catch { text = new TextDecoder('utf-8').decode(ab); }
      }
      const lines = text.split('\n').filter(l => l.trim());
      const map = {};
      for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',');
        if (cols.length < 4) continue;
        // 에카 결과: 광고매체, 광고상품, 검색어(col2), 광고코드URL(col3)
        const name = cols[2]?.trim().replace(/^"|"$/g,'').replace(/\r/g,'');
        const url  = cols[3]?.trim().replace(/^"|"$/g,'').replace(/\r/g,'');
        if (name && url) map[name] = url;
      }
      setEkaMap(map);
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const generate = () => {
    if (!ekaFile) { alert('에카 결과 파일을 업로드해주세요!'); return; }
    if (!rows1?.length) { alert('1단계에서 먼저 소재명을 생성해주세요!'); return; }

    let errors = 0;
    const results = rows1.map(r => {
      const ekaUrl = ekaMap[r.searchName] || '';
      if (!ekaUrl) { errors++; return {...r, finalUrl:'[에카URL없음]'}; }
      const idx = ekaUrl.indexOf('src=');
      const ekaCode = idx >= 0 ? ekaUrl.substring(idx) : '';
      const baseUrl = r.baseUrl || (idx >= 0 ? ekaUrl.substring(0, idx) : ekaUrl);
      const finalUrl = buildFinalUrl({...r, baseUrl}, ekaCode);
      return {...r, finalUrl};
    });

    setErrCount(errors);
    const headers = ['검색어(소재명)', '최종URL'];
    const data = results.map(r => [r.searchName, r.finalUrl]);
    const fname = results[0] ? `최종URL_${results[0].sojae}_${results[0].date}.xlsx` : '최종URL.xlsx';
    downloadXlsx(headers, data, '최종URL', fname);

    // 구글 시트 [최종URL누적]에 자동 저장
    appendFinalUrls(results).catch(() => {});

    setDone(true);
  };

  return (
    <div className="step-content">
      <div className="notice">에이스카운터에서 발급받은 결과 파일을 업로드하면 최종 URL이 완성됩니다.</div>
      <div className="card">
        <div className="card-title">에카 결과 파일 업로드 <span className="required">*</span></div>
        <div className={`upload-area ${ekaFile?'upload-done':''}`} onClick={()=>document.getElementById('eka-file').click()} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)handleEkaFile(f);}}>
          <div className="upload-icon">{ekaFile?'✓':'📂'}</div>
          <div className="upload-text">{ekaFile?ekaFile.name:'에카 결과 파일 드래그 또는 클릭 (.csv)'}</div>
          {ekaFile&&<div className="upload-sub">{Object.keys(ekaMap).length}개 검색어 로드됨</div>}
        </div>
        <input id="eka-file" type="file" accept=".csv,.xlsx" style={{display:'none'}} onChange={e=>e.target.files[0]&&handleEkaFile(e.target.files[0])}/>
        {ekaFile&&<button className="btn-remove-file" onClick={e=>{e.preventDefault();setEkaFile(null);setEkaMap({});setDone(false);document.getElementById('eka-file').value='';}}>✕ 파일 삭제하고 다시 올리기</button>}
      </div>

      {rows1?.length>0&&<div className="info-box">✓ 1단계에서 생성된 {rows1.length}개 행 자동 연결됨</div>}

      <button className="btn btn-primary btn-lg" onClick={generate}>⬇ 최종 URL 엑셀 다운로드</button>
      {done&&<div className="success-msg">✓ 최종URL 엑셀 다운로드 완료!{errCount>0&&<span className="warn-msg"> ⚠ 에카URL 없음: {errCount}개</span>}</div>}
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(1);
  const [rows1, setRows1] = useState([]);
  const [landingUrlIndex, setLandingUrlIndex] = useState(null);
  const [landingIndexStatus, setLandingIndexStatus] = useState('랜딩URL 인덱스 로딩 중...');
  const [codeMap, setCodeMap] = useState(null);
  const [codeMapStatus, setCodeMapStatus] = useState('설정 코드맵 로딩 중...');

  useEffect(() => {
    fetchLandingUrlIndex().then(data => {
      if (data) {
        setLandingUrlIndex(data);
        const pcCount = Object.keys(data.PC || {}).length;
        const moCount = Object.keys(data.MO || {}).length;
        setLandingIndexStatus(`✓ 랜딩URL 인덱스 로드됨 — PC ${pcCount}개 / MO ${moCount}개`);
      } else {
        setLandingIndexStatus('⚠ 랜딩URL 인덱스 로드 실패 — 구글 시트 GAS 설정을 확인해주세요');
      }
    });
    fetchSettings().then(map => {
      if (map) {
        setCodeMap(map);
        const count = Object.keys(map).length;
        setCodeMapStatus(`✓ 코드맵 로드됨 — ${count}개 조합`);
      } else {
        setCodeMapStatus('⚠ 코드맵 로드 실패 — [설정] 시트 GAS 설정을 확인해주세요');
      }
    });
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo"><span className="logo-db">DB</span><span className="logo-text">네이버 브랜드검색 URL 생성기</span></div>
          <div className="header-badge">DB손해보험</div>
        </div>
      </header>
      <main className="main">
        <div className="tab-bar">
          <button className={`tab ${step===1?'tab-on':''}`} onClick={()=>setStep(1)}><span className="tab-num">01</span><span className="tab-label">에카 업로드용 생성</span></button>
          <div className="tab-arrow">→</div>
          <button className={`tab ${step===2?'tab-on':''}`} onClick={()=>setStep(2)}><span className="tab-num">02</span><span className="tab-label">최종 URL 완성</span></button>
        </div>
        {step===1&&<Step1 onRowsBuilt={rows=>{setRows1(rows);}} landingUrlIndex={landingUrlIndex} landingIndexStatus={landingIndexStatus} codeMap={codeMap} codeMapStatus={codeMapStatus}/>}
        {step===2&&<Step2 rows1={rows1}/>}
      </main>
    </div>
  );
}
