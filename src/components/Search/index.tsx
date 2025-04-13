import {FC} from 'react'
import styles from './Search.module.scss'
import TextInput from '../TextInput'

interface SearchProps {
    value: string;
    onChange: (value: string) => void;
  }

export const Search: FC<SearchProps> = ({value, onChange}) => {
  return (
    <div className={styles.wrapper}>
        <TextInput className={styles.search} placeholder='Search...' value={value} onChange={(e) => onChange(e.target.value)}   />
    </div>
  )
}
