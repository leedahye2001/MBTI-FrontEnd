import React, { useEffect, useState } from "react";
import axios from "axios";

interface Question {
  no: number;
  question_id: number;
  question_type: string;
  content: string;
}

const MbtiTest: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [mbtiResult, setMbtiResult] = useState<string>("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "http://gdscmbti.duckdns.org:8080/api/mbti/questions"
        );
        setQuestions(response.data.questions);
        setAnswers(new Array(response.data.questions.length).fill(false));
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerChange = (answer: boolean) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentPage] = answer;
    setAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentPage < questions.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://gdscmbti.duckdns.org:8080/api/mbti/result",
        {
          checkList: answers,
        }
      );
      setMbtiResult(response.data.mbti);
    } catch (error) {
      console.error("Error fetching MBTI result:", error);
    }
  };

  return (
    <>
      {questions.length > 0 && (
        <div>
          <p>{questions[currentPage].content}</p>
          <div>
            <label>
              <input
                type="checkbox"
                checked={answers[currentPage] || false}
                onChange={(e) => handleAnswerChange(e.target.checked)}
              />
              Yes
            </label>
            <label>
              <input
                type="checkbox"
                checked={!answers[currentPage] || false}
                onChange={(e) => handleAnswerChange(!e.target.checked)}
              />
              No
            </label>
          </div>
          <button onClick={handlePrevious} disabled={currentPage === 0}>
            이전
          </button>
          {currentPage === questions.length - 1 ? (
            <button onClick={handleSubmit}>결과 확인</button>
          ) : (
            <button onClick={handleNext}>다음</button>
          )}
        </div>
      )}
      {mbtiResult && <p>MBTI Result: {mbtiResult}</p>}
    </>
  );
};

export default MbtiTest;
