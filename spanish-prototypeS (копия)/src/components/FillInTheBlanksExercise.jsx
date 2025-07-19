// src/components/FillInTheBlanksExercise.js

import React from 'react';
import AudioPlayer from './AudioPlayer';
import { Input } from './ui/input'; // Импортируем компонент Input

const FillInTheBlanksExercise = ({
  task,
  userAnswers,
  handleInputChange,
  isSubmitted,
  isCorrect
}) => {
  const sentenceParts = task.sentence.split('___');
  const inputCount = sentenceParts.length - 1;

  if (inputCount <= 0) {
    return <p dangerouslySetInnerHTML={{ __html: task.sentence }} />;
  }
  
  const getInputClassName = (isAnswerCorrect) => {
    if (!isSubmitted) return "w-32 h-5 inline-block mx-2";
    return "w-32 h-5 inline-block mx-2 " + (isAnswerCorrect ? "border-green-500" : "border-red-500");
  };

  const checkAnswers = () => {
    if (!task.answers) return [];
    return task.answers.map((correctAnswer, index) => {
      const userAnswer = userAnswers[index] || '';
      return userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
    });
  };

  const answerResults = isSubmitted ? checkAnswers() : [];

  return (
    <div className="exercise-task flex justify-between items-center">
      <div className="task-content flex items-center flex-wrap">
        <span className="mr-2">{`${task.id}.`}</span>
        {sentenceParts.map((part, index) => (
          <React.Fragment key={index}>
            <span dangerouslySetInnerHTML={{ __html: part }} />
            {index < inputCount && (
              <Input
                type="text"
                className={getInputClassName(answerResults[index])}
                value={userAnswers[index] || ''}
                onChange={(e) => handleInputChange(task.id, e.target.value, index)}
                disabled={isSubmitted}
                autoCapitalize="off"
              />
            )}
          </React.Fragment>
        ))}
      </div>
      {task.speechText && <AudioPlayer textToSpeak={task.speechText} />}
    </div>
  );
};

export default FillInTheBlanksExercise;
