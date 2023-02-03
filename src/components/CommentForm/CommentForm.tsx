import { FC, useState, FormEvent, ChangeEvent, useEffect } from 'react';
import ClientCaptcha from "react-client-captcha";
import { FILE_TYPES } from '../../constants';
import { Comment } from '../../types/Comment';

type Props = {
  parentId: string | null,
  handleSubmit: (obj: Omit<Comment, 'id' | 'createdAt'>) => Promise<void>,
};

type FormData = Omit<Comment, 'id' | 'createdAt' | 'parentId'>;

const emptyState: FormData = {
  userName: '',
  userEmail: '',
  homePage: '',
  body: '',
  file: ['', ''],
};

export const CommentForm:FC<Props> = ({ parentId, handleSubmit }) => {
  const [newCommentData, setNewCommentData] = useState<FormData>(emptyState);
  const [captcha, setCaptcha] = useState('');
  const [captchaRef, setCaptchaRef] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fileData, setFileData] = useState({base64: '', format: ''});

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (captcha !== captchaRef) {
      setCaptcha('');
      alert('Captcha is invalid');
      
      return;
    }

    await handleSubmit({
      ...newCommentData,
      parentId,
    });

    setNewCommentData(emptyState);
    setCaptcha('');
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];

    if (!FILE_TYPES.includes(file.type)) {
      alert('Wrong file type');
      e.target.value = '';
      
      return;
    }

    const format = file.name.split('.')[1];

    setIsLoading(true);

    if (file.type.includes('image')) {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        if (img.width > 320 || img.height > 240) {
          const dif = Math.max(img.width - 320, img.height - 240);
          
          canvas.width = img.width - dif;
          canvas.height = img.height - dif;
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
        }
    
        ctx?.drawImage(img, 0, 0);
        console.log(canvas);
        setFileData({
          base64: canvas.toDataURL(file.type),
          format,
        });
        setIsLoading(false);
      }
      
      img.onerror = err => console.error(err);
    }

    if (file.type === 'text/plane') {
      const reader = new FileReader();
      
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFileData({
          base64: String(reader.result),
          format,
        });
        setIsLoading(false);
      }
      
      reader.onerror = err => console.error(err);
    }
  };

  useEffect(() => {
    setNewCommentData({
      ...newCommentData,
      file: Object.values(fileData),
    });
  }, [isLoading]);

  const { body, userName, userEmail, homePage } = newCommentData;

  return (
    <>
      <h2>Write comment</h2>
      <form onSubmit={onSubmit}>
        <input
          placeholder='User Name'
          className='message-input'
          type="text" 
          value={userName} 
          onChange={e => setNewCommentData({
            ...newCommentData,
            userName: e.target.value.replace(/[^a-z0-9]/gi, ''),
          })}
          required
        />

        <input
          placeholder='Email'
          className='message-input'
          type="email" 
          value={userEmail} 
          onChange={e => setNewCommentData({
            ...newCommentData,
            userEmail: e.target.value,
          })}
          required
        />
        
        <input
          placeholder='Home Page'
          className='message-input'
          type="url" 
          value={homePage} 
          onChange={e => setNewCommentData({
            ...newCommentData,
            homePage: e.target.value,
          })}
        />

        <textarea
          className='message-input message-input--body' 
          value={body} 
          onChange={e => setNewCommentData({
            ...newCommentData,
            body: e.target.value,
          })}
          required
        ></textarea>

        <input type='file' onChange={handleFileUpload} />

        <ClientCaptcha captchaCode={(code: string) => setCaptchaRef(code)} />

        <input 
          className='message-input' 
          type="text" 
          value={captcha}
          onChange={e => setCaptcha(e.target.value)}
        />
        
        <button className='btn'>Write</button>
      </form>
    </>
  );
};
