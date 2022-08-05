import ROUTES from 'constants/routes';
import { Link } from 'react-router-dom';

import { DateTime } from 'luxon';
import styles from 'sections/rules/styles.module.scss';

const Extras = () => {
  return (
    <div className={styles.internalRules}>
      <h3 className={styles.highlight}>Apostas Extras</h3>
      <div className={styles.text}>
        Apostas específicas sobre o campeão de cada divisão, de cada conferência
        e o vencedor do Super Bowl.
        <br />
        Essas apostas ficarão habilitadas até{' '}
        <b>
          {DateTime.fromSeconds(1662682800)
            .setLocale('pt-Br')
            .toFormat("EEE dd/LL, HH'h'mm")}
        </b>
        .<br />
        <br />
        <Link to={ROUTES.EXTRAS.url}>Clique aqui</Link> para fazer suas apostas
        extras.
        <br />
        <br />
      </div>
      <div className={styles.internalRulesTable}>
        <h2 className={styles.highlight}>Pontuações - Extras</h2>
        <div className={styles.internalRulesTableLine}>
          <div className={styles.left}>Wild Card</div>
          <div className={styles.right}>
            <span className="color-purple">10</span> pontos
          </div>
        </div>
        <div className={styles.internalRulesTableLine}>
          <div className={styles.left}>Campeão de Divisão</div>
          <div className={styles.right}>
            <span className="color-purple">20</span> pontos
          </div>
        </div>
        <div className={styles.internalRulesTableLine}>
          <div className={styles.left}>Campeão de Conferência</div>
          <div className={styles.right}>
            <span className="color-purple">50</span> pontos
          </div>
        </div>
        <div className={styles.internalRulesTableLine}>
          <div className={styles.left}>Vencedor Super Bowl</div>
          <div className={styles.right}>
            <span className="color-purple">100</span> pontos
          </div>
        </div>
      </div>
      <p>Os pontos serão computados após cada categoria ser decidida.</p>
    </div>
  );
};

export default Extras;
