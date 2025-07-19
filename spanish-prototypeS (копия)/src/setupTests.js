// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// --- Начало блока полифилов для Firebase/Undici в среде Jest ---
// Этот подход использует require и прямое присвоение, чтобы гарантировать,
// что глобальные объекты будут доступны до того, как Jest попытается
// импортировать модули, которые от них зависят.

const { TextEncoder, TextDecoder } = require('util');
Object.assign(global, { TextDecoder, TextEncoder });

const { ReadableStream } = require('stream/web');
Object.assign(global, { ReadableStream });

const { webcrypto } = require('crypto');
Object.assign(global, { crypto: webcrypto });

const { fetch, Headers, Request, Response } = require('undici');
Object.assign(global, { fetch, Headers, Request, Response });

// --- Конец блока полифилов ---
