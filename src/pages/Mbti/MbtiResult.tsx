import React from "react";
import ENTPImage from "../../assets/MbtiResult/ENTP - Apple - 결과.png";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

interface MbtiResultProps {
  mbtiResult: string;
  showResult: boolean;
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
  onRestartTest: () => void;
}

const MbtiResult: React.FC<MbtiResultProps> = ({
  mbtiResult,
  setShowResult,
  onRestartTest,
}) => {
  const getImagePath = (result: string) => {
    switch (result.toLowerCase()) {
      case "entp":
        return ENTPImage;
      // case "intj":
      //   return INTJImage;
      // case "isfp":
      //   return ISFPImage;
      // ...
      default:
        return null;
    }
  };

  const navigate = useNavigate();
  const imagePath = getImagePath(mbtiResult);

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-center">
        {imagePath && (
          <img
            className="h-[100vh]"
            src={imagePath}
            alt={`MBTI Result - ${mbtiResult}`}
          />
        )}
        <div className="flex flex-col gap-2 my-10">
          <Button
            onClick={() => {
              onRestartTest();
              setShowResult(false);
            }}
          >
            다시 테스트 하러 가기 ⏎
          </Button>
          <div
            onClick={() => {
              navigate("/");
            }}
            className="flex py-2 justify-center text-center items-center gap-2 rounded-full bg-[#e8e8e8]"
          >
            <AiFillHome />
            <h1 className="text-[12px] text-[#333] hover:cursor-pointer hover:underline">
              홈으로 이동
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MbtiResult;
