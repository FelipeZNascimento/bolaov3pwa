import styles from 'sections/rules/styles.module.scss';

const Prize = () => {
  return (
    <div className={styles.internalRules}>
      <h2 className={styles.highlight}>Premiação</h2>
      <div className={styles.text}>
        Do valor total recolhido das inscrições,{' '}
        <span className={styles.highlight}>10%</span> será revertido ao
        pagamento de custos de manutenção do portal de apostas (servidor,
        domínio, etc..).
        <br />O restante (<span className={styles.highlight}>90%</span>) será
        divido entre os melhores colocados no ranking geral após o Super Bowl,
        segundo as seguintes porcentagens:
      </div>
      <div className={styles.internalRulesTable}>
        <div className={styles.internalRulesTableLine}>
          <div className={styles.left}>1º lugar</div>
          <div className={styles.right}>
            <span className="color-gold">50%</span>
          </div>
        </div>
        <div className={styles.internalRulesTableLine}>
          <div className={styles.left}>2º lugar</div>
          <div className={styles.right}>
            <span className="color-grey1">20%</span>
          </div>
        </div>
        <div className={styles.internalRulesTableLine}>
          <div className={styles.left}>3º lugar</div>
          <div className={styles.right}>
            <span className="color-grey2">15%</span>
          </div>
        </div>
        <div className={styles.internalRulesTableLine}>
          <div className={styles.left}>4º lugar</div>
          <div className={styles.right}>
            <span className="color-grey3">10%</span>
          </div>
        </div>
        <div className={styles.internalRulesTableLine}>
          <div className={styles.left}>5º lugar</div>
          <div className={styles.right}>
            <span className="color-grey4">5%</span>
          </div>
        </div>
      </div>
      <br />
      <div className={styles.text}>
        O jogador com maior{' '}
        <span className={styles.highlight}>número de pontos</span> será o
        vencedor.
        <br />
        Em caso de empate, os seguintes critérios são adotados, em ordem:
      </div>
      <br />
      <div className={styles.internalRulesTable}>
        <h2 className={styles.highlight}>Critérios de Desempate</h2>
        <div className={styles.internalRulesTableLine}>
          <div className={styles.left}>
            <span className={`${styles.highlight} color-mint`}>
              Acertos completos
            </span>{' '}
            (na mosca)
          </div>
        </div>
        <div className={styles.internalRulesTableLine}>
          <div className={styles.left}>
            <span className={`${styles.highlight} color-blue`}>
              Acertos parciais
            </span>{' '}
            (no vencedor)
          </div>
        </div>
        <div className={styles.internalRulesTableLine}>
          <div className={styles.left}>
            Número de semanas vencidas durante a temporada
          </div>
        </div>
        <div className={styles.internalRulesTableLine}>
          <div className={styles.left}>Sorteio</div>
        </div>
      </div>
      <br />
      <h2 className={styles.highlight}>Cashback Semanal</h2>
      <div className={styles.text}>
        O vencedor de cada semana da temporada regular ganha um crédito de{' '}
        <span className={styles.highlight}>R$5</span> para a inscrição na
        próxima temporada do bolão NFL.
      </div>
    </div>
  );
};

export default Prize;
