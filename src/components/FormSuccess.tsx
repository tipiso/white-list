import React from 'react'
import { AppContext } from '../context/Context';
import styles from './InitialForm.module.css';

export default function FormSuccess(props:{setFormStep: Function}) {
    const { state, dispatch } = React.useContext(AppContext);

    return (
        <>
            <div className={`${styles.inputWrap} ${styles.withLabel}`}>
                <label className={styles.inputLabel}>NIP</label>
                <input type="text" readOnly className={styles.formInput} value={state.subject['nip']} />
            </div>
            <div className={`${styles.inputWrap} ${styles.withLabel}`}>
                <label className={styles.inputLabel}>Nazwa firmy</label>
                <input type="text" readOnly className={styles.formInput} value={state.subject['name']} />
            </div>
            <div className={`${styles.inputWrap} ${styles.withLabel}`}>
                <label className={styles.inputLabel}>Adres firmy</label>
                <textarea readOnly className={styles.formInput} value={state.subject['residenceAddress']} />
            </div>
            <div>
                <h2 className={styles.formSubheader}>Numery rachunków bankowych</h2>
                {state.subject['accountNumbers'].map((el: string, index: number) => (
                    <div key={`${index}-bankAcc`} className={styles.inputWrap}>
                        <input className={`${styles.formInput} ${styles.fontSm}`} type="text" value={el} readOnly />
                    </div>

                )
                )}
            </div>
            <p className={styles.paragraph}>W przypadku braku numeru konta kupujący ma <em className={styles.textEm}>OBOWIĄZEK</em> zgłosić ten fakt do swojego urzędu skarbowego</p>
            <footer className={styles.footer}>
                <button  onClick={() => props.setFormStep(3)} className={styles.errorButton}>Brak numeru w bazie</button>
                <button onClick={() => props.setFormStep(1)} className={styles.confirmButton}>OK</button>
            </footer>
        </>
    )
}
