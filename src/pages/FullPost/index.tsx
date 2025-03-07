import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import { Comment, Post } from '../../types/types';
import Markdown from 'react-markdown';
import styles from './fullPost.module.scss';
import { UserInfo } from '../../components/UserInfo';
import { PostStats } from '../../components/PostStats';
import { CommentsBlock } from '../../components/CommentsBlock';
import { TagItem } from '../../components/TagItem';
import { BeatLoader } from 'react-spinners';
import { CssLoadingPage } from '../../assets/cssObj/cssObj';

 const FullPost: FC = () => {
  const [data, setData] = useState<Post | null>();
  const { id } = useParams<string>();

  useEffect(() => {
    axios
      .get(`posts/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.warn(err);
        alert('Error when receiving an article');
      });
  }, [id]);

  const handleAddComment = (newComment: Comment) => {
    if (data) {
      setData({
        ...data,
        comments: [...(data.comments || []), newComment],
      });
    }
  };
  return (
    <>
      {data ? (
        <>
          <div className={styles.wrapper}>
            <img
              className={styles.imagePost}
              src={`${import.meta.env.VITE_API_URL}${data.imageUrl}`}
              alt="PostImage"
            />
            <UserInfo
              fullName={data.user.fullName}
              avatarUrl={data.user.avatarUrl}
              createdAt={data.createdAt}
            />
            <PostStats
              viewsCount={data.viewsCount}
              commentsCount={data.commentsCount}
            />
            <h3>{data.title}</h3>
            <div className={styles.tagList}>
              {data.tags.map((tag, index) => (
                <TagItem key={index} tagName={tag} />
              ))}
            </div>
            <Markdown>{data.text}</Markdown>
          </div>
          <CommentsBlock
            comments={data.comments || []}
            handleAddComment={handleAddComment}
          />
        </>
      ) : (
        <BeatLoader cssOverride={CssLoadingPage} />
      )}
    </>
  );
};

export default FullPost;