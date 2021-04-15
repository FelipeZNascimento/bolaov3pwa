import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isMobile } from "react-device-detect";
import classNames from 'classnames';

import { selectCurrentWeek } from 'store/app/selector';

import styles from './WeekPagination.module.scss';

type TWeek = {
    num: number;
    display: string;
};

const weeksMock: TWeek[] = [
    {
        num: 1,
        display: 'Week 1'
    },
    {
        num: 2,
        display: 'Week 2'
    },
    {
        num: 3,
        display: 'Week 3'
    },
    {
        num: 4,
        display: 'Week 4'
    },
    {
        num: 5,
        display: 'Week 5'
    },
    {
        num: 6,
        display: 'Week 6'
    },
    {
        num: 7,
        display: 'Week 7'
    },
    {
        num: 8,
        display: 'Week 8'
    },
    {
        num: 9,
        display: 'Week 9'
    },
    {
        num: 10,
        display: 'Week 10'
    },
    {
        num: 11,
        display: 'Week 11'
    },
    {
        num: 12,
        display: 'Week 12'
    },
    {
        num: 13,
        display: 'Week 13'
    },
    {
        num: 14,
        display: 'Week 14'
    },
    {
        num: 15,
        display: 'Week 15'
    },
    {
        num: 16,
        display: 'Week 16'
    },
    {
        num: 17,
        display: 'Week 17'
    },
    {
        num: 18,
        display: 'Wild Card'
    },
    {
        num: 19,
        display: 'Divisional'
    },
    {
        num: 20,
        display: 'Conferência'
    },
    {
        num: 21,
        display: 'Superbowl'
    }
];

type TProps = {
    onClick: (week: number) => void;
    routeTo: (week: number) => string;
};

const WeekPagination = ({
    onClick,
    routeTo
}: TProps) => {
    const currentWeek = useSelector(selectCurrentWeek);

    const pageRange = isMobile ? 2 : 4;
    const leftWeeks: TWeek[] = [];
    const rightWeeks: TWeek[] = [];

    const currentPage = weeksMock.find((week) => week.num === currentWeek);

    if (!currentPage) {
        return null;
    }

    weeksMock.forEach((week) => {
        if (currentPage.num - pageRange <= week.num && currentPage.num > week.num) {
            leftWeeks.push(week);
        }

        if (currentPage.num + pageRange >= week.num && currentPage.num < week.num) {
            rightWeeks.push(week)
        }
    });

    const renderEmptySpans = (emptySpans: number) => {
        let spansToReturn = [];
        for (let i = 0; i < emptySpans; i++) {
            spansToReturn.push(<span className={styles.ghostPage}>&nbsp;</span>);
        }

        return spansToReturn;
    };

    const containerClass = classNames({
        [styles.containerStandard]: !isMobile,
        [styles.containerMobile]: isMobile
    });

    const pageClass = classNames({
        [styles.pageStandard]: !isMobile,
        [styles.pageMobile]: isMobile
    });

    const neighbourPagesClass = classNames({
        [styles.neighbourPagesStandard]: !isMobile,
        [styles.neighbourPagesMobile]: isMobile
    });

    return (
        <div className={containerClass}>
            <div className={neighbourPagesClass}>
                {leftWeeks.length < pageRange && renderEmptySpans(pageRange - leftWeeks.length)}
                {leftWeeks.map((week) => (
                    <Link
                        className={pageClass}
                        to={routeTo(week.num)}
                        onClick={() => onClick(week.num)}
                    >
                        {week.num}
                    </Link>
                ))}
            </div>
            <div className={styles.currentPage}>
                <Link
                    to={routeTo(currentPage.num)}
                    onClick={() => onClick(currentPage.num)}
                >
                    {isMobile ? currentPage.num : currentPage.display}
                </Link>
            </div>
            <div className={neighbourPagesClass}>
                {rightWeeks.map((week) => (
                    <Link
                        className={pageClass}
                        to={routeTo(week.num)}
                        onClick={() => onClick(week.num)}
                    >
                        { week.num}
                    </Link>
                ))}
                {rightWeeks.length < pageRange && renderEmptySpans(pageRange - rightWeeks.length)}
            </div>
        </div>
    );
};

export default WeekPagination;