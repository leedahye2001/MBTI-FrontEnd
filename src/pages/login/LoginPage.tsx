import { useRecoilState } from 'recoil';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { atom } from 'recoil';
import { postLoginToken } from './postLoginToken';

// Recoil's atom state definition
const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,
});

const GoogleLoginPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);

  const handleLoginSuccess = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    try {
      console.log('로그인 성공:', response);
      const idToken = (response as GoogleLoginResponse).tokenId;
      
      // Call the postLoginToken function to send the token and receive the login status
      const loginSuccess = await postLoginToken(idToken);
      
      if (loginSuccess) {
        setIsLoggedIn(true);
        // 로그인 성공 후 처리할 로직 작성
      } else {
        // 로그인 실패 후 처리할 로직 작성
      }
    } catch (error) {
      console.error('토큰 전송 실패:', error);
      // Error handling logic
    }
  };

  const handleLoginFailure = (error: Error) => {
    console.error('로그인 실패:', error);
    // 로그인 실패 후 처리할 로직 작성
  };

  return (
    <div>
      {!isLoggedIn ? (
        <GoogleLogin
          clientId="30471056996-73pcva8f87e441abujp8bevhc9r7th71.apps.googleusercontent.com"
          buttonText="Google 로그인"
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
          cookiePolicy="single_host_origin"
        />
      ) : (
        <div>
          {/* 로그인 성공 시 표시할 컨텐츠 */}
          <h2>구글 로그인 성공!</h2>
          {/* 로그아웃 버튼 등 추가적인 기능 구현 */}
        </div>
      )}
    </div>
  );
};

export default GoogleLoginPage;