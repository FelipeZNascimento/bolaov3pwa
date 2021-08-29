// Components
import {
    Icon,
    LinearProgress as MUILinearProgress
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import styles from './LinearProgress.module.scss';

const CustomLinearProgress = withStyles({
    root: {
        height: 2,
        backgroundColor: '#36424d',
    },
    bar: {
        backgroundColor: '#9da4a7'
    }
})(MUILinearProgress);

type TProps = {
    progress: number;
    onUpdate: () => void;
};

const LinearProgress = ({
    progress,
    onUpdate
}: TProps) => {
    return (
        <div className={styles.container}>
            <CustomLinearProgress variant="determinate" value={progress} />
            <div className={styles.refreshButton} onClick={onUpdate}>
                <Icon className={styles.refreshIcon} fontSize="small" classes={{ root: 'fas fa-sync color-grey2' }} />
                &nbsp;Atualizar
            </div>
        </div>
    )
};

export default LinearProgress;