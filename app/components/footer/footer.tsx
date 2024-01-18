import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>SysCorrect</div>
      <div className={styles.text}>© Todos os direitos reservados.</div>
    </div>
  );
};

export default Footer;