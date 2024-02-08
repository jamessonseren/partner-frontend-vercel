import React from 'react';
import styles from './mobileScreen.module.css'

export type MobileProps = {
    business_name: string
    presentationTitle: string
    name: string
    email: string
    otherField: string
}

const MobilePreviewPage = (data: MobileProps) => {
  return (
    <div className={styles.container}>
      {/* Aqui você pode exibir os dados inseridos pelo usuário */}
      <div style={{ padding: '20px' }}>
        <h2>Informações do Painel Administrativo</h2>
        <p>Nome: {data.name}</p>
        <p>Email: {data.email}</p>
        <p>Outros campos: {data.otherField}</p>
        {/* Adicione mais campos conforme necessário */}
      </div>
    </div>
  );
};

export default MobilePreviewPage;
