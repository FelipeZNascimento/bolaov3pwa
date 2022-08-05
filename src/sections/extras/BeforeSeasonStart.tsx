import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import classNames from 'classnames';

// Components
import { StatusComponent, TextBox } from 'components/index';
import BettableTeam from './components/BettableTeam';
import { Icon } from '@material-ui/core';

// Actions
import { updateExtraBets } from 'store/bets/actions';

// Selectors
import {
  selectTeams,
  selectTeamsByConferenceAndDivision
} from 'store/app/selector';
import {
  selectIsLoading,
  selectIsUpdating,
  selectUserExtraBets
} from 'store/bets/selector';

// Types & Constants
import { TExtraBets } from 'store/bets/types';
import { TMatchTeam } from 'store/matches/types';
import { EXTRA_BETS_VALUES } from 'constants/bets';
import { EXTRA_SECTION } from './ExtraBets';

import styles from './ExtraBets.module.scss';

const emptyExtras = {
  1: null,
  2: null,
  3: null,
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
  9: null,
  10: null,
  11: null,
  12: [],
  13: []
};

type TProps = {
  isBetBlocked: boolean;
  selectedExtraSection: number;
  // onSelect: (team: TMatchTeam, type: number) => void;
};

const BeforeSeasonStart = ({
  isBetBlocked,
  selectedExtraSection
}: // onSelect
TProps) => {
  const [betProgress, setBetProgress] = useState<number>(0);
  const [selectedExtraBets, setSelectedExtraBets] =
    useState<TExtraBets>(emptyExtras);

  const isUpdating = useSelector(selectIsUpdating);
  const isLoading = useSelector(selectIsLoading);
  const teams = useSelector(selectTeams);
  const teamsByConferenceAndDivision = useSelector(
    selectTeamsByConferenceAndDivision
  );
  const userExtraBets = useSelector(selectUserExtraBets);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userExtraBets !== null) {
      setSelectedExtraBets(userExtraBets);
    }
  }, [userExtraBets]);

  useEffect(() => {
    if (
      !isLoading &&
      JSON.stringify(selectedExtraBets) !== JSON.stringify(userExtraBets) &&
      JSON.stringify(selectedExtraBets) !== JSON.stringify(emptyExtras)
    ) {
      dispatch(updateExtraBets(selectedExtraBets) as any);
    }
  }, [selectedExtraBets]);

  const onSelect = (team: TMatchTeam, type: number) => {
    if (isBetBlocked) {
      return;
    }

    const newSelectedExtraBets: TExtraBets = { ...selectedExtraBets };
    let afcWc: number[] = [
      ...(newSelectedExtraBets[EXTRA_BETS_VALUES.AFC_WILDCARD] as number[])
    ];
    let nfcWc: number[] = [
      ...(newSelectedExtraBets[EXTRA_BETS_VALUES.NFC_WILDCARD] as number[])
    ];

    if (type === EXTRA_BETS_VALUES.AFC_WILDCARD) {
      if (afcWc.find((wc) => wc === team.id) !== undefined) {
        afcWc = afcWc.filter((wc) => wc !== team.id);
      } else if (afcWc.length === 3) {
        afcWc.shift();
        afcWc.push(team.id);
      } else {
        afcWc.push(team.id);
      }
    } else if (type === EXTRA_BETS_VALUES.NFC_WILDCARD) {
      if (nfcWc.find((wc) => wc === team.id) !== undefined) {
        nfcWc = nfcWc.filter((wc) => wc !== team.id);
      } else if (nfcWc.length === 3) {
        nfcWc.shift();
        nfcWc.push(team.id);
      } else {
        nfcWc.push(team.id);
      }
    } else {
      if (newSelectedExtraBets[type] === team.id) {
        newSelectedExtraBets[type] = null;
      } else {
        newSelectedExtraBets[type] = team.id;
      }
    }

    newSelectedExtraBets[EXTRA_BETS_VALUES.AFC_WILDCARD] = afcWc;
    newSelectedExtraBets[EXTRA_BETS_VALUES.NFC_WILDCARD] = nfcWc;
    setSelectedExtraBets({ ...newSelectedExtraBets });
  };

  const selectedWildcardExtraType =
    selectedExtraSection === EXTRA_SECTION.AFC
      ? EXTRA_BETS_VALUES.AFC_WILDCARD
      : EXTRA_BETS_VALUES.NFC_WILDCARD;

  const renderText = () => {
    return (
      <span>
        Para cada divisão, escolha 1 campeão{' '}
        <Icon classes={{ root: `fas fa-crown` }} />
        <br />
        Escolha também 3 wild cards{' '}
        <Icon classes={{ root: `fas fa-running` }} /> por conferência
      </span>
    );
  };

  const renderBetsStatus = () => {
    const totalChampBets = 8;
    const totalWCBets = 6;
    const totalPlayoffBets = 3;

    let numOfChampBets = 0;
    let numOfWCBets = 0;
    let numOfPlayoffBets = 0;

    if (selectedExtraBets[EXTRA_BETS_VALUES.AFC_WILDCARD] !== null) {
      const wcBets = selectedExtraBets[
        EXTRA_BETS_VALUES.AFC_WILDCARD
      ] as number[];
      numOfWCBets += wcBets.length;
    }
    if (selectedExtraBets[EXTRA_BETS_VALUES.NFC_WILDCARD] !== null) {
      const wcBets = selectedExtraBets[
        EXTRA_BETS_VALUES.NFC_WILDCARD
      ] as number[];
      numOfWCBets += wcBets.length;
    }

    if (selectedExtraBets[EXTRA_BETS_VALUES.AFC_NORTH] !== null) {
      numOfChampBets++;
    }
    if (selectedExtraBets[EXTRA_BETS_VALUES.AFC_EAST] !== null) {
      numOfChampBets++;
    }
    if (selectedExtraBets[EXTRA_BETS_VALUES.AFC_SOUTH] !== null) {
      numOfChampBets++;
    }
    if (selectedExtraBets[EXTRA_BETS_VALUES.AFC_WEST] !== null) {
      numOfChampBets++;
    }
    if (selectedExtraBets[EXTRA_BETS_VALUES.NFC_NORTH] !== null) {
      numOfChampBets++;
    }
    if (selectedExtraBets[EXTRA_BETS_VALUES.NFC_EAST] !== null) {
      numOfChampBets++;
    }
    if (selectedExtraBets[EXTRA_BETS_VALUES.NFC_SOUTH] !== null) {
      numOfChampBets++;
    }
    if (selectedExtraBets[EXTRA_BETS_VALUES.NFC_WEST] !== null) {
      numOfChampBets++;
    }
    if (selectedExtraBets[EXTRA_BETS_VALUES.AFC] !== null) {
      numOfPlayoffBets++;
    }
    if (selectedExtraBets[EXTRA_BETS_VALUES.NFC] !== null) {
      numOfPlayoffBets++;
    }
    if (selectedExtraBets[EXTRA_BETS_VALUES.SUPERBOWL] !== null) {
      numOfPlayoffBets++;
    }

    setBetProgress(
      100 *
        ((numOfWCBets + numOfChampBets + numOfPlayoffBets) /
          (totalWCBets + totalChampBets + totalPlayoffBets))
    );

    return (
      <div>
        <p>
          WC
          <br />
          {numOfWCBets}/{totalWCBets}
        </p>
        <p>
          Champs
          <br />
          {numOfChampBets}/{totalChampBets}
        </p>
        <p>
          Playoffs
          <br />
          {numOfPlayoffBets}/{totalPlayoffBets}
        </p>
      </div>
    );
  };

  const renderDivision = (
    title: string,
    teams: TMatchTeam[],
    extraType: number
  ) => {
    const divisionClass = classNames(styles.division, {
      'left-margin-s right-margin-s': !isMobile
    });

    const divisionName =
      selectedExtraSection === EXTRA_SECTION.AFC ? 'AFC' : 'NFC';

    return (
      <>
        <div className={divisionClass}>
          <h3 className={styles.divisionTitle}>
            {divisionName} {title}
          </h3>
          {teams.map((team) => (
            <BettableTeam
              disabled={isUpdating || isBetBlocked}
              currentlySelectedByUser={selectedExtraBets}
              extraType={extraType}
              team={team}
              wildcardExtraType={selectedWildcardExtraType}
              onSelect={onSelect}
            />
          ))}
        </div>
      </>
    );
  };

  const renderPlayoffBets = (title: string, extraType: number) => {
    let renderTeams: TMatchTeam[] = [];
    if (extraType === EXTRA_BETS_VALUES.AFC) {
      renderTeams = teams.filter(
        (team) => team.conference.toLowerCase() === 'afc'
      );
    } else if (extraType === EXTRA_BETS_VALUES.NFC) {
      renderTeams = teams.filter(
        (team) => team.conference.toLowerCase() === 'nfc'
      );
    } else {
      renderTeams = [...teams];
    }

    const renderDivisionButton = () => {
      return <h3 className={styles.divisionTitle}>{title}</h3>;
    };

    const divisionClass = classNames(styles.division, {
      'left-margin-s right-margin-s': !isMobile
    });

    return (
      <div className={divisionClass}>
        {renderDivisionButton()}
        {renderTeams.map((team) => (
          <BettableTeam
            disabled={isUpdating}
            currentlySelectedByUser={selectedExtraBets}
            extraType={extraType}
            team={team}
            onSelect={onSelect}
          />
        ))}
      </div>
    );
  };

  const divisionsContainerClass = classNames({
    [styles.divisionsContainer]: !isMobile,
    [styles.divisionsContainerMobile]: isMobile
  });

  return (
    <>
      {(selectedExtraSection === EXTRA_SECTION.AFC ||
        selectedExtraSection === EXTRA_SECTION.NFC) && (
        <TextBox text={renderText} />
      )}
      {!isLoading && selectedExtraSection === EXTRA_SECTION.AFC && (
        <div className={divisionsContainerClass}>
          {renderDivision(
            'North',
            teamsByConferenceAndDivision.afc.north,
            EXTRA_BETS_VALUES.AFC_NORTH
          )}
          {renderDivision(
            'East',
            teamsByConferenceAndDivision.afc.east,
            EXTRA_BETS_VALUES.AFC_EAST
          )}
          {renderDivision(
            'South',
            teamsByConferenceAndDivision.afc.south,
            EXTRA_BETS_VALUES.AFC_SOUTH
          )}
          {renderDivision(
            'West',
            teamsByConferenceAndDivision.afc.west,
            EXTRA_BETS_VALUES.AFC_WEST
          )}
        </div>
      )}
      {!isLoading && selectedExtraSection === EXTRA_SECTION.NFC && (
        <div className={divisionsContainerClass}>
          {renderDivision(
            'North',
            teamsByConferenceAndDivision.nfc.north,
            EXTRA_BETS_VALUES.NFC_NORTH
          )}
          {renderDivision(
            'East',
            teamsByConferenceAndDivision.nfc.east,
            EXTRA_BETS_VALUES.NFC_EAST
          )}
          {renderDivision(
            'South',
            teamsByConferenceAndDivision.nfc.south,
            EXTRA_BETS_VALUES.NFC_SOUTH
          )}
          {renderDivision(
            'West',
            teamsByConferenceAndDivision.nfc.west,
            EXTRA_BETS_VALUES.NFC_WEST
          )}
        </div>
      )}

      {!isLoading && selectedExtraSection === EXTRA_SECTION.PLAYOFFS && (
        <div className={divisionsContainerClass}>
          {renderPlayoffBets('AFC Champion', EXTRA_BETS_VALUES.AFC)}
          {renderPlayoffBets('NFC Champion', EXTRA_BETS_VALUES.NFC)}
          {renderPlayoffBets('Super Bowl', EXTRA_BETS_VALUES.SUPERBOWL)}
        </div>
      )}
      <StatusComponent content={renderBetsStatus} progress={betProgress} />
    </>
  );
};

export default BeforeSeasonStart;
