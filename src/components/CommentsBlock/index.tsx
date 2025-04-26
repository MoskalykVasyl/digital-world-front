import { FC, useState } from 'react';
import { UserInfo } from '../UserInfo';
import styles from './commentsBlock.module.scss';
import { Comment } from '../../types/types';
import { Button } from '../Button';
import { useParams } from 'react-router-dom';
import axios from '../../axios'
import { useAppDispatch } from '../../hooks/reduxHooks';
import { showToast } from '../../redux/slices/toast';
import { ToastMessage } from '../../types/enums';
import { Toast } from '../Toast';


interface CommentsBlockProps {
  comments: Comment[];
  handleAddComment: (data:Comment)=>void;
}

export const CommentsBlock: FC<CommentsBlockProps> = ({comments, handleAddComment}) => {
    const [textComment, setTextComment] = useState('');
    const {id} = useParams();
    const disptach = useAppDispatch();
    
    const addCommentHandler = async() => {
        try {
            const { data } = await axios.patch<Comment>(`/posts/${id}/comments`, {
                textComment,
              });

              console.log(data);
              handleAddComment(data)
              setTextComment('');
              disptach(showToast(ToastMessage.AddComment))
        } catch (err) {
            console.warn(err);
      alert('Comment did not send!');
        }
    }
    

    const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextComment(e.target.value);
       
    }
  return (
    <div className={styles.wrapper}>
      <h4>Comments: {comments.length}</h4>
      <div className={styles.commentForm}>
        <textarea placeholder='Write a comment...' value={textComment} onChange={onChangeHandler}  />
        <Button onClick={addCommentHandler} styles={{backgroundColor: 'rgb(25, 118, 210)'}}>Send</Button>
      </div>
      {comments.length > 0 && (
        comments.map((comment, index) => (
          <div key={index} className={styles.dataComment}>
            <UserInfo
              fullName={comment.user.fullName}
              avatarUrl={comment.user.avatarUrl}
              createdAt={comment.createdAt}
            />
            <p>{comment.text}
            </p>
          </div>
        ))
        
      ) }
    <Toast />
    </div>
  );
};
