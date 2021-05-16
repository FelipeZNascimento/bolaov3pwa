import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { isMobile } from "react-device-detect";
import { Color, ColorPicker } from 'material-ui-color';

// Actions
import {
    onUpdateUserPreferences
} from 'store/user/actions';

import {
    Icon,
    Tooltip
} from '@material-ui/core';
import { CustomButton } from 'components/index';

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
    const [iconPage, setIconPage] = useState<number>(0);

    const dispatch = useDispatch();
    const iconsPerPage = isMobile ? 30 : 50;
    const maxPage = Math.floor(faIconsList.length / iconsPerPage);

    useEffect(() => {
        if (loggedUser) {
            setColor(loggedUser.color)
            setIcon(loggedUser.icon)
        }
    }, [loggedUser]);

    // const dispatch = useDispatch();
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
                    if (index >= (iconPage * iconsPerPage) && index < ((iconPage + 1) * iconsPerPage)) {
                        return (
                            <Tooltip title={iconName} arrow>
                                <div className={styles.icon} onClick={() => onSetIcon(iconName)}>
                                    <Icon className={`${iconName}`} style={{ color: color }} />
                                </div>
                            </Tooltip>
                        )
                    }
                    return null;
                })}
            </div>
            <div className={styles.colorContainer}>
                <CustomButton
                    text='Anterior'
                    onClick={() => iconPage > 0 && setIconPage(iconPage - 1)}
                />
                &nbsp;
                <CustomButton
                    text='Próximo'
                    onClick={() => iconPage <= maxPage && setIconPage(iconPage + 1)}
                />
            </div>
            <p className='align-center padding-none margin-none'>{iconPage + 1} / {maxPage + 1}</p>
        </div>
    )
};

export default Preferences;