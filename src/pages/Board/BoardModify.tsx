import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Post {
  id: number;
  name: string;
  content: string;
  mbti: string;
  password : string;
}

const BoardModify = () => {
  const { id } = useParams(); // URL 매개변수에서 글 ID 가져오기
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    // 글 ID를 기반으로 서버에서 글 내용 가져오기
    const fetchPost = async () => {
      try {
        const response = await axios.get<Post>(`https://gdscmbti.duckdns.org/api/board/${id}`);
        setPost(response.data);
        setContent(response.data.content);
      } catch (error) {
        console.log(error);
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
      navigate('/totalboard'); // 수정 완료 후 게시판 페이지로 이동
    } catch (error) {
      console.log(error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  const handlePrevious = () => {
    navigate('/totalboard');
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