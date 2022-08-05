import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import classNames from 'classnames';

import { Button } from '@material-ui/core';
import Extras from './components/Extras';
import Betting from './components/Betting';
import Prize from './components/Prize';
import Scores from './components/Scores';
import Subscription from './components/Subscription';
import styles from './styles.module.scss';

const RULES_SECTION = {
  SUBSCRIPTION: 0,
  SCORES: 1,
  BETTING: 2,
  EXTRAS: 3,
  PRIZE: 4
};

type RULES_SECTION_TYPE = typeof RULES_SECTION[keyof typeof RULES_SECTION];

const Rules = () => {
  const [rulesSection, setRulesSection] = useState<RULES_SECTION_TYPE>(
    RULES_SECTION.SUBSCRIPTION
  );

  const containerClass = classNames({
    [styles.container]: !isMobile,
    [styles.containerMobile]: isMobile
  });

  const buttons = [
    {
      id: RULES_SECTION.SUBSCRIPTION,
      display: 'Inscrição'
    },
    {
      id: RULES_SECTION.SCORES,
      display: 'Pontuação'
    },
    {
      id: RULES_SECTION.BETTING,
      display: 'Apostas'
    },
    {
      id: RULES_SECTION.EXTRAS,
      display: 'Extras'
    },
    {
      id: RULES_SECTION.PRIZE,
      display: 'Premiação'
    }
  ];

  const renderActiveRule = () => {
    switch (rulesSection) {
      case RULES_SECTION.SUBSCRIPTION:
        return <Subscription />;
      case RULES_SECTION.SCORES:
        return <Scores />;
      case RULES_SECTION.BETTING:
        return <Betting />;
      case RULES_SECTION.EXTRAS:
        return <Extras />;
      case RULES_SECTION.PRIZE:
        return <Prize />;
      default:
        return <Subscription />;
    }
  };

  return (
    <div className={containerClass}>
      <div className="sectionTitle">
        <h1>Regras</h1>
      </div>
      <div className={styles.buttonsContainer}>
        {buttons.map((button) => {
          const buttonClass = classNames(styles.button, {
            [styles.buttonActive]: rulesSection === button.id,
            [styles.buttonStandard]: !isMobile,
            [styles.buttonMobile]: isMobile
          });

          return (
            <Button
              classes={{ root: buttonClass }}
              variant="outlined"
              onClick={() => setRulesSection(button.id)}
            >
              {button.display}
            </Button>
          );
        })}
      </div>
      <div className={styles.rulesContainer}>{renderActiveRule()}</div>
    </div>
  );
};

export default Rules;
