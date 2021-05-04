import React from 'react';
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
    const containerClass = classNames(
        [styles.container], {
        [styles.containerMobile]: isMobile
    });

    return (
        <div className={containerClass} style={{
            color: foreground,
            background: `url(/match_layer.png) ${background}`
        }}>
            <div className={styles.logoContainer}>
                <img className={styles.logo} alt="logo" src={`/team_logos_std/${id}.gif`} />
            </div>
            <div className={styles.nameContainer}>
                <div className={styles.name} style={{
                    textShadow: `-1px 0 ${background}, 0 1px ${background}, 1px 0 ${background}, 0 -1px ${background}`
                }}>
                    {isExpanded && !isMobile ? name : code}
                </div>
                {score !== undefined && <div className={styles.score}>
                    {score}
                </div>}
            </div>
        </div>
    )
};

export default Team;