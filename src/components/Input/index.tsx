import { ChangeEvent, useState, useEffect } from 'react';
import Requirement from '../Requirement';
import styles from '../../styles/input.module.scss';

interface Props {
  label: string,
  handleUsername?: Function,
  handlePassword?: Function
}

interface Hint {
  symbol: boolean,
  number: boolean,
  character: boolean,
  count: boolean
}

const numRegex = /[0-9]+/g;
const charRegex = /[A-Za-z]+/g;
const symbolRegex = /[!@#$%]+/g;

const hint: Hint = {
  symbol: false,
  number: false,
  character: false,
  count: false
}

const Input = ({label, handleUsername, handlePassword}: Props) => {
  const [value, setValue] = useState('');
  const [active, setActive] = useState(false);
  const [exposed, setExposed] = useState(false);

  const isExposed = async () => {
    if (label === 'Password' && hint.symbol && hint.number && hint.character && hint.count) {
      const res = await fetch('api/password_exposed', {
        method: 'POST',
        body: JSON.stringify({password: value})
      })
      const exposed = await res.json();
      setExposed(exposed.result);
    }
  }

  const handleInput = (evt:ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  }

  const isActive = () => {
    if (value) {
      setActive(true);
    } else {
      setActive(false);
    }
  }

  const validateCharCount = () => {
    const min = label === 'Username' ? 10 : 20;
    if (value.length >= min && value.length <= 50) {
      hint['count'] = true;
    } else {
      hint['count'] = false;
    }
  }

  const validateNum = () => {
    if (value.match(numRegex)) {
      hint['number'] = true
    } else {
      hint['number'] = false;
    }
  }

  const validateChar = () => {
    if (value.match(charRegex)) {
      hint['character'] = true;
    } else {
      hint['character'] = false;
    }
  }

  const validateSymbol = () => {
    if (value.match(symbolRegex)) {
      hint['symbol'] = true;
    } else {
      hint['symbol'] = false;
    }
  }

  useEffect(() => {
    isActive();
    validateCharCount();
    validateNum();
    validateChar();
    validateSymbol();
    if (hint.symbol && hint.count && hint.number && hint.character) {
      if (label === 'Password') {
        handlePassword(value);
      } else {
        handleUsername(value);
      }
    }
  },[value])

  return (
    <div className={styles[label]}>
      <label className={active ? styles.active : undefined}>{label}</label>
      <input type="text" name={label} value={value} onChange={handleInput} onBlur={isExposed}></input>
      <Requirement label={label} hint={hint} exposed={exposed}/>
    </div>
  )
}

export default Input;