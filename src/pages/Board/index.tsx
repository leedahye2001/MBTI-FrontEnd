import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdComment, MdCreate } from "react-icons/md";
import Pagination from "../../components/Pagination";

interface Post {
  id: number;
  nickname: string;
  content: string;
  mbti: string;
}

const Board: React.FC = () => {
  const [postList, setPostList] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get<Post[]>("http://gdscmbti.duckdns.org:8080/api/board");
      setPostList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    const confirmed = window.confirm("정말 삭제하시겠습니까?");

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`http://gdscmbti.duckdns.org:8080/api/board/${postId}`);
      fetchData(); // Refetch the data after deleting the post
    } catch (error) {
      console.log(error);
    }
  };

  const handlePostDetail = (postId: number) => {
    navigate(`/totalboarddetail/${postId}`);
  };

  const handleBoardModify = (postId: number) => {
    navigate(`/boardmodify/${postId}`);
  };

  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          {currentPosts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-300 rounded-lg p-4 m-10 relative w-[calc(100% - 16rem)]"
            >
              <h2 className="font-bold text-xl mb-2 font-custom">
                {post.nickname}
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
          <div className="flex justify-center mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(postList.length / itemsPerPage)}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </div>
          <div className="flex m-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow ml-auto"
              onClick={handleButtonClick}
            >
              글 작성
            </button>
          </div>
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

export default Board;
