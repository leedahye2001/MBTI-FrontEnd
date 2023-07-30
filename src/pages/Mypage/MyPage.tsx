import { useEffect } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userNameSelector, userEmailSelector, userAtom } from "../login/atoms";

const MyPage = () => {
  const userName = useRecoilValue(userNameSelector);
  const userEmail = useRecoilValue(userEmailSelector);
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
          <h1>My Page</h1>
          <p>Name: {userName}</p>
          <p>Email: {userEmail}</p>
        </>
      )}
    </div>
  );
};

export default MyPage;
