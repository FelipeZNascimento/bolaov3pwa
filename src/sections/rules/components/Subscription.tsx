import styles from 'sections/rules/styles.module.scss';

const Subscription = () => {
  return (
    <div className={styles.internalRules}>
      <h3 className={styles.highlight}>Inscrição</h3>
      <div className={styles.text}>
        Estão abertas as inscrições para a temporada 2022/2023 do Bolão NFL!
        <br />
        Após fazer o cadastro, sua participação estará condicionada ao pagamento
        da inscrição.
        <br />
        <br />
        Valor: <span className={styles.highlight}>R$50</span>
        <br />
        <br />
        Felipe Zanon do Nascimento - PIX 050.143.229-99
        <br />
        Nelson Gimenez da Motta - PIX 395.825.028-94
        <br />
        <br />
      </div>
    </div>
  );
};

export default Subscription;
