// import React from "react";

// interface MbtiResultProps {
//   mbtiResult: string;
// }

// const MbtiResult: React.FC<MbtiResultProps> = ({ mbtiResult }) => {
//   return (
//     <div className="flex flex-1 items-center justify-center h-screen bg-primary-200">
//       <div className="flex items-center justify-center">
//         <h1 className="text-center font-light text-white text-[18px] p-4">
//           {mbtiResult}
//         </h1>
//       </div>
//     </div>
//   );
// };

// export default MbtiResult;

import React from "react";
import ENTPImage from "../../assets/MbtiResult/ENTP - Apple - 결과.png";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

interface MbtiResultProps {
  mbtiResult: string;
}

const MbtiResult: React.FC<MbtiResultProps> = ({ mbtiResult }) => {
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

  const handleNavigation = () => {
    navigate("/test");
  };

  return (
    <div className="flex flex-1 items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center justify-center pb-4">
        {imagePath && (
          <img
            className="h-screen"
            src={imagePath}
            alt={`MBTI Result - ${mbtiResult}`}
          />
        )}
        <Button onClick={handleNavigation}>다시 테스트 하러 가기 ❗️</Button>
      </div>
    </div>
  );
};

export default MbtiResult;
