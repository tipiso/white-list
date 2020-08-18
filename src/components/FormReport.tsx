import React, { FormEvent } from 'react'
import { AppContext } from '../context/Context';
import MultipleSelect from './MultipleSelect';
import styles from './InitialForm.module.css';
import * as Yup from 'yup';
import {
    Formik,
    Form,
    Field,
} from 'formik';

const ReportFormSchema = Yup.object().shape({
    buyerNIP: Yup.string()
        .test('len', 'Nieprawidłowy NIP (musi mieć 10 znaków)', val => {
            if (val) {
                return val.length === 10;
            } else return false;
        })
        .required('NIP wymagany'),
    invoiceAcc: Yup.string()
        .test('len', 'Nieprawidłowy numer konta (musi mieć 26 znaków)', val => {
            if (val) {
                return val.length === 26;
            } else return false;
        })
        .required('Konto bankowe wymagane'),
    USemail: Yup.string()
        .required('test')
});

export default function FormReport(props: { setFormStep: Function }) {
    const { state, dispatch } = React.useContext(AppContext);
    // disabled={(values.bankAcc ? 'disabled' : null)}
    // placeholder="Numer NIP"
    // maxLength="10"
    // type="text"
    // className={styles.formInput}
    // onChange={handleChange} 
    // name="NIP">
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
            <Formik
                enableReinitialize={true}
                // validationSchema={ReportFormSchema}    
                validateOnChange={true}
                initialValues={state}
                onSubmit={(values, actions) => {
                    // dispatch({ type: 'CHANGE_INPUT', payload: { ...values } });
                    // props.handleSubmit(values);
                    console.log(values, actions)
                }}
            >
                {({ handleChange, setFieldTouched, setFieldValue, values, handleBlur, errors, touched }) => (
                    <Form className={styles.form}>
                        <div className={styles.inputWrap}>
                            <label className={styles.inputLabel}>Konto bankowe na fakturze</label>
                            <Field
                                placeholder="Konto podane na fakturze" className={styles.formInput}
                                type="text"
                                name="invoiceAcc"
                                onChange={handleChange}>
                            </Field>
                            {errors.bankAcc && touched.bankAcc ? (<div className={styles.formError}>{errors.bankAcc}</div>) : null}
                        </div>
                        <div className={styles.inputWrap}>
                            <label className={styles.inputLabel}>NIP kupującego</label>
                            <Field
                                placeholder="NIP kupującego" className={styles.formInput}
                                maxLength="10"
                                type="text"
                                name="buyerNIP"
                                onChange={handleChange}>
                            </Field>
                            {errors.bankAcc && touched.bankAcc ? (<div className={styles.formError}>{errors.bankAcc}</div>) : null}
                        </div>
                        <div className={styles.inputWrap}>
                            <label className={styles.inputLabel}>Urząd skarbowy</label>
                            <MultipleSelect
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                value={values.USemail}
                                error={false}
                                touched={false}
                                name={'USemail'}
                            />
                            {errors.USemail && touched.USemail ? (<div className={styles.formError}>{errors.USemail}</div>) : null}
                        </div>
                        <button className={styles.formButton} type="submit">Sprawdź</button>
                    </Form>
                )}
            </Formik>
        </>
    )
}
