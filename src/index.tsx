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
import { Bets, ExtraBets, Home, Results } from 'sections/index';
import Startup from 'services/Startup';
import { TopBar } from 'components/index';

// Constants & Styles
import ROUTES from 'constants/routes';
import './index.scss';

render(
	<Provider store={store}>
		<Startup>
			<Router>
				<div className="page-container">
					
					<TopBar />
					<div className="index-container">
						<Switch>
							<Route exact path={ROUTES.HOME.url}>
								<Home />
							</Route>
							<Route path={ROUTES.BETS.url}>
								<Route path={ROUTES.BETS.url + "/:season?/:week?/"} component={Bets} />
							</Route>
							<Route path={ROUTES.RESULTS.url}>
								<Route path={ROUTES.RESULTS.url + "/:week?/"} component={Results} />
							</Route>
							<Route exact path={ROUTES.EXTRAS.url}>
								<ExtraBets />
							</Route>
							<Route>
								<Home />
							</Route>
						</Switch>
					</div>
				</div>
			</Router>
		</Startup>
	</Provider>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
