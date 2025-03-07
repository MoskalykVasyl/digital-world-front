import { FC, useEffect } from 'react';
import styles from './tagsBlock.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchTags } from '../../redux/slices/tags';
import { TagItem } from '../TagItem';

export const TagsBlock: FC = () => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.tagsReducer.tags);
 

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);
  return (
    <div className={styles.wrapper}>
      <h4>Last tags:</h4>
      <div className={styles.tagsList}>
        {tags.map((tag) => (
          <TagItem key={tag} tagName={tag} />
        ))}
      </div>
    </div>
  );
};
