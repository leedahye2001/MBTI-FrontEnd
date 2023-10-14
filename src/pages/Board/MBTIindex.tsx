import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdComment, MdCreate } from "react-icons/md";
import Pagination from "../../components/Pagination";

interface Post {
  id: number;
  name: string;
  content: string;
  mbti: string;
  password: string;
}

const MBTIBoard: React.FC = () => {
  const [postList, setPostList] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedMbti, setSelectedMbti] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [confirmFiltering, setConfirmFiltering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [postIdToModify, setPostIdToModify] = useState<number | null>(null);


  const handleMbtiCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedMbti((prevSelectedMbti) => {
      if (checked) {
        return [...prevSelectedMbti, value];
      } else {
        return prevSelectedMbti.filter((mbti) => mbti !== value);
      }
    });
    setConfirmFiltering(false); // Reset the confirmFiltering state when checkboxes are changed
  };

  
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get<Post[]>("https://gdscmbti.duckdns.org/api/board");
      setPostList(response.data);
      setFilteredPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const applyFilters = useCallback(() => {
    const updatedFilteredPosts =
      selectedMbti.length > 0
        ? postList.filter((post) => selectedMbti.includes(post.mbti))
        : postList;
    setFilteredPosts(updatedFilteredPosts);
  }, [selectedMbti, postList]);

  useEffect(() => {
    if (confirmFiltering) {
      applyFilters();
      setCurrentPage(1);
    }
  }, [selectedMbti, confirmFiltering, applyFilters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  };

  const handleButtonClick = () => {
    navigate("/writepage");
  };

  const handlePostDelete = async (id: number) => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?");
    if (confirmDelete) {
      try {
        await axios.delete(`https://gdscmbti.duckdns.org/api/board/${id}`);
        fetchData();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePostDetail = (postId: number) => {
    navigate(`/totalboarddetail/${postId}`);
  };

  const handleBoardModify = (postId: number) => {
    setPostIdToModify(postId);
    setIsModalOpen(true);
  };

  const handleApplyFilters = () => {
    const confirmFilter = window.confirm("정말 필터링 하시겠습니까?");
    if (confirmFilter) {
      setConfirmFiltering(true);
    } else {
      setConfirmFiltering(false);
    }
  };

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const verifyPassword = () => {
    // 여기에서 비밀번호 확인을 수행
    // 비밀번호가 올바를 경우 게시글 수정 페이지로 이동하도록 구현

    // 비밀번호 확인이 성공했을 때
    if (password === "비밀번호123" && postIdToModify !== null) {
      navigate(`/boardmodify/${postIdToModify}`);
      setIsModalOpen(false);
    } else {
      alert("비밀번호가 올바르지 않거나 게시물을 선택하지 않았습니다.");
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>비밀번호 확인</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 입력"
            />
            <button onClick={verifyPassword}>확인</button>
            <button onClick={() => setIsModalOpen(false)}>닫기</button>
          </div>
        </div>
      )}

      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          {/* MBTI Checkboxes */}
          <div className="flex flex-wrap items-center justify-center mt-10">
            {[
              "ISTJ",
              "ISFJ",
              "INFJ",
              "INTJ",
              "ISTP",
              "ISFP",
              "INFP",
              "INTP",
              "ESTP",
              "ESFP",
              "ENFP",
              "ENTP",
              "ESTJ",
              "ESFJ",
              "ENFJ",
            ].map((mbti) => (
              <div className="flex items-center mr-4" key={mbti}>
                <input
                  checked={selectedMbti.includes(mbti)}
                  id={`${mbti.toLowerCase()}-checkbox`}
                  type="checkbox"
                  value={mbti}
                  className={`w-4 h-4 text-${mbti.toLowerCase()}-600 bg-gray-100 border-gray-300 rounded focus:ring-${mbti.toLowerCase()}-500 dark:focus:ring-${mbti.toLowerCase()}-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
                  onChange={handleMbtiCheckboxChange}
                />
                <label
                  htmlFor={`${mbti.toLowerCase()}-checkbox`}
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {mbti}
                </label>
              </div>
            ))}
            <button
              className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded shadow ml-4"
              onClick={handleApplyFilters}
            >
              적용
            </button>
          </div>

          {/* Render Posts */}
          {currentPosts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-300 rounded-lg p-4 m-10 relative"
            >
              <h2 className="font-bold text-xl mb-2 font-custom">
                {post.name}
              </h2>
              <p className="font-custom">{post.content}</p>
              <div className="flex mt-2">
                <button
                  className="text-blue-500 hover-bg-blue-700 mr-2"
                  onClick={() => handlePostDetail(post.id)}
                >
                  <MdComment />
                </button>
                <button
                  className="text-blue-500 hover-bg-blue-700 mr-2"
                  onClick={() => handleBoardModify(post.id)}
                >
                  <MdCreate />
                </button>
                <button
                  className="text-red-500 hover-bg-red-700"
                  onClick={() => handlePostDelete(post.id)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredPosts.length / itemsPerPage)}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>

          {/* Write Button */}
          <div className="flex m-4">
            <button
              className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded shadow ml-auto"
              onClick={handleButtonClick}
            >
              글 작성
            </button>
          </div>
        </div>

        {/* Footer */}
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
