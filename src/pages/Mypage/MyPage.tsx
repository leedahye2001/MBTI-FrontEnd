import { useEffect } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userNameSelector, userEmailSelector, userProfileSelector, userAtom } from "../login/atoms";

const MyPage = () => {
  const userName = useRecoilValue(userNameSelector);
  const userEmail = useRecoilValue(userEmailSelector);
  const userProfile = useRecoilValue(userProfileSelector);
  const setUser = useSetRecoilState(userAtom);

  // 로그인한 사용자의 정보를 가져오는 함수
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

  return (
    <div>
      {userName && (
        <>
          
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            
              <div className="flex flex-col items-center pb-10 mt-7">
               <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={userProfile} alt="Profile" />
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userName}</h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{userEmail}</span>
                  <div className="flex mt-4 space-x-3 md:mt-6">
                    <button>로그아웃</button>
                  </div>
              </div>
          </div>
    
        </>
      )}
    </div>
  );
};

export default MyPage;
