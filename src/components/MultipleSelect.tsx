import React, { useState } from 'react'
import USjson from '../assets/USjson.json';
import Select, { OptionsType } from 'react-select';
import styles from './MultipleSelect.module.css';

const USObject: OptionsType<Object> = USjson['Arkusz1'];

const colourStyles = {
  control: (styles: object) => (
    {
      ...styles,
      backgroundColor: 'white',
      '&:hover': {
        borderColor: '#839DA6'
      }
    }),
  option: (styles: object, { data, isDisabled, isFocused, isSelected }: any) => {
    return {
      ...styles,
      backgroundColor:
        isDisabled ? null : isSelected
          ? data.color : isFocused
            ? '#839D11' : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? '#839DA6'
          : '#000',
      '&:hover': {
        backgroundColor: '#839DA6',
        color: '#fff',
      },
    };
  },
};

export default function MultipleSelect(props: { value: string, name: string, touched: Boolean, error: Boolean, onChange: Function, onBlur: Function }) {
  const [searchInput, handleSearchInput] = useState('');

  const handleChange = (value: any) => {
    props.onChange('USemail', value['ADRES E-MAIL URZĘDU']);
  };

  const handleInputChange = (value: string) => {
    handleSearchInput(value);
  }

  const handleBlur = () => {
    props.onBlur('USemail', true);
  };

  return (
    <Select
      classNamePrefix={styles.customPrefix}
      className={styles.customSelect}
      styles={colourStyles}
      getOptionLabel={(option: any) => `${option["NAZWA URZĘDU"]}`}
      getOptionValue={(option: any) => `${option["ADRES E-MAIL URZĘDU"]}`}
      options={USObject}
      inputValue={searchInput}
      onInputChange={handleInputChange}
      onChange={handleChange}
      onBlur={handleBlur}
      name={props.name}
    >
    </Select>
  )
}
