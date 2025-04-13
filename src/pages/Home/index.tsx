import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchPosts } from '../../redux/slices/posts';

import styles from './home.module.scss';
import { PostItem } from '../../components/PostItem';
import { TagsBlock } from '../../components/TagsBlock';
import { checkLoadStatus } from '../../utils/checkLoadStatus';
import PostsLoader from '../../components/Loader/PostsLoader';
import { Search } from '../../components/Search';
import { useDebounce } from '../../hooks/useDebounce';

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.postsReducer.posts.items);
  const status = useAppSelector((state) => state.postsReducer.posts.status);

  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 300);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(debouncedSearchValue.toLowerCase())
  );

  return (
    <>
    <Search value={searchValue} onChange={setSearchValue} />
    <div className={styles.wrapper}>
      
      <div className={styles.listPosts}>
        {checkLoadStatus(status) ? (
          <PostsLoader />
        ) : (
          filteredPosts.map((post) => (
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
          ))
        )}
      </div>

      <TagsBlock />
    </div>
    </>
  );
};

export default Home;
