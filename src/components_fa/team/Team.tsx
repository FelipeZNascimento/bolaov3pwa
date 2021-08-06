import React, { useEffect, useState } from 'react';
import { usePrevious } from 'services/hooks';
import { isMobile } from "react-device-detect";
import classNames from 'classnames';

import { Tooltip } from '@material-ui/core';

import { TMatchTeam } from 'store/matches/types';
import styles from './Team.module.scss';

type TProps = TMatchTeam & {
    hasGameStarted: boolean,
    isExpanded: boolean,
    isHome?: boolean,
    displayOdd?: null | string
}

const Team = ({
    hasGameStarted,
    id,
    isExpanded,
    isHome = false,
    code,
    name,
    background,
    foreground,
    score,
    displayOdd = null
}: TProps) => {
    const [scoreChanged, setScoreChanged] = useState<boolean>(false);
    const prevScore = usePrevious(score);

    useEffect(() => {
        if (prevScore !== undefined) {
            setScoreChanged(true);
            setTimeout(() => setScoreChanged(false), 20000); //20s
        }
    }, [score]);

    const renderScore = () => {
        const scoreClass = classNames(
            [styles.score], {
            [styles.scoreHighlight]: scoreChanged
        });

        if (score === undefined) {
            return;
        }

        return (
            <div className={scoreClass}>
                {score}
            </div>
        )
    };

    const renderOdds = () => {
        if (displayOdd === null || displayOdd === '') {
            return;
        }

        const renderTooltipText = () => {
            if(isHome) {
                return <span>Spread<br/>Diferencial de pontos esperada entre as equipes</span>
            } else {
                return <span>Over/Under<br/>Soma de pontos esperada para partida</span>
            }
        }

        return (
            <Tooltip title={renderTooltipText()} placement="top" arrow>
                <div className={styles.odds}>
                    {displayOdd}
                </div>
            </Tooltip>
        )
    };

    const containerClass = classNames(
        [styles.container], {
        [styles.containerMobile]: isMobile
    });

    const logoClass = classNames(
        [styles.logo], {
        [styles.logoHighlight]: scoreChanged
    });

    const nameClass = classNames(
        [styles.name], {
        [styles.nameNoOdds]: displayOdd === null || displayOdd === '',
        [styles.nameExpanded]: isExpanded && !isMobile
    });

    return (
        <div className={containerClass} style={{
            color: foreground,
            background: `url(/match_layer.png) ${background}`
        }}>
            <div className={styles.logoContainer}>
                <img className={logoClass} alt="logo" src={`/team_logos_std/${id}.gif`} />
            </div>
            <div className={styles.nameContainer}>
                <div className={nameClass} style={{
                    textShadow: `-1px 0 ${background}, 0 1px ${background}, 1px 0 ${background}, 0 -1px ${background}`
                }}>
                    {isExpanded && !isMobile ? name : code}<br />
                    {/* <p className={styles.standings}>2-2</p> */}
                </div>
                {hasGameStarted && renderScore()}
                {!hasGameStarted && renderOdds()}
            </div>
        </div>
    )
};

export default Team;