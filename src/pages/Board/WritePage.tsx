import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface WritePageProps {
  onPostSubmit: (content: string) => void;
}

const WritePage: React.FC<WritePageProps> = ({ onPostSubmit }) => {
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMountedRef = React.useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }
    if (content.trim() === '') {
      alert('내용을 입력하세요.');
      return;
    }
    try {
      setIsSubmitting(true);
      const newPost = {
        mbti: 'ISFJ',
        nickname: 'aaaa',
        content: content,
      };
      await axios.post('http://gdscmbti.duckdns.org:8080/api/board/write', newPost);
      
      if (isMountedRef.current) {
        onPostSubmit(content); // Add the content to the board
        setContent('');
        // Move the navigate logic here after the axios request
        navigate('/totalboard');
      }
      
    } 
    
    catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    navigate('/totalboard');
  };

  return (
<div className="flex items-center justify-center h-screen bg-gray-200">
  <div className="max-w-md w-4/5 mx-auto p-6 bg-white rounded-lg shadow-md">
  <div className="flex justify-center">
    <h1 className="text-3xl font-medium text-gray-900 dark:text-white">Board Writing</h1>
  </div>
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="글 내용을 입력해주세요."
        className="w-full h-40 rounded border border-gray-300 p-2 mb-4 resize-none"
      ></textarea>
      <div className="flex justify-between">
        <button
          type="button"
          className="bg-gray-300 text-gray-600 px-4 py-2 rounded"
          onClick={handlePrevious}
        >
          이전
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? '등록 중...' : '등록 및 이동'}
        </button>
      </div>
    </form>
  </div>
</div>


  );
};

export default WritePage;