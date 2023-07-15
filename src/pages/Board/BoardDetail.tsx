import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Comment {
  id: number;
  nickname: string;
  content: string;
}

interface PostDetail {
  createdAt: string;
  updatedAt: string;
  id: number;
  mbti: string;
  nickname: string;
  content: string;
  comments: Comment[];
}

const BoardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [newComment, setNewComment] = useState<string>('');
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const navigate = useNavigate();

  const fetchPostDetail = useCallback(async () => {
    try {
      const response = await axios.get<PostDetail>(`http://localhost:8000/posts/${id}`);
      setPost(response.data);
      setCommentList(response.data.comments);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchPostDetail();
  }, [fetchPostDetail]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newComment.trim() === '') {
      return;
    }

    try {
      const response = await axios.post<Comment>(
        `http://localhost:8000/posts/${id}/comments`,
        {
          nickname: '종현1',
          content: newComment,
          mbti: 'INTP',
          postId: id,
        }
      );

      setNewComment('');
      const newCommentData = response.data;
      const updatedCommentList = [...commentList, newCommentData];
      setCommentList(updatedCommentList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentDelete = async (commentId: number) => {
    try {
      await axios.delete(`http://localhost:8000/posts/${id}/comments/${commentId}`);
      const updatedCommentList = commentList.filter((comment) => comment.id !== commentId);
      setCommentList(updatedCommentList);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/posts/${id}`);
      navigate('/'); // Navigate to the board list after deleting the post
    } catch (error) {
      console.log(error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="bg-white shadow p-4 mb-4 text-center">
        <h2 className="text-xl font-bold mb-2">{post.nickname}</h2>
        <p className="text-base">{post.content}</p>
      </div>
      <div className="bg-white shadow p-4">
        <h3 className="text-lg font-bold mb-2">댓글</h3>
        {commentList.map((comment) => (
          <div className="flex items-center" key={comment.id}>
            <h4 className="font-bold flex-shrink-0">{comment.nickname}</h4>
            <p className="text-sm flex-grow">{comment.content}</p>
            <button
              onClick={() => handleCommentDelete(comment.id)}
              className="text-red-500 hover:text-red-700"
            >
              삭제
            </button>
          </div>
        ))}
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력하세요."
            className="border border-gray-300 rounded p-2 mr-2"
          />
          <button type="submit" className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            댓글 작성
          </button>
        </form>
      </div>
      <button
        onClick={handlePostDelete}
        className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2 mr-2 mb-2"
      >
        게시글 삭제
      </button>
    </div>
  );
};

export default BoardDetail;
