import React from 'react';

import { Tooltip } from '@material-ui/core';

import { TMatchTeam } from 'store/matches/types';

import styles from './TeamMini.module.scss';

type TProps = TMatchTeam;

const Team = ({
    foreground,
    id,
    alias,
}: TProps) => {
    return (
        <Tooltip title={alias} arrow>
            <div className={styles.container} style={{ color: foreground }}>
                <div className={styles.logoContainer}>
                    <img className={styles.logo} alt="logo" src={`/team_logos_std/${id}.gif`} />
                </div>
            </div>
        </Tooltip>
    )
};

export default Team;