import React from 'react';
import classNames from 'classnames';

import logo from 'img/favicon.png';
import styles from './Loading.module.scss';

type TProps = {
    size?: 'small' | 'regular'
};

const Loading = ({
    size = 'regular'
}: TProps) => {
    const containerClass = classNames({
        [styles.containerRegular]: size === 'regular',
        [styles.container]: size === 'small',
    });

    const imageClass = classNames({
        [styles.imageRegular]: size === 'regular',
        [styles.imageSmall]: size === 'small',
    });

    return (
        <div className={containerClass}>
            <img className={imageClass} alt="logo" src={logo} />
            {size === 'regular' && <p className="padding-none margin-none">Carregando...</p>}
        </div>
    );
}

export default Loading;
