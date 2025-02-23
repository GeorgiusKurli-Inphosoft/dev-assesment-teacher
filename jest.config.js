/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testRegex: '(/_tests/.*|(\\.|/)(test|spec))\\.(ts)$',
};  
