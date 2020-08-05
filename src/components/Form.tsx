import React from 'react';
import { AppContext } from './Context';
import styles from './Form.module.css';
import * as Yup from 'yup';
import {
    Formik,
    Form,
    Field,
} from 'formik';

const InitialFormSchema = Yup.object().shape({
    NIP: Yup.string()
    .test('len', 'Nieprawidłowy NIP (musi mieć 10 znaków)', val =>  val.length === 10)
    .required('NIP wymagany'),
    bankAcc: Yup.string()
    .test('len', 'Nieprawidłowy numer konta (musi mieć 26 znaków)', val => val.length === 26)
    .required('NIP wymagany'),
    captcha: Yup.bool()
    .required('Captcha jest wymagana'),
});

const InitialForm = () => {
    const { state, dispatch } = React.useContext(AppContext);
  
    return (
        <Formik
            enableReinitialize={true}
            validationSchema={InitialFormSchema}
            validateOnChange={true}
            initialValues={state}
            onSubmit={(values, actions) => {
                dispatch({ type: 'CHANGE_INPUT', payload: { ...values } });
            }}
        >
            {({handleChange, errors, touched}) => (
                <Form className={styles.form}>
                    <Field required placeholder="numer NIP" type="text" className={styles.formInput} 
                    onChange={handleChange} name="NIP">
                    </Field>
                    {errors.NIP && touched.NIP ? (<div>{errors.NIP}</div>) : null}
                    <Field required className={styles.formInput} type="text" name="bankAcc" onChange={handleChange}>
                    </Field>
                    {errors.bankAcc && touched.bankAcc ? (<div>{errors.bankAcc}</div>) : null}
                    <Field className={styles.formInput} type="date" name="fromDate" onChange={handleChange}></Field>
                    <label className={styles.formInput}>
                        Nie jestem robotem
                        <Field required id="captcha" type="checkbox" name="captcha" onChange={handleChange}></Field>
                    </label>
                    {errors.captcha && touched.captcha ? (<div>{errors.captcha}</div>) : null}
                    <button className={styles.formButton} type="submit">Sprawdź</button>
                    <label htmlFor="document" className={styles.decoratedFormInput}>Chcę sprawdzić fakturę z pliku
                    <Field className={styles.formInput} type="file" id="document" name="document" accept="image/png, image/jpeg"></Field>
                    </label>
                </Form>
            )}
        </Formik>
    );
}

export { InitialForm };