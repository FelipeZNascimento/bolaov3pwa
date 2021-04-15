import React from 'react';
import { Link } from 'react-router-dom';

import styles from './WeekPagination.module.scss';

const weeksMock = [
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
    routeTo: (week: number) => string;
};

const WeekPagination = ({
    routeTo
}: TProps) => {
    return (
        <div className={styles.container}>
            {weeksMock.map((week) => <Link to={routeTo(week.num)}>{week.display}</Link>)}
        </div>
    );
};

export default WeekPagination;