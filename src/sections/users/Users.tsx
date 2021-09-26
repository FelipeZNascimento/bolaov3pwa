import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { isMobile } from "react-device-detect";

// Actions
import { setCurrentWeek } from 'store/app/actions';

// Selectors
// import { selectIsLoading, selectMatches } from 'store/matches/selector';
import { selectCurrentWeek } from 'store/app/selector';

// Components
import { Loading, Ranking, WeekSelector } from 'components_fa/index';

import styles from './styles.module.scss';
import ROUTES from 'constants/routes';

const Users = () => {
    const [blockLoading, setBlockLoading] = useState<boolean>(false);
    const { userId } = useParams<{ userId: string }>();
    const currentWeek = useSelector(selectCurrentWeek);
    const dispatch = useDispatch();

    const onWeekClick = (newWeek: number) => {
        dispatch(setCurrentWeek(newWeek));
        setBlockLoading(true);
    };

    const renderRanking = () => {
        if (isMobile) {
            return null
        };

        return <Ranking />;
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <WeekSelector routeTo={(weekNum) => ROUTES.USERS.urlWithParams(userId, weekNum)} onClick={onWeekClick} />
                <p>{userId}</p>
                <p>{currentWeek}</p>
                <div className={styles.matchesContainer}>
                    {blockLoading && <Loading overlay />}
                    {/* {renderMatches()} */}
                </div>
            </div>
            {renderRanking()}
        </div>
    );
}

export default Users;