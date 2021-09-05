import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { isMobile } from "react-device-detect";

import {
    SwipeableDrawer as Drawer,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { TMenuOption } from 'components/commonTypes';

import logo from 'img/favicon.png';
import styles from './LeftDrawer.module.scss';
import ROUTES from 'constants/routes';

const CustomDrawer = withStyles({
    root: {
        '& .MuiDrawer-paper': {
            backgroundColor: '#1b2f42',
        }
    }
})(Drawer);

type TProps = {
    isOpen: boolean;
    toggle: (flag: boolean) => void;
    options: TMenuOption[];
};

const LeftDrawer = ({
    isOpen,
    toggle,
    options
}: TProps) => {
    const { pathname } = useLocation();

    const renderButton = (item: TMenuOption) => {
        const buttonClass = classNames(
            [styles.button], {
            [styles.buttonSelected]: pathname !== '/' ? pathname.includes(item.route) : pathname === item.route,
            [styles.buttonDisabled]: item.disabled,
        });

        const renderButtonContent = () => (
            <div key={item.id} className={buttonClass} onClick={() => toggle(false)}>
                {item.display === ROUTES.HOME.display && !isMobile
                    && <img className={styles.image} alt="logo" src={logo} />}
                {item.display}
            </div>
        );

        if (item.disabled) {
            return renderButtonContent();
        }

        return (
            <Link key={item.id} to={item.route}>
                {renderButtonContent()}
            </Link>
        );
    };

    return (
        <CustomDrawer
            anchor='left'
            open={isOpen}
            onClose={() => toggle(false)}
            onOpen={() => toggle(true)}
        >
            <div className={styles.buttonSection}>
                <div className={styles.logoContainer}>
                    <img alt="logo" src={logo} />
                </div>
                {options.map((option) => renderButton(option))}
            </div>
        </CustomDrawer>
    )
}

export default LeftDrawer;