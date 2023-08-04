import React from "react";
import ENTPImage from "../../assets/MbtiResult/ENTP - Apple - 결과.png";
import INTJImage from "../../assets/MbtiResult/INTJ - Google - 결과.png";
import ISFPImage from "../../assets/MbtiResult/ISFP - Patagonia - 결과.png";
import ENFJImage from "../../assets/MbtiResult/ENFJ - Nike - 결과.png";
import INFPImage from "../../assets/MbtiResult/INFP - Netflix - 결과.png";
import ESFPImage from "../../assets/MbtiResult/ESFP - McDonald - 결과.png";
import ISTJImage from "../../assets/MbtiResult/ISTJ - Microsoft - 결과.png";
import ESTPImage from "../../assets/MbtiResult/ESTP - Samsung - 결과.png";
import INFJImage from "../../assets/MbtiResult/INFJ - Unicef - 결과.png";
import ESFJImage from "../../assets/MbtiResult/ESFJ - Coca-Cola - 결과.png";
import ISFJImage from "../../assets/MbtiResult/ISFJ - Walt Disney Company - 결과.png";
import ESTJImage from "../../assets/MbtiResult/ESTJ - Amazon - 결과.png";
import INTPImage from "../../assets/MbtiResult/INTP - Tesla - 결과.png";
import ENTJImage from "../../assets/MbtiResult/ENTJ - BMW - 결과.png";
import ISTPImage from "../../assets/MbtiResult/ISTP - Intel - 결과.png";
import ENFPImage from "../../assets/MbtiResult/ENFP - Facebook - 결과.png";

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
      case "intj":
        return INTJImage;
      case "isfp":
        return ISFPImage;
      case "enfj":
        return ENFJImage;
      case "infp":
        return INFPImage;
      case "esfp":
        return ESFPImage;
      case "istj":
        return ISTJImage;
      case "estp":
        return ESTPImage;
      case "infj":
        return INFJImage;
      case "esfj":
        return ESFJImage;
      case "isfj":
        return ISFJImage;
      case "estj":
        return ESTJImage;
      case "intp":
        return INTPImage;
      case "entj":
        return ENTJImage;
      case "istp":
        return ISTPImage;
      case "enfp":
        return ENFPImage;
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
