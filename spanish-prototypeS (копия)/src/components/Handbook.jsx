// src/components/Handbook.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { moduleStructure } from '../data/moduleData';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

const Handbook = ({ onSelectLesson, onBack }) => {
  const [modules, setModules] = useState([]);
  const [allTheory, setAllTheory] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHandbookData = async () => {
      try {
        const lessonsQuery = query(collection(db, 'lessons'));
        const querySnapshot = await getDocs(lessonsQuery);
        const lessonsMap = new Map();
        querySnapshot.forEach(doc => {
          lessonsMap.set(doc.id, doc.data());
        });

        const detailedModules = moduleStructure.map(moduleDef => {
          const lessonDetails = moduleDef.lessons.map(lessonId => {
            const lessonData = lessonsMap.get(lessonId);
            return {
              id: lessonId,
              title: lessonData ? lessonData.title : `Урок ${lessonId.replace('U', '')}`
            };
          });
          return { ...moduleDef, lessons: lessonDetails };
        });
        setModules(detailedModules);

        const theoryTopics = [];
        lessonsMap.forEach((lesson, lessonId) => {
          if (lesson.components) {
            lesson.components.forEach(component => {
              if (component.type === 'TheoryBlock') {
                const contentText = component.content.map(c => {
                    if (c.text) return c.text;
                    if (c.list) return c.list.map(li => (typeof li === 'object' && li.text ? li.text : li)).join(' ');
                    if (c.table && c.table.rows) {
                       return [
                           ...(c.table.headers || []),
                           ...c.table.rows.flatMap(row => row.cells || [])
                       ].join(' ');
                    }
                    return '';
                }).join(' ').replace(/<[^>]*>/g, ' ');

                const searchableText = [ lesson.title, component.title, contentText ].join(' ').toLowerCase();
                theoryTopics.push({
                  id: `${lesson.lessonId || lessonId}-${component.title}`,
                  lessonId: lessonId,
                  lessonTitle: lesson.title,
                  theoryTitle: component.title,
                  searchText: searchableText,
                });
              }
            });
          }
        });
        setAllTheory(theoryTopics);
        setFilteredTopics(theoryTopics);

      } catch (err) {
        console.error("Ошибка загрузки данных для справочника:", err);
        setError("Не удалось загрузить данные для справочника. Попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };

    fetchHandbookData();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredTopics(allTheory);
    } else {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filtered = allTheory.filter(topic =>
        topic.searchText.includes(lowercasedFilter)
      );
      setFilteredTopics(filtered);
    }
  }, [searchTerm, allTheory]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl">Справочник по грамматике</CardTitle>
          </div>
          <Button variant="outline" onClick={onBack}>Назад в меню</Button>
        </div>
        <div className="mt-4">
          <Input
            type="text"
            placeholder="Поиск по темам и урокам..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        {loading && <p className="text-center text-muted-foreground">Загрузка справочника...</p>}
        {error && <p className="text-center text-destructive">{error}</p>}
        
        {!loading && !error && (
          searchTerm ? (
            <div className="search-results">
              <h3 className="text-lg font-semibold mb-4">Результаты поиска:</h3>
              {filteredTopics.length > 0 ? (
                <ul className="space-y-2">
                  {filteredTopics.map(topic => (
                    <li key={topic.id} onClick={() => onSelectLesson(topic.lessonId)} className="p-3 rounded-md hover:bg-accent cursor-pointer transition-colors">
                      <strong>{topic.lessonTitle}:</strong> {topic.theoryTitle}
                    </li>
                  ))}
                </ul>
              ) : <p className="text-muted-foreground">Ничего не найдено.</p>}
            </div>
          ) : (
            <div className="space-y-8">
              {modules.map((module, index) => (
                <div key={index}>
                  <h2 className="text-xl font-bold mb-4">{module.title}</h2>
                  <ul className="space-y-2">
                    {module.lessons.map(lesson => (
                      <li key={lesson.id} onClick={() => onSelectLesson(lesson.id)} className="p-3 rounded-md hover:bg-accent cursor-pointer transition-colors">
                        {lesson.title}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default Handbook;
