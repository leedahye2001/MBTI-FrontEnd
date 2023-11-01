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
  const [content, setContent] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
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
      if (post) {
        // Check if the content has changed
        const hasContentChanged = content !== post.content;

        if (hasContentChanged) {
          // Update the post with the new content
          await axios.put(`https://gdscmbti.duckdns.org/api/board/${id}`, { ...post, content });
        }
        alert('글이 수정되었습니다.');
        navigate(`/mbtiboard`);
      } else {
        alert('포스트를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handlePrevious = () => {
    navigate('/mbtiboard');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="max-w-md w-4/5 mx-auto p-4 bg-white rounded-lg">
        <div className="flex justify-center">
          <h1 className="text-3xl font-medium text-gray-900 dark:text-white">👇 Modify Something!</h1>
        </div>
        <form onSubmit={handleFormSubmit} className="mt-4">
          <textarea
            value={content}
            onChange={handleInputChange}
            className="w-full h-40 rounded border border-gray-300 p-2 mb-4 resize-none"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="비밀번호 입력"
            className="w-full rounded border border-gray-300 p-2 mb-4"
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
