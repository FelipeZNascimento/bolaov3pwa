import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from "react-device-detect";
import classNames from 'classnames';

// Actions
import {
    fetchExtraBets,
    updateExtraBets
} from 'store/bets/actions';

// Selectors
import {
    selectIsLoading,
    selectIsUpdating,
    selectExtraBets,
    selectExtraBetsResults,
    selectUserExtraBets
} from 'store/bets/selector';
import {
    selectCurrentSeason,
    selectSeasonStart,
    selectTeams,
    selectTeamsByConferenceAndDivision
} from 'store/app/selector';

// Components
import TeamWithExtras from './components/TeamWithExtras';
import BettableTeam from './components/BettableTeam';
import { Loading } from 'components_fa/index'
import {
    Button,
} from '@material-ui/core';

import { TMatchTeam } from 'store/matches/types';
import { TExtraBets } from 'store/bets/types';
import { EXTRA_BETS_VALUES } from 'constants/bets';
import styles from './ExtraBets.module.scss'

const EXTRA_SECTION = {
    AFC: 0,
    NFC: 1,
    PLAYOFFS: 2
};
type EXTRA_SECTION_TYPE = typeof EXTRA_SECTION[keyof typeof EXTRA_SECTION];

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

const ExtraBets = () => {
    const [hasSeasonStarted, setHasSeasonStarted] = useState<boolean>(false);
    const [extraSection, setExtraSection] = useState<EXTRA_SECTION_TYPE>(EXTRA_SECTION.AFC);
    const [selectedExtraBets, setSelectedExtraBets] = useState<TExtraBets>(emptyExtras);
    const dispatch = useDispatch();

    const currentSeason = useSelector(selectCurrentSeason);
    const isLoading = useSelector(selectIsLoading);
    const isUpdating = useSelector(selectIsUpdating);
    const extraBets = useSelector(selectExtraBets);
    const userExtraBets = useSelector(selectUserExtraBets);
    const extraBetsResults = useSelector(selectExtraBetsResults);
    const seasonStart = useSelector(selectSeasonStart);
    const teams = useSelector(selectTeams);
    const teamsByConferenceAndDivision = useSelector(selectTeamsByConferenceAndDivision);

    const selectedWildcardExtraType = extraSection === EXTRA_SECTION.AFC
        ? EXTRA_BETS_VALUES.AFC_WILDCARD
        : EXTRA_BETS_VALUES.NFC_WILDCARD;

    let currentTimestamp = Math.floor(Date.now() / 1000);
    setTimeout(function () {
        currentTimestamp = Math.floor(Date.now() / 1000);
    }, 60000);

    useEffect(() => {
        if (seasonStart) {
            setHasSeasonStarted(currentTimestamp >= seasonStart);
        }
    }, [currentTimestamp, seasonStart]);

    useEffect(() => {
        if (currentSeason) {
            dispatch(fetchExtraBets(currentSeason));
        }
    }, [currentSeason, dispatch]);

    useEffect(() => {
        if (userExtraBets !== null) {
            setSelectedExtraBets(userExtraBets);
        }
    }, [userExtraBets]);

    useEffect(() => {
        if (!isLoading
            && JSON.stringify(selectedExtraBets) !== JSON.stringify(userExtraBets)
            && JSON.stringify(selectedExtraBets) !== JSON.stringify(emptyExtras)
        ) {
            dispatch(updateExtraBets(selectedExtraBets))
        }
    }, [selectedExtraBets]);

    const onSelect = (team: TMatchTeam, type: number) => {
        const newSelectedExtraBets: TExtraBets = { ...selectedExtraBets };
        let afcWc: number[] = [...newSelectedExtraBets[EXTRA_BETS_VALUES.AFC_WILDCARD] as number[]];
        let nfcWc: number[] = [...newSelectedExtraBets[EXTRA_BETS_VALUES.NFC_WILDCARD] as number[]];

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

    const renderDivision = (
        title: string,
        teams: TMatchTeam[],
        extraType: number
    ) => {
        const divisionClass = classNames({
            [styles.division]: !hasSeasonStarted,
            'left-margin-s right-margin-s': !hasSeasonStarted && !isMobile,
            [styles.divisionAndBets]: hasSeasonStarted
        });

        const divisionName = extraSection === EXTRA_SECTION.AFC ? 'AFC' : 'NFC';
        const renderButton = () => {
            return <h3 className={styles.divisionTitle}>{divisionName} {title}</h3>;
        };

        return (
            <>
                <div className={divisionClass}>
                    {renderButton()}
                    {hasSeasonStarted && teams.map((team) => (
                        <TeamWithExtras
                            isVisible
                            isExpanded
                            extraBets={extraBets}
                            extraBetsResults={extraBetsResults}
                            extraType={extraType}
                            team={team}
                            wildcardExtraType={selectedWildcardExtraType}
                        />
                    ))}
                    {!hasSeasonStarted && teams.map((team) => (
                        <BettableTeam
                            disabled={isUpdating}
                            currentlySelectedByUser={selectedExtraBets}
                            extraType={extraType}
                            team={team}
                            wildcardExtraType={selectedWildcardExtraType}
                            onSelect={onSelect}
                        />
                    ))}

                </div>
            </>
        )
    };

    const renderPlayoffBets = (
        title: string,
        extraType: number
    ) => {
        let renderTeams: TMatchTeam[] = [];
        if (hasSeasonStarted) {
            extraBets.forEach((user) => {
                const bettedTeam = user.bets[extraType];
                if (renderTeams.find((team) => team.id === bettedTeam) === undefined) {
                    const teamInfo = teams.find((team) => team.id === bettedTeam);
                    if (teamInfo !== undefined) {
                        renderTeams.push(teamInfo);
                    }
                }
            })
        } else {
            if (extraType === EXTRA_BETS_VALUES.AFC) {
                renderTeams = teams.filter((team) => team.conference.toLowerCase() === 'afc');
            } else if (extraType === EXTRA_BETS_VALUES.NFC) {
                renderTeams = teams.filter((team) => team.conference.toLowerCase() === 'nfc');
            } else {
                renderTeams = [...teams];
            }
        }

        const renderDivisionButton = () => {
            return <h3 className={styles.divisionTitle}>{title}</h3>;
        };

        const divisionClass = classNames({
            [styles.division]: !hasSeasonStarted,
            'left-margin-s right-margin-s': !hasSeasonStarted && !isMobile,
            [styles.divisionAndBets]: hasSeasonStarted
        });

        return (
            <div className={divisionClass}>
                {renderDivisionButton()}
                {hasSeasonStarted && renderTeams.map((team) => (
                    <TeamWithExtras
                        isExpanded
                        isVisible
                        extraBets={extraBets}
                        extraBetsResults={extraBetsResults}
                        extraType={extraType}
                        team={team}
                    />
                ))}
                {!hasSeasonStarted && renderTeams.map((team) => (
                    <BettableTeam
                        disabled={isUpdating}
                        currentlySelectedByUser={selectedExtraBets}
                        extraType={extraType}
                        team={team}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        )
    }

    const containerClass = classNames({
        [styles.container]: !isMobile,
        [styles.containerMobile]: isMobile
    });

    const divisionsContainerClass = classNames({
        [styles.divisionsContainer]: !isMobile,
        [styles.divisionsContainerMobile]: isMobile
    });

    return (
        <div className={containerClass}>
            <div className="sectionTitle">
                <h1>Extras</h1>
            </div>

            <div className={styles.buttonsContainer}>
                <Button classes={{ root: `${extraSection === EXTRA_SECTION.AFC ? styles.buttonActive : styles.button}` }}
                    variant="outlined"
                    onClick={() => setExtraSection(EXTRA_SECTION.AFC)}
                >
                    AFC
                </Button>
                <Button classes={{ root: `${extraSection === EXTRA_SECTION.NFC ? styles.buttonActive : styles.button}` }}
                    variant="outlined"
                    onClick={() => setExtraSection(EXTRA_SECTION.NFC)}
                >
                    NFC
                </Button>
                <Button classes={{ root: `${extraSection === EXTRA_SECTION.PLAYOFFS ? styles.buttonActive : styles.button}` }}
                    variant="outlined"
                    onClick={() => setExtraSection(EXTRA_SECTION.PLAYOFFS)}
                >
                    Playoffs
                </Button>
            </div>

            {isLoading && <Loading />}
            {!isLoading && extraSection === EXTRA_SECTION.AFC && <div className={divisionsContainerClass}>
                {renderDivision('North', teamsByConferenceAndDivision.afc.north, EXTRA_BETS_VALUES.AFC_NORTH)}
                {renderDivision('East', teamsByConferenceAndDivision.afc.east, EXTRA_BETS_VALUES.AFC_EAST)}
                {renderDivision('South', teamsByConferenceAndDivision.afc.south, EXTRA_BETS_VALUES.AFC_SOUTH)}
                {renderDivision('West', teamsByConferenceAndDivision.afc.west, EXTRA_BETS_VALUES.AFC_WEST)}
            </div>}

            {!isLoading && extraSection === EXTRA_SECTION.NFC && <div className={divisionsContainerClass}>
                {renderDivision('North', teamsByConferenceAndDivision.nfc.north, EXTRA_BETS_VALUES.NFC_NORTH)}
                {renderDivision('East', teamsByConferenceAndDivision.nfc.east, EXTRA_BETS_VALUES.NFC_EAST)}
                {renderDivision('South', teamsByConferenceAndDivision.nfc.south, EXTRA_BETS_VALUES.NFC_SOUTH)}
                {renderDivision('West', teamsByConferenceAndDivision.nfc.west, EXTRA_BETS_VALUES.NFC_WEST)}
            </div>}

            {!isLoading && extraSection === EXTRA_SECTION.PLAYOFFS && <div className={divisionsContainerClass}>
                {renderPlayoffBets(
                    'AFC Champion',
                    EXTRA_BETS_VALUES.AFC
                )}
                {renderPlayoffBets(
                    'NFC Champion',
                    EXTRA_BETS_VALUES.NFC
                )}
                {renderPlayoffBets(
                    'Superbowl',
                    EXTRA_BETS_VALUES.SUPERBOWL
                )}
            </div>}
        </div>
    );
}

export default ExtraBets;