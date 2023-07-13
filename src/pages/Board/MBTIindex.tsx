import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


interface Post {
  id: number;
  nickname: string;
  content: string;
  mbti: string;
}

const MBTIBoard: React.FC = () => {
  const [postList, setPostList] = useState<Post[]>([]);
 

  const fetchData = async () => {
    try {
      const response = await axios.get<Post[]>('http://localhost:8000/posts');
      setPostList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <>
<span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">INTJ</span>
<span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">INTP</span>
<span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">ENTJ</span>
<span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">ENTP</span>
<span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">INFJ</span>
<span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">INFP</span>
<span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">ENFJ</span>
<span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">ENFP</span>
<span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">ISTJ</span>
<span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">ISTP</span>
<span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">ESTJ</span>
<span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">ESTP</span>
<span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">ISFJ</span>
<span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">ISFP</span>
<span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10">ESFJ</span>
<span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">ESFP</span>

    <div className="flex flex-col min-h-screen">
      
      <div className="flex-grow">
      
        {postList.map((post) => (
          <Link to={`/posts/${post.id}`} key={post.id}>
            <div className=" border border-gray-300 rounded-lg p-4 m-10">
              <h2 className="font-bold text-xl mb-2 font-custom">{post.nickname}</h2>
              <p className="font-custom">{post.content}</p>
            </div>
          </Link>
        ))}
      </div>
      <footer className="bg-gray-200 py-4 text-center shadow-lg">
        <div className="container mx-auto px-4">
          <p className="text-gray-600 text-sm">GDSC 2nd Project MBTI</p>
        </div>
      </footer>


    </div>
    
    </>
    
  );
};

export default MBTIBoard;
