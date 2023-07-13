import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Comment {
  id: number;
  author: string;
  content: string;
}

interface PostDetail {
  id: number;
  nickname: string;
  content: string;
  comments: Comment[];
}

const BoardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostDetail | null>(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await axios.get<PostDetail>(`http://localhost:8000/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPostDetail();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="bg-white shadow  p-4 mb-4 text-center">
        <h2 className="text-xl font-bold mb-2">{post.nickname}</h2>
        <p className="text-base">{post.content}</p>
      </div>
      <div className="bg-white shadow  p-4">
        <h3 className="text-lg font-bold mb-2">댓글</h3>
        {post.comments && post.comments.map((comment) => (
          <div key={comment.id} className="mb-4">
            <h4 className="font-bold">{comment.author}</h4>
            <p className="text-sm">{comment.content}</p>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardDetail;
