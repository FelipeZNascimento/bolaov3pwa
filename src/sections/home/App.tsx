import React from 'react';
import { useSelector } from 'react-redux';
import { LargeButton } from 'components/index';

// Selectors
import {
	selectUser
} from 'store/user/selector';

import { TMenuOption } from 'components/commonTypes';

import ROUTES from 'constants/routes';
import styles from './App.module.scss'

const App = () => {
	const loggedUser = useSelector(selectUser);

	const menuOptions: TMenuOption[] = [
		{
			id: 0,
			description: 'Rodada a rodada',
			display: ROUTES.RESULTS.display,
			route: ROUTES.RESULTS.url
		},
		{
			id: 1,
			description: 'Faça suas apostas',
			display: ROUTES.BETS.display,
			route: ROUTES.BETS.url,
			disabled: loggedUser ? false : true
		},
		{
			id: 2,
			description: 'Quem vence a NFC North esse ano?',
			display: ROUTES.EXTRAS.display,
			route: ROUTES.EXTRAS.url,
			disabled: loggedUser ? false : true
		},
		{
			id: 3,
			description: 'Nunca na história desse bolão...',
			display: ROUTES.RECORDS.display,
			route: ROUTES.RECORDS.url
		},
		{
			id: 4,
			description: 'Geral e rodada a rodada',
			display: ROUTES.RANKING.display,
			route: ROUTES.RANKING.url
		},
		{
			id: 5,
			description: 'Quanto valem as apostas nos playoffs?',
			display: ROUTES.RULES.display,
			route: ROUTES.RULES.url
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.buttonsContainer}>
				{menuOptions.map((option) => <LargeButton key={option.id} {...option} />)}
			</div>
		</div>
	);
};

export default App;
