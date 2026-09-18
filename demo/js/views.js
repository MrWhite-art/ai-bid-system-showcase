/* views.js —— 视图渲染函数 */
const D = () => window.BID_MOCK;
const tag = (s) => ({ '写作中':'<span class="tag tag-blue">写作中</span>','已完成':'<span class="tag tag-green">已完成</span>','待响应':'<span class="tag tag-orange">待响应</span>','进行中':'<span class="tag tag-blue">进行中</span>' }[s] || `<span class="tag tag-blue">${s}</span>`);
const money = (n) => '¥' + Number(n).toLocaleString('zh-CN');

/* ---------- 登录 ---------- */
window.renderLogin = function(){ return `
  <div class="login-wrap">
    <div class="login-brand">
      <div class="login-brand-logo">标</div>
      <div class="login-brand-title">标书智能助手</div>
      <div class="login-brand-sub">AI 驱动的投标响应工作台</div>
    </div>
    <div class="login-card">
      <h2>欢迎回来</h2>
      <p class="login-sub">登录以继续管理你的投标项目</p>
      <label>账号</label><input type="text" value="zhang.gong" readonly />
      <label>密码</label><input type="password" value="********" readonly />
      <button class="btn btn-primary login-btn" onclick="nav('#/dashboard')">进入系统</button>
      <p class="login-tip">演示账号 · 已预填</p>
    </div>
  </div>`; };
window.renderLogin.afterRender = function(){ document.body.classList.add('is-login'); };

/* ---------- 驾驶舱 ---------- */
window.renderDashboard = function(){ const d=D(); return `
  <div class="dash-welcome">
    <div><h1>早上好，欢迎回来 👋</h1><p>今天有 ${d.tenders.length} 个项目在推进，2 个评分点待响应</p></div>
    <button class="btn btn-primary" onclick="nav('#/tenders')">＋ 新建项目</button>
  </div>
  <div class="stat-grid">
    <div class="stat-card"><div class="stat-label">进行中项目</div><div class="stat-num" data-count="${d.stats.projects}">0</div><div class="stat-sub">↑ 3 较上周</div></div>
    <div class="stat-card"><div class="stat-label">评分点覆盖</div><div class="stat-num" data-count="86" data-suffix="%">0%</div><div class="stat-sub">↑ 5% 较上周</div></div>
    <div class="stat-card"><div class="stat-label">待审校</div><div class="stat-num" data-count="${d.stats.pendingReview}">0</div><div class="stat-sub">其中 1 项紧急</div></div>
    <div class="stat-card"><div class="stat-label">导出数</div><div class="stat-num" data-count="${d.stats.exports}">0</div><div class="stat-sub">本周 +2</div></div>
  </div>
  <div class="card" style="margin-top:20px;">
    <div class="card-title">最近项目</div>
    <table class="table"><thead><tr><th>项目名称</th><th style="width:130px;">阶段</th><th style="width:110px;">状态</th><th style="width:120px;">进度</th></tr></thead>
      <tbody>${d.tenders.map(t=>`<tr><td>${t.name}</td><td>${t.stage}</td><td>${tag(t.status)}</td><td><div class="progress" style="width:120px;"><div class="progress-bar" style="width:${t.progress}%"></div></div></td></tr>`).join('')}</tbody>
    </table>
  </div>
  <div class="card" style="margin-top:20px;"><div class="card-title">系统状态</div>
    <div class="sys-row"><span class="dot dot-success"></span>AI 服务运行中 · 知识库已同步 2,384 条</div>
    <div class="sys-row"><span class="dot dot-success"></span>解析引擎在线 · 平均响应 1.2s</div>
  </div>`; };
window.renderDashboard.afterRender = function(){ document.body.classList.remove('is-login'); document.querySelectorAll('[data-count]').forEach(el=>window.effects.countUp(el, parseInt(el.dataset.count,10), el.dataset.suffix||'')); };

/* ---------- 招标文件 ---------- */
window.renderTenders = function(){ const d=D(); return `
  <div class="page-head"><h1 class="page-title">招标文件管理</h1><button class="btn btn-primary" onclick="viewActions.openUpload()">＋ 新建投标项目</button></div>
  <div class="card"><div class="card-title">项目列表</div>
    <table class="table"><thead><tr><th>项目名称</th><th style="width:150px;">编号</th><th style="width:90px;">状态</th><th style="width:110px;">解析进度</th><th style="width:80px;"></th></tr></thead>
      <tbody>${d.tenders.map((t,i)=>`<tr><td>${t.name}</td><td>${t.code}</td><td>${tag(t.status)}</td><td><div class="progress" style="width:110px;"><div class="progress-bar" style="width:${t.progress}%"></div></div></td><td><button class="btn btn-link btn-sm" onclick="nav('#/parse')">查看</button></td></tr>`).join('')}</tbody>
    </table></div>`; };
window.renderTenders.afterRender = function(){ document.body.classList.remove('is-login'); };

/* ---------- 招标解析 ---------- */
window.renderParse = function(){ const d=D(); const statusBadge={done:'<span class="tag tag-green">已覆盖</span>',todo:'<span class="tag tag-orange">待响应</span>',miss:'<span class="tag tag-red">缺口</span>'}; return `
  <div class="page-head"><h1 class="page-title">招标解析结果</h1><div class="ai-badge">✦ AI 解析完成</div></div>
  <div class="tabs"><button class="tab is-on" data-tab="proj" onclick="viewActions.tab(this,'proj')">项目信息</button><button class="tab" data-tab="score" onclick="viewActions.tab(this,'score')">评分标准</button><button class="tab" data-tab="tech" onclick="viewActions.tab(this,'tech')">技术需求</button><button class="tab" data-tab="biz" onclick="viewActions.tab(this,'biz')">商务条款</button></div>
  <div id="parse-panel" class="card">
    <div class="kv-grid"><div><span>项目名称</span><b>${d.project.name}</b></div><div><span>编号</span><b>${d.project.code}</b></div><div><span>预算</span><b>${d.project.budget}</b></div><div><span>截止日期</span><b>${d.project.deadline}</b></div></div>
    <div class="card-title" style="margin-top:20px;">评分标准（覆盖状态）</div>
    <table class="table"><thead><tr><th>评分点</th><th style="width:90px;">分值</th><th style="width:90px;">类型</th><th style="width:90px;">状态</th><th style="width:70px;"></th></tr></thead>
      <tbody>${d.scorePoints.map(p=>`<tr><td>${p.name}<div class="sub">章节 ${p.section}</div></td><td>${p.score}</td><td>${p.type}</td><td>${statusBadge[p.status]}</td><td><button class="btn btn-link btn-sm" onclick="viewActions.sourcize('${p.id}')">溯源</button></td></tr>`).join('')}</tbody>
    </table>
  </div>
  <div id="source-panel" class="modal-mask" style="display:none;"><div class="modal"><div class="modal-head"><div class="card-title" style="margin:0;">原文溯源</div><button onclick="viewActions.closeSource()">✕</button></div><div class="modal-body"><p id="source-text">评分标准原文引用……（演示）</p></div><div class="modal-foot"><button class="btn btn-default" onclick="viewActions.closeSource()">关闭</button><button class="btn btn-primary" onclick="viewActions.closeSource()">定位到章节</button></div></div></div>`; };
window.renderParse.afterRender = function(){ document.body.classList.remove('is-login'); };

/* ---------- AI 大纲 ---------- */
window.renderOutline = function(){ const d=D(); const gap=d.scorePoints.filter(p=>p.status!=='done'); return `
  <div class="page-head"><h1 class="page-title">AI 大纲生成</h1><div class="ai-badge">✦ AI 已生成 6 个章节</div></div>
  <div class="split">
    <div class="card"><div class="card-title">大纲树</div><div class="outline">${d.outline.map(c=>`
      <div class="outline-chap"><span class="toggle" onclick="viewActions.toggleOutline('${c.id}')">▾</span><span class="chap-title ${c.done?'done':''}">${c.title}</span><span class="meta">${c.words.toLocaleString()} 字</span><span class="meta">${c.done?'<span class="tag tag-green">完成</span>':'<span class="tag tag-blue">待写</span>'}</span></div>
      <div class="outline-children" data-para="${c.id}">${(c.children||[]).map(ch=>`<div class="outline-node"><span class="leaf">◆</span>${ch.title}<span class="meta">${ch.words.toLocaleString()} 字</span></div>`).join('')}</div>`).join('')}
      <button class="btn btn-primary" style="margin-top:16px; width:100%;" onclick="viewActions.fillGaps()">一键补全覆盖缺口 → 开始写作</button>
    </div>
    <div class="card"><div class="card-title">覆盖缺口（${gap.length}）</div>
      ${gap.map(g=>`<div class="gap-item"><b>${g.name}</b><span class="tag tag-orange">未覆盖</span></div>`).join('')}
      <p class="tip">补全后可一键进入内容写作。</p>
    </div>
  </div>`; };
window.renderOutline.afterRender = function(){ document.body.classList.remove('is-login'); };

/* ---------- 内容写作（核心页） ---------- */
window.renderWriting = function(){ const d=D(); const sp={done:'<span class="tag tag-green">✓</span>',todo:'<span class="tag tag-orange">待覆盖</span>',miss:'<span class="tag tag-red">未涉及</span>'}; return `
  <div class="writing-grid">
    <div class="card w-outline"><div class="card-title">大纲导航</div>
      ${d.outline.map(c=>`<div class="chap ${c.done?'done':''}"><span class="leaf">◆</span>${c.title}${c.done?'<span class="dot dot-success" style="margin-left:auto;"></span>':''}</div><div class="chap-sub">${(c.children||[]).map(ch=>`<div class="sub ${ch.id==='2.2'?'on':''}">${ch.title}</div>`).join('')}</div>`).join('')}
    </div>
    <div class="card w-editor">
      <div class="editor-toolbar"><div class="tb-group"><span>B</span><span>I</span><span>U</span><span>≡</span></div><span class="word-count" id="word-count">0 字</span></div>
      <div class="editor-body" id="editor-body"><p>2.2 核心功能设计</p><p id="ai-text"></p><span id="ai-cursor" class="ai-cursor"></span></div>
      <div class="editor-foot"><button class="btn btn-primary" id="ai-write" onclick="viewActions.aiWrite()">✦ AI 继续撰写</button><button class="btn btn-default" id="ai-stop" style="display:none;" onclick="viewActions.stopAi()">停止</button></div>
    </div>
    <div class="card w-score"><div class="card-title">评分点面板</div>
      ${d.scorePoints.map(p=>`<div class="sp-item"><div class="sp-name">${p.name}</div><div class="sp-state">${sp[p.status]}</div></div>`).join('')}
    </div>
    <div class="card w-kb"><div class="card-title">知识库参考</div>
      ${d.kbDocs.map(k=>`<div class="kb-card" onclick="viewActions.insertKb('${k.title}')"><b>${k.title}</b><div class="sub">${k.section} · 置信度 ${k.conf}%</div></div>`).join('')}
      <div class="tip">点击卡片可插入参考内容</div>
    </div>
  </div>`; };
window.renderWriting.afterRender = function(){ document.body.classList.remove('is-login'); document.getElementById('stage-tag').textContent='内容写作'; };

/* ---------- 响应矩阵 ---------- */
window.renderMatrix = function(){ const d=D(); const st={done:'已响应',todo:'待响应'}; return `
  <div class="page-head"><h1 class="page-title">响应矩阵</h1>
    <div><button class="btn btn-link btn-sm" onclick="viewActions.matrixFilter(this,'all')">全部</button><button class="btn btn-link btn-sm" onclick="viewActions.matrixFilter(this,'技术')">技术</button><button class="btn btn-link btn-sm" onclick="viewActions.matrixFilter(this,'商务')">商务</button></div>
  </div>
  <div class="card"><table class="table"><thead><tr><th>评分点</th><th style="width:90px;">类型</th><th style="width:90px;">状态</th><th style="width:100px;">对应章节</th><th style="width:80px;"></th></tr></thead>
    <tbody id="matrix-body">${d.scorePoints.map(p=>`<tr data-type="${p.type}"><td>${p.name}</td><td>${p.type}</td><td>${p.status==='done'?'<span class="tag tag-green">已响应</span>':'<span class="tag tag-orange">待响应</span>'}</td><td>${p.section}</td><td><button class="btn btn-link btn-sm" onclick="nav('#/writing')">跳转</button></td></tr>`).join('')}</tbody>
    </table></div>`; };
window.renderMatrix.afterRender = function(){ document.body.classList.remove('is-login'); };

/* ---------- 投标报价 ---------- */
window.renderQuote = function(){ const c=D().costs; const total=Object.values(c).reduce((a,b)=>a+b,0); const margin=0.18; const profit=Math.round(total*margin); const rows=[['人工',c.人工],['材料',c.材料],['设备',c.设备],['其他',c.其他]]; const max=Math.max(...Object.values(c)); return `
  <div class="page-head"><h1 class="page-title">投标报价</h1><div class="ai-badge">✦ AI 已核算成本</div></div>
  <div class="split">
    <div class="card"><div class="card-title">成本拆分表</div>
      <table class="table"><thead><tr><th>类别</th><th style="width:160px;">金额</th><th style="width:120px;">占比</th></tr></thead>
        <tbody>${rows.map(([k,v])=>`<tr><td>${k}</td><td>${money(v)}</td><td><div class="progress" style="width:110px;"><div class="progress-bar" style="width:${Math.round(v/max*100)}%"></div></div></td></tr>`).join('')}
        <tr class="total"><td>合计</td><td>${money(total)}</td><td>100%</td></tr></tbody>
      </table></div>
    <div class="card"><div class="card-title">报价汇总</div>
      <div class="kv"><span>总报价</span><b style="font-size:24px;">${money(total)}</b></div>
      <div class="kv"><span>利润率（预估）</span><b>18%</b></div>
      <div class="kv"><span>利润额</span><b>${money(profit)}</b></div>
      <button class="btn btn-primary" style="width:100%; margin-top:14px;" onclick="nav('#/review')">进入审校</button>
    </div>
  </div>`; };
window.renderQuote.afterRender = function(){ document.body.classList.remove('is-login'); };

/* ---------- 内容审校 ---------- */
window.renderReview = function(){ const d=D(); const typeTag={完整性:'tag-orange',一致性:'tag-blue',格式:'tag-purple',错别字:'tag-red'}; const counts=d.reviewIssues.reduce((a,i)=>{a[i.type]=(a[i.type]||0)+1;return a;},{}); return `
  <div class="page-head"><h1 class="page-title">内容审校</h1><div class="ai-badge">✦ AI 审校 发现 ${d.reviewIssues.length} 项</div></div>
  <div class="tabs"><button class="tab is-on" onclick="viewActions.reviewFilter(this,'all')">全部</button><button class="tab" onclick="viewActions.reviewFilter(this,'格式')">格式 ${counts['格式']||0}</button><button class="tab" onclick="viewActions.reviewFilter(this,'完整性')">完整性 ${counts['完整性']||0}</button><button class="tab" onclick="viewActions.reviewFilter(this,'一致性')">一致性 ${counts['一致性']||0}</button><button class="tab" onclick="viewActions.reviewFilter(this,'错别字')">错别字 ${counts['错别字']||0}</button></div>
  <div class="split">
    <div class="card"><div class="card-title">问题列表</div>
      <div id="review-list">${d.reviewIssues.map((i,n)=>`<div class="issue" data-type="${i.type}"><span class="tag ${typeTag[i.type]}">${i.type}</span><b>${i.title}</b><span class="sub">章节 ${i.section}</span><button class="btn btn-link btn-sm" onclick="nav('#/writing')">定位</button></div>`).join('')}</div>
    </div>
    <div class="card"><div class="card-title">审校总结</div>
      <div class="kv"><span>定位到章节</span><b>${d.reviewIssues.length}</b></div>
      <div class="kv"><span>已有响应</span><b>${d.reviewIssues.length-1}</b></div>
      <button class="btn btn-primary" style="width:100%; margin-top:14px;" onclick="viewActions.adoptAll()">✦ AI 一键采纳建议</button>
    </div>
  </div>`; };
window.renderReview.afterRender = function(){ document.body.classList.remove('is-login'); };

/* ---------- 文档导出 ---------- */
window.renderExport = function(){ const d=D(); return `
  <div class="page-head"><h1 class="page-title">文档导出</h1></div>
  <div class="split">
    <div class="card"><div class="card-title">导出设置</div>
      <div class="switch-row"><span>封面</span><button class="switch on" data-k="cover" onclick="viewActions.toggleSwitch(this)"><span class="knob"></span></button></div>
      <div class="switch-row"><span>目录</span><button class="switch on" data-k="toc" onclick="viewActions.toggleSwitch(this)"><span class="knob"></span></button></div>
      <div class="switch-row"><span>页码</span><button class="switch on" data-k="page" onclick="viewActions.toggleSwitch(this)"><span class="knob"></span></button></div>
    </div>
    <div class="card"><div class="card-title">导出进度</div>
      <div class="steps" id="export-steps">${d.exportSteps.map((s,i)=>`<div class="step ${i===0?'on':''}" data-i="${i}"><span class="dot"></span>${s}</div>`).join('')}</div>
      <div class="progress" style="margin:16px 0 8px;"><div class="progress-bar" id="export-bar" style="width:0%"></div></div>
      <div class="kv"><span>进程</span><b id="export-pct">0%</b></div>
      <div id="export-done" style="display:none; margin-top:12px;"><button class="btn btn-default" onclick="viewActions.dl('Word')">⬇ 下载 Word</button><button class="btn btn-default" onclick="viewActions.dl('PDF')">⬇ 下载 PDF</button><button class="btn btn-primary" onclick="nav('#/dashboard')">回到驾驶舱</button></div>
      <button class="btn btn-primary" style="width:100%; margin-top:14px;" id="export-start" onclick="viewActions.startExport()">开始导出</button>
    </div>
  </div>`; };
window.renderExport.afterRender = function(){ document.body.classList.remove('is-login'); };

/* ---------- 视图交互动作 ---------- */
window.viewActions = {
  openUpload(){ const mask=document.createElement('div'); mask.className='modal-mask'; mask.innerHTML=`<div class="modal"><div class="modal-head"><div class="card-title" style="margin:0;">新建投标项目</div><button onclick="this.closest('.modal-mask').remove()">✕</button></div>
    <form class="modal-body" onsubmit="return false;"><label style="display:block;margin-bottom:4px;">项目名称</label><input style="width:100%;height:40px;border:1px solid var(--border);border-radius:8px;padding:0 12px;margin-bottom:14px;" value="${D().project.name}" /><label style="display:block;margin-bottom:4px;">编号</label><input style="width:100%;height:40px;border:1px solid var(--border);border-radius:8px;padding:0 12px;margin-bottom:14px;" value="${D().project.code}" />
    <label style="display:block;margin-bottom:4px;">上传招标文件</label><div class="dropzone" id="dropzone" ondrop="event.preventDefault();viewActions.upload()" ondragover="event.preventDefault();this.classList.add('drag')" ondragleave="this.classList.remove('drag')">拖拽文件到此处，或点击选择<br><span class="tag tag-blue" style="margin-top:8px;">📄 ${D().project.code}.pdf · 格式文件</span></div>
    <div id="upload-progress" style="display:none;margin-top:10px;"><div class="progress"><div class="progress-bar" id="upload-bar"></div></div><div class="sub" id="upload-txt"></div></div>
    <div id="upload-done" style="display:none;margin-top:10px;"><span class="tag tag-green">✓ 解析完成</span></div></form>
    <div class="modal-foot"><button class="btn btn-default" onclick="this.closest('.modal-mask').remove()">取消</button><button class="btn btn-primary" onclick="viewActions.uploadClick()">上传并解析</button></div></div>`;
    document.body.appendChild(mask); },
  uploadClick(){ const dz=document.getElementById('dropzone'); if(dz) viewActions.upload(); },
  async upload(){ const p=document.getElementById('upload-progress'), bar=document.getElementById('upload-bar'), txt=document.getElementById('upload-txt'); p.style.display='block'; const steps=['上传文件…','识别格式文件…','解析评分标准…','生成大纲…']; for(let i=0;i<steps.length;i++){ bar.style.width=((i+1)/4*100)+'%'; txt.textContent=steps[i]; await new Promise(r=>setTimeout(r,400)); } document.getElementById('upload-done').style.display='block'; },
  tab(btn,panel){ document.querySelectorAll('.tabs .tab').forEach(t=>t.classList.remove('is-on')); btn.classList.add('is-on'); },
  sourcize(id){ document.getElementById('source-panel').style.display='flex'; document.getElementById('source-text').textContent='「'+D().scorePoints.find(p=>p.id===id).name+'」：原文引用内容。（演示）'; },
  closeSource(){ document.getElementById('source-panel').style.display='none'; },
  toggleOutline(id){ const c=document.querySelector(`[data-para="${id}"]`); if(c) c.style.display = c.style.display==='none'?'block':'none'; },
  fillGaps(){ alert('已预估补全 3 个章节，正在生成…（演示）'); setTimeout(()=>nav('#/writing'),600); },
  aiWrite(){ const el=document.getElementById('ai-text'), cur=document.getElementById('ai-cursor'); cur.style.visibility='visible'; document.getElementById('ai-write').style.display='none'; document.getElementById('ai-stop').style.display='inline-flex'; window.__ai = window.effects.streamType(el, '本系统采用分层架构设计，核心功能模块包括数据接入、智能解析、大纲生成与内容写作，全面覆盖评分点的响应要求……', 34, ()=>{ cur.style.visibility='hidden'; const wc=document.getElementById('word-count'); wc.textContent=el.textContent.length+' 字'; }); },
  stopAi(){ if(window.__ai){ window.__ai.stop(); } document.getElementById('ai-cursor').style.visibility='hidden'; document.getElementById('ai-write').style.display='inline-flex'; document.getElementById('ai-stop').style.display='none'; },
  insertKb(t){ const el=document.getElementById('ai-text'); if(el) window.effects.streamType(el, '\n[引用] '+t+' 相关段落已插入……', 12); },
  matrixFilter(btn,type){ document.querySelectorAll('.tabs .tab, .page-head .btn').forEach(b=>b.classList.remove('is-on')); btn.classList.add('is-on'); document.querySelectorAll('#matrix-body tr').forEach(tr=>{ tr.style.display = (type==='all'||tr.dataset.type===type)?'':'none'; }); },
  reviewFilter(btn,type){ document.querySelectorAll('.tabs .tab').forEach(t=>t.classList.remove('is-on')); btn.classList.add('is-on'); document.querySelectorAll('#review-list .issue').forEach(i=>{ i.style.display=(type==='all'||i.dataset.type===type)?'':'none'; }); },
  adoptAll(){ alert('已采纳全部 AI 建议（演示）'); },
  toggleSwitch(btn){ btn.classList.toggle('on'); },
  async startExport(){ const d=D(); document.getElementById('export-start').disabled=true; const steps=d.exportSteps; for(let i=0;i<steps.length;i++){ document.querySelectorAll('#export-steps .step').forEach((s,j)=>s.classList.toggle('on',j<=i)); await window.effects.animateProgress(document.getElementById('export-bar'),(i+1)/steps.length*100,500); document.querySelectorAll('#export-steps .step')[i].classList.add('on'); document.getElementById('export-pct').textContent=Math.round((i+1)/steps.length*100)+'%'; } document.getElementById('export-done').style.display='block'; },
  dl(fmt){ alert('已开始下载 '+fmt+'（演示）'); }
};
