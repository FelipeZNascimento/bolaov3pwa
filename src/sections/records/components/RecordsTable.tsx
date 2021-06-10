import { isMobile } from "react-device-detect";

import { WeekPagination } from 'components_fa/index';
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

const RecordsTable = ({
    filter,
    records
}: TProps) => {
    const renderRecordTableLine = (recordLine: TRecord, position: number) => {
        return (
            <div className={styles.recordLine} key={position}>
                <div className={styles.position}>{position}.</div>
                <div className={styles.icon}>
                    <Icon classes={{ root: styles.icon }} fontSize="small" className={recordLine.userIcon} style={{ color: recordLine.userColor }} />
                </div>
                <div className={styles.name}>
                    {recordLine.userName}
                </div>
                <div className={styles.season}>
                    {recordLine.seasonId}
                </div>
                <div className={styles.week}>
                    {recordLine.week}
                </div>
                <div className={styles.points}>
                    {recordLine.percentage}
                </div>
                <div className={styles.points}>
                    {recordLine.points}
                </div>
                <div className={styles.points}>
                    {recordLine.bullseye}
                </div>
                <div className={styles.points}>
                    {recordLine.winners}
                </div>
            </div>
        )
    };

    return (
        <div className={styles.table}>
            <h1>{filter.display}</h1>
            <h3>{filter.description}</h3>
            {filter.weekPagination && <WeekPagination
                routeTo={(weekNum) => ROUTES.RECORDS.urlWithParams(filter.route, JSON.stringify(weekNum))}
                onClick={() => null}
                initialWeek={filter.week}
            />}
            <div className={styles.tableHeader}>
                <div className={styles.position}>&nbsp;</div>
                <div className={styles.icon}>&nbsp;</div>
                <div className={styles.name}>&nbsp;</div>
                <div className={styles.season}>
                    Temporada
                    </div>
                <div className={styles.week}>
                    Semana
                    </div>
                <div className={styles.points}>
                    <Tooltip title="Aproveitamento de pontos" arrow><span>%</span></Tooltip>
                </div>
                <div className={styles.points}>
                    {isMobile
                        ? <Tooltip title="Pontos" arrow><span>Pts</span></Tooltip>
                        : 'Pontos'
                    }
                </div>
                <div className={styles.points}>
                    {isMobile
                        ? <Tooltip title="Acertos na mosca" arrow><span className="color-mint">M</span></Tooltip>
                        : <Tooltip title="Acertos na mosca" arrow><span className="color-mint">Moscas</span></Tooltip>
                    }
                </div>
                <div className={styles.points}>
                    {isMobile
                        ? <Tooltip title="Vencedores corretos" arrow><span className="color-blue">V</span></Tooltip>
                        : <Tooltip title="Vencedores corretos" arrow><span className="color-blue">Vencedores</span></Tooltip>
                    }
                </div>
            </div>
            {records.map((recordLine, index) => renderRecordTableLine(recordLine, index + 1))}
        </div>
    )
};

export default RecordsTable;