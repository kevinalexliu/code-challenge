import styles from '../../styles/requirement.module.scss';

interface Props {
  label: string
  hint: Hint,
  exposed: boolean
}

interface Hint {
  symbol: boolean,
  number: boolean,
  character: boolean,
  count: boolean
}

const Requirement = ({label, hint, exposed}: Props) => {

  return (
    <div className={styles.hint}>
      {label === 'Username' &&
      <>
        <p className={hint.count ? styles.checked : undefined}>10 characters minimum and 50 characters maximum</p>
        <p className={hint.symbol ? styles.checked : undefined}>One symbol (@, !, #, $, %)</p>
        <p className={hint.character ? styles.checked : undefined}>One character</p>
        <p className={hint.number ? styles.checked : undefined}>One number</p>
      </>
      }
      {label === 'Password' &&
      <>
        <p className={hint.count ? styles.checked : undefined}>20 characters minimum and 50 characters maximum</p>
        <p className={hint.symbol ? styles.checked : undefined}>One symbol (@, !, #, $, %)</p>
        <p className={hint.character ? styles.checked : undefined}>One character</p>
        <p className={hint.number ? styles.checked : undefined}>One number</p>
        {exposed ? <p className={styles.warning}>This password is not secure. Try a different password</p> : undefined}
      </>
      }
    </div>
  )
}

export default Requirement;