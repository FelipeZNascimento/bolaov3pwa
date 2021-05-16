import React from 'react';
import classNames from 'classnames';

import {
    Button as MaterialUiButton,
    Tooltip
} from '@material-ui/core';

import styles from './Button.module.scss';

type TProps = {
    color?: string;
    disabled?: boolean;
    startIcon?: React.ReactNode;
    text?: string;
    tooltip?: string;
    onClick: () => void;
};

const Button = ({
    color = 'default',
    disabled = false,
    startIcon = null,
    text = '',
    tooltip = '',
    onClick
}: TProps) => {
    const buttonClass = classNames(
        [styles.button], {
        [styles.blue]: color === 'blue',
        [styles.default]: color === 'default',
        [styles.green]: color === 'green',
        [styles.grey]: color === 'grey',
        [styles.orange]: color === 'orange',
        [styles.red]: color === 'red',
        [styles.disabled]: disabled
    });

    const renderIcon = () => {
        if (startIcon) {
            return (
                <div className={styles.icon}>
                    {startIcon}
                </div>
            );
        }

        return null;
    };

    const renderText = () => {
        if (text) {
            return (
                <div className={styles.text}>
                    {text}
                </div>
            );
        }
        return null;
    };

    const renderButton = () => {
        return (
            <MaterialUiButton
                classes={{ root: buttonClass }}
                disabled={disabled}
                variant="contained"
                onClick={onClick}
                size='small'
            >
                <div className={styles.container}>
                    {renderIcon()}
                    {renderText()}
                </div>
            </MaterialUiButton>
        );
    }

    if (tooltip !== '') {
        return (
            <Tooltip title={tooltip} arrow>
                {renderButton()}
            </Tooltip>
        );
    }

    return renderButton();
};

export default Button;