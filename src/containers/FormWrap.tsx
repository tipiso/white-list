import React, { useEffect } from 'react'
import styles from './FormWrap.module.css';
import { InitialForm } from '../components/Form';
import { FormState } from '../reducers/formReducer';
import axios from 'axios';

const testApi = 'https://wl-test.mf.gov.pl/';
const prodApi = 'https://wl-api.mf.gov.pl';

export default function FormWrap() {
    const handleSubmit = (data: FormState): void => {
        const { NIP, bankAcc, fromDate } = data;
        async function getData() {
            try {
                if (NIP && bankAcc) {
                    const response = await axios.get(`${prodApi}/api/check/nip/${NIP}/bank-account/${bankAcc}`, {
                        params: {
                            date: fromDate,
                        }
                    });
                    console.log(response);
                } else if(NIP) {
                    const response = await axios.get(`${prodApi}/api/search/nip/${NIP}`, {
                        params: {
                            date: fromDate,
                        }
                    });
                    console.log(response);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }

    return (
        <div className={styles.Wrapper}>
            <h1 className={styles.FormHeader}>biała lista</h1>
            <InitialForm handleSubmit={handleSubmit} />
        </div>
    )
}
