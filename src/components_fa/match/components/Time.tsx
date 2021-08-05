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
    const matchHasEnded = status === MATCH_STATUS.FINAL || status === MATCH_STATUS.FINAL_OVERTIME;

    const matchStatusClass = classNames({
        [styles.notStarted]: currentTimestamp < timestamp, // not started
        [styles.started]: currentTimestamp >= timestamp, // has started
        [styles.ended]: currentTimestamp >= timestamp
            && matchHasEnded, // match has ended
    });

    const renderQuarter = () => {
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
            default:
                return ''
        }
    };

    const renderTime = () => {
        const date = DateTime.fromSeconds(timestamp).setLocale('pt-Br').toFormat("dd/LL, HH'h'mm");

        // if match hasn't started
        if (currentTimestamp < timestamp) {
            return <div className={`${matchStatusClass}`} style={{ background: `url(/match_layer.png), #9da4a7` }}>{date}</div>
        }

        // if match has ended
        if (currentTimestamp >= timestamp && matchHasEnded) {
            const finalState = status === MATCH_STATUS.FINAL ? 'Final' : 'Final OT'

            return (
                <div className={`${matchStatusClass}`} style={{ background: `url(/match_layer.png), #9da4a7` }}>
                    {finalState}
                </div>
            );
        }

        // if match has started
        if (currentTimestamp >= timestamp) {
            return (
                <div className={matchStatusClass}>
                    <div className={styles.quarter}>
                        {renderQuarter()}
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