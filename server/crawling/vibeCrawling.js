const axios = require("axios");
const cheerio = require("cheerio");

const getVibeChart = async () => {
  try {
    const html = await axios.get("https://vibe.naver.com/chart/total");
    let ulList = [];

    const $ = cheerio.load(html.data);
    const bodyList = $('td.song');
    console.log(bodyList);

    bodyList.each((i, element) => {
      ulList[i] = {
        rank: i + 1,
        title: $(element).find("div.title_badge_wrap a").text().replace(/\s/g, ""),
        artist: $(element).find("div.artist_sub a").text().replace(/\s/g, ""),
      };
    });
    console.log("bodyList : ", ulList);
  } catch (error) {
    console.error(error);
  }
};

module.exports = getVibeChart;
