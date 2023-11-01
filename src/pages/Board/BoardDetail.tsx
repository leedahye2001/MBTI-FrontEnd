import React, { useState, useEffect, useCallback } from "react";
import { useParams  } from "react-router-dom";
import axios from "axios";

interface Reply {
  id: number;
  mbti: string;
  name: string;
  content: string;
  password : string;
}

interface PostDetail {
  id: number;
  mbti: string;
  name: string;
  content: string;
  password : string;
  createdAt: string;
  updatedAt: string;
  replies: Reply[];
}

const BoardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [newReply, setNewReply] = useState<string>("");
  const [newReplyName, setNewReplyName] = useState<string>(""); // Add password state
  const [newReplyMbti, setnNewReplyMbti] = useState<string>(""); // Add password state
  const [newReplyPassword, setNewReplyPassword] = useState<string>(""); // Add password state
  const [replyList, setReplyList] = useState<Reply[]>([]);

  const fetchPostDetail = useCallback(async () => {
    try {
      const response = await axios.get<PostDetail>(
        `https://gdscmbti.duckdns.org/api/board/${id}`
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
        `https://gdscmbti.duckdns.org/api/board/${id}/reply`
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
       await axios.post<Reply>(
        `https://gdscmbti.duckdns.org/api/board/${id}/reply`,
        {
          mbti: newReplyMbti, 
          name: newReplyName,
          content: newReply,
          password : newReplyPassword, 
          postId: id
        }
      );
  
      setNewReply("");
      fetchReplies();
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleReplyDelete = async (replyId: number) => {
    try {
      await axios.delete(
        `https://gdscmbti.duckdns.org/api/board/${id}/reply/${replyId}`
      );
      const updatedReplyList = replyList.filter(
        (reply) => reply.id !== replyId
      );
      setReplyList(updatedReplyList);
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
        <h2 className="text-xl font-bold mb-2">{post.name}</h2>
        <p className="text-base">{post.content}</p>
      </div>
      <div className="bg-white shadow p-4">
        <h3 className="text-lg font-bold mb-2">댓글</h3>
{replyList.map((reply, index) => (
  <div className="flex items-center" key={`reply-${index}`}>
    <p className="text-sm flex-grow">{reply.name}</p>
    <p className="text-sm flex-grow">{reply.mbti}</p>
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
    value={newReplyName}
    onChange={(e) => setNewReplyName(e.target.value)}
    placeholder="이름을 입력하세요."
    className="border border-gray-300 rounded p-2 mr-2"
  />

  <input
    type="text"
    value={newReplyMbti}
    onChange={(e) => setnNewReplyMbti(e.target.value)}
    placeholder="본인의 mbti를 입력하세요."
    className="border border-gray-300 rounded p-2 mr-2"
  />

  <input
    type="text"
    value={newReply}
    onChange={(e) => setNewReply(e.target.value)}
    placeholder="댓글을 입력하세요."
    className="border border-gray-300 rounded p-2 mr-2"
  />

  <input
    type="password"
    value={newReplyPassword}
    onChange={(e) => setNewReplyPassword(e.target.value)}
    placeholder="비밀번호를 입력하세요."
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
    </div>
  );
};

export default BoardDetail;