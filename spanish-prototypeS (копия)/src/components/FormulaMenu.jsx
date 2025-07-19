import React from 'react';
import FormulaCard from './FormulaCard.jsx';
import { Button } from './ui/button';

const FormulaMenu = ({ onSelectFormula, formulas, onBack }) => {
  console.log('FormulaMenu - formulas prop:', formulas);
  // Добавлен комментарий для принудительной перекомпиляции
  return (
    <div className="container mx-auto p-4 bg-white rounded-lg shadow-2xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Испанские Формулы</h1>
        <Button variant="outline" onClick={onBack}>Назад в меню</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {formulas.map(example => (
          <FormulaCard
            key={example.id}
            formula={example}
            onClick={() => onSelectFormula(example)}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button variant="outline" onClick={onBack}>Назад в меню</Button>
      </div>
    </div>
  );
};

export default FormulaMenu;
