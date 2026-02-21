/**
 * Ser vs Estar Trainer - Mode 2: Data & Constants
 *
 * Данные, таблицы спряжений и конфигурация для режима спряжения.
 * ПРИМЕЧАНИЕ: SER_CONJUGATIONS и ESTAR_CONJUGATIONS уже определены в ser-estar-data.js
 */

// ============================================
// CONFIG & DATA
// ============================================

/**
 * Лица для спряжения
 */
const SER_ESTAR_MODE2_PERSONS = [
    { key: 'yo', label: 'yo (я)' },
    { key: 'tu', label: 'tú (ты)' },
    { key: 'el/ella', label: 'él/ella (он/она)' },
    { key: 'nosotros', label: 'nosotros (мы)' },
    { key: 'vosotros', label: 'vosotros (вы)' },
    { key: 'ellos', label: 'ellos (они)' }
];

/**
 * Времена для спряжения
 */
const SER_ESTAR_MODE2_TENSES = [
    { key: 'presente', label: 'Presente' },
    { key: 'indefinido', label: 'Indefinido' },
    { key: 'imperfecto', label: 'Imperfecto' },
    { key: 'futuro', label: 'Futuro' }
];

/**
 * Конфигурация режима
 */
const SER_ESTAR_MODE2_CONFIG = {
    maxQuestions: 12,
    optionsCount: 5
};

// ============================================
// EXPORTS
// ============================================

if (typeof window !== 'undefined') {
    window.SER_ESTAR_MODE2_PERSONS = SER_ESTAR_MODE2_PERSONS;
    window.SER_ESTAR_MODE2_TENSES = SER_ESTAR_MODE2_TENSES;
    window.SER_ESTAR_MODE2_CONFIG = SER_ESTAR_MODE2_CONFIG;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SER_ESTAR_MODE2_PERSONS,
        SER_ESTAR_MODE2_TENSES,
        SER_ESTAR_MODE2_CONFIG
    };
}