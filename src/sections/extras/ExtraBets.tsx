import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from "react-device-detect";
import classNames from 'classnames';

// Actions
import { fetchExtraBets } from 'store/bets/actions';
// import { setCurrentWeek } from 'store/app/actions';

// Selectors
import {
    selectIsLoading,
    selectExtraBets,
    selectExtraBetsResults
} from 'store/bets/selector';
import {
    selectCurrentSeason,
    selectTeams,
    selectTeamsByConferenceAndDivision
} from 'store/app/selector';
import { selectUser } from 'store/user/selector';

// Components
import { Loading, TeamMini } from 'components_fa/index'
import {
    Button,
    Icon,
    Tooltip
} from '@material-ui/core';
import {
    UnfoldMore as UnfoldMoreIcon,
    UnfoldLess as UnfoldLessIcon,
} from '@material-ui/icons';

import { TMatchTeam } from 'store/matches/types';
import { EXTRA_BETS_VALUES } from 'constants/bets';
import styles from './ExtraBets.module.scss'

const EXTRA_SECTION = {
    AFC: 0,
    NFC: 1,
    PLAYOFFS: 2
};
type EXTRA_SECTION_TYPE = typeof EXTRA_SECTION[keyof typeof EXTRA_SECTION];

const ExtraBets = () => {
    const [extraSection, setExtraSection] = useState<EXTRA_SECTION_TYPE>(EXTRA_SECTION.AFC);
    const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
    const [selectAll, setSelectAll] = useState<boolean>(false);

    const dispatch = useDispatch();

    const currentSeason = useSelector(selectCurrentSeason);
    const isLoading = useSelector(selectIsLoading);
    const loggedUser = useSelector(selectUser);
    const extraBets = useSelector(selectExtraBets);
    const extraBetsResults = useSelector(selectExtraBetsResults);
    const teams = useSelector(selectTeams);
    const teamsByConferenceAndDivision = useSelector(selectTeamsByConferenceAndDivision);

    const selectedWildcardExtraType = extraSection === EXTRA_SECTION.AFC
        ? EXTRA_BETS_VALUES.AFC_WILDCARD
        : EXTRA_BETS_VALUES.NFC_WILDCARD;


    useEffect(() => {
        if (currentSeason) {
            dispatch(fetchExtraBets(currentSeason));
        }
    }, [currentSeason, loggedUser, dispatch]);

    const renderBets = (
        teamId: number,
        extraType: number
    ) => {
        return extraBets.map((user) => {
            if (extraType === selectedWildcardExtraType) {
                const wildcardBets = user.bets[extraType] as number[];
                if (wildcardBets.find((bet) => bet === teamId)) {
                    return (
                        <Tooltip title={`${user.username} (WC)`} arrow>
                            <Icon classes={{ root: styles.iconClass }} fontSize="small" className={`${user.icon} color-grey1`}
                            />
                        </Tooltip>
                    )
                }
            } else if (user.bets[extraType] === teamId) {
                return (
                    <Tooltip title={user.username} arrow>
                        <Icon classes={{ root: styles.iconClass }} fontSize="small" className={user.icon} style={{ color: user.color }} />
                    </Tooltip>
                )
            }
            return null;
        })
    };

    const renderDivision = (
        title: string,
        teams: TMatchTeam[],
        extraType: number
    ) => {
        const showDivision = isMobile || selectedDivision === null || selectedDivision === title;
        const showBets = selectAll || (selectedDivision === title && !isMobile);

        const divisionClass = classNames({
            [styles.division]: !showBets,
            [styles.divisionAndBets]: showBets
        });

        return (
            <>
                <div className={divisionClass}>
                    <Button classes={{ root: `${selectedDivision === title ? styles.buttonActive : styles.button}` }}
                        variant="outlined"
                        onClick={() => setSelectedDivision(selectedDivision === title ? null : title)}
                    >
                        {title}
                    </Button>

                    {teams.map((team) => {
                        let isChampion = false;
                        let isWildcard = false;
                        if (extraBetsResults !== null) {
                            const wildcardResults = extraBetsResults[selectedWildcardExtraType] as number[];

                            isChampion = extraBetsResults[extraType] === team.id;
                            isWildcard = wildcardResults.find((result) => result === team.id) !== undefined;
                        }

                        if (isChampion && !team.name.includes('Champion')) {
                            team.name += ' (Division Champion)';
                        }
                        if (isWildcard && !team.name.includes('Wildcard')) {
                            team.name += ' (Wildcard)';
                        }

                        const teamClass = classNames({
                            [styles.hidden]: !showDivision,
                            [styles.teamContainerWinner]: isChampion,
                            [styles.teamContainerWildcard]: isWildcard,
                            [styles.teamContainer]: !isWildcard && !isChampion,
                        });

                        const extraBetsClass = classNames({
                            [styles.extraBetsNone]: !showBets,
                            [styles.extraBets]: showBets,
                        });

                        return (
                            <div className={teamClass}>
                                <TeamMini {...team} />
                                <div className={extraBetsClass}>
                                    {renderBets(team.id, extraType)}
                                    {renderBets(team.id, selectedWildcardExtraType)}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </>
        )
    };

    const renderPlayoffBets = (
        title: string,
        extraType: number
    ) => {
        const bettedTeams: TMatchTeam[] = [];
        extraBets.forEach((user) => {
            const bettedTeam = user.bets[extraType];

            if (bettedTeams.find((team) => team.id === bettedTeam) === undefined) {
                const teamInfo = teams.find((team) => team.id === bettedTeam);
                if (teamInfo !== undefined) {
                    bettedTeams.push(teamInfo);
                }
            }
        })

        return (
            <div className={styles.divisionAndBets}>
                <Button classes={{ root: `${selectedDivision === title ? styles.buttonActive : styles.button}` }}
                    variant="outlined"
                    onClick={() => setSelectedDivision(selectedDivision === title ? null : title)}
                >
                    {title}
                </Button>

                {bettedTeams.map((team) => {
                    let isChampion = false;
                    if (extraBetsResults !== null) {
                        isChampion = extraBetsResults[extraType] === team.id;
                    }

                    const teamClass = classNames({
                        [styles.teamContainerWinner]: isChampion,
                        [styles.teamContainer]: !isChampion
                    });

                    return (
                        <div className={teamClass}>
                            <TeamMini {...team} />
                            <div className={styles.extraBets}>
                                {renderBets(team.id, extraType)}
                            </div>
                        </div>
                    )
                })}

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
            <div className={styles.buttonsContainer}>
                <Button classes={{ root: `${extraSection === EXTRA_SECTION.AFC ? styles.buttonActive : styles.button}` }}
                    variant="outlined"
                    onClick={() => { setExtraSection(EXTRA_SECTION.AFC); setSelectedDivision(null); }}
                >
                    AFC
                </Button>
                <Button classes={{ root: `${extraSection === EXTRA_SECTION.NFC ? styles.buttonActive : styles.button}` }}
                    variant="outlined"
                    onClick={() => { setExtraSection(EXTRA_SECTION.NFC); setSelectedDivision(null); }}
                >
                    NFC
                </Button>
                <Button classes={{ root: `${extraSection === EXTRA_SECTION.PLAYOFFS ? styles.buttonActive : styles.button}` }}
                    variant="outlined"
                    onClick={() => { setExtraSection(EXTRA_SECTION.PLAYOFFS); setSelectedDivision(null); }}
                >
                    Playoffs
                </Button>
            </div>
            {!isMobile && <Button classes={{ root: `color-grey1` }}
                variant="outlined"
                onClick={() => { setSelectAll(!selectAll); setSelectedDivision(null) }}
            >
                {selectAll ? <UnfoldLessIcon classes={{ root: styles.rotated }} /> : <UnfoldMoreIcon classes={{ root: styles.rotated }} />}
            </Button>}

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