import React, { useEffect, useState } from 'react';
import { usePrevious } from 'services/hooks';
import { isMobile } from "react-device-detect";
import classNames from 'classnames';

import { TMatchTeam } from 'store/matches/types';

import styles from './Team.module.scss';

type TProps = TMatchTeam & {
    isExpanded: boolean
}

const Team = ({
    id,
    isExpanded,
    code,
    name,
    background,
    foreground,
    score
}: TProps) => {
    const [scoreChanged, setScoreChanged] = useState<boolean>(false);
    const prevScore = usePrevious(score);

    useEffect(() => {
        if (prevScore !== undefined) {
            setScoreChanged(true);
            setTimeout(() => setScoreChanged(false), 20000); //20s
        }
    }, [prevScore, score]);

    const containerClass = classNames(
        [styles.container], {
        [styles.containerMobile]: isMobile
    });

    const logoClass = classNames(
        [styles.logo], {
        [styles.logoHighlight]: scoreChanged
    });

    const scoreClass = classNames(
        [styles.score], {
        [styles.scoreHighlight]: scoreChanged
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
                <div className={styles.name} style={{
                    textShadow: `-1px 0 ${background}, 0 1px ${background}, 1px 0 ${background}, 0 -1px ${background}`
                }}>
                    {isExpanded && !isMobile ? name : code}
                </div>
                {score !== undefined && <div className={scoreClass}>
                    {score}
                </div>}
            </div>
        </div>
    )
};

export default Team;