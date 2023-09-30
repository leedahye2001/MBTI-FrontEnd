import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Post {
  id: number;
  name: string;
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
        const response = await axios.get<Post>(`https://gdscmbti.duckdns.org/api/board/${id}`, { maxRedirects: 0 });
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
      await axios.put(`https://gdscmbti.duckdns.org/api/board/${id}`, { ...post, content }); // 글 수정 요청
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
          <h1 className="text-2xl font-medium text-gray-900 dark:text-white">좀 맘에 안들어? 그럼 수정해 👇</h1>
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
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={handlePrevious}
            >
              게시판으로
            </button>
            <button
              type="submit"
              className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
            >
              수정하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BoardModify;