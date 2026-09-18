/* router.js —— hash 路由 + 导航 */
window.ROUTES = {
  '#/login':'login','#/dashboard':'dashboard','#/tenders':'tenders','#/parse':'parse',
  '#/outline':'outline','#/writing':'writing','#/matrix':'matrix','#/quote':'quote',
  '#/review':'review','#/export':'export'
};
window.initRouter = function(renderView){
  window.addEventListener('hashchange', function(){ renderView(window.ROUTES[location.hash] || 'dashboard'); });
};
window.nav = function(hash){ location.hash = hash; };
