import Head from 'next/head';
import Image from 'next/image';
import Input from '../components/Input';
import { FormEvent } from 'react';
import styles from 'src/styles/create_account.module.scss';
import logo from '../../public/wealthfront.png';
import { useState } from 'react';


interface Account {
  username: string,
  password: string
}

const account : Account= {username: '', password: ''}

export default function CreateAccount() {
  const [haveInput, setHaveInput] = useState(true);
  const [warning, setWarning] = useState('')

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify(account),
    });
    const res = await response.json();
    if (!res.result) {
      setWarning(res.errors.message);
      setHaveInput(false);
    }
    console.log(res)
  }

  const handleUsername = (username : string) => {
    account.username = username;
  }

  const handlePassword = (password : string) => {
    account.password = password;
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
          <Input label="Username" handleUsername={handleUsername}/>
          <Input label="Password" handlePassword={handlePassword}/>
          {!haveInput ? <p className={styles.warning}>{warning}</p> : undefined}
          <button className={styles.btn} onClick={handleSubmit}>Create Account</button>
        </form>
      </article>
    </>
  );
}