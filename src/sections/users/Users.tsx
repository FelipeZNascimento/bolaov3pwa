import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { isMobile } from 'react-device-detect';

// Selectors
import { selectCurrentWeek } from 'store/app/selector';

// Components
import { Ranking, WeekSelector } from 'components_fa/index';
import { Loading } from '@omegafox/components';

import styles from './styles.module.scss';
import ROUTES from 'constants/routes';
import logo from 'img/favicon.png';

const Users = () => {
  const [blockLoading, setBlockLoading] = useState<boolean>(false);
  const { userId } = useParams<{ userId: string }>();
  const currentWeek = useSelector(selectCurrentWeek);

  const onWeekClick = () => {
    setBlockLoading(true);
  };

  const renderRanking = () => {
    if (isMobile) {
      return null;
    }

    return <Ranking />;
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <WeekSelector
          routeTo={(weekNum) => ROUTES.USERS.urlWithParams(userId, weekNum)}
          onClick={onWeekClick}
        />
        <p>{userId}</p>
        <p>{currentWeek}</p>
        <div className={styles.matchesContainer}>
          {blockLoading && <Loading isOverlay image={logo} style="headbutt" />}
        </div>
      </div>
      {renderRanking()}
    </div>
  );
};

export default Users;
