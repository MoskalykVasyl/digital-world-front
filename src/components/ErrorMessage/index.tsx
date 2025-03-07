import { FC } from 'react'

import styles from './errorMessage.module.scss'

interface ErrorMessageProps {
    message?: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({message}) => {
    if(!message) return null;
  return (
    <span className={styles.errorMessage}>
        {message}
    </span>
  )
}
