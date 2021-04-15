import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

// import { Loading } from 'components/index'
import styles from './Bets.module.scss';
import ROUTES from 'constants/routes';

const Bets = () => {
    const { season, week } = useParams<{ season: string, week: string }>();
    useEffect(() => {
        console.log(season);
        console.log(week);
    }, [season, week]);

    return (
        <div className={styles.container}>
            <div>
                <p>Season: {season}</p>
                <p>Week: {week}</p>
                <Link to={ROUTES.BETS.urlWithParams(8, 8)}>Season 8</Link>
            </div>
            <div>
                Ranking
            </div>
        </div>
    );
};

export default Bets;
