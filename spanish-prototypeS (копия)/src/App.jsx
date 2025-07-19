// src/App.jsx
import React, { useState, useEffect } from 'react';
import Lesson from './components/Lesson';
import LessonMenu from './components/LessonMenu';
import WelcomeScreen from './components/WelcomeScreen';
import AuthScreen from './components/AuthScreen';
import Leaderboard from './components/Leaderboard';
import Handbook from './components/Handbook';
import ExamScreen from './components/ExamScreen';
import FindPairGame from './components/FindPairGame';
import FormulaPracticeScreen from './components/FormulaPracticeScreen';

import Dictionary from './components/Dictionary';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from './components/ui/dialog';
import { Button } from './components/ui/button';
import { useProgress } from './hooks/useProgress';
import { useAuth } from './hooks/useAuth';
import { db } from './firebase';
import { getDoc, getDocs, doc, collection } from 'firebase/firestore';

function App() {
  const { user, loading: loadingAuth, signInWithGoogle, registerWithEmail, signInWithEmail, signOutUser } = useAuth();
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [authMode, setAuthMode] = useState(null);

  const [view, setView] = useState('welcome');
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [lessonResults, setLessonResults] = useState(null);
  
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [currentLessonData, setCurrentLessonData] = useState(null);
  const [isLoadingLesson, setIsLoadingLesson] = useState(false);
  
  const [lessonStatus, setLessonStatus] = useState('in-progress');
  
  const [examQuestions, setExamQuestions] = useState(null);
  const [examResult, setExamResult] = useState(null);
  const [isExamResultModalOpen, setExamResultModalOpen] = useState(false);

  const userId = user ? user.uid : (isGuestMode ? 'guest' : null);
  const { progress, loadingProgress, addXP, updateStreak, saveLessonResult } = useProgress(userId);

  const lessonIds = Array.from({ length: 126 }, (_, i) => `U${i + 1}`);

  const lessonLevels = {
    A1: Array.from({ length: 55 }, (_, i) => `U${i + 1}`),
    A2: Array.from({ length: 40 }, (_, i) => `U${i + 56}`),
    B1: Array.from({ length: 31 }, (_, i) => `U${i + 96}`),
  };
  
  useEffect(() => {
    if (loadingAuth) {
      setView('loading');
    } else if (user || isGuestMode) {
      setView('menu');
      setAuthMode(null);
    } else {
      setView('welcome');
      setIsGuestMode(false);
      setCurrentLessonId(null);
      setCurrentLessonData(null);
    }
  }, [user, isGuestMode, loadingAuth]);

  const loadLesson = async (lessonId) => {
    console.log(`[loadLesson] Attempting to load lesson: ${lessonId}`);
    setIsLoadingLesson(true);
    setCurrentLessonData(null);
    setCurrentLessonId(lessonId);
    setLessonStatus('in-progress');
  
    try {
      const lessonRef = doc(db, 'lessons', lessonId);
      const docSnap = await getDoc(lessonRef);
  
      console.log(`[loadLesson] docSnap.exists() for ${lessonId}: ${docSnap.exists()}`);
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(`[loadLesson] Data for ${lessonId}:`, data);
        setCurrentLessonData(data);
        setView('lesson');
      } else {
        console.error("Урок не найден в базе данных:", lessonId);
        alert(`Извините, контент для Урока ${lessonId.match(/(\d+)/)[0]} еще не готов.`);
        setCurrentLessonId(null);
      }
    } catch (err) {
      console.error("Не удалось загрузить урок из Firestore:", err);
      alert(`Извините, произошла ошибка при загрузке урока.`);
      setCurrentLessonId(null);
    } finally {
      setIsLoadingLesson(false);
    }
  };
  
  const handleLessonFinish = (results) => {
    setLessonResults(results);
    setIsResultsModalOpen(true);
    setLessonStatus('finished');
  };

  const handleStartAsGuest = () => setIsGuestMode(true);
  const handleSignOut = () => {
    signOutUser();
    setIsGuestMode(false);
  };
  const handleBackToMenu = () => {
    setCurrentLessonId(null);
    setCurrentLessonData(null);
    setExamQuestions(null);
    setView('menu');
  };

  const handleRepeatLesson = () => {
    setIsResultsModalOpen(false);
    setLessonStatus('in-progress');
  };

  const handleNavigation = (direction) => {
    const currentIndex = lessonIds.indexOf(currentLessonId);
    if (currentIndex === -1) return;
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < lessonIds.length) {
      loadLesson(lessonIds[nextIndex]);
    }
  };

  const handleStartExam = async (level = 'A1', questionCount = 30) => {
    setView('loading');
    const lessonIdsToLoad = lessonLevels[level] || lessonIds;
  
    try {
      const lessonsSnapshot = await getDocs(collection(db, 'lessons'));
      
      const lessonsData = [];
      lessonsSnapshot.forEach(doc => {
        if (lessonIdsToLoad.includes(doc.id)) {
          lessonsData.push(doc.data());
        }
      });
  
      if (lessonsData.length === 0) {
        throw new Error('Уроки для экзамена не найдены в базе данных.');
      }
  
      const allExercises = lessonsData
        .flatMap(lesson => {
            return lesson.components
                .filter(comp => comp.type !== 'TheoryBlock')
                .map(comp => ({ ...comp, lessonId: lesson.lessonId, lessonTitle: lesson.title }));
        });
  
      const shuffled = allExercises.sort(() => 0.5 - Math.random());
      setExamQuestions(shuffled.slice(0, questionCount));
      setView('exam');
  
    } catch (err) {
      console.error("Ошибка при генерации экзамена из Firestore:", err);
      alert('Не удалось сгенерировать экзамен. Попробуйте позже.');
      setView('menu');
    }
  };
  
  const handleFinishExam = (result) => {
    setExamResult(result);
    setExamResultModalOpen(true);
    setView('menu');
  };
  
  const handleShowHandbook = () => setView('handbook');
  
  const handleStartFindPairGame = () => setView('findPairGame');

  const handleShowDictionary = () => setView('dictionary');
  const handleShowFormulas = () => setView('formulas');

  const renderContent = () => {
    if (loadingAuth || (userId && loadingProgress)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p>Загрузка приложения...</p>
        </div>
      );
    }
    
    switch (view) {
      case 'exam':
        return <ExamScreen examQuestions={examQuestions} onFinish={handleFinishExam} onCancel={handleBackToMenu} />;
      case 'findPairGame':
        return <FindPairGame onBack={handleBackToMenu} addXP={addXP} />;
      
      case 'dictionary':
        return <Dictionary onBack={handleBackToMenu} />;
      case 'formulas':
        return <FormulaPracticeScreen onBack={handleBackToMenu} />;
      case 'lesson':
        const lessonNumber = currentLessonId ? parseInt(currentLessonId.replace('U', ''), 10) : 0;
        return isLoadingLesson ? <p>Загрузка урока...</p> : (
          <Lesson
            key={`${currentLessonId}-${lessonStatus}`}
            lessonData={currentLessonData} 
            onBack={handleBackToMenu} 
            onNavigate={handleNavigation}
            onRepeat={handleRepeatLesson} 
            onFinish={handleLessonFinish} 
            lessonStatus={lessonStatus}
            lessonId={currentLessonId} 
            isLastLesson={lessonNumber === lessonIds.length}
            saveLessonResult={saveLessonResult} 
            addXP={addXP} 
            updateStreak={updateStreak}
          />
        );
      case 'leaderboard':
        return <Leaderboard onBack={handleBackToMenu} userId={userId} onLoginClick={() => { setView('auth'); setAuthMode('login'); }} onRegisterClick={() => { setView('auth'); setAuthMode('register'); }} />;
      case 'handbook':
        return <Handbook onSelectLesson={loadLesson} onBack={handleBackToMenu} />;
      case 'menu':
        return <LessonMenu user={user} onSignOut={handleSignOut} onSelectLesson={loadLesson} progress={progress} onShowLeaderboard={() => setView('leaderboard')} onShowHandbook={handleShowHandbook} onShowDictionary={handleShowDictionary} onStartExam={handleStartExam} onStartFindPairGame={handleStartFindPairGame} onNavigateToFormulas={handleShowFormulas} />;
      case 'auth':
        return <AuthScreen mode={authMode} onLogin={signInWithEmail} onRegister={registerWithEmail} onGoogleSignIn={signInWithGoogle} onBack={() => setView('welcome')} />;
      case 'welcome':
      default:
        return (
          <WelcomeScreen 
            onLoginClick={() => { setView('auth'); setAuthMode('login'); }} 
            onRegisterClick={() => { setView('auth'); setAuthMode('register'); }} 
            onStartAsGuest={handleStartAsGuest} 
            onGoogleSignIn={signInWithGoogle} // ИСПРАВЛЕНИЕ: Передаем функцию
          />
        );
    }
  };

  const getContainerClass = () => {
    const wideViews = ['lesson', 'handbook', 'leaderboard', 'dictionary', 'exam'];
    if (wideViews.includes(view)) {
      return "max-w-full mx-auto bg-white p-2 sm:p-4 rounded-lg shadow-md";
    }
    if (view === 'findPairGame') {
      return "w-full h-full";
    }
    return "max-w-[957px] mx-auto bg-white p-10 rounded-lg shadow-md";
  };

  return (
    <div className="font-sans p-5 bg-gray-100 text-gray-800">
      <div className={getContainerClass()}>
        {renderContent()}

        <Dialog open={isResultsModalOpen} onOpenChange={setIsResultsModalOpen}>
          <DialogContent className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white">
            <DialogHeader className="text-center">
              <DialogTitle>Урок пройден!</DialogTitle>
              <DialogDescription>Поздравляем с успешным завершением урока!</DialogDescription>
            </DialogHeader>
            {lessonResults && (
              <div className="py-4 text-center">
                <div className="text-4xl mb-4">
                  {'★'.repeat(lessonResults.stars)}{'☆'.repeat(3 - lessonResults.stars)}
                </div>
                <div className="text-lg">
                  Заработано очков: <span className="font-bold">{lessonResults.totalEarnedXP} XP</span>
                </div>
              </div>
            )}
            <DialogFooter className="flex justify-center">
              <Button onClick={() => setIsResultsModalOpen(false)}>Отлично!</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isExamResultModalOpen} onOpenChange={setExamResultModalOpen}>
          <DialogContent className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white">
            <DialogHeader className="text-center">
              <DialogTitle>Экзамен завершен!</DialogTitle>
              <DialogDescription>Поздравляем с успешным завершением экзамена!</DialogDescription>
            </DialogHeader>
            {examResult && (
              <div className="py-4 text-center">
                <p className="text-lg">Ваш результат: <span className="font-bold">{examResult.correct}</span> из {examResult.total}</p>
                <p className="text-xl font-bold mt-2">Процент: {examResult.percentage.toFixed(1)}%</p>
              </div>
            )}
            <DialogFooter className="flex justify-center">
              <Button onClick={() => setExamResultModalOpen(false)}>Отлично!</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default App;