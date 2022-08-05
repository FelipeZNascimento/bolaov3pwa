import React from 'react';
import ReactDOMClient from 'react-dom/client';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import store from './store';

// Sections & Components
import {
  Bets,
  ExtraBets,
  Home,
  Ranking,
  Records,
  Results,
  Rules,
  Users
} from 'sections/index';
import Startup from 'services/Startup';
import { Notification, TopBar } from 'components/index';

// Constants & Styles
import ROUTES from 'constants/routes';
import './index.scss';

const root = ReactDOMClient.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <Router>
      <Startup>
        <div className="page-container">
          <Notification />
          <TopBar />
          <div className="index-container">
            <Routes>
              <Route path={`${ROUTES.HOME.url}/*`} element={<Home />} />
              <Route path={ROUTES.BETS.url + '/'} element={<Bets />} />
              <Route path={ROUTES.BETS.url + '/:week/'} element={<Bets />} />
              <Route path={`${ROUTES.RESULTS.url}/`} element={<Results />} />
              <Route
                path={ROUTES.RESULTS.url + '/:week/'}
                element={<Results />}
              />
              <Route path={`${ROUTES.RECORDS.url}/`} element={<Records />}>
                <Route
                  path={`${ROUTES.RECORDS.url}/:recordsParam`}
                  element={<Records />}
                >
                  <Route
                    path={ROUTES.RECORDS.url + '/:recordsParam/:weekParam'}
                    element={<Records />}
                  />
                </Route>
              </Route>
              <Route path={`${ROUTES.RANKING.url}/*`} element={<Ranking />} />
              <Route path={ROUTES.EXTRAS.url} element={<ExtraBets />} />
              <Route path={ROUTES.RULES.url} element={<Rules />} />
              <Route path={`${ROUTES.USERS.url}/`}>
                <Route
                  path={ROUTES.USERS.url + '/:userId/:weekParam'}
                  element={<Users />}
                />
              </Route>
              <Route path={'/'} element={<Home />} />
            </Routes>
          </div>
        </div>
      </Startup>
    </Router>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onUpdate: (registration) => {
    const waitingServiceWorker = registration.waiting;
    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener('statechange', (event) => {
        const target = event.target as any;
        if (target.state && target.state === 'activated') {
          if (
            window.confirm(
              'O app foi atualizado! Por favor, atualize a página.'
            )
          ) {
            window.location.reload();
          }
        }
      });
      waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
