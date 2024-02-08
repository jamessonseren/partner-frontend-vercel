'use client'
import { useState } from 'react';
import styles from './definitionsForm.module.css'
import Select from 'react-select'
import { deliveryOptions, salesTypeOptions } from '@/app/utils/company-options.utils';

import makeAnimated from 'react-select/animated';
import { selectStyle } from '../../ui/input';

const animatedComponents = makeAnimated();


export const DefinitionsForm = () => {
    const [title, setTitle] = useState('');
    const [charCount, setCharCount] = useState(0);
    const [delivery, setDelivery] = useState<string>('1')

    const handleInputChange = (event: any) => {
        const inputValue = event.target.value;
        setTitle(inputValue);
        setCharCount(inputValue.length);
    };



    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <div className={`${styles.inputBox} ${styles.fullWidth}`}>
                    <label>Apresentação e Diferencial oferecido ao Correct Club para divulgação aos seus clientes </label>
                    <input

                        placeholder="Entrega gratuita..."
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                        maxLength={80}
                        required
                    />
                    <p>{charCount}/{80} caracteres</p>

                </div>
                <div className={styles.grid}>
                    <div className={styles.inputBox}>
                        <label htmlFor="">Tipo de venda?</label>
                        <Select                     
                            components={animatedComponents}
                            placeholder="Selecione uma ou mais opções"
                            isMulti
                            options={salesTypeOptions}
                            styles={selectStyle}
                        />
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="">Entrega?</label>
                        <Select
                            options={deliveryOptions}
                            placeholder="Selecione uma das opções"
                            className={styles.select}
                            styles={selectStyle}
                        />
                    </div>
                    <div className={styles.inputBox}>
                        <label htmlFor="">Deseja que a Correct cuide da entrega?</label>
                        <Select
                            options={deliveryOptions}
                            placeholder="Selecione uma das opções"
                            className={styles.select}
                            styles={selectStyle}
                        />
                    </div>
                </div>


                {delivery === '1' && (
                    <div className={styles.inputBox}>
                        <label htmlFor="">Opções de Entrega</label>
                        <div className={styles.deliveryOptions}>
                            {/* <select name="cat" id="cat" onChange={(e) => setDelivery(e.target.value)}>
                            <option value="yes">Sim</option>
                            <option value="no">Não</option>
                        </select> */}
                            <div>
                                <p>Local?</p>
                                <select name="cat" id="cat">
                                    <option value="" disabled hidden>Selecione uma opção</option>
                                    <option value="1">Sim</option>
                                    <option value="0">Não</option>
                                </select>
                            </div>
                            <div>
                                <p>Cidade</p>
                                <select name="cat" id="cat">
                                    <option value="" disabled hidden>Selecione uma opção</option>
                                    <option value="1">Sim</option>
                                    <option value="0">Não</option>
                                </select>
                            </div>
                            <div>
                                <p>País?</p>
                                <select name="cat" id="cat">
                                    <option value="1">Sim</option>
                                    <option value="0">Não</option>
                                </select>
                            </div>

                        </div>

                    </div>
                )}


                <button className={styles.fullWidth} type="submit">Ajustar definições</button>
            </form>

        </div>
    )
}

export default DefinitionsForm