import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Reply {
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
  replies: Reply[];
}

const BoardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [newReply, setNewReply] = useState<string>("");
  const [replyList, setReplyList] = useState<Reply[]>([]);
  const navigate = useNavigate();

  const fetchPostDetail = useCallback(async () => {
    try {
      const response = await axios.get<PostDetail>(
        `http://gdscmbti.duckdns.org:8080/api/board/${id}`
      );
      setPost(response.data);
      if (response.data.replies) {
        setReplyList(response.data.replies);
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchPostDetail();
  }, [fetchPostDetail]);

  const fetchReplies = useCallback(async () => {
    try {
      const response = await axios.get<Reply[]>(
        `http://gdscmbti.duckdns.org:8080/api/board/${id}/replies`
      );
      setReplyList(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    fetchPostDetail();
    fetchReplies(); // Fetch replies after fetching the post details
  }, [fetchPostDetail, fetchReplies]);


  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (newReply.trim() === "") {
      return;
    }
  
    try {
      const response = await axios.post<Reply>(
        `http://gdscmbti.duckdns.org:8080/api/board/${id}/reply`,
        {
          nickname: "종현1",
          content: newReply,
          mbti: "INTP",
          postId: id,
        }
      );
  
      setNewReply("");
      const newReplyData = response.data;
      setReplyList((prevReplyList) => [...prevReplyList, newReplyData]);
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleReplyDelete = async (replyId: number) => {
    try {
      await axios.delete(
        `http://gdscmbti.duckdns.org:8080/api/board/${id}/reply/${replyId}`
      );
      const updatedReplyList = replyList.filter(
        (reply) => reply.id !== replyId
      );
      setReplyList(updatedReplyList);
    } catch (error) {
      console.log(error);
    }
  };
  

  const handlePostDelete = async () => {
    try {
      await axios.delete(`http://gdscmbti.duckdns.org:8080/api/board/${id}`);
      navigate("/"); // 게시물 삭제 후 게시판 목록으로 이동
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
{replyList.map((reply, index) => (
  <div className="flex items-center" key={`reply-${index}`}>
    <h4 className="font-bold flex-shrink-0">{reply.nickname}</h4>
    <p className="text-sm flex-grow">{reply.content}</p>
    <button
      onClick={() => handleReplyDelete(reply.id)}
      className="text-red-500 hover:text-red-700"
    >
      삭제
    </button>
  </div>
))}


<form onSubmit={handleReplySubmit} className="mt-4" key="reply-form">
          <input
            type="text"
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="댓글을 입력하세요."
            className="border border-gray-300 rounded p-2 mr-2"
          />
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
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