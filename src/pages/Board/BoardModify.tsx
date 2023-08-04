import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Post {
  id: number;
  nickname: string;
  content: string;
  mbti: string;
}

const BoardModify = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get<Post>(`https://gdscmbti.ducknds.org/api/board/${id}`, { maxRedirects: 0 });
        setPost(response.data);
        setContent(response.data.content);
      } catch (err : any) { // 'error'를 'err'로 변경
        if (err.response && err.response.status === 302) {
          try {
            const redirectedResponse = await axios.get<Post>(err.response.headers.location);
            setPost(redirectedResponse.data);
            setContent(redirectedResponse.data.content);
          } catch (err) { // 'error'를 'err'로 변경
            console.log(err);
          }
        } else {
          console.log(err);
        }
      }
    };
  
    fetchPost();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`https://gdscmbti.ducknds.org/api/board/${id}`, { ...post, content }); // 글 수정 요청
      navigate('/mbtiboard'); // 수정 완료 후 게시판 페이지로 이동
    } catch (error) {
      console.log(error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  const handlePrevious = () => {
    navigate('/mbtiboard');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="max-w-md w-4/5 mx-auto p-4 bg-white rounded-lg">
        <div className="flex justify-center">
          <h1 className="text-3xl font-medium text-gray-900 dark:text-white">Board Modify</h1>
        </div>
        <form onSubmit={handleFormSubmit} className="mt-4">
          <textarea
            value={content}
            onChange={handleInputChange}
            className="w-full h-40 rounded border border-gray-300 p-2 mb-4 resize-none"
          />
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
            >
              수정 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardModify;
