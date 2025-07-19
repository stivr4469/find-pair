// src/components/Dictionary.jsx
import React, { useState, useMemo } from 'react';
import dictionaryData from '../data/dictionaryData.json';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import useSpeechSynthesis from '../hooks/useSpeechSynthesis';
import { Volume2 } from 'lucide-react';

const Dictionary = ({ onBack }) => {
  const { speak } = useSpeechSynthesis();
  const [searchTerm, setSearchTerm] = useState('');
  const allWords = useMemo(() => dictionaryData.words.sort((a, b) => a.ru.localeCompare(b.ru)), []);
  const [filteredWords, setFilteredWords] = useState(allWords);

  React.useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filtered = allWords.filter(
      word => word.ru.toLowerCase().includes(lowercasedFilter) || word.es.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredWords(filtered);
  }, [searchTerm, allWords]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl">Словарь</CardTitle>
            <CardDescription>Ищите слова на русском или испанском</CardDescription>
          </div>
          <Button variant="outline" onClick={onBack}>Назад в меню</Button>
        </div>
        <div className="mt-4">
          <Input
            type="text"
            placeholder="Начать вводить слово..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Русский</TableHead>
              <TableHead>Испанский</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredWords.map((word, index) => (
              <TableRow key={index}>
                <TableCell>{word.ru}</TableCell>
                <TableCell className="font-medium flex items-center justify-end">
                  {word.es}
                  <Button variant="ghost" size="icon" onClick={() => speak(word.es)} className="ml-2">
                    <Volume2 className="h-5 w-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Dictionary;
