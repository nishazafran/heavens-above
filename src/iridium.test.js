/* eslint-disable no-undef, no-unused-vars */
const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
const utils = require("./utils");
const { getTable } = require("./iridium"); // your module file

jest.mock("fs");
jest.mock("request");
jest.mock("./utils");

describe("getTable()", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // mock utils
    utils.get_options.mockReturnValue({ url: "https://fakeurl.com" });
    utils.post_options.mockReturnValue({ url: "https://fakeurl.com" });
    utils.iridium_options.mockReturnValue({ url: "https://fakeurl.com/detail" });
    utils.image_options.mockReturnValue({ url: "https://fakeurl.com/image" });
    utils.md5.mockReturnValue("fakeid123");
  });

  it("should fetch the table and process one flare entry", done => {
    // mock directory check
    fs.existsSync.mockReturnValue(false);
    fs.mkdir.mockImplementation((_, cb) => cb());
    fs.appendFile.mockImplementation((_, __, cb) => cb());

    // mock HTML for main table
    const mainHtml = `
      <form>
        <table class="standardTable">
          <tbody>
            <tr>
              <td><a href="flareDetail.aspx?type=V&id=1"></a></td>
              <td>Mag -7</td>
              <td>45°</td>
              <td>180°</td>
              <td>Sat 98</td>
              <td>50km</td>
              <td>Bright</td>
            </tr>
          </tbody>
        </table>
        <input name="ctl00$cph1$btnNext" value="next">
      </form>
    `;

    // mock HTML for flare detail page
    const detailHtml = `
      <form>
        <table class="standardTable">
          <tbody>
            <tr><td>Sun Alt</td><td>5°</td></tr>
            <tr><td>Angular Sep</td><td>10°</td></tr>
            <tr><td>Dist Sat</td><td>500km</td></tr>
            <tr><td>Angle</td><td>25°</td></tr>
            <tr><td>Antenna</td><td>1</td></tr>
            <tr><td>Sun Alt</td><td>12°</td></tr>
            <tr><td>Angular Sep</td><td>30°</td></tr>
          </tbody>
        </table>
        <img id="ctl00_cph1_imgSkyChart" src="chart.png">
      </form>
    `;

    // First request → main page
    request.mockImplementationOnce((_, cb) => {
      cb(null, { statusCode: 200 }, mainHtml);
    });

    // Second request → detail page
    request.mockImplementationOnce((_, cb) => {
      cb(null, { statusCode: 200 }, detailHtml);
    });

    // mock image download stream
    const fakeStream = { pipe: jest.fn().mockReturnValue({ on: jest.fn() }) };
    request.get = jest.fn(() => fakeStream);

    // run
    getTable({
      pages: 0,
      counter: 0,
      root: "./",
      database: [],
    });

    // allow async promises to resolve
    setImmediate(() => {
      expect(request).toHaveBeenCalledTimes(2);
      expect(fs.mkdir).toHaveBeenCalled();
      expect(fs.appendFile).toHaveBeenCalled();
      expect(utils.get_options).toHaveBeenCalledWith("IridiumFlares.aspx?");
      expect(utils.iridium_options).toHaveBeenCalled();
      done();
    });
  });
});
