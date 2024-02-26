'use client'
import { useState } from 'react';
import styles from './definitionsForm.module.css'
import Select from 'react-select'
import { salesTypeOptions, correctDeliveryOptions, distanceDelivery, freightByDistance } from '@/app/utils/formsOptions/ecommerce/ecommerce-options';
import { additionalDistances, ecommerceDefinitionsDefaultValues, EcommerceDefinitionsTypes } from '@/app/utils/formsOptions/ecommerce/ecommerce-types';

import makeAnimated from 'react-select/animated';
import { selectStyle } from '../../ui/input';
import { FaTrashCan } from 'react-icons/fa6';
import { IoIosAddCircle } from 'react-icons/io';

const animatedComponents = makeAnimated();


export const DefinitionsForm = () => {
    const [definitionValues, setDefinitionValues] = useState<EcommerceDefinitionsTypes>(ecommerceDefinitionsDefaultValues)
    const [charCount, setCharCount] = useState(0);
    const [additionalDistances, setAdditionalDistances] = useState<additionalDistances[]>(definitionValues.additionalDistances)

    const handleInputChange = (event: any) => {
        const inputValue = event.target.value;
        setDefinitionValues({ ...definitionValues, title: inputValue });
        setCharCount(inputValue.length);
    };

    const handleFreightOptionsChange = (updateOptions: additionalDistances[]) => {
        setAdditionalDistances(updateOptions)

        setDefinitionValues(prevData => ({
            ...prevData,
            additionalDistances: updateOptions
        }))
    }
    const handleAddOption = () => {
        const newOption = { distance: '', value: '' };
        setAdditionalDistances(prevOptions => [...prevOptions, newOption]);
        setDefinitionValues(prevData => ({
            ...prevData,
            weekDaysOptions: [...prevData.additionalDistances, newOption]
        }));
    };

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <div className={`${styles.inputBox} ${styles.fullWidth}`}>
                    <label>Apresentação e Diferencial oferecido ao Correct Club para divulgação aos seus clientes </label>
                    <input

                        placeholder="Entrega gratuita..."
                        name="title"
                        value={definitionValues.title}
                        onChange={handleInputChange}
                        maxLength={80}
                        required
                    />
                    <p>{charCount}/{80} caracteres</p>

                </div>
                <div className={styles.grid1}>
                    <div className={styles.inputBox}>
                        <label htmlFor="">Tipo de venda?</label>
                        <Select
                            placeholder="Selecione uma ou mais opções"
                            options={salesTypeOptions}
                            styles={selectStyle}
                            value={salesTypeOptions.find(option => option.value === definitionValues.salesType)}
                            onChange={(selectedOption) => setDefinitionValues({ ...definitionValues, salesType: selectedOption ? selectedOption.value : "" })}
                        />
                    </div>
                    {(definitionValues.salesType === "Somente Delivery / Ecommerce" || definitionValues.salesType === "Ambos") && (

                        <div className={styles.inputBox}>
                            <label htmlFor="">Deseja que a Correct cuide das entregas?</label>
                            <Select
                                options={correctDeliveryOptions}
                                placeholder="Selecione uma das opções"
                                styles={selectStyle}
                                value={correctDeliveryOptions.find(option => option.value === definitionValues.correctDelivery)}
                                onChange={(selectedOption) => setDefinitionValues({ ...definitionValues, correctDelivery: selectedOption ? selectedOption.value : "" })}
                            />
                        </div>

                    )}
                    {/* {definitionValues.correctDelivery === "Não, eu faço TODAS as entregas" && (
                        <div className={styles.inputBox}>
                            <label htmlFor="">Deseja definir o valor do frete por distância?</label>
                            <Select
                                options={freightByDistance}
                                placeholder="Selecione uma das opções"
                                styles={selectStyle}
                                value={freightByDistance.find(option => option.value === definitionValues.freightByDistance)}
                                onChange={(selectedOption) => setDefinitionValues({ ...definitionValues, freightByDistance: selectedOption ? selectedOption.value : "" })}
                            />
                        </div>
                    )} */}

                    {definitionValues.correctDelivery === "Não, eu faço TODAS as entregas" && (
                        <div className={styles.freightBox}>

                            {additionalDistances?.map((options, index) => (
                                <div key={index} className={styles.additionalDistances}>
                                    <div className={styles.distance}>
                                        <input
                                            type='number'
                                            value={options.distance}
                                            placeholder="de"
                                            name="distance"
                                            onChange={(e) => {
                                                const updateOptions = [...additionalDistances]
                                                updateOptions[index].distance = e.target.value
                                                handleFreightOptionsChange(updateOptions)

                                            }}
                                            maxLength={80}
                                            required
                                        />
                                    </div>
                                    <div className={styles.distance}>
                                        <input
                                            type='number'
                                            value={options.distance}
                                            placeholder="até"
                                            name="distance"
                                            onChange={(e) => {
                                                const updateOptions = [...additionalDistances]
                                                updateOptions[index].distance = e.target.value
                                                handleFreightOptionsChange(updateOptions)

                                            }}
                                            maxLength={80}
                                            required
                                        />
                                    </div>
                                    <div className={styles.distancePrice}>
                                        <input

                                            placeholder="Valor do Frete em R$"
                                            name="title"
                                            value={options.value}
                                            onChange={handleInputChange}
                                            maxLength={80}
                                            required
                                        />
                                    </div>

                                    {additionalDistances.length > 1 && (
                                        <div
                                            className={styles.removeButton}
                                            onClick={() => {
                                                const updatedOptions = [...additionalDistances];
                                                updatedOptions.splice(index, 1);
                                                setAdditionalDistances(updatedOptions);
                                                // Atualize também o estado promptPlanningData
                                                setDefinitionValues(prevData => ({
                                                    ...prevData,
                                                    weekDaysOptions: updatedOptions
                                                }));
                                            }}

                                        >
                                            <FaTrashCan />
                                        </div>
                                    )}
                                </div>

                            ))}
                                    <div className={styles.addButton}>
                                        <IoIosAddCircle onClick={handleAddOption} />
                                    </div>
                        </div>
                        // <div className={styles.inputBox}>
                        //     <label htmlFor="">Deseja definir o valor do frete por distância?</label>
                        //     <Select
                        //         options={freightByDistance}
                        //         placeholder="Selecione uma das opções"
                        //         styles={selectStyle}
                        //         value={freightByDistance.find(option => option.value === definitionValues.freightByDistance)}
                        //         onChange={(selectedOption) => setDefinitionValues({ ...definitionValues, freightByDistance: selectedOption ? selectedOption.value : "" })}
                        //     />
                        // </div>
                    )}
                    {/* <div className={styles.inputBox}>
                        <label htmlFor="">Entrega?</label>
                        <Select
                            options={deliveryOptions}
                            placeholder="Selecione uma das opções"
                            className={styles.select}
                            styles={selectStyle}
                        />
                    </div> */}
                </div>

                <button className={styles.fullWidth} type="submit">Ajustar definições</button>
            </form>

        </div>
    )
}

export default DefinitionsForm