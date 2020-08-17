import React from 'react'
import USjson from '../assets/USjson.json';
import Select from 'react-select';
import styles from './MultipleSelect.module.css';
  
  const colourStyles = {
    control: (styles:object) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles:object, { data, isDisabled, isFocused, isSelected } : any) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? null : isSelected ? data.color : isFocused ? '#839D11' : null,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? '#304F59'
          : '#000',
      };
    },
  };

export default function MultipleSelect(props: { value: string, name: string, touched: Boolean, error: Boolean, onChange: Function, onBlur: Function }) {
    const handleChange = (value: string) => {
        props.onChange('USemail', value);
    };

    const handleBlur = () => {
        props.onBlur('USemail', true);
    };

    return (
        <Select
            classNamePrefix={styles.customPrefix}
            className={styles.customSelect}
            styles={colourStyles}
            getOptionLabel={option => `${option["NAZWA URZĘDU"]}`}
            getOptionValue={option => `${option["ADRES E-MAIL URZĘDU"]}`}
            options={USjson['Arkusz1']}
            inputValue={props.value}
            onInputChange={handleChange}
            onBlur={handleBlur}
            name={props.name}
        >
        </Select>
    )
}
