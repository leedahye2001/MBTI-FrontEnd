// // import React, { useEffect } from "react";
// // import {
// //   GoogleOAuthProvider,
// //   GoogleLogin,
// //   googleLogout,
// //   CredentialResponse,
// // } from "@react-oauth/google";
// // import axios from "axios";
// // import { useRecoilState } from "recoil";
// // import { isAuthenticatedAtom, userAtom } from "./atoms";
// // import Button from "../../components/Button";
// // import { useNavigate } from "react-router-dom";

// // interface LoginPageProps {
// //   onLogin: () => void; // App.tsx에서 로그아웃을 처리할 함수를 props로 전달받음
// //   onLogout: (isLoggedOut: boolean) => void;
// // }

// // const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onLogout }) => {
// //   const [isAuthenticated, setIsAuthenticated] =
// //     useRecoilState(isAuthenticatedAtom);
// //   const [user, setUser] = useRecoilState(userAtom);
// //   const navigate = useNavigate();

// //   const sendTokenToServer = async (idToken: string) => {
// //     try {
// //       const response = await axios.post(
// //         "http://gdscmbti.duckdns.org:8080/v1/oauth/login",
// //         { idToken }
// //       );
// //       console.log("서버에서 넘겨 받은 유저 정보:", response.data);
// //       setIsAuthenticated(true);
// //       setUser(response.data); // 서버로부터 받은 사용자 정보를 Recoil atom에 저장
// //     } catch (error) {
// //       console.error("토큰 조회 실패:", error);
// //     }
// //   };

// //   const handleNavigation = () => {
// //     navigate("/test");
// //   };

// //   const handleLogout = () => {
// //     alert("로그아웃 하시겠습니까?");
// //     googleLogout();
// //     setIsAuthenticated(false); // 사용자 인증 상태를 false로 변경하여 로그아웃 처리
// //     setUser({ name: "", email: "" }); // 사용자 정보 초기화
// //     onLogout(true); // 로그아웃 처리를 App.tsx로 전달
// //   };

// //   useEffect(() => {
// //     // 페이지 로드될 때 localStaorage에 저장된 유저 정보 확인해서 로그인 상태 업데이트
// //     const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
// //     setIsAuthenticated(!!storedUser.name); // 유저 정보 있으면 로그인으로 설정
// //     setUser(storedUser);
// //   }, []); // [] => 한번만 실행되도록 함

// //   return (
// //     <GoogleOAuthProvider clientId="30471056996-73pcva8f87e441abujp8bevhc9r7th71.apps.googleusercontent.com">
// //       {/* {isAuthenticated ? (
// //         <div className="flex flex-col text-center items-center py-2 gap-2">
// //           <Button onClick={handleNavigation}>테스트 하러 가기 🚀</Button>
// //           <h1 className="text-[#333]" onClick={handleLogout}>
// //             로그아웃
// //           </h1>
// //         </div>
// //       ) : ( */}
// //       <GoogleLogin
// //         onSuccess={(credentialResponse: CredentialResponse) => {
// //           const idToken = credentialResponse.credential;
// //           if (idToken) {
// //             sendTokenToServer(idToken);
// //             onLogin(); // 로그인 성공 시 호출되는 콜백 함수를 호출
// //           } else {
// //             console.error("Invalid credential response:", credentialResponse);
// //           }
// //         }}
// //       />
// //       {/* )} */}
// //     </GoogleOAuthProvider>
// //   );
// // };

// // export default LoginPage;

// import React, { useEffect } from "react";
// import {
//   GoogleOAuthProvider,
//   GoogleLogin,
//   googleLogout,
//   CredentialResponse,
// } from "@react-oauth/google";
// import axios from "axios";
// import { useRecoilState } from "recoil";
// import { isAuthenticatedAtom, userAtom } from "./atoms";
// import Button from "../../components/Button";
// import { useNavigate } from "react-router-dom";

// interface LoginPageProps {
//   onLogin: () => void;
//   onLogout: (isLoggedOut: boolean) => void;
// }

// const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onLogout }) => {
//   const [isAuthenticated, setIsAuthenticated] =
//     useRecoilState(isAuthenticatedAtom);
//   const [user, setUser] = useRecoilState(userAtom);
//   const navigate = useNavigate();

//   const sendTokenToServer = async (idToken: string) => {
//     try {
//       const response = await axios.post(
//         "http://gdscmbti.duckdns.org:8080/v1/oauth/login",
//         { idToken }
//       );
//       console.log("서버에서 넘겨 받은 유저 정보:", response.data);
//       setIsAuthenticated(true);
//       setUser(response.data); // 서버로부터 받은 사용자 정보를 Recoil atom에 저장
//     } catch (error) {
//       console.error("토큰 조회 실패:", error);
//     }
//   };

//   const handleNavigation = () => {
//     navigate("/test");
//   };

//   const handleLogout = () => {
//     alert("로그아웃 하시겠습니까?");
//     googleLogout();
//     setIsAuthenticated(false); // 사용자 인증 상태를 false로 변경하여 로그아웃 처리
//     setUser({ name: "", email: "" }); // 사용자 정보 초기화
//     onLogout(false); // 로그아웃 처리를 App.tsx로 전달
//   };

//   useEffect(() => {
//     // 페이지 로드될 때 localStaorage에 저장된 유저 정보 확인해서 로그인 상태 업데이트
//     const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
//     setIsAuthenticated(!!storedUser.name); // 유저 정보 있으면 로그인으로 설정
//     setUser(storedUser);
//   }, []); // [] => 한번만 실행되도록 함

//   return (
//     <GoogleOAuthProvider clientId="30471056996-73pcva8f87e441abujp8bevhc9r7th71.apps.googleusercontent.com">
//       {isAuthenticated ? (
//         <div>
//           <Button onClick={handleNavigation}>테스트 하러 가기 🚀</Button>
//           <Button onClick={handleLogout}>로그아웃</Button>
//         </div>
//       ) : (
//         <GoogleLogin
//           onSuccess={(credentialResponse: CredentialResponse) => {
//             const idToken = credentialResponse.credential;
//             if (idToken) {
//               sendTokenToServer(idToken);
//               onLogin(); // 로그인 성공 시 호출되는 콜백 함수를 호출
//             } else {
//               console.error("Invalid credential response:", credentialResponse);
//             }
//           }}
//           render={({ onClick }) => (
//             <Button onClick={onClick}>Google 로그인</Button>
//           )}
//         />
//       )}
//     </GoogleOAuthProvider>
//   );
// };

// export default LoginPage;

import React, { useEffect } from "react";
import {
  GoogleOAuthProvider,
  googleLogout,
  CredentialResponse,
  GoogleLogin,
} from "@react-oauth/google";
import axios from "axios";
import { useRecoilState } from "recoil";
import { isAuthenticatedAtom, userAtom } from "./atoms";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";

interface LoginPageProps {
  onLogin: () => void;
  onLogout: (isLoggedOut: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onLogout }) => {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const navigate = useNavigate();

  const sendTokenToServer = async (idToken: string) => {
    try {
      const response = await axios.post(
        "http://gdscmbti.duckdns.org:8080/v1/oauth/login",
        { idToken }
      );
      console.log("서버에서 넘겨 받은 유저 정보:", response.data);
      setIsAuthenticated(true);
      setUser(response.data); // 서버로부터 받은 사용자 정보를 Recoil atom에 저장
    } catch (error) {
      console.error("토큰 조회 실패:", error);
    }
  };

  const handleNavigation = () => {
    navigate("/test");
  };

  const handleLogout = () => {
    alert("로그아웃 하시겠습니까?");
    googleLogout();
    setIsAuthenticated(false); // 사용자 인증 상태를 false로 변경하여 로그아웃 처리
    setUser({ name: "", email: "" }); // 사용자 정보 초기화
    onLogout(false); // 로그아웃 처리를 App.tsx로 전달
  };

  useEffect(() => {
    // 페이지 로드될 때 localStaorage에 저장된 유저 정보 확인해서 로그인 상태 업데이트
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setIsAuthenticated(!!storedUser.name); // 유저 정보 있으면 로그인으로 설정
    setUser(storedUser);
  }, []); // [] => 한번만 실행되도록 함

  return (
    <GoogleOAuthProvider clientId="30471056996-73pcva8f87e441abujp8bevhc9r7th71.apps.googleusercontent.com">
      {isAuthenticated ? (
        <div>
          <Button onClick={handleNavigation}>테스트 하러 가기 🚀</Button>
          <Button onClick={handleLogout}>로그아웃</Button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={(credentialResponse: CredentialResponse) => {
            const idToken = credentialResponse.credential;
            if (idToken) {
              sendTokenToServer(idToken);
              onLogin(); // 로그인 성공 시 호출되는 콜백 함수를 호출
            } else {
              console.error("Invalid credential response:", credentialResponse);
            }
          }}
        ></GoogleLogin>
      )}
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
