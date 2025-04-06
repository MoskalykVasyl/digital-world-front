import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './addPost.module.scss';
import 'easymde/dist/easymde.min.css';
import SimpleMDE from 'react-simplemde-editor';
import { Button } from '../../components/Button';
import axios from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Post } from '../../types/types';
import TextInput from '../../components/TextInput';

const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [text, setText] = useState('');
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const isEditing = Boolean(id);

  useEffect(() => {
    if (id) {
      axios
        .get<Post>(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setTags(data.tags.join(','));
          setImageUrl(data.imageUrl);
          setText(data.text);
        })
        .catch((err) => {
          console.warn(err);
          alert('Error when receiving an article');
        });
    }
  }, [id]);

  const onChange = useCallback((value: string) => {
    setText(value);
  }, []);
  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Write a text...',
      status: false,
    }),
    []
  );

  const onSubmit = async () => {
    try {
      const fields = { title, tags, text, imageUrl };

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);

      const _id = isEditing ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch (err) {
      console.warn(err);
      alert('Error when creating a post');
    }
  };

  const handleChangeFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const formData = new FormData();
      const file = event.target.files?.[0];
      if (!file) return;
      formData.append('image', file);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/uploadAvatar`,
        formData
      );
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Error while uploading a file');
    }
  };

  const deleteImage = () => {
    setImageUrl('');
  };

  return (
    <div className={styles.wrapper}>
      <h3>Create new post</h3>
      <div className={styles.form}>
        <input
          ref={inputFileRef}
          onChange={handleChangeFile}
          type="file"
          hidden
        />
        {imageUrl && (
          <>
            <img
              src={`${import.meta.env.VITE_API_URL}${imageUrl}`}
              alt="Uploaded"
            />
            <Button
              onClick={deleteImage}
              styles={{
                backgroundColor: 'rgb(211, 47, 47)',
                borderWidth: '0px',
              }}
            >
              Delete
            </Button>
          </>
        )}
        <Button
          onClick={() => inputFileRef.current?.click()}
          styles={{ backgroundColor: 'rgb(12, 128, 1)', borderWidth: '0px' }}
        >
          Upload a image
        </Button>
        <TextInput
          label="Title"
          name="title"
          placeholder="Write a title for post"
          onChange={(event) => setTitle(event.currentTarget.value)}
          value={title}
          required
        />
        <TextInput
          label="tags"
          name="tags"
          placeholder="Write tags for post"
          onChange={(event) => setTags(event.currentTarget.value)}
          value={tags}
          required
        />
        <SimpleMDE
          className={styles.editor}
          value={text}
          onChange={onChange}
          options={options}
        />
        <div className={styles.buttons}>
          <Button onClick={onSubmit} styles={{ color: 'rgb(25, 118, 210)' }}>
            {isEditing ? 'Save' : 'Publish'}
          </Button>
          <Button
            styles={{ backgroundColor: 'rgb(211, 47, 47)', borderWidth: '0px' }}
          >
            Clear the filds
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
