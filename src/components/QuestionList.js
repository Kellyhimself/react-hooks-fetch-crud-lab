import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data), setIsLoaded(true));
  }, []);
  const deleteQuestion = async (id) => {
    const response = await fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const updatedQuestions = questions.filter(
        (question) => question.id !== id
      );
      setQuestions(updatedQuestions);
    }
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      {isLoaded ? (
        questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={deleteQuestion}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
}

export default QuestionList;
