// migrationScript.js
// Улучшенный скрипт, использующий Firebase Admin SDK для обхода правил безопасности
// и преобразующий вложенные массивы для совместимости с Firestore.

const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// --- НАЧАЛО НАСТРОЙКИ АДМИН-ПАНЕЛИ ---
// Укажите путь к вашему файлу ключа сервисного аккаунта
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
// --- КОНЕЦ НАСТРОЙКИ АДМИН-ПАНЕЛИ ---

// Путь к папке с данными уроков
const dataDir = path.join(__dirname, 'src', 'data');

// Функция для преобразования данных таблиц
function transformLessonData(lessonData) {
  if (lessonData.components && Array.isArray(lessonData.components)) {
    lessonData.components.forEach(component => {
      if (component.content && Array.isArray(component.content)) {
        component.content.forEach(contentItem => {
          // Проверяем наличие таблицы и вложенного массива 'rows'
          if (contentItem.table && Array.isArray(contentItem.table.rows)) {
            // Преобразуем массив массивов в массив объектов
            contentItem.table.rows = contentItem.table.rows.map(rowArray => {
              if (Array.isArray(rowArray)) {
                return { cells: rowArray };
              }
              // Если это уже объект (на всякий случай), оставляем как есть
              return rowArray;
            });
          }
        });
      }
    });
  }
  return lessonData;
}


async function migrateLessons() {
  console.log('Начало миграции данных уроков в Firestore с правами администратора...');

  try {
    const lessonFiles = fs.readdirSync(dataDir).filter(file => /^U\d+\.json$/.test(file));

    if (lessonFiles.length === 0) {
      console.log('Файлы уроков (U*.json) не найдены в папке src/data.');
      return;
    }

    console.log(`Найдено ${lessonFiles.length} файлов уроков для миграции.`);

    const migrationPromises = lessonFiles.map(async (fileName) => {
      const filePath = path.join(dataDir, fileName);
      const lessonId = path.basename(fileName, '.json');

      try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        let lessonData = JSON.parse(fileContent);

        // Трансформируем данные перед загрузкой
        lessonData = transformLessonData(lessonData);

        const lessonRef = db.collection('lessons').doc(lessonId);

        // Используем set для создания или полной перезаписи документа
        await lessonRef.set(lessonData);
        console.log(`✅ Урок ${lessonId} успешно загружен/обновлен.`);
      } catch (error) {
        console.error(`❌ Ошибка при обработке файла ${fileName}:`, error.message);
      }
    });

    await Promise.all(migrationPromises);

    console.log('\nМиграция успешно завершена!');
    console.log('Все уроки были загружены в коллекцию "lessons" в Firestore.');

  } catch (error) {
    console.error('Критическая ошибка во время миграции:', error);
  }
}

migrateLessons();
