import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Color, ColorPicker } from 'material-ui-color';

import classNames from 'classnames';

// Actions
import {
    onUpdateUserPreferences
} from 'store/user/actions';

import {
    Icon,
    Tooltip
} from '@material-ui/core';

import {
    TUser
} from 'store/user/types';
import styles from './styles.module.scss';
import faIconsList from 'services/font-awesome';

type TProps = {
    loggedUser: TUser | null
};

const Preferences = ({
    loggedUser
}: TProps) => {
    const [color, setColor] = useState<string>('#000');
    const [icon, setIcon] = useState<string>('#000');

    const dispatch = useDispatch();

    useEffect(() => {
        if (loggedUser) {
            setColor(loggedUser.color)
            setIcon(loggedUser.icon)
        }
    }, [loggedUser]);

    const onSetColor = (newColor: Color) => {
        setColor(`#${newColor.hex}`);
        dispatch(onUpdateUserPreferences(icon, `#${newColor.hex}`));

    };

    const onSetIcon = (newIcon: string) => {
        setIcon(newIcon);
        dispatch(onUpdateUserPreferences(newIcon, color));
    };

    return (
        <div className={styles.container}>
            <div className={styles.colorContainer}>
                <div>
                    <Icon className={`${icon}`} style={{ color: color }} />
                </div>
                <div>
                    <ColorPicker
                        deferred
                        disableAlpha
                        hideTextfield
                        value={color}
                        onChange={onSetColor}
                    />
                </div>
            </div>
            <div className={styles.iconsContainer} >
                {faIconsList.map((iconName, index) => {
                    const iconClass = classNames(
                        [styles.icon], {
                        [styles.iconSelected]: iconName === loggedUser?.icon
                    });

                    return (
                        <Tooltip title={iconName} arrow>
                            <div className={iconClass} onClick={() => onSetIcon(iconName)}>
                                <Icon className={`${iconName}`} style={{ color: color }} />
                            </div>
                        </Tooltip>
                    )
                })}
            </div>
        </div>
    )
};

export default Preferences;