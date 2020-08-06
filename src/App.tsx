import React from 'react';
import styles from './App.module.css';
import { AppProvider } from './context/Context';
import FormWrap from './containers/FormWrap';

function App() {


  return (
    <AppProvider>
      <section className={styles.AppWrapper}>
        <FormWrap />
      </section>
    </AppProvider>
  );
}

export default App;
