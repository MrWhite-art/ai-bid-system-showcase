/* effects.js —— 纯交互效果函数 */
window.effects = {
  // 流式打字：逐字追加到目标元素，返回可停止句柄
  streamType(el, text, speed=28, done){
    let i=0; const id=setInterval(()=>{ el.textContent += text[i++]; if(i>=text.length){ clearInterval(id); done&&done(); } }, speed);
    return { stop(){ clearInterval(id); } };
  },
  // 进度条动画
  animateProgress(bar, to, ms=800){ bar.style.width='0%'; return new Promise(r=>{ setTimeout(()=>{ bar.style.width=to+'%'; setTimeout(r, ms); }, 20); }); },
  // 数字滚动
  countUp(el, to, suffix='', dur=800){ const t0=performance.now(); const step=(t)=>{ const p=Math.min(1,(t-t0)/dur); el.textContent=Math.round(to*p)+suffix; if(p<1) requestAnimationFrame(step); }; requestAnimationFrame(step); }
};
