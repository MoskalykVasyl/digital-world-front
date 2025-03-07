import { FC } from 'react';
import styles from './postItem.module.scss';
import { UserInfo } from '../UserInfo';
import { Link } from 'react-router-dom';
import { PostStats } from '../PostStats';
import { TagItem } from '../TagItem';

import EditSVG from '../../assets/edit.svg';
import DeleteSVG from '../../assets/delete.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchDeletePost } from '../../redux/slices/posts';

interface PostProp {
  id: string;
  title: string;
  tags: string[];
  commentsCount: number;
  viewsCount: number;
  user: {
    _id: string;
    fullName: string;
    avatarUrl: string;
  };
  imageUrl: string;
  createdAt: string;
}

export const PostItem: FC<PostProp> = ({
  id,
  title,
  tags,
  commentsCount,
  viewsCount,
  user,
  imageUrl,
  createdAt,
}) => {
  const authorId = useAppSelector((state) => state.authReducer.data?._id);
  const dispatch = useAppDispatch();

  const deletePost = (id: string) => {
    dispatch(fetchDeletePost(id));
  };
  return (
    <div className={styles.post_wrapper}>
      {authorId === user._id && (
        <div className={styles.actionBtn}>
          <Link to={`/post/${id}/edit`}>
            <img src={EditSVG} alt="" />
          </Link>
          <img src={DeleteSVG} onClick={() => deletePost(id)} alt="" />
        </div>
      )}
      <img
        className={styles.img_post}
        src={`${import.meta.env.VITE_API_URL}${imageUrl}`}
        alt=""
      />

      <UserInfo
        fullName={user.fullName}
        avatarUrl={user.avatarUrl}
        createdAt={createdAt}
      />
      <div className={styles.post_data}>
        <Link to={`/posts/${id}`}>
          <h2>{title}</h2>{' '}
        </Link>
        <ul>
          {tags.map((tag, index) => (
            <TagItem key={index} tagName={tag} />
          ))}
        </ul>
        <PostStats viewsCount={viewsCount} commentsCount={commentsCount} />
      </div>
    </div>
  );
};
