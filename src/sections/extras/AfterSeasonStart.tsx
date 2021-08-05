import { useSelector } from 'react-redux';
import { isMobile } from "react-device-detect";
import classNames from 'classnames';

// Components
import TeamWithExtras from './components/TeamWithExtras';

// Selectors
import {
    selectIsLoading,
    selectExtraBets,
    selectExtraBetsResults,
} from 'store/bets/selector';
import {
    selectTeams,
    selectTeamsByConferenceAndDivision
} from 'store/app/selector';

// Types & Constants
import { TMatchTeam } from 'store/matches/types';
import { EXTRA_BETS_VALUES } from 'constants/bets';
import { EXTRA_SECTION } from './ExtraBets';

import styles from './ExtraBets.module.scss'

type TProps = {
    selectedExtraSection: number;
}

const AfterSeasonStart = ({
    selectedExtraSection
}: TProps) => {
    const isLoading = useSelector(selectIsLoading);
    const teams = useSelector(selectTeams);
    const teamsByConferenceAndDivision = useSelector(selectTeamsByConferenceAndDivision);
    const extraBets = useSelector(selectExtraBets);
    const extraBetsResults = useSelector(selectExtraBetsResults);

    const selectedWildcardExtraType = selectedExtraSection === EXTRA_SECTION.AFC
        ? EXTRA_BETS_VALUES.AFC_WILDCARD
        : EXTRA_BETS_VALUES.NFC_WILDCARD;

    const renderDivision = (
        title: string,
        teams: TMatchTeam[],
        extraType: number
    ) => {
        const divisionName = selectedExtraSection === EXTRA_SECTION.AFC ? 'AFC' : 'NFC';

        return (
            <>
                <div className={styles.divisionAndBets}>
                    <h3 className={styles.divisionTitle}>{divisionName} {title}</h3>
                    {teams.map((team) => (
                        <TeamWithExtras
                            isVisible
                            isExpanded
                            key={team.id}
                            extraBets={extraBets}
                            extraBetsResults={extraBetsResults}
                            extraType={extraType}
                            team={team}
                            wildcardExtraType={selectedWildcardExtraType}
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
        extraBets.forEach((user) => {
            const bettedTeam = user.bets[extraType];
            if (renderTeams.find((team) => team.id === bettedTeam) === undefined) {
                const teamInfo = teams.find((team) => team.id === bettedTeam);
                if (teamInfo !== undefined) {
                    renderTeams.push(teamInfo);
                }
            }
        })

        const renderDivisionButton = () => {
            return <h3 className={styles.divisionTitle}>{title}</h3>;
        };

        return (
            <div className={styles.divisionAndBets}>
                {renderDivisionButton()}
                {renderTeams.map((team) => (
                    <TeamWithExtras
                        isExpanded
                        isVisible
                        key={team.id}
                        extraBets={extraBets}
                        extraBetsResults={extraBetsResults}
                        extraType={extraType}
                        team={team}
                    />
                ))}
            </div>
        )
    };

    const divisionsContainerClass = classNames({
        [styles.divisionsContainer]: !isMobile,
        [styles.divisionsContainerMobile]: isMobile
    });

    return (
        <>
            {!isLoading && selectedExtraSection === EXTRA_SECTION.AFC && <div className={divisionsContainerClass}>
                {renderDivision('North', teamsByConferenceAndDivision.afc.north, EXTRA_BETS_VALUES.AFC_NORTH)}
                {renderDivision('East', teamsByConferenceAndDivision.afc.east, EXTRA_BETS_VALUES.AFC_EAST)}
                {renderDivision('South', teamsByConferenceAndDivision.afc.south, EXTRA_BETS_VALUES.AFC_SOUTH)}
                {renderDivision('West', teamsByConferenceAndDivision.afc.west, EXTRA_BETS_VALUES.AFC_WEST)}
            </div>}

            {!isLoading && selectedExtraSection === EXTRA_SECTION.NFC && <div className={divisionsContainerClass}>
                {renderDivision('North', teamsByConferenceAndDivision.nfc.north, EXTRA_BETS_VALUES.NFC_NORTH)}
                {renderDivision('East', teamsByConferenceAndDivision.nfc.east, EXTRA_BETS_VALUES.NFC_EAST)}
                {renderDivision('South', teamsByConferenceAndDivision.nfc.south, EXTRA_BETS_VALUES.NFC_SOUTH)}
                {renderDivision('West', teamsByConferenceAndDivision.nfc.west, EXTRA_BETS_VALUES.NFC_WEST)}
            </div>}

            {!isLoading && selectedExtraSection === EXTRA_SECTION.PLAYOFFS && <div className={divisionsContainerClass}>
                {renderPlayoffBets(
                    'AFC Champion',
                    EXTRA_BETS_VALUES.AFC
                )}
                {renderPlayoffBets(
                    'NFC Champion',
                    EXTRA_BETS_VALUES.NFC
                )}
                {renderPlayoffBets(
                    'Super Bowl',
                    EXTRA_BETS_VALUES.SUPERBOWL
                )}
            </div>}
        </>
    )
};

export default AfterSeasonStart;