import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from 'react-router-dom';

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

render(
	<Provider store={store}>
		<Router>
			<Startup>
				<div className="page-container">
					<Notification />
					<TopBar />
					<div className="index-container">
						<Switch>
							<Route exact path={ROUTES.HOME.url}>
								<Home />
							</Route>
							<Route path={ROUTES.BETS.url}>
								<Route path={ROUTES.BETS.url + "/:week?/"} component={Bets} />
							</Route>
							<Route path={ROUTES.RESULTS.url}>
								<Route path={ROUTES.RESULTS.url + "/:week?/"} component={Results} />
							</Route>
							<Route path={ROUTES.RECORDS.url}>
								<Route path={ROUTES.RECORDS.url + "/:recordsParam?/:weekParam?"} component={Records} />
							</Route>
							<Route path={ROUTES.RANKING.url}>
								<Ranking />
							</Route>
							<Route exact path={ROUTES.EXTRAS.url}>
								<ExtraBets />
							</Route>
							<Route exact path={ROUTES.RULES.url}>
								<Rules />
							</Route>
							<Route path={ROUTES.USERS.url}>
								<Route path={ROUTES.USERS.url + "/:userId?/:weekParam?"} component={Users} />
							</Route>
							<Route>
								<Home />
							</Route>
						</Switch>
					</div>
				</div>
			</Startup>
		</Router>
	</Provider>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
	onUpdate: (registration) => {
		const waitingServiceWorker = registration.waiting;
		if (waitingServiceWorker) {
			waitingServiceWorker.addEventListener("statechange", (event) => {
				const target = event.target as any;
				if (target.state && target.state === "activated") {
					if (window.confirm(
						"O app foi atualizado! Por favor, atualize a página."
					)) {
						window.location.reload();
					}
				}
			});
			waitingServiceWorker.postMessage({ type: "SKIP_WAITING" });
		}
	}
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
