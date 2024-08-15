import { isMobile } from 'react-device-detect';
import classNames from 'classnames';
import { withStyles } from '@mui/styles';

// Components
import { LinearProgress as MUILinearProgress } from '@mui/material';

import styles from './StatusComponent.module.scss';

const CustomLinearProgress = withStyles({
  root: {
    height: '100%',
    backgroundColor: '#36424d'
  },
  bar: {
    backgroundColor: '#9da4a7'
  }
})(MUILinearProgress);

type TProps = {
  progress?: null | number;
  content: () => React.ReactNode;
};

const StatusComponent = ({ progress = null, content }: TProps) => {
  const statusComponentClass = classNames(styles.statusComponent, {
    [styles.statusComponentMobile]: isMobile
  });

  const barBgColorClass = classNames({
    [styles.barColorEmpty]: progress !== null && progress === 0
  });

  const barColorClass = classNames({
    [styles.barColorEmpty]: progress !== null && progress < 50,
    [styles.barColorQuarter]:
      progress !== null && progress >= 50 && progress < 75,
    [styles.barColorHalf]:
      progress !== null && progress >= 75 && progress < 100,
    [styles.barColorFull]: progress !== null && progress === 100
  });

  return (
    <div className={statusComponentClass}>
      <div className={styles.statusComponentText}>{content()}</div>
      {progress !== null && (
        <div className={styles.barContainer}>
          <CustomLinearProgress
            classes={{ root: barBgColorClass, bar: barColorClass }}
            variant="determinate"
            value={progress}
          />
        </div>
      )}
    </div>
  );
};

export default StatusComponent;
