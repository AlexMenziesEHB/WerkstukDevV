const Helpers = require('../src/utils/helpers.js')

describe('stringlength tester', () => {
  test('if string has been given', () => {
    expect(Helpers.checkTitleLength()).toBeFalsy()
    expect(Helpers.checkTitleLength(101)).toBeFalsy()
    expect(Helpers.checkTitleLength([])).toBeFalsy()
  })
  test('if string length is not too much', () => {
    expect(Helpers.checkTitleLength("Hello world").length).toBeLessThan(101)
    expect(Helpers.checkTitleLength("Hello world")).toBeTruthy()
  })
  test('string starts with a capital', () => {
    expect(Helpers.checkTitleLength("hello world")).toBeFalsy()
    expect(Helpers.checkTitleLength("Hello world")).toBe("Hello world")
  })
})

describe("checkParameters test", () => {
    test("check if function returns something", () => {
      expect(Helpers.checkParameters()).not.toBeUndefined();
    })
    test("check if function returns 400 when no parameters passed", () => {
      expect(Helpers.checkParameters()).toBe(400);
    })
    test("check if function returns 400 when parameters are wrong types", () => {
      expect(Helpers.checkParameters("hey", 0, {})).toBe(400);
    })
    test("check if function returns 400 when parameters are wrong types", () => {
      expect(Helpers.checkParameters(undefined)).toBe(400);
    })
    test("check if function returns 400 when parameters are wrong types", () => {
      expect(Helpers.checkParameters(null)).toBe(400);
    })
    test("check if function returns 400 when parameters are wrong types", () => {
      expect(Helpers.checkParameters([])).toBe(400);
    })
  })

describe("generateUUID test", () => {
  test("check if generateUUID() generates something", () => {
    expect(Helpers.generateUUID()).not.toBeUndefined()
  });
  test("check if generated is UUID", () => {
    expect(Helpers.generateUUID()).toMatch(
      /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/
    );
  });
});