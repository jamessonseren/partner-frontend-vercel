'use client'

import { useEffect, useState } from 'react'
import styles from '../../components/contractText/contractText.module.css'
import { toast } from 'react-toastify'
import { ModalContractConfirmation } from './modalContractConfirmation/modalContractConfirmation'
import { useRef } from 'react';

type ContractType = {
    admin_name: string | null
    fantasy_name: string
    document: string
    line1: string
    line2: string
    line3: string | null
    neighborhood: string
    city: string
    state: string
    country: string
    postal_code: string

}

const ContractComponent = (props: ContractType) => {
    const [confirmContract, setConfirmContract] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [contractContent, setContractContent] = useState('')

    const contractRef = useRef<HTMLDivElement>(null);


    function signContract() {
        if (!confirmContract) {
            toast.warn("Você deve confirmar que leu e concorda com o contrato")
            return
        }
        setIsVisible(!isVisible)
    }

    const currentDate = new Date();
    const day = Number(currentDate.getDate());
    const month = currentDate.getMonth() + 1; // Adicionamos 1 pois os meses são indexados de 0 a 11
    const year = currentDate.getFullYear();

    const addLeadingZero = (number: number) => {
        return number < 10 ? `0${number}` : number;
    }

    const adjustedDay = addLeadingZero(day);
    const adjustedMonth = addLeadingZero(month);

    useEffect(() => {
        const element = contractRef.current;

        if (element) {
            setContractContent(element.innerHTML)
        }
    }, [])
   


    return (
        <div className={styles.container}>

            <ModalContractConfirmation visible={isVisible} onClose={signContract} contract_name='' contract_content={contractContent} contract_version='v1.0.0' />
            <div className={`${styles.contract} ${isVisible ? styles.invalid : ''}`} ref={contractRef}>
                <h1>CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE SISTEMA DE MEIOS DE PAGAMENTOS E CONVÊNIOS</h1>
                <br />
                <div className={styles.top} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        Bandeira: <strong>CORRECT</strong>
                    </div>
                    <div>
                        N. Contrato: <strong>51891531894</strong>
                    </div>
                </div>
                <br />
                <br />
                <p>
                    De um lado, {props.fantasy_name}, CNPJ ({props.document}) situada na {props.line1}, bairro {props.neighborhood}, {props.city}, {props.state}, representada por Clara Alves,
                    simplesmente denominada <strong>"Comércio"</strong>.

                    <br />
                    <br />
                    De outro lado, a Correct Administração de Convênios e Benefícios e Meios de Pagamentos Ltda., CNPJ 32.275.282/0001-26, situada na <strong>(rua xxxxxxxxxxxxxxxxx), (número xxx), (bairro xxxxxxxxx),</strong> Campo Grande, MS,
                    representada por <strong>Elaine Telles Mathiazo,</strong> diretora, simplesmente denominada <strong>“Correct”.</strong>
                    <br />
                    <br />
                    Têm justos e contratados, com base nas informações determinadas a seguir:
                </p>
                <br />
                <h3><strong>A. Conceitos:</strong></h3>
                <br />
                <p>
                    <strong>Mega APP Correct:</strong><br />
                    Aplicativo com conceito inovador tecnológico, que permite qualquer Usuário ter na palma de sua mão, multibenefícios e multivantagens, além de permitir operações financeiras e de controle.
                    <br />
                    <br />
                    <strong>SISCORRECT - Plataforma Comércio:</strong> syscorrectcom.correct.com.br<br />
                    Sistema de Autogestão dos processos operacionais, permitindo o controle de todos os procedimentos em relação à aceitação dos Cartões Virtuais Correct.
                    <br />
                    <br />
                    <strong>Conta Correct</strong>:<br />
                    Criada no ato da assinatura deste contrato, para facilitar o controle e movimentações financeiras, geradas pelas operações com os Cartões Virtuais da Correct.
                    <br />
                    <br />
                    <strong>TEI Transações Eletrônicas Inteligentes:</strong><br />
                    Módulo tecnológico de controle das operações financeiras (Módulo do Siscorrect), que permite transações real-time.
                    <br />
                    <br />
                    <strong>Produtos Pós-Pagos:</strong><br />
                    Cartões virtuais de benefícios Correct, que geram créditos a receber, com data programada para recebimento, que podem ser antecipados, sem custos, através do Cartão Virtual Correct Business, que será disponibilizado na assinatura deste contrato. Os valores a receber, são de origem de desconto em Folha de Pagamento, motivo que caracterizam pós-pagos.
                    <br />
                    <br />
                    <strong>Produtos Pré-Pagos:</strong><br />
                    Cartões virtuais de benefícios Correct, que caracterizam débito, com recebimento no ato da compra.
                    <br />
                    <br />
                    <strong>Produtos Especiais:</strong><br />
                    Cartões virtuais de benefícios Correct, que caracterizam débito, específicos para Programas e Assistências, criados para atender necessidades cotidiana de seus Usuários.
                    <br />
                    <br />
                    <strong>Correct Club:</strong><br />
                    Clube de Multivantagens e Multibenefícios, criado que oferece benefícios específicos aos Usuários do Mega APP Correct, tais como: descontos especiais, ganho de “Cashback” em todas as compras, participação em sorteios e muito mais, onde o Comercio participa ativamente.
                    <br />
                    <br />
                    <strong>Marketplace:</strong><br />
                    A Correct disponibiliza a ferramenta que possibilita a venda por Delivery ou E-commerce, objetivando o aumento e facilidade das vendas, podendo ainda, ser responsável por todas entregas as entregas, sejam elas locais, nacionais ou mesmo internacionais. (opcional)
                    <br />
                    <br />
                    <strong>Vitrine:</strong><br />
                    Ferramenta do Mega APP Correct, onde será apresentado os produtos ou serviços que o Comércio oferece aos Usuários, para possibilidade de compra por Delivery, E-commerce ou mesmo para venda presencial.

                    <br />
                    <br />
                    <strong>Cartão Virtual Correct Business:</strong><br />
                    Criado para os Parceiros que possuem "créditos a receber", originados pelas vendas com Cartões de Benefícios Pós pagos, sem taxas de antecipação de crédito e ainda ganha Cashback. Basta utiliza-lo na Rede Correct, a qual já faz parte.                 <br />
                    <br />
                    <strong>Token:</strong><br />
                    Permite o Usuário fazer compras mesmo sem internet, onde o Mega APP Correct irá gerar um código e digito que será validado no Módulo de Vendas.                <br />
                    <br />
                </p>
                <h3><strong>B. Considerações:</strong></h3>
                <br />
                <p className={styles.conceptsText}>
                    <strong>a) Taxa de Administração:</strong><br />
                    É o porcentual definido, que será aplicado no valor de cada compra efetuada pelo Usuário do Mega APP Correct, como forma de pagamento dos serviços prestados pela Correct, que será deduzido quando do repasse do valor da compra ao Comércio, que pode ser a vista ou a prazo, conforme o produto.
                    <br />
                    <br />
                    <strong>b) Taxa de Marketing:</strong><br />
                    Pago somente se a venda for realizada.
                    É o porcentual definido, que será aplicado sobre o valor de cada venda efetuada, para cobrir os custos de orientação, análise e divulgação dos produtos ou serviços oferecidos pelo Comércio, no Mega APP Correct e redes sociais, tendo ainda, como objetivo principal o fomento comercial.
                    <br />
                    <br />
                    <strong>c) Taxa de Marketplace:</strong><br />
                    Pago somente se a venda for realizada.
                    É o porcentual definido, quando da opção da realização das vendas através de Delivery / E-commerce, que será aplicado sobre o valor de cada venda efetuada.
                    <br />
                    <br />
                    <strong>Obs: </strong>
                    Valor da Entrega do(s) produto(s) vendido(s), através destas modalidades, será cobrado do Comprador (valor demonstrado na finalização da compra) e repassado para a Empresa parceira da Correct, que realizar a entrega, quando da confirmação da mesma.                <br />
                    <br />
                    <strong>d) Taxa de Credenciamento: </strong>R$ 100,00 (taxa única)<br />
                    Pago somente se a venda for realizada.
                    É o porcentual definido, quando da opção da realização das vendas através de Delivery / E-commerce, que será aplicado sobre o valor de cada venda efetuada.
                    <br />
                    <br />
                    <strong>e) Forma de Pagamento da Taxa de Credenciamento: </strong>À vista.<br />
                    Pix: xxxxxxxxxxx, deposito ou transferência para conta da Correct: xxxxxxxxxxxxxxxxx (Banco, Agencia, Conta, Favorecido)
                    <br />
                    <br />
                    <strong>f) Recebimento do Repasse: </strong><br />
                    Na conta Correct, aberta quando da assinatura deste contrato, conforme a movimentação de cada produto, definido no item “g”.
                    <br />
                    <br />
                    <strong>g) Ciclo para recebimento: </strong><br />
                    Variável de acordo com o produto da Correct, considerando sempre duas datas: Produtos Pós-pagos sempre dia 25 do mês posterior ao subsequente da data da compra (lembrando que pode antecipar usando o cartão Correct Business) e Produtos Pré-Pagos e Especiais sempre a vista.
                    <br />
                    <br />
                    <strong>h) E-mail de comunicação: </strong><br />
                    É o e-mail definido pelo Comércio como forma de comunicação oficial com a Correct.
                    <br />
                    <br />
                    <strong>i) E-mail de cancelamento de vendas: </strong> cancelavenda@correct.com.br<br />
                    É o e-mail definido pela Correct para o Comércio solicitar eventuais cancelamentos de vendas.
                    <br />
                    <br />
                    <strong>j) Usuário “Master”:  </strong><br />
                    É a pessoa definida pelo Comércio para a gestão através do SISCORRECT – Plataforma Comércio
                    <br />
                    <br />

                    <strong>k) Documentação para o credenciamento: </strong><br />
                    Fotos do Contrato Social com a última alteração;
                    Fotos da Procuração Autenticada (caso o procurador assinar o contrato);
                    Corresponde a documentação necessária para a concretização do credenciamento, após todos os dados cadastrais do Comércio estarem registrados na Plataforma.

                    <br />
                    <br />
                </p>

                <h3>CLÁUSULA PRIMEIRA – Do Objetivo</h3>
                <br />
                <p>
                    O presente contrato tem por objetivo a administração das operações de vendas de bens, produtos ou serviços no Comércio, através da utilização do SISCORRECT – Plataforma Comércio, de propriedade da Correct, para atendimento dos Cartões Virtuais do Mega APP Correct de bandeira Correct.
                </p>
                <br />
                <br />

                <h3>CLÁUSULA SEGUNDA – Das Obrigações da Correct:</h3>
                <br />
                <p>
                    1.	Permitir o acesso do Comércio ao SISCORRECT - Plataforma Comércio, através de senhas, para a administração das operações comerciais e financeiras. <br />
                    2.	Dar o treinamento online se necessário, às pessoas indicadas pelo Comércio, para a perfeita operação do SISCORRECT.<br />
                    3.	Repassar ao Comércio, utilizando o TEI, através de transferência para a Conta Correct do Comércio, conforme dados estabelecidos no item “f”.<br />
                    4.	Divulgar o Comércio no Mega APP Correct, através da Vitrine, para que todos Usuários possam ver e efetuar as compras de seus produtos ou serviços.<br />
                    5.	Disponibilizar as formas de vendas “Delivery e E-commerce”, quando o Comércio optar por estas modalidades.<br />
                    6.	Prestar a assistência necessária ao Comércio, dentro do escopo deste contrato, quando solicitado.<br />
                    7.	Manter o SISCORRECT sempre ativo e atualizado, no Mega APP Correct e em suas Plataformas.<br />

                </p>
                <br />
                <br />
                <h3>CLÁUSULA TERCEIRA - Das Obrigações do Comércio:</h3>
                <br />
                <p>
                    1.	Providenciar os requisitos mínimos para implantação do SISCORRECT – Plataforma Comércio, tais como: Microcomputador, tablet ou celular; Acesso à Internet; manter o pessoal sempre treinado para as operações da Plataforma (venda, divulgação, financeiro, gestão). <br />
                    2.	Providenciar a documentação exigida no item “k” e efetuar o cadastramento na Plataforma. O credenciamento somente poderá ser concluído, após a documentação estar em ordem e aprovada pela Correct, bem como, com a Taxa de Credenciamento paga, conforme definido nos itens “d” e “e”.<br />
                    3.	Manter sempre ativo e atualizado o e-mail de comunicação, determinado no item “h”, assumindo as responsabilidades pelas informações e comunicações enviadas pela Correct.<br />
                    4.	O Cancelamento de vendas somente poderá ser solicitado pelo Usuário “Master”, definido no item “j”, ou alguém que o mesmo determinar. Caso isso aconteça, o Usuário “Master” deverá informar para a Correct, através do e-mail de comunicação, definido no item “h”, o nome completo da pessoa autorizada e cargo que ocupa no Comércio.<br />
                    5.	Todo cancelamento de venda, deverá ser solicitado no máximo até 8 horas da hora da venda, pois a Correct terá o mesmo prazo para efetuar o cancelamento no SYSCORRECT, antes do fechamento da folha de pagamento, para os casos de produtos Pós-Pagos.<br />
                    6.	O Usuário "Master" deve estar sempre atualizado sobre os procedimentos e operações da Plataforma, bem como, manter atualizado as demais pessoas que ele autorizar a operar a Plataforma.<br />
                    7.	Efetuar as vendas aos Usuários do Mega APP Correct, no preço à vista, sem qualquer acréscimo, com as devidas vantagens acordadas e demonstradas na Vitrine, registrando a venda no Módulo Vendas da Plataforma, após registro da referida venda em seu sistema interno. O registro no Módulo de Vendas, também pode ser efetuado quando o Usuário não tiver com a internet conectada, através do Token, onde o Usuário informará apenas um código e digito.<br />
                    8.	Para cada operação de venda, emitir o comprovante da venda para o Usuário.<br />
                    9.	É de inteira responsabilidade do Comércio, os débitos oriundos das transações efetuadas pelo mesmo, quando este verificar qualquer irregularidade no processo de venda, e mesmo assim, efetuar a venda. Quando detectado qualquer suspeita ou irregularidade, contatar imediatamente a Correct, que dará as instruções necessárias.<br />
                    10.	O Comércio por fazer parte do Correct Club, que objetiva o fomento de suas vendas, terá à sua disposição, a divulgação de até 30 produtos ou serviços por vez, com algum tipo de promoção, desconto, ou algo do tipo, e mais 5 Mega Promoções, que terá destaque na Vitrine (Mega Promoção tem que ter no mínimo 25% de desconto do valor original). As divulgações devem seguir as regras estabelecidas na Plataforma.<br />
                    11.	O Comércio pode optar pelas formas de venda “E-commerce ou Delivery”, conforme definido no item “c”, seguindo as regras definidas na Plataforma.<br />
                    12.	As Taxas de Administração e de Marketing serão cobradas no ato do pagamento feito pelo Usuário do Mega APP Correct, conforme definido nos itens “a”, “b”, “f” e “g”.<br />
                    13.	A Taxa de Marketplace será cobrada no ato do pagamento feito pelo Usuário do Mega APP Correct, quando a venda for feita por esta modalidade (Delivery e Marketplace), conforme definido no item “c”.<br />
                    14.	Todos os valores depositados ou transferidos na Conta Correct do Comércio, o mesmo poderá efetuar as operações disponíveis na Plataforma, tais como: pagar boletos, efetuar transferências e outras.<br />

                </p>

                <br />
                <br />

                <h3>CLÁUSULA QUARTA – Das Condições Gerais</h3>
                <br />
                <p>
                    1.	Os pagamentos fora dos prazos convencionados por parte da Correct, estarão sujeitos à incidência de juros moratórios de 1,00 % ao mês, sem prejuízo da atualização monetária, calculados a partir do vencimento da obrigação, até a sua efetiva liquidação, conforme prevê a lei.<br />
                    2.	Este contrato faz parte integrante dos contratos da Correct com os Empregadores, que fornecem benefícios aos seus Colaboradores através dos produtos da Correct.<br />
                    3.	O Comércio ao fechar este contrato, automaticamente se torna associado do Correct Club, podendo usufruir dos benefícios que o Clube oferece, inclusive poder dar benefícios aos seus Colaboradores, sem nenhuma taxa adicional, tais como: Adiantamento Salarial, Convênio, Vales Alimentação, refeição e outros, além de auxílios exclusivos. Consulte o site: www.correct.com.br<br />
                    4.	O presente contrato é por tempo indeterminado tendo início na data de sua assinatura.<br />
                    5.	Este instrumento poderá ser rescindido por quaisquer das partes, mediante comunicação por escrito com antecedência mínima de 60 (sessenta) dias e a qualquer tempo poderá ser suspenso, independente de comunicação prévia, ficando resguardado ao Comércio, o recebimento dos valores que lhes são de direito.<br />
                    6.	As partes contratantes declaram, sob as penas da lei, que os signatários do presente contrato são seus Diretores/ Representantes Legais/ Procuradores, devidamente constituídos na forma dos respectivos Contratos Sociais/ Estatutos Sociais/ Atas de Assembleias/ Procuradores com poderes para assumir em nome das partes as obrigações ora contratadas.<br />
                    7.	As partes elegem o foro da Comarca de Campo Grande, para dirimir quaisquer dúvidas oriundas do presente instrumento.<br />
                    8.	Diante de todas as informações, fica definido este, como contrato principal e único entre o Comércio e a Correct, sucedendo-lhe todos os outros contratos e aditivos celebrados anteriormente à assinatura deste presente contrato, que serão cancelados imediatamente, considerando este instrumento como o único vigente entre as partes.<br />
                    9.	E o Comércio concordando com todas as cláusulas deste contrato, confirma a aceitação através da digitação de sua senha.<br />
                    10.	Este contrato pode ser impresso a qualquer momento que o Comércio desejar.<br />
                    <br />
                </p>

                <div style={{ display: 'flex', gap: '.5rem' }}>
                    <p style={{ borderBottom: '1px solid black' }}><strong>{props.city}</strong></p>
                    <p><strong>/</strong></p>
                    <p style={{ borderBottom: '1px solid black' }}><strong>{adjustedDay}</strong></p>
                    <p><strong>/</strong></p>
                    <p style={{ borderBottom: '1px solid black' }}><strong>{adjustedMonth}</strong></p>
                    <p><strong>/</strong></p>
                    <p style={{ borderBottom: '1px solid black' }}><strong>{year}</strong></p>
                </div>


            </div>
            <div className={styles.contractAgreement} >
                <div className={styles.confirmContract}>
                    <input type="checkbox" id="agreement" value={confirmContract ? 'true' : 'false'} onChange={(e) => setConfirmContract(e.target.checked)} />
                    <label htmlFor="agreement"><strong>Li e concordo com o contrato estabelecido</strong></label>
                </div>
                <div className={styles.confirmButton} onClick={signContract}>
                    <button type='button'>Assinar</button>
                </div>
            </div>
       

        </div>

    )
}

export default ContractComponent