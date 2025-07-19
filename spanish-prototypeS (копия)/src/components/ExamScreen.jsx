// src/components/ExamScreen.jsx
import React, { useState, useEffect, useRef } from 'react';
import TheoryBlock from './TheoryBlock';
import FillInTheBlank from './FillInTheBlank';
import MultipleChoice from './MultipleChoice';
import InlineChoice from './InlineChoice';
import ClassifyItems from './ClassifyItems';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

const componentMapping = {
  TheoryBlock,
  FillInTheBlank,
  MultipleChoice,
  InlineChoice,
  ClassifyItems,
};

const ExamScreen = ({ examQuestions, onFinish, onCancel }) => {
  const userAnswers = useRef({});
  const [timeLeft, setTimeLeft] = useState(30 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerChange = (questionIndex, answer) => {
    userAnswers.current[questionIndex] = answer;
  };
  
  const finishExam = () => {
    let correctCount = 0;
    examQuestions.forEach((task, index) => {
        const userAnswer = userAnswers.current[index];
        if (userAnswer === undefined) return;

        let isCorrect = false;
        if (task.correctOption) { // MultipleChoice, InlineChoice (простая версия)
            isCorrect = userAnswer === task.correctOption;
        } else if (task.answer) { // FillInTheBlank
            const correctAnswers = task.answer.split('/');
            isCorrect = correctAnswers.includes(userAnswer);
        } else if (Array.isArray(task.answers)) { // FillInTheBlanksComplex
            isCorrect = JSON.stringify(userAnswer) === JSON.stringify(task.answers);
        }
        
        if (isCorrect) {
            correctCount++;
        }
    });
    
    onFinish({
        correct: correctCount,
        total: examQuestions.length,
        percentage: examQuestions.length > 0 ? (correctCount / examQuestions.length) * 100 : 0
    });
  };

  const renderComponent = (componentData, index) => {
    const Component = componentMapping[componentData.type];
    if (!Component) return null;
    
    return (
        <Component 
            key={`${componentData.lessonId}-${index}`}
            {...componentData} 
            isExamMode={true} 
            onAnswerChange={(answer) => handleAnswerChange(index, answer)}
        />
    );
  };
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle className="text-2xl">Экзамен</CardTitle>
            <CardDescription>У вас есть 30 минут, чтобы ответить на вопросы.</CardDescription>
          </div>
          <div className="mt-2 sm:mt-0 text-2xl font-bold text-primary">
            ⏳ {formatTime(timeLeft)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {examQuestions.map((q, index) => (
              <div key={index} className="p-4 border rounded-lg">
                  {renderComponent(q, index)}
              </div>
          ))}
        </div>
      </CardContent>
      <div className="flex justify-between p-6 border-t">
          <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={onCancel}>Отменить</Button>
          <Button className="bg-green-500 text-white hover:bg-green-600" onClick={finishExam}>Завершить экзамен</Button>
      </div>
    </Card>
  );
};

export default ExamScreen;
