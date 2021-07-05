import Head from 'next/head';
import Image from 'next/image';
import Input from '../components/Input';
import { FormEvent } from 'react';
import styles from 'src/styles/create_account.module.scss';
import logo from '../../public/wealthfront.png';

export default function CreateAccount() {
  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    console.log(await response.json());
  }

  return (
    <>
      <Head>
        <title>Create Account</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet"/>
      </Head>
      <article className={styles.article}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.logo}>
            <Image src={logo} alt='Wealthfront Logo' width={50} height={50} />
          </div>
          <h1>Create New Account</h1>
          <Input label="Username" />
          <Input label="Password" />
          <button className={styles.btn} onClick={handleSubmit}>Create Account</button>
        </form>
      </article>
    </>
  );
}