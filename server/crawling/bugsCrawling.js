const axios = require("axios");
const cheerio = require("cheerio");

const getBugsChart = async (weight) => {

let track = {};
  try {
    const html = await axios.get("https://music.bugs.co.kr/chart");

    const $ = cheerio.load(html.data);
    const bodyList = $('tr[rowtype="track"]');

    let title;
    bodyList.each((i, element) => {
        title = $(element).find("p.title a").text().replace(/\s/g, "");
      track[title] = {
        score: weight * (100-i),
        artist: $(element).find("p.artist a").text().replace(/\s/g, ""),
      };
    });
    // console.log(track);
  } catch (error) {
    console.error(error);
  }
  return track;
};

module.exports = getBugsChart;
