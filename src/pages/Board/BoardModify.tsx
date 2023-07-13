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
  const { id } = useParams(); // URL 매개변수에서 글 ID 가져오기
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    // 글 ID를 기반으로 서버에서 글 내용 가져오기
    const fetchPost = async () => {
      try {
        const response = await axios.get<Post>(`http://localhost:8000/posts/${id}`);
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
      await axios.put(`http://localhost:8000/posts/${id}`, { ...post, content }); // 글 수정 요청
      navigate('/totalboard'); // 수정 완료 후 게시판 페이지로 이동
    } catch (error) {
      console.log(error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">글 수정하기</h1>
      <form onSubmit={handleFormSubmit} className="w-1/2">
        <textarea
          value={content}
          onChange={handleInputChange}
          className="w-full h-40 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow"
          >
            수정 완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default BoardModify;
