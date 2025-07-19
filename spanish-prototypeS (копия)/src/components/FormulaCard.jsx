import React from 'react';

const FormulaCard = ({ formula, onClick }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg cursor-pointer" onClick={onClick}>
      <h2 className="text-xl font-bold">{formula.name}</h2>
      <p className="mt-2">{formula.description}</p>
      <div className="mt-4">
        <h3 className="font-semibold">Правила:</h3>
        <ul className="list-disc list-inside">
          {formula.rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Пример:</h3>
        <p className="italic">{formula.example}</p>
      </div>
    </div>
  );
};

export default FormulaCard;