import { renderHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderRoute } from './router.js';
import { onLocaleChange } from './i18n/index.js';

const app = document.getElementById('app');

function renderApp() {
  app.innerHTML = '';
  app.appendChild(renderHeader());
  const main = document.createElement('main');
  app.appendChild(main);
  app.appendChild(renderFooter());
  renderRoute(main);
}

renderApp();

window.addEventListener('hashchange', () => {
  // Only re-render the main panel; header/footer can stay.
  const main = app.querySelector('main');
  if (main) renderRoute(main);
});

onLocaleChange(() => {
  // Full re-render so all translated strings refresh.
  renderApp();
});
