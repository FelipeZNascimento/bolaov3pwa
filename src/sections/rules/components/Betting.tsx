import ROUTES from 'constants/routes';
import { Link } from 'react-router-dom';

import styles from 'sections/rules/styles.module.scss';

const Betting = () => {
    return (
        <div className={styles.internalRules}>
            <h3 className={styles.highlight}>Apostas</h3>
            <div className={styles.text}>

                As apostas poderão ser feitas até o kickoff de cada jogo. O bloqueio será automático. <br />
                <Link to={ROUTES.BETS.url}>Clique aqui</Link> para fazer suas apostas.<br /><br />

                <span className={styles.highlight}>Importante!</span><br />
                Caso esteja sem acesso a internet ou não consiga acessar o portal, apostas por e-mail serão aceitas.<br />
                <a href="mailto:felipe@omegafox.me">felipe@omegafox.me</a>
            </div>
        </div>
    );
};

export default Betting;