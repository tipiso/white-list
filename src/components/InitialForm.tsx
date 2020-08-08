import React from 'react';
import { AppContext } from '../context/Context';
import styles from './InitialForm.module.css';
import * as Yup from 'yup';
import {
    Formik,
    Form,
    Field,
} from 'formik';

const InitialFormSchema = Yup.object().shape({
    NIP: Yup.string()
        .test('len', 'Nieprawidłowy NIP (musi mieć 10 znaków)', val => {
            if (val) {
                return val.length === 10;
            } else return false;
        })
        .required('NIP wymagany'),
    // bankAcc: Yup.string()
    //     .test('len', 'Nieprawidłowy numer konta (musi mieć 26 znaków)', val => {
    //         if (val) {
    //             return val.length === 26;
    //         } else return false;
    //     })
    //     .required('Konto bankowe wymagane'),
    captcha: Yup.bool()
        .required('Captcha jest wymagana'),
});

const InitialForm = (props: { handleSubmit: Function }) => {
    const { state, dispatch } = React.useContext(AppContext);

    return (
        <Formik
            enableReinitialize={true}
            validationSchema={InitialFormSchema}
            validateOnChange={true}
            initialValues={state}
            onSubmit={(values, actions) => {
                dispatch({ type: 'CHANGE_INPUT', payload: { ...values } });
                props.handleSubmit(values);
            }}
        >
            {({ handleChange, setFieldValue, values, handleBlur, errors, touched }) => (
                <Form className={styles.form}>
                    <div className={styles.inputWrap}>
                        <Field
                            disabled={(values.bankAcc ? 'disabled' : null)}
                            placeholder="Numer NIP"
                            maxLength="10"
                            type="text"
                            className={styles.formInput}
                            onChange={handleChange} name="NIP">
                        </Field>
                        {errors.NIP && touched.NIP ? (<div className={styles.formError}>{errors.NIP}</div>) : null}
                    </div>
                    <div className={styles.inputWrap}>
                        <Field
                            disabled={(values.NIP ? 'disabled' : null)}
                            placeholder="Konto bankowe" className={styles.formInput}
                            type="text"
                            name="bankAcc"
                            onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                                const val = values.bankAcc.replace(/\s/g, '');
                                setFieldValue('bankAcc', val.trim());
                                handleBlur(e);
                            }}
                            onChange={handleChange}>
                        </Field>
                        {errors.bankAcc && touched.bankAcc ? (<div className={styles.formError}>{errors.bankAcc}</div>) : null}
                    </div>
                    <div className={styles.inputWrap}>
                        <Field className={styles.formInput} type="date" name="fromDate" onChange={handleChange}></Field>
                    </div>
                    <div className={styles.inputWrap}>
                        <label className={styles.formInput}>
                            Nie jestem robotem
                        <Field required id="captcha" type="checkbox" name="captcha" onChange={handleChange}></Field>
                        </label>
                        {errors.captcha && touched.captcha ? (<div className={styles.formError}>{errors.captcha}</div>) : null}
                    </div>
                    <button className={styles.formButton} type="submit">Sprawdź</button>
                </Form>
            )}
        </Formik>
    );
}

export default  InitialForm;