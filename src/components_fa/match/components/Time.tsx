import { isMobile } from "react-device-detect";

import classNames from 'classnames';
import { DateTime } from 'luxon';

import styles from 'components_fa/match/Match.module.scss';
import MATCH_STATUS from 'constants/matches';

type TProps = {
    currentTimestamp: number,
    clock: string,
    isLoading: boolean,
    status: number,
    timestamp: number,
};

const Time = ({
    currentTimestamp,
    clock,
    isLoading,
    status,
    timestamp
}: TProps) => {
    const matchHasEnded = status === MATCH_STATUS.FINAL ||
        status === MATCH_STATUS.FINAL_OVERTIME ||
        status === MATCH_STATUS.CANCELLED;

    const clockIsStopped = status === MATCH_STATUS.END_FIRST ||
        status === MATCH_STATUS.END_THIRD ||
        status === MATCH_STATUS.HALFTIME ||
        status === MATCH_STATUS.DELAYED ||
        status === MATCH_STATUS.NOT_STARTED ||
        status === MATCH_STATUS.CANCELLED;

    const matchStatusClass = classNames({
        [styles.notStarted]: currentTimestamp < timestamp, // not started
        [styles.started]: currentTimestamp >= timestamp, // has started
        [styles.ended]: currentTimestamp >= timestamp
            && matchHasEnded, // match has ended
    });

    const renderStatus = () => {
        switch (status) {
            case MATCH_STATUS.FIRST:
                return '1Q'
            case MATCH_STATUS.END_FIRST:
                return 'Fim 1Q'
            case MATCH_STATUS.SECOND:
                return '2Q'
            case MATCH_STATUS.THIRD:
                return '3Q'
            case MATCH_STATUS.END_THIRD:
                return 'Fim 3Q'
            case MATCH_STATUS.FOURTH:
                return '4Q'
            case MATCH_STATUS.OVERTIME:
                return 'OT'
            case MATCH_STATUS.HALFTIME:
                return 'Intervalo'
            case MATCH_STATUS.DELAYED:
                return 'Atrasado'
            case MATCH_STATUS.FINAL:
                return 'Final'
            case MATCH_STATUS.FINAL_OVERTIME:
                return 'Final OT'
            case MATCH_STATUS.CANCELLED:
                return 'Cancelado'
            default:
                return 'Iniciando'
        }
    };

    const renderTime = () => {
        const date = DateTime.fromSeconds(timestamp).setLocale('pt-Br').toFormat("dd/LL, HH'h'mm");

        // if match hasn't started (by timestamp)
        if (currentTimestamp < timestamp) {
            return (
                <div className={`${matchStatusClass}`} style={{ background: `url(/match_layer.png), #757a7c` }}>
                    {status === MATCH_STATUS.CANCELLED ? renderStatus() : date}
                </div>
            );
        }

        // if match has started (by timestamp)
        if (currentTimestamp >= timestamp) {
            // if match has ended or clock is stopped (by status)
            if (matchHasEnded || clockIsStopped) {
                return (
                    <div className={`${matchStatusClass}`} style={{ background: `url(/match_layer.png), #757a7c` }}>
                        {renderStatus()}
                    </div>
                );
            }

            // if clock is running (by status)
            return (
                <div className={matchStatusClass}>
                    <div className={styles.quarter}>
                        {renderStatus()}
                    </div>
                    <div className={styles.timeLeft}>
                        {clock}
                    </div>
                </div>
            );
        }
    };

    const timeClass = classNames(
        [styles.time], {
        [styles.timeLoading]: isLoading,
        [styles.timeMobile]: isMobile,
    });

    return (
        <div className={timeClass}>
            {renderTime()}
        </div>

    )
}

export default Time;