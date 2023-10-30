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
}

const MBTIBoard: React.FC = () => {


  const [postList, setPostList] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedMbti, setSelectedMbti] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [confirmFiltering, setConfirmFiltering] = useState(false);

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
  
  const handlePostDelete = async (postId: number) => {
    const password = prompt("게시물을 삭제하려면 비밀번호를 입력하세요.");
  
    if (password !== null) {
      try {
        // 비밀번호와 게시글 ID를 서버로 전송
        const response = await axios.delete(
          `https://gdscmbti.duckdns.org/api/board/${postId}`,
          {
            data: { password },
          }
        );
  
        if (response.data.success) {
          // 삭제 요청이 성공한 경우
          const updatedPosts = postList.filter((post) => post.id !== postId);
          setPostList(updatedPosts);
          setFilteredPosts(updatedPosts);
        } else {
          alert("정상적으로 삭제되었습니다.");
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };
  
  
  

  const handlePostDetail = (postId: number) => {
    navigate(`/totalboarddetail/${postId}`);
  };

  const handleBoardModify = (postId: number) => {
    navigate(`/boardmodify/${postId}`);
  };

  const handleMbtiCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const handleApplyFilters = () => {
    const confirmFilter = window.confirm("정말 필터링 하시겠습니까?");
    if (confirmFilter) {
      setConfirmFiltering(true);
    } else {
      setConfirmFiltering(false); // Reset the confirmFiltering state if the user cancels the confirmation
    }
  };

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          {/* MBTI Checkboxes */}
          <div className="flex flex-wrap items-center justify-center mt-10">
            {" "}
            {/* Center align the checkboxes */}
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow ml-4 bg-gradient-to-r from-blue-500 to-blue-700" // Apply gradient background
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
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  onClick={() => handlePostDetail(post.id)}
                >
                  <MdComment />
                </button>

                <button
                  className="text-blue-500 hover:text-blue-700 mr-2"
                  onClick={() => handleBoardModify(post.id)}
                >
                  <MdCreate />
                </button>

                <button
                  className="text-red-500 hover:text-red-700"
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
              className="bg-blue-500 hover:bg-blue-700 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 px-4 rounded shadow ml-auto"
              onClick={handleButtonClick}
            >
              글 작성
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MBTIBoard;
