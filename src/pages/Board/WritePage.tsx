import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useRecoilValue, useSetRecoilState } from "recoil";

import {
  userNameSelector,
  userAtom,
  userEmailSelector,
  isAuthenticatedAtom,
} from "../login/atoms";

interface WritePageProps {
  onPostSubmit: (content: string) => void;
}

const WritePage: React.FC<WritePageProps> = ({ onPostSubmit }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMountedRef = React.useRef(true);

  const userName = useRecoilValue(userNameSelector);
  const setUser = useSetRecoilState(userAtom);
  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);

  const userEmail = useRecoilValue(userEmailSelector);

  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(
        "https://gdscmbti.duckdns.org/v1/oauth/member/info",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true, // Send cookies automatically
        }
      );
      console.log(response.data);
      const userInfo = response.data;
      setUser(userInfo); // Save user information in Recoil atom
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response);
      } else {
        console.error("Other error:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);


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
      alert('Please enter content and a nickname.');
      return;
    }
    try {
      setIsSubmitting(true);
      
      const newPost = {
        mbti: "ISFJ",
        content: content,
        email: userEmail,
      };
      await axios.post('https://gdscmbti.duckdns.org/api/board/write', newPost);

      if (isMountedRef.current) {
        onPostSubmit(content); // Add the content to the board
        setContent('');
        navigate('/mbtiboard');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevious = () => {
    navigate('/mbtiboard');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="max-w-md w-4/5 mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center">
          <h1 className="text-3xl font-medium text-gray-900 dark:text-white">👇 Write Something!</h1>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          {isAuthenticated && userName && (
            <p className="font-bold text-xl mb-2 font-custom">{userName}</p>
          )}
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Start writing here!"
            className="w-full h-40 rounded border border-gray-300 p-2 mb-4 resize-none"
          ></textarea>
          <div className="flex justify-between">
            <button
              type="button"
              className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={handlePrevious}
            >
              Go to Board
            </button>
            <button
              type="submit"
              className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Write'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WritePage;