import React from 'react'
import USjson from '../assets/USjson.json';
import Select from 'react-select';
import styles from './MultipleSelect.module.css';

export default function MultipleSelect(props: { value: string,touched: Boolean, error: Boolean, onChange: Function, onBlur: Function }) {
    const handleChange = (value: string) => {
        props.onChange('US', value);
    };

    const handleBlur = () => {
        props.onBlur('US', true);
    };

    return (
        <Select
            classNamePrefix={styles.customPrefix}
            className={styles.customSelect}
            getOptionLabel={option => `${option["NAZWA URZĘDU"]}`}
            getOptionValue={option => `${option["NR TELEFONU   wraz z nr kierunkowym  "]}`}
            options={USjson['Arkusz1']}
            inputValue={props.value}
            onInputChange={handleChange}
            onBlur={handleBlur}
        >
        </Select>
    )
}
