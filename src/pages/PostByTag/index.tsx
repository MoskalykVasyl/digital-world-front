import  { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './postByTag.module.scss';
import Hashtag from '../../assets/hashtag.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { PostItem } from '../../components/PostItem';
import { fetchPostByTag } from '../../redux/slices/posts';
import { BeatLoader } from 'react-spinners';
import { CssLoadingPage } from '../../assets/cssObj/cssObj';

 const PostByTag: FC = () => {
  const { name } = useParams<string >();
  const dispatch = useAppDispatch();
  const postsList = useAppSelector((state)=> state.postsReducer.posts.items);

  useEffect(()=>{
    if(name){
        dispatch(fetchPostByTag(name))
    }
  },[name, dispatch])
  return (
    <div className={styles.wrapper}>
      <div className={styles.tagName}>
        <img src={Hashtag} alt="" />
        {name}
      </div>
      <div className={styles.listPosts}>
      {postsList ? (postsList.map((post) => (
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
      ))): <BeatLoader cssOverride={CssLoadingPage} />}
    </div>
    </div>
  );
};

export default PostByTag;