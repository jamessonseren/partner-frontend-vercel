'use client'

import Card from '../../card/card'
import style from './contractList.module.css'

type Contract = {
    uuid: string
    business_info_uuid: string
    contract_info_uuid: string
    ContractInfo: {
        name: string | null
        content: string
    }
}
type ContractListProps = {
    contracts: Contract[]
}

export const ContractList = ({ contracts }: ContractListProps) => {

    function downloadContract(content: string) {
        const win = window.open('', '', 'height=700, width=700');

        if (win) {
            win.document.write('<html><head>');
            win.document.write('<title>Contrato SysCorrect</title>');
            win.document.write('</head><body>');
            win.document.write(content); // Utilize o parâmetro content aqui
            win.document.write('</body></html>');
            win.print();
        }
    }

    return (
        <div className={style.container}>
            <h1>Contratos</h1>
            <label>Total de contratos: {contracts.length}</label>
            <ul className={style.contractList}>
                {contracts.map((contract) => (

                    <div key={contract.uuid} onClick={() => downloadContract(contract?.ContractInfo.content)}>
                        <Card
                            title={contract.ContractInfo.name ? contract.ContractInfo.name : 'Contrato'}
                            mainText=""
                            secondText='Clique aqui para baixar'
                        />
                    </div>
                    
                ))}
            </ul>
        </div>
    )
}