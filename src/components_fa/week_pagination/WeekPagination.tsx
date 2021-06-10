import React, { useEffect, useState } from 'react';
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
        display: 'Semana 1'
    },
    {
        num: 2,
        display: 'Semana 2'
    },
    {
        num: 3,
        display: 'Semana 3'
    },
    {
        num: 4,
        display: 'Semana 4'
    },
    {
        num: 5,
        display: 'Semana 5'
    },
    {
        num: 6,
        display: 'Semana 6'
    },
    {
        num: 7,
        display: 'Semana 7'
    },
    {
        num: 8,
        display: 'Semana 8'
    },
    {
        num: 9,
        display: 'Semana 9'
    },
    {
        num: 10,
        display: 'Semana 10'
    },
    {
        num: 11,
        display: 'Semana 11'
    },
    {
        num: 12,
        display: 'Semana 12'
    },
    {
        num: 13,
        display: 'Semana 13'
    },
    {
        num: 14,
        display: 'Semana 14'
    },
    {
        num: 15,
        display: 'Semana 15'
    },
    {
        num: 16,
        display: 'Semana 16'
    },
    {
        num: 17,
        display: 'Semana 17'
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
        display: 'Super Bowl'
    }
];

type TProps = {
    initialWeek?: null | number;
    onClick: (week: number) => void;
    routeTo: (week: number) => string;
};

const WeekPagination = ({
    initialWeek = null,
    onClick,
    routeTo
}: TProps) => {
    const [controlledWeek, setControlledWeek] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<TWeek | null>(null);
    const currentWeek = useSelector(selectCurrentWeek);

    useEffect(() => {
        if (controlledWeek !== null) {
            return;
        }

        if (initialWeek === null) {
            setControlledWeek(currentWeek);
        } else {
            setControlledWeek(initialWeek);
        }
    }, [controlledWeek, currentWeek, initialWeek]);

    useEffect(() => {
        const newPage = weeksMock.find((week) => week.num === controlledWeek);
        if (newPage !== undefined) {
            setCurrentPage(newPage);
        }
    }, [controlledWeek]);

    const onWeekClick = (weekNum: number) => {
        setControlledWeek(weekNum);
        onClick(weekNum);
    };

    const pageRange = isMobile ? 2 : 4;
    const leftWeeks: TWeek[] = [];
    const rightWeeks: TWeek[] = [];

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
            spansToReturn.push(<span className={isMobile ? styles.ghostPageMobile : styles.ghostPageStandard}>&nbsp;</span>);
        }

        return spansToReturn;
    };

    const containerClass = classNames({
        [styles.paginationContainerStandard]: !isMobile,
        [styles.paginationContainerMobile]: isMobile
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
        <div className={styles.container}>
            {isMobile && <div className={styles.weekTitle}>Semana</div>}
            <div className={containerClass}>
                <div className={neighbourPagesClass}>
                    {leftWeeks.length < pageRange && renderEmptySpans(pageRange - leftWeeks.length)}
                    {leftWeeks.map((week) => (
                        <Link
                            key={week.num}
                            className={pageClass}
                            to={routeTo(week.num)}
                            onClick={() => onWeekClick(week.num)}
                        >
                            {week.num}
                        </Link>
                    ))}
                </div>
                <div className={styles.currentPage}>
                    <Link
                        key={currentPage.num}
                        to={routeTo(currentPage.num)}
                        onClick={() => onWeekClick(currentPage.num)}
                    >
                        {isMobile ? currentPage.num : currentPage.display}
                    </Link>
                </div>
                <div className={neighbourPagesClass}>
                    {rightWeeks.map((week) => (
                        <Link
                            key={week.num}
                            className={pageClass}
                            to={routeTo(week.num)}
                            onClick={() => onWeekClick(week.num)}
                        >
                            {week.num}
                        </Link>
                    ))}
                    {rightWeeks.length < pageRange && renderEmptySpans(pageRange - rightWeeks.length)}
                </div>
            </div>
        </div>
    );
};

export default WeekPagination;