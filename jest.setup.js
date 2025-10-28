// jest.setup.js
// Prevent cheerio/undici "File is not defined" error in Jest
if (typeof File === "undefined") {
  global.File = class File {};
}

// Silence noisy console logs during tests
jest.spyOn(console, "log").mockImplementation(() => {});
jest.spyOn(console, "error").mockImplementation(() => {});
