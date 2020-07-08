// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import './__mocks__/windowMatchMedia';
import './__mocks__/fileMock';

// env
process.env.REACT_APP_PAGE_SIZE = '1';

jest.setTimeout(10000);

afterEach(() => cleanup());