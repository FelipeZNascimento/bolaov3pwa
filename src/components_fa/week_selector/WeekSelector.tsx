import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isMobile } from "react-device-detect";
import classNames from 'classnames';

// Components
import Dropdown from 'components/dropdown/Dropdown';

// Selectors
import { selectCurrentWeek } from 'store/app/selector';

import { WEEKS } from 'constants/weeks';
import { TWeek } from 'components_fa/commonTypes';
import styles from './WeekSelector.module.scss';

type TProps = {
    initialWeek?: null | number;
    onClick: (week: number) => void;
    routeTo: (week: number) => string;
};

const WeekSelector = ({
    initialWeek = null,
    onClick,
    routeTo
}: TProps) => {
    const [controlledWeek, setControlledWeek] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<TWeek | null>(null);
    const currentWeek = useSelector(selectCurrentWeek);
    const history = useHistory();

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
        const newPage = WEEKS.find((week) => week.num === controlledWeek);
        if (newPage !== undefined) {
            setCurrentPage(newPage);
        }
    }, [controlledWeek]);

    const onWeekClick = (weekNum: number) => {
        setControlledWeek(weekNum);
        onClick(weekNum);
    };

    const onDropdownClick = (weekNum: number) => {
        onWeekClick(weekNum);
        history.push(routeTo(weekNum));
    }

    const pageRange = isMobile ? 2 : 4;
    const leftWeeks: TWeek[] = [];
    const rightWeeks: TWeek[] = [];

    if (!currentPage) {
        return null;
    }

    WEEKS.forEach((week) => {
        if (week.hidden) {
            return;
        }

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
            {isMobile && <br />}
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
                            {week.displayShort}
                        </Link>
                    ))}
                </div>
                <div className={styles.currentPage}>
                    <Dropdown
                        currentValue={currentPage.num}
                        label='Semana'
                        options={WEEKS}
                        onChange={onDropdownClick}
                    />
                </div>
                <div className={neighbourPagesClass}>
                    {rightWeeks.map((week) => (
                        <Link
                            key={week.num}
                            className={pageClass}
                            to={routeTo(week.num)}
                            onClick={() => onWeekClick(week.num)}
                        >
                            {week.displayShort}
                        </Link>
                    ))}
                    {rightWeeks.length < pageRange && renderEmptySpans(pageRange - rightWeeks.length)}
                </div>
            </div>
        </div>
    );
};

export default WeekSelector;