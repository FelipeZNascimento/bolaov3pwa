import React from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from "react-device-detect";
import classNames from 'classnames';

import styles from './largeButton.module.scss';

type TProps = {
    description?: string;
    disabled?: boolean;
    display: string;
    route?: string;
    onClick?: null | (() => void);
}

const LargeButton = ({
    description,
    disabled = false,
    display,
    route = '',
    onClick = null
}: TProps) => {
    const buttonClass = classNames({
        [styles.containerMobile]: isMobile,
        [styles.containerStandard]: !isMobile,
        [styles.disabled]: disabled
    });

    const renderButtonContent = () => (
        <div className={buttonClass} onClick={onClick !== null ? onClick : () => null}>
            <h1>{display}</h1>
            {description && <h3>{description}</h3>}
        </div>
    );

    if (disabled || route === '') {
        return renderButtonContent();
    }

    return (
        <Link to={route}>
            {renderButtonContent()}
        </Link>
    )
};

export default LargeButton;