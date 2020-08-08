import React from 'react'
import { AppContext } from '../context/Context';
import MultipleSelect from './MultipleSelect';
import styles from './InitialForm.module.css';
import * as Yup from 'yup';
import {
    Formik,
    Form,
    Field,
} from 'formik';

export default function FormReport(props: { setFormStep: Function }) {
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
            <Formik
                enableReinitialize={true}
                // validationSchema={InitialFormSchema}
                validateOnChange={true}
                initialValues={state}
                onSubmit={(values, actions) => {
                    // dispatch({ type: 'CHANGE_INPUT', payload: { ...values } });
                    // props.handleSubmit(values);
                }}
            >
                {({ handleChange, setFieldTouched, setFieldValue, values, handleBlur, errors, touched }) => (
                    <Form className={styles.form}>
                        <div className={styles.inputWrap}>
                            <Field
                                placeholder="Konto podane na fakturze" className={styles.formInput}
                                type="text"
                                name="invoiceAcc"
                                onChange={handleChange}>
                            </Field>
                            {errors.bankAcc && touched.bankAcc ? (<div className={styles.formError}>{errors.bankAcc}</div>) : null}
                        </div>
                        <div className={styles.inputWrap}>
                            <Field
                                placeholder="NIP kupującego" className={styles.formInput}
                                type="text"
                                name="buyerNIP"
                                onChange={handleChange}>
                            </Field>
                            {errors.bankAcc && touched.bankAcc ? (<div className={styles.formError}>{errors.bankAcc}</div>) : null}
                        </div>
                        <div className={styles.inputWrap}>
                                <MultipleSelect  
                                    onChange={setFieldValue}
                                    onBlur={setFieldTouched}
                                    value={values.US}
                                    error={false}
                                    touched={false}
                                />
                            {errors.bankAcc && touched.bankAcc ? (<div className={styles.formError}>{errors.bankAcc}</div>) : null}
                        </div>
                        <button className={styles.formButton} type="submit">Sprawdź</button>
                    </Form>
                )}
            </Formik>
        </>
    )
}
