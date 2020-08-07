import React, {useState} from 'react';
import axios from 'axios';

import styles from './FormWrap.module.css';

import { AppContext } from '../context/Context';
import { InitialForm } from '../components/Form';
import { FormState } from '../reducers/formReducer';
import FormNIPFound from '../components/FormNIPFound';
import FormBankAccFound from '../components/FormBankAccFound';

const testApi = 'https://wl-test.mf.gov.pl/';
const prodApi = 'https://wl-api.mf.gov.pl';
const api = testApi;

export default function FormWrap() {
    const { state, dispatch } = React.useContext(AppContext);
    const [formType, setFormType] = useState('');

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
                        console.log(response);
                        dispatch({ type: 'SET_COMPANY_DATA', payload: { response } });
                        setFormType('BANK_ACCOUNT_FOUND');
                    }
                } else if (NIP) {
                    const response = await axios.get(`${api}/api/search/nip/${NIP}`, {
                        params: {
                            date: fromDate,
                        }
                    });
                    if (response.status === 200) {
                        console.log(response);
                        dispatch({ type: 'SET_COMPANY_DATA', payload: { response } });
                        setFormType('NIP_FOUND');
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }

    let form = <InitialForm handleSubmit={handleSubmit} />;
    if(formType === 'NIP_FOUND'){
        form = <FormNIPFound />;
    }
    if(formType === 'BANK_ACCOUNT_FOUND'){
        form = <FormBankAccFound />;
    }
     

    return (
        <div className={styles.Wrapper}>
            <h1 className={styles.FormHeader}>biała lista</h1>
            {form}
        </div>
    )
}
