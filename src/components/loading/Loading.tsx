import React from 'react';
import logo from 'img/favicon.png';

import styles from './Loading.module.scss';

const Loading = () => {
    return (
        <div className={styles.container}>
            <img className={styles.image} alt="logo" src={logo} />
            <p className="padding-none margin-none">Carregando...</p>
        </div>
    );
}

export default Loading;
