
import { useRecoilValue } from "recoil";
import { userNameSelector, userEmailSelector } from "../login/atoms";

const MyPage = () => {
  const userName = useRecoilValue(userNameSelector);
  const userEmail = useRecoilValue(userEmailSelector);

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
