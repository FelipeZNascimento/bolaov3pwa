import React from 'react';
import { isMobile } from 'react-device-detect';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import logo from 'img/favicon.png';

// Selectors
import { selectUser } from 'store/user/selector';

import { Ranking } from 'components_fa/index';
import { LargeButton } from 'components/index';

import { TMenuOption } from 'components/commonTypes';
import ROUTES from 'constants/routes';
import styles from './Home.module.scss';

const Home = () => {
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
    // {
    //   id: 3,
    //   description: 'Nunca na história desse bolão...',
    //   display: ROUTES.RECORDS.display,
    //   route: ROUTES.RECORDS.url
    // },
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
    }
  ];

  const renderRanking = () => {
    if (isMobile) {
      return null;
    }

    return <Ranking />;
  };

  const titleClass = classNames(`sectionTitle ${styles.titleHeader}`, {});

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={titleClass}>
          <h1>
            {!isMobile && (
              <img className={styles.image} alt="logo" src={logo} />
            )}
            Bolão NFL 2024/25
          </h1>
          <h2> Temporada 12</h2>
        </div>

        <div className={styles.buttonsContainer}>
          {menuOptions.map((option) => (
            <LargeButton key={option.id} {...option} />
          ))}
        </div>
      </div>
      {renderRanking()}
    </div>
  );
};

export default Home;
