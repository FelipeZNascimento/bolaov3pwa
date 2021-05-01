import React from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from "react-device-detect";
import classNames from 'classnames';

import styles from './largeButtons.module.scss';

type TProps = {
    description?: string;
    disabled?: boolean;
    display: string;
    route: string;
}

const LargeButton = ({
    description,
    disabled = false,
    display,
    route
}: TProps) => {
    const buttonClass = classNames({
        [styles.containerMobile]: isMobile,
        [styles.containerStandard]: !isMobile,
        [styles.disabled]: disabled
    });

    const renderButtonContent = () => (
        <div className={buttonClass}>
            <p className={styles.title}>{display}</p>
            {description && <p className={styles.description}>{description}</p>}
        </div>
    );

    if (disabled) {
        return renderButtonContent();
    }

    return (
        <Link to={route}>
            {renderButtonContent()}
        </Link>
    )
};

export default LargeButton;