import React from "react";

interface MbtiResultProps {
  mbtiResult: string;
}

const MbtiResult: React.FC<MbtiResultProps> = ({ mbtiResult }) => {
  return (
    <div className="flex flex-1 items-center justify-center h-screen bg-primary-200">
      <div className="flex items-center justify-center">
        <h1 className="text-center font-light text-white text-[18px] p-4">
          {mbtiResult}
        </h1>
      </div>
    </div>
  );
};

export default MbtiResult;
