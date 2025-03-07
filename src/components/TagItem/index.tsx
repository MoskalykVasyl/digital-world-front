import  { FC } from 'react'
import styles from './tagItem.module.scss'
import { Link } from 'react-router-dom'

import Hashtag from '../../assets/hashtag.svg'

interface TagItemProps {
    tagName: string;
}

export const TagItem:FC<TagItemProps> = ({tagName}) => {
  return (
        <Link to ={`/tags/${tagName}`} >
      <div className={styles.wrapper} >
        <img src={Hashtag} alt="" />
        <p>{tagName}</p>
    </div>
    </Link>
  )
}
