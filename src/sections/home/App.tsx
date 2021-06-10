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
			description: 'Rodada a rodada',
			display: ROUTES.RESULTS.display,
			route: ROUTES.RESULTS.url
		},
		{
			description: 'Faça suas apostas',
			display: ROUTES.BETS.display,
			route: ROUTES.BETS.url,
			disabled: loggedUser ? false : true
		},
		{
			description: 'Quem vence a NFC North esse ano?',
			display: ROUTES.EXTRAS.display,
			route: ROUTES.EXTRAS.url,
			disabled: loggedUser ? false : true
		},
		{
			description: 'Nunca na história desse bolão...',
			display: ROUTES.RECORDS.display,
			route: ROUTES.RECORDS.url
		},
		{
			description: 'Quanto valem as apostas nos playoffs?',
			display: ROUTES.REGRAS.display,
			route: ROUTES.REGRAS.url
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.buttonsContainer}>
				{menuOptions.map((option) => <LargeButton {...option} />)}
			</div>
		</div>
	);
};

export default App;
