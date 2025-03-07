import { FC } from "react";
import btnStyle from './Button.module.scss'

interface IButton {
    children: string;
    styles?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;  
}

export const Button: FC<IButton> = ({children, styles, onClick}) => {
  return (
    <button className={btnStyle.button} style={styles} onClick={onClick}>
        {children}
    </button>
  )
}
