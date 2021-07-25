// Components
import { LinearProgress as MUILinearProgress } from '@material-ui/core';

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
};

const LinearProgress = ({
    progress
}: TProps) => {
    return (
        <div className={styles.container}>
            <CustomLinearProgress variant="determinate" value={progress} />
        </div>
    )
};

export default LinearProgress;