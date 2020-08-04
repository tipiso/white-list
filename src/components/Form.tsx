import React, { ChangeEvent } from 'react';
import { AppContext } from './Context';
import styles from './Form.module.css';

type FormProps = { loaded: boolean };

const Form = ({ loaded }: FormProps) => {
    const { state, dispatch } = React.useContext(AppContext);
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        let value: unknown;
        if (event.target.type === 'number') {
            value = +event.target.value;
        } else if (event.target.type === 'date') {
            value = new Date(event.target.value).toISOString().slice(0, 10);
        } else if (event.target.type === 'checkbox') {
            value = event.target.checked;
        } else value = event.target.value;
        dispatch({ type: 'CHANGE_INPUT', payload: { ...state, [event.target.name]: value } });
    }

    return (
        <form className={styles.form}>
            <input className={styles.formInput} type="number" name="NIP" onChange={handleChange} />
            <input className={styles.formInput} type="number" name="bankAcc" onChange={handleChange} />
            <input className={styles.formInput} type="date" name="fromDate" onChange={handleChange} />
            <label className={styles.formInput}>
                Nie jestem robotem
                <input id="captcha" type="checkbox" name="captcha" onChange={handleChange} />
            </label>
            <button className={styles.formButton} type="submit">Sprawdź</button>
            <label htmlFor="document" className={styles.decoratedFormInput}>Chcę sprawdzić fakturę z pliku</label>
            <input className={styles.formInput} type="file" id="document" name="document" accept="image/png, image/jpeg" />
        </form>
    );
}

export { Form };