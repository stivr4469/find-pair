import React, { useState, useEffect } from 'react';
import FormulaMenu from './FormulaMenu';
import { Formula1 } from './Formula1';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const FormulaPracticeScreen = ({ onBack }) => { // Changed props to onBack
  const [selectedFormula, setSelectedFormula] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentFormulaExercises, setCurrentFormulaExercises] = useState([]);
  const [isFormulaCompletedModalOpen, setIsFormulaCompletedModalOpen] = useState(false);
  const [allFormulas, setAllFormulas] = useState([]);

  useEffect(() => {
    const fetchFormulas = async () => {
      console.log('FormulaPracticeScreen: Attempting to fetch formulas from Firebase...');
      const formulasCollection = collection(db, 'formulas');
      const formulasSnapshot = await getDocs(formulasCollection);
      const formulasList = formulasSnapshot.docs.map(doc => ({ id: parseInt(doc.id), ...doc.data() }));
      console.log('FormulaPracticeScreen: Fetched formulas:', formulasList);
      setAllFormulas(formulasList);
    };
    fetchFormulas();
  }, []);

  const handleSelectFormula = async (formula) => {
    try {
      const exercisesQuery = query(collection(db, 'exercises'), where('formulaId', '==', formula.id));
      const exercisesSnapshot = await getDocs(exercisesQuery);
      const exercisesForFormula = exercisesSnapshot.docs.map(doc => doc.data());

      if (exercisesForFormula && exercisesForFormula.length > 0) {
        const shuffledExercises = shuffleArray(exercisesForFormula);
        setSelectedFormula(formula);
        setCurrentFormulaExercises(shuffledExercises);
        setCurrentExerciseIndex(0);
      } else {
        console.warn(`Упражнения для формулы с ID ${formula.id} не найдены в Firebase.`);
        alert(`Упражнения для формулы '${formula.name}' еще не загружены в базу данных.`);
        setSelectedFormula(null);
        setCurrentFormulaExercises([]);
        setCurrentExerciseIndex(0);
      }
    } catch (error) {
      console.error(`Не удалось загрузить упражнения для формулы ID ${formula.id} из Firebase:`, error);
      alert(`Произошла ошибка при загрузке упражнений для формулы '${formula.name}'.`);
      setSelectedFormula(null);
      setCurrentFormulaExercises([]);
      setCurrentExerciseIndex(0);
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < currentFormulaExercises.length - 1) {
      setCurrentExerciseIndex(prevIndex => prevIndex + 1);
    } else {
      setIsFormulaCompletedModalOpen(true);
    }
  };

  const handleBackToMenu = () => {
    setSelectedFormula(null);
    onBack(); // Use onBack to return to the main menu
  };

  return (
    <>
      {selectedFormula && currentFormulaExercises.length > 0 ? (
        <Formula1
          currentExercise={currentFormulaExercises[currentExerciseIndex]}
          onNextExercise={handleNextExercise}
          onBackToMenu={handleBackToMenu}
        />
      ) : (
        <FormulaMenu formulas={allFormulas} onSelectFormula={handleSelectFormula} onBack={onBack} />
      )}

      <Dialog open={isFormulaCompletedModalOpen} onOpenChange={setIsFormulaCompletedModalOpen}>
        <DialogContent className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white">
          <DialogHeader className="text-center">
            <DialogTitle>Формула завершена!</DialogTitle>
            <DialogDescription>Поздравляем, вы завершили все упражнения для этой формулы!</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center">
            <Button onClick={() => {
              setIsFormulaCompletedModalOpen(false);
              handleBackToMenu();
            }}>Отлично!</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormulaPracticeScreen;
