import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchPosts } from '../../redux/slices/posts';

import styles from './home.module.scss';
import { PostItem } from '../../components/PostItem';
import { TagsBlock } from '../../components/TagsBlock';


 const Home: FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.postsReducer.posts.items);
  useEffect(() => {

    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
    <div className={styles.listPosts}>
      {posts.map((post) => (
        <PostItem
          key={post._id}
          id={post._id}
          title={post.title}
          tags={post.tags}
          user={post.user}
          commentsCount={post.commentsCount}
          viewsCount={post.viewsCount}
          imageUrl={post.imageUrl}
          createdAt={post.createdAt}
        />
      ))}
    </div>
    
    <TagsBlock />
    </div>
  );
};

export default Home