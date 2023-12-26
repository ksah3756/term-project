const axios = require("axios");
const cheerio = require("cheerio");

const getMelonChart = async (weight) => {
    let track = {};
  try {
    const html = await axios.get("https://www.melon.com/chart/index.htm");

    const $ = cheerio.load(html.data);

    const bodyList = $("tr.lst50, tr.lst100"); 

    let title;
    bodyList.each((i, element) => {
        title = $(element).find("div.ellipsis.rank01 a").text().replace(/\s/g, "");
      track[title] = {
        score: weight * (100-i),
        artist: $(element).find("div.ellipsis.rank02 > a").text().replace(/\s/g, ""),
      };
    });
    // console.log(track);
  } catch (error) {
    console.error(error);
  }
  return track;
};

module.exports = getMelonChart;
