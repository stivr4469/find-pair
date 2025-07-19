// src/components/TheoryBlock.js
import React from 'react';
import AudioPlayer from './AudioPlayer';

const Table = ({ data }) => (
    <table className="w-full mt-2 mb-5 border border-gray-400 border-collapse">
      <thead>
        <tr>
          {data.headers.map(header => <th key={header} className="text-left pb-2 border border-gray-400 p-2" dangerouslySetInnerHTML={{ __html: header }} />)}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.cells && row.cells.map((cell, cellIndex) => (
              <td key={cellIndex} className="py-1 border border-gray-400 p-2 relative">
                <span dangerouslySetInnerHTML={{ __html: cell }} />
                <AudioPlayer textToSpeak={cell} className="absolute right-1 top-1/2 -translate-y-1/2" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

const TheoryBlock = ({ title, content }) => {
  const renderContentItem = (item, index) => {
    if (item.text) {
      return (
        <p key={index} className="flex items-center">
          <span dangerouslySetInnerHTML={{ __html: item.text }} />
          {/* Исправлено: Добавлен фолбэк на item.text, если speechText отсутствует */}
          <AudioPlayer textToSpeak={item.speechText || item.text} />
        </p>
      );
    }
    if (item.list) {
      return (
        <ul key={index}>
          {item.list.map((li, liIndex) => {
             // Исправлено: Логика стала более надежной и безопасной
             const isObject = typeof li === 'object' && li !== null;
             const textToShow = isObject ? li.text : li;
             const textToSpeak = isObject ? (li.speechText || li.text) : li;

             return (
                <li key={liIndex} className="flex items-center">
                    <span dangerouslySetInnerHTML={{ __html: textToShow }} />
                    <AudioPlayer textToSpeak={textToSpeak} />
                </li>
             )
          })}
        </ul>
      );
    }
    if (item.table) {
      return (
        <div key={index} className="overflow-x-auto">
          <Table data={item.table} />
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="exercise-block mb-10 p-5 border border-gray-200 rounded-lg overflow-x-auto">
      <h3 className="text-xl font-bold">{title}</h3>
      {content.map((item, index) => renderContentItem(item, index))}
    </div>
  );
};

export default TheoryBlock;
