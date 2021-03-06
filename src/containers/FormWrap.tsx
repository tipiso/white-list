import React, { useState } from 'react';
import axios from 'axios';

import styles from './FormWrap.module.css';

import { AppContext } from '../context/Context';
import InitialForm from '../components/InitialForm';
import { FormState } from '../reducers/formReducer';
import FormSuccess from '../components/FormSuccess';
import FormReport from '../components/FormReport';

const testApi = 'https://wl-test.mf.gov.pl/';
const prodApi = 'https://wl-api.mf.gov.pl';
const api = prodApi;

export default function FormWrap() {
    const { state, dispatch } = React.useContext(AppContext);
    const [formStep, setFormStep] = useState(1);
    const [ajaxError, setAjaxError] = useState(false);

    const handleSubmit = (data: FormState): void => {
        const { NIP, bankAcc, fromDate } = data;

        async function getData() {
            try {
                if (bankAcc) {
                    const response = await axios.get(`${api}/api/search/bank-account/${bankAcc}`, {
                        params: {
                            date: fromDate,
                        }
                    });
                    if (response.status === 200) {
                        const { subjects } = response.data.result;
                        console.log(subjects, response.data.result)
                        dispatch({ type: 'SET_COMPANY_DATA', payload: { subject: { ...subjects[0] } } });
                        setFormStep(2);
                    }
                } else if (NIP) {
                    const response = await axios.get(`${api}/api/search/nip/${NIP}`, {
                        params: {
                            date: fromDate,
                        }
                    });
                    if (response.status === 200) {
                        const { subject } = response.data.result;
                        console.log(subject, response.data.result)
                        dispatch({ type: 'SET_COMPANY_DATA', payload: { subject: { ...subject } } });
                        setFormStep(2);
                    }
                }
            } catch (error) {
                console.log(error);
                setAjaxError(true);
            }
        }
        getData();
    }

    let form;
    switch (formStep) {
        case 1:
            form = <InitialForm handleSubmit={handleSubmit} />;
            break;
        case 2:
            form = <FormSuccess setFormStep={setFormStep} />;
            break;
        case 3:
            form = <FormReport setFormStep={setFormStep} />;
            break;
        default:
            form = <InitialForm handleSubmit={handleSubmit} />;
            break;
    }

    return (
        <div className={styles.Wrapper}>
            <h1 onClick={() => window.location.reload()} className={styles.FormHeader}>biała lista</h1>
            {form}
            {ajaxError ? <div className={styles.formError}>Nie znaleziono działalności gospodarczej o wpisanych danych</div> : null}
        </div>
    )
}
