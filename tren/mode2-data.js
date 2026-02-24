/**
 * Tren Ir/Venir - Module 3: Conjugation Data
 * 
 * Файл содержит таблицы спряжения испанских глаголов:
 * - ir (идти)
 * - venir (приходить)
 * - llegar (прибывать)
 * 
 * Времена:
 * - presente (настоящее)
 * - indefinido (прошедшее простое)
 * - imperfecto (прошедшее длительное)
 * - futuro (будущее)
 * 
 * Лица:
 * - yo (я)
 * - tu (ты)
 * - el/ella (он/она)
 * - nosotros (мы)
 * - vosotros (вы, мн.ч. в Испании)
 * - ellos (они)
 */

const CONJUGATIONS = {
  ir: {
    presente: {
      yo: "voy",
      tu: "vas",
      "el/ella": "va",
      nosotros: "vamos",
      vosotros: "vais",
      ellos: "van"
    },
    indefinido: {
      yo: "fui",
      tu: "fuiste",
      "el/ella": "fue",
      nosotros: "fuimos",
      vosotros: "fuisteis",
      ellos: "fueron"
    },
    imperfecto: {
      yo: "iba",
      tu: "ibas",
      "el/ella": "iba",
      nosotros: "íbamos",
      vosotros: "ibais",
      ellos: "iban"
    },
    futuro: {
      yo: "iré",
      tu: "irás",
      "el/ella": "irá",
      nosotros: "iremos",
      vosotros: "iréis",
      ellos: "irán"
    }
  },
  venir: {
    presente: {
      yo: "vengo",
      tu: "vienes",
      "el/ella": "viene",
      nosotros: "venimos",
      vosotros: "venís",
      ellos: "vienen"
    },
    indefinido: {
      yo: "vine",
      tu: "viniste",
      "el/ella": "vino",
      nosotros: "vinimos",
      vosotros: "vinisteis",
      ellos: "vinieron"
    },
    imperfecto: {
      yo: "venía",
      tu: "venías",
      "el/ella": "venía",
      nosotros: "veníamos",
      vosotros: "veníais",
      ellos: "venían"
    },
    futuro: {
      yo: "vendré",
      tu: "vendrás",
      "el/ella": "vendrá",
      nosotros: "vendremos",
      vosotros: "vendréis",
      ellos: "vendrán"
    }
  },
  llegar: {
    presente: {
      yo: "llego",
      tu: "llegas",
      "el/ella": "llega",
      nosotros: "llegamos",
      vosotros: "llegáis",
      ellos: "llegan"
    },
    indefinido: {
      yo: "llegué",
      tu: "llegaste",
      "el/ella": "llegó",
      nosotros: "llegamos",
      vosotros: "llegasteis",
      ellos: "llegaron"
    },
    imperfecto: {
      yo: "llegaba",
      tu: "llegabas",
      "el/ella": "llegaba",
      nosotros: "llegábamos",
      vosotros: "llegabais",
      ellos: "llegaban"
    },
    futuro: {
      yo: "llegaré",
      tu: "llegarás",
      "el/ella": "llegará",
      nosotros: "llegaremos",
      vosotros: "llegaréis",
      ellos: "llegarán"
    }
  }
};

// Экспорт как глобальная переменная
if (typeof window !== 'undefined') {
  window.CONJUGATIONS = CONJUGATIONS;
}

// Для использования в Node.js (если потребуется для тестов)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CONJUGATIONS };
}
