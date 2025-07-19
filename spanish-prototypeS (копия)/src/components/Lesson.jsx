import React, { useRef, useEffect } from 'react';
import TheoryBlock from './TheoryBlock';
import FillInTheBlank from './FillInTheBlank';
import FillInTheBlanksComplex from './FillInTheBlanksComplex';
import MultipleChoice from './MultipleChoice';
import InlineChoice from './InlineChoice';
import ClassifyItems from './ClassifyItems';
import DescribeImage from './DescribeImage';
import FillFromBank from './FillFromBank';
import SentenceBuilder from './SentenceBuilder';
import { Button } from './ui/button';

const componentMapping = {
  TheoryBlock,
  FillInTheBlank,
  FillInTheBlanksComplex,
  MultipleChoice,
  InlineChoice,
  ClassifyItems,
  DescribeImage,
  FillFromBank,
  SentenceBuilder,
};

const Lesson = ({ lessonData, onBack, onNavigate, lessonId, isLastLesson, saveLessonResult, addXP, updateStreak, lessonStatus, onFinish, onRepeat }) => {
  const exerciseResults = useRef({});
  const lessonXP = useRef(0);

  useEffect(() => {
    exerciseResults.current = {};
    lessonXP.current = 0;
  }, [lessonId]);

  if (!lessonData || !Array.isArray(lessonData.components)) {
    return <div>Загрузка данных урока...</div>;
  }

  const getLessonNumber = (id) => (id ? id.match(/U(\d+)/)?.[1] || '' : '');

  const handleExerciseCheck = (id, result) => {
    if (lessonStatus === 'in-progress') {
      exerciseResults.current[id] = result;
      const points = result.correct * 10;
      lessonXP.current += points;
    }
  };

  const calculateFinalScore = () => {
    let totalQuestions = 0;
    let totalCorrect = 0;

    Object.values(exerciseResults.current).forEach((result) => {
      totalQuestions += result.total;
      totalCorrect += result.correct;
    });

    if (totalQuestions === 0) return { stars: 0, bonusXP: 0 };

    const percentage = (totalCorrect / totalQuestions) * 100;

    if (percentage >= 80) return { stars: 3, bonusXP: 100 };
    if (percentage >= 40) return { stars: 2, bonusXP: 50 };
    if (percentage > 0) return { stars: 1, bonusXP: 10 };
    return { stars: 0, bonusXP: 0 };
  };

  const finishLesson = () => {
    const { stars, bonusXP } = calculateFinalScore();
    const totalEarnedXP = lessonXP.current + bonusXP;

    saveLessonResult(lessonId, stars);
    addXP(totalEarnedXP);
    updateStreak();

    if (onFinish) {
      onFinish({ stars, totalEarnedXP });
    }
  };

  const handleRepeatLesson = () => {
    if (onRepeat) {
      onRepeat();
    }
  };

  const renderComponent = (componentData, index) => {
    let Component = componentMapping[componentData.type];

    // Если компонент MultipleChoice, и у него есть задания с полем sentence, в котором есть скобки,
    // то для рендеринга используется InlineChoice.
    if (componentData.type === 'MultipleChoice' && componentData.tasks?.some(t => t.sentence && t.sentence.includes('('))) {
      Component = InlineChoice;
    }

    if (!Component) {
      return (
        <div key={index} style={{ color: 'red', margin: '20px 0' }}>
          <strong>Ошибка:</strong> Неизвестный тип компонента: {componentData.type}
        </div>
      );
    }
    return (
      <Component
        key={`${lessonId}-${index}`}
        onCheck={(result) => handleExerciseCheck(index, result)}
        isChecked={lessonStatus === 'finished'}
        {...componentData}
      />
    );
  };

  return (
    <div>
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5">
        <h1 className="text-2xl text-[#0d47a1] border-b-2 border-[#64b5f6] pb-2.5 mb-4 sm:mb-0 mr-4">
          {lessonData.title}
        </h1>
        <Button onClick={onBack} variant="outline">
          ← К списку уроков
        </Button>
      </header>
      <main>{lessonData.components.map((componentData, index) => renderComponent(componentData, index))}</main>
      <footer className="mt-10 pt-5 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
        <Button
          className="w-full md:w-auto bg-orange-600 text-white hover:bg-orange-700"
          onClick={() => onNavigate('prev')}
          disabled={getLessonNumber(lessonId) === '1'}
        >
          Предыдущий урок
        </Button>

        <div className="w-full md:w-auto flex-grow flex justify-center">
          {lessonStatus === 'finished' ? (
            <Button className="w-full md:w-auto px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700" onClick={handleRepeatLesson}>
              Повторить урок
            </Button>
          ) : (
            <Button className="w-full md:w-auto bg-blue-500 text-white hover:bg-blue-600" onClick={finishLesson}>
              Завершить урок
            </Button>
          )}
        </div>

        <Button className="w-full md:w-auto px-4 py-2 bg-green-500 text-white rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600" onClick={() => onNavigate('next')} disabled={isLastLesson}>
          Следующий урок
        </Button>
      </footer>
    </div>
  );
};

export default Lesson;
