/* app.js —— 入口：组装外壳、注册路由、渲染视图 */
(function(){
  const VIEWS = {
    login: window.renderLogin, dashboard: window.renderDashboard,
    tenders: window.renderTenders, parse: window.renderParse,
    outline: window.renderOutline, writing: window.renderWriting,
    matrix: window.renderMatrix, quote: window.renderQuote,
    review: window.renderReview, export: window.renderExport
  };
  window.renderView = function(name){
    const mount = document.getElementById('view');
    const fn = VIEWS[name] || VIEWS.dashboard;
    mount.innerHTML = fn();
    if(fn.afterRender) fn.afterRender();
    updateNav(name);
  };
  function updateNav(name){
    const map = { login:'', dashboard:'#/dashboard', tenders:'#/tenders', parse:'#/parse', outline:'#/outline', writing:'#/writing', matrix:'#/matrix', quote:'#/quote', review:'#/review', export:'#/export' };
    document.querySelectorAll('.nav-item').forEach(a=>{ a.classList.toggle('is-on', a.getAttribute('href') === map[name]); });
  }
  window.initRouter(window.renderView);
  window.renderView(window.ROUTES[location.hash] || 'login');
})();
