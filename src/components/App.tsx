import React from 'react';
import styles from './App.module.css';
import { Form } from './Form';
import { AppProvider } from './Context';

function App() {


  return (
    <AppProvider>
      <div className={styles.AppWrapper}>
        <section className={styles.App}>
          <h1 className={styles.AppHeader}>biała lista</h1>
          <Form loaded={true} />
        </section>
      </div>
    </AppProvider>
  );
}

export default App;
