import { FC } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import styles from './ReadLater.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

const ReadLater: FC = () => {
  const posts = useAppSelector((state) => state.collectionsReducer.readLater);
  const navigate = useNavigate();

  const handlerOnClickBack = () =>{
    navigate(-1);
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Read Later</h3>

      {posts.length === 0 ? (
        <>
          <p className={styles.empty}>You have no saved posts yet.</p>
          <IoArrowBackCircleOutline className={styles.icon} onClick={handlerOnClickBack}/>
        </>
      ) : (
        <ul className={styles.list}>
          {posts.map((post, index) => (
            <Link to={`/posts/${post._id}`}>
              <li className={styles.listItem} key={post._id}>
                <span className={styles.index}>{index + 1}.</span>
                <span className={styles.text}>{post.title}</span>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReadLater;
