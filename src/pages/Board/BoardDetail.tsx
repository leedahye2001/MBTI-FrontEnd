import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { userNameSelector, userAtom } from "../login/atoms";

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
  const [editingReplyId, setEditingReplyId] = useState<number | null>(null);
  const [editedReplies, setEditedReplies] = useState<{ [key: number]: string }>(
    {}
  );

  const userName = useRecoilValue(userNameSelector);
  const setUser = useSetRecoilState(userAtom);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(
        "https://gdscmbti.duckdns.org/v1/oauth/member/info",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true, // 쿠키를 자동으로 전송하기 위해 설정
        }
      );
      console.log(response.data);
      const userInfo = response.data;
      setUser(userInfo); // Recoil atom에 사용자 정보 저장
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



  const navigate = useNavigate();

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
    fetchReplies();
  }, [fetchReplies]);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newReply.trim() === "") {
      return;
    }

    try {
      await axios.post<Reply>(
        `https://gdscmbti.duckdns.org/api/board/${id}/reply`,
        {
          content: newReply,
          mbti: "INTP",
          postId: id,
        }
      );

      setNewReply("");
      fetchReplies();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReplyDelete = async (replyId: number) => {

    if (userName !== replyList.find(reply => reply.id === replyId)?.nickname) {
      alert("댓글 작성자만 삭제할 수 있습니다.");
      return;
    }

    try {
      await axios.delete(
        `https://gdscmbti.duckdns.org/api/board/${id}/reply/${replyId}`
      );
      const updatedReplyList = replyList.filter((reply) => reply.id !== replyId);
      setReplyList(updatedReplyList);
      window.confirm("정말 삭제할거야?");
    } catch (error) {
      console.log(error);
    }
  };

  const handleReplyEdit = (replyId: number) => {
   
    const replyToEdit = replyList.find((reply) => reply.id === replyId);

    if (userName !== replyToEdit?.nickname) {
      alert("댓글 작성자만 수정할 수 있습니다.");
      return;
    }
  
   
    if (replyToEdit) {
      setEditedReplies({
        ...editedReplies,
        [replyId]: replyToEdit.content,
      });
    }
  
    // Set the editingReplyId to the current replyId to indicate the edit mode
    setEditingReplyId(replyId);
  };

  const handleReplyUpdate = async (replyId: number) => {
    const updatedContent = editedReplies[replyId];

    if (!updatedContent?.trim()) {
      return;
    }

    try {
      await axios.put(
        `https://gdscmbti.duckdns.org/api/board/${id}/reply/${replyId}`,
        {
          content: updatedContent,
        }
      );
      setEditingReplyId(null);
      fetchReplies();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReplySubmitEdit = async (replyId: number) => {
    const updatedContent = editedReplies[replyId];

    if (!updatedContent?.trim()) {
      return;
    }

    const replyToEdit = replyList.find(reply => reply.id === replyId);
    if (userName !== replyToEdit?.nickname) {
      alert("댓글 작성자만 수정할 수 있습니다.");
      return;
    }

    try {
      await axios.put(
        `https://gdscmbti.duckdns.org/api/board/${id}/reply/${replyId}`,
        {
          content: updatedContent,
        }
      );
      setEditingReplyId(null);
      fetchReplies();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReplyCancelEdit = () => {
    setEditingReplyId(null);
  };

  const handlePrevious = () => {
    navigate('/mbtiboard');
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="bg-white shadow p-4 mb-4 text-center">
      {userName && ( 
        <h2 className="font-bold text-xl mb-2 font-custom">{userName}</h2>)
      }
        <p className="text-base">{post.content}</p>
      </div>
      <div className="bg-white shadow p-4">
        <h3 className="text-lg font-bold mb-2">👇  댓글은 여기다 적어!</h3>
        {replyList.map((reply, index) => (
          <div className="flex items-center" key={`reply-${index}`}>
            {userName && ( 
            <h4 className="font-bold flex-shrink-0">{userName}</h4>)
            }
            {editingReplyId === reply.id ? (
              <>
                <input
                  type="text"
                  value={editedReplies[reply.id] || reply.content}
                  onChange={(e) => {
                    // Update the editedReplies state whenever the input field changes
                    setEditedReplies({
                      ...editedReplies,
                      [reply.id]: e.target.value,
                    });
                  }}
                  onBlur={() => handleReplyUpdate(reply.id)}
                  className="border border-gray-300 rounded p-2 mr-2"
                />
                <button
                  onClick={() => handleReplySubmitEdit(reply.id)}
                  className="text-green-500 hover:text-purple-700 mr-2"
                >
                  수정 완료
                </button>
                <button
                  onClick={handleReplyCancelEdit}
                  className="text-gray-500 hover:text-gray-700"
                >
                  취소
                </button>
              </>
            ) : (
              <>
                <p className="text-sm flex-grow">{reply.content}</p>
                <button
                  onClick={() => handleReplyEdit(reply.id)}
                  className="text-purple-500 hover:text-purple-700 mr-2"
                >
                  수정
                </button>
                <button
                  onClick={() => handleReplyDelete(reply.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  삭제
                </button>
              </>
            )}
          </div>
        ))}

        <form onSubmit={handleReplySubmit} className="mt-4">
          
          {userName && ( 
          <h4 className="font-bold text-xl mb-2 font-custom">{userName}</h4>)
          }
          <input
            type="text"
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="댓글을 입력하세요."
            className="border border-gray-300 rounded p-2 mr-2"
          />

          <button
            type="submit"
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            댓글 작성
          </button>
        </form>
      </div>
      <button
        onClick={handlePrevious}
        className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-5"
      >
        게시판으로
      </button>
    </div>
  );
};

export default BoardDetail;
