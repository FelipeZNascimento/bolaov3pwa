import React from 'react';
import { useSelector } from 'react-redux';
import { isMobile } from "react-device-detect";
import classNames from 'classnames';

// Selectors
import { selectUser } from 'store/user/selector';
import { selectIsLoading } from 'store/records/selector';

// Components
import { Loading, WeekSelector } from 'components_fa/index';
import {
    Icon,
    Tooltip
} from '@material-ui/core';

// Types
import { TRecord } from 'store/records/types';
import { TRecordFilter } from '../types';

import styles from '../style.module.scss';
import ROUTES from 'constants/routes';

type TProps = {
    filter: TRecordFilter,
    records: TRecord[]
};

const placeholders: TRecord[] = [];
const placeholder = {
    bullseye: 0,
    numOfBets: 0,
    numOfGames: 0,
    percentage: '0%',
    points: 0,
    season: '0000',
    seasonId: 0,
    userColor: '#000000',
    userIcon: 'fas fa-circle-notch',
    userId: '---',
    userName: '---',
    week: 0,
    winners: 0
};

for (var i = 0; i < 20; i++) {
    placeholders.push(placeholder);
}

const RecordsTable = ({
    filter,
    records
}: TProps) => {
    const loggedUser = useSelector(selectUser);
    const isLoading = useSelector(selectIsLoading);

    const renderRecordTableLine = (recordLine: TRecord, position: number) => {
        const recordLineClass = classNames(styles.recordLine, {
            [styles.userBet]: recordLine.userId === loggedUser?.id,
            [styles.smallFont]: isMobile,
            [styles.recordLineLoading]: isLoading
        });

        return (
            <div className={recordLineClass} key={position}>
                <div className={styles.position}>{position}.</div>
                <div className={styles.icon}>
                    <Icon classes={{ root: styles.icon }} fontSize="small" className={recordLine.userIcon} style={{ color: recordLine.userColor }} />
                </div>
                <div className={styles.name}>
                    {recordLine.userName}
                </div>
                <div className={styles.season}>
                    {recordLine.season}
                </div>
                {!filter.weekSelector && <div className={styles.week}>
                    {recordLine.week}
                </div>}
                <div className={styles.points}>
                    {recordLine.percentage}
                </div>
                <div className={styles.points}>
                    {recordLine.points}
                </div>
                {!isMobile &&
                    <div className={styles.points}>
                        {recordLine.bullseye}
                    </div>
                }
                {!isMobile &&
                    <div className={styles.points}>
                        {recordLine.winners}
                    </div>
                }
            </div>
        )
    };

    const tableHeaderClass = classNames(styles.tableHeader, {
        [styles.smallFont]: isMobile,
    });

    return (
        <div className={styles.table}>
            <h1>{filter.display}</h1>
            <h3>{filter.description}</h3>
            {filter.weekSelector && <WeekSelector
                routeTo={(weekNum) => ROUTES.RECORDS.urlWithParams(filter.route, JSON.stringify(weekNum))}
                onClick={() => null}
                initialWeek={filter.week}
            />}
            <div className={tableHeaderClass}>
                <div className={styles.position}>&nbsp;</div>
                <div className={styles.icon}>&nbsp;</div>
                <div className={styles.name}>&nbsp;</div>
                <div className={styles.season}>
                    {isMobile
                        ? ''
                        : 'Temporada'
                    }
                </div>
                {!filter.weekSelector && <div className={styles.week}>
                    Semana
                </div>}
                <div className={styles.points}>
                    <Tooltip title="Aproveitamento de pontos" arrow><span>%</span></Tooltip>
                </div>
                <div className={styles.points}>
                    <Tooltip title="Pontos" arrow><span>Pts</span></Tooltip>
                </div>
                {!isMobile &&
                    <div className={styles.points}>
                        <Tooltip title="Acertos na mosca" arrow><span className="color-mint">Moscas</span></Tooltip>
                    </div>
                }
                {!isMobile &&
                    <div className={styles.points}>
                        <Tooltip title="Vencedores corretos" arrow><span className="color-blue">Vencedores</span></Tooltip>
                    </div>
                }
            </div>
            <div className={styles.lineContainer}>
                {isLoading && <Loading overlay />}
                {isLoading && placeholders.map((recordLine, index) => renderRecordTableLine(recordLine, index + 1))}
                {!isLoading && records.map((recordLine, index) => renderRecordTableLine(recordLine, index + 1))}
            </div>
        </div>
    )
};

export default RecordsTable;