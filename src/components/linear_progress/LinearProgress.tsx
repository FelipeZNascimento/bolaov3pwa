import { isMobile } from 'react-device-detect';

// Components
import { Icon, LinearProgress as MUILinearProgress } from '@mui/material';

import { withStyles } from '@mui/styles';
import styles from './LinearProgress.module.scss';

const CustomLinearProgress = withStyles({
  root: {
    height: 2,
    backgroundColor: '#36424d'
  },
  bar: {
    backgroundColor: '#9da4a7'
  }
})(MUILinearProgress);

type TProps = {
  progress: number;
  onUpdate: () => void;
};

const LinearProgress = ({ progress, onUpdate }: TProps) => {
  return (
    <div className={styles.container}>
      <CustomLinearProgress variant="determinate" value={progress} />
      {!isMobile && (
        <div className={styles.refreshHoverContainer}>
          <div className={styles.refreshButton} onClick={onUpdate}>
            <Icon
              className={styles.refreshIcon}
              fontSize="small"
              classes={{ root: 'fas fa-sync' }}
            />
            &nbsp;Atualizar
          </div>
          <Icon
            className={styles.arrowIcon}
            fontSize="inherit"
            classes={{ root: 'fas fa-chevron-down' }}
          />
        </div>
      )}
    </div>
  );
};

export default LinearProgress;
