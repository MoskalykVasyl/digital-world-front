import { FC } from 'react';
import styles from './postStats.module.scss';
import Views from '../../assets/eye.svg';
import Comment from '../../assets/comment.svg';

interface PostStatsProps {
  viewsCount: number;
  commentsCount: number;
}
export const PostStats: FC<PostStatsProps> = ({
  viewsCount,
  commentsCount,
}) => {
  return (
    <div className={styles.post_analytics}>
      <ul>
        <li>
          <img src={Views} alt="Views" />
          {viewsCount}
        </li>
        <li>
          <img src={Comment} alt="Comment" />

          {commentsCount}
        </li>
      </ul>
    </div>
  );
};
