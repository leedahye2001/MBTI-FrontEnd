import { useNavigate } from "react-router-dom";
import Button from "./components/Button";
import GoogleLogo from "./assets/GoogleLogo.svg.png";

const Index = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/test");
  };

  return (
    <section className="flex-1 flex items-center justify-center h-screen">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <p className="font-bold text-[23px]">MBTI 이용을 위해</p>
          <h1 className="font-bold text-[23px]">로그인을 해주세요 !</h1>
          <Button onClick={handleButtonClick} logoSrc={GoogleLogo}>
            Google 계정으로 로그인
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Index;
