import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdComment, MdCreate } from "react-icons/md";
import Pagination from "../../components/Pagination";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { userNameSelector, userAtom } from "../login/atoms";


interface Post {
  id: number;
  nickname: string;
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

    if (userName !== postList.find(post => post.id === id)?.nickname) {
      alert("게시글 작성자만 삭제할 수 있습니다.");
      return;
    }
    
      const confirmDelete = window.confirm("정말 삭제할거야?");
      if (confirmDelete) {
        try {
          await axios.delete(`https://gdscmbti.duckdns.org/api/board/${id}`);
          fetchData(); // Refetch the data after deleting the post
        } catch (error) {
          console.log(error);
        }
      }
    

  };

  const handlePostDetail = (postId: number) => {
    navigate(`/totalboarddetail/${postId}`);
  };

  const handleBoardModify = (postId: number) => {

    const post = postList.find(post => post.id === postId);
    if (userName !== post?.nickname) {
      alert("게시글 작성자만 수정할 수 있습니다.");
      return;
    }

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
    const confirmFilter = window.confirm("정말 적용할거야?");
    if (confirmFilter) {
      setConfirmFiltering(true);
    } else {
      setConfirmFiltering(false); // Reset the confirmFiltering state if the user cancels the confirmation
    }
  };

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleSelectAll = () => {
    if (selectedMbti.length === 15) {
      // If all MBTI is already selected, clear the selection
      setSelectedMbti([]);
    } else {
      // If not all MBTI is selected, select all
      setSelectedMbti([
        "ISTJ", "ISFJ", "INFJ", "INTJ",
        "ISTP", "ISFP", "INFP", "INTP",
        "ESTP", "ESFP", "ENFP", "ENTP",
        "ESTJ", "ESFJ", "ENFJ"
      ]);
    }
    setConfirmFiltering(false); // Reset the confirmFiltering state when the "전체" checkbox is clicked
  };


  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
        
          <div className="flex flex-wrap items-center justify-center mt-10">
            <div className="grid grid-cols-4 gap-4">
              <div className="flex items-center">
                <input
                  checked={selectedMbti.length === 15}
                  id="all-checkbox"
                  type="checkbox"
                  value="전체"
                  className={`w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500 dark:focus:ring-gray-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
                  onChange={handleSelectAll}
                />
                <label
                  htmlFor="all-checkbox"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  전체
                </label>
              </div>
              {[
                "ISTJ", "ISFJ", "INFJ", 
                "INTJ","ISTP", "ISFP", "INFP",
                 "INTP","ESTP", "ESFP", "ENFP", 
                "ENTP","ESTJ", "ESFJ", "ENFJ"
              ].map((mbti) => (
                <div className="flex items-center" key={mbti}>
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
              <div className="col-span-4 flex justify-center mt-4">
                <button
                  className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  onClick={handleApplyFilters}
                >
                  적용
                </button>
              </div>
            </div>
          </div>

          {currentPosts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-300 rounded-lg p-4 m-10 relative"
            >
              
              {userName && ( 
              <h2 className="font-bold text-xl mb-2 font-custom">{userName}</h2>)
              }
              
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

      
          <div className="flex justify-center mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredPosts.length / itemsPerPage)}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>

  
          <div className="flex justify-end m-4">
              <button
              className="bg-gradient-to-r from-orange-500 to-blue-700 text-white font-bold py-2 px-4 rounded shadow inline-flex items-center justify-center space-x-2 mb-2 mr-2 text-sm font-medium text-gray-900 rounded-lg group group-hover:from-teal-300 group-hover:to-lime-300 focus:ring-4 focus:outline-none focus:ring-lime-200"
              onClick={handleButtonClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>낙서하기</span>
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default MBTIBoard;