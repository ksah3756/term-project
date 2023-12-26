const axios = require("axios");
const cheerio = require("cheerio");

const getGenieChart = async (weight) => {
  let track = {};

  try {
    const [html1, html2] = await Promise.all([
      axios.get("https://www.genie.co.kr/chart/top200"),
      axios.get("https://www.genie.co.kr/chart/top200?ditc=D&ymd=20231226&hh=16&rtm=Y&pg=2")
    ]);

    const $1 = cheerio.load(html1.data);
    const $2 = cheerio.load(html2.data);

    const bodyList1 = $1("tr.list");
    const bodyList2 = $2("tr.list");

    let title;
    bodyList1.each((i, element) => {
      title = $1(element).find("td.info a.title").text().replace(/\s/g, "");
      track[title] = {
        score: weight * (100-i),
        artist: $1(element).find("td.info a.artist").text().trim(),
      };
    });

    bodyList2.each((i, element) => {
      title = $2(element).find("td.info a.title").text().replace(/\s/g, "");
      track[title] = {
        score: weight * (50-i), // 2페이지부터는 51위부터 시작
        artist: $2(element).find("td.info a.artist").text().trim(),
      };
    });

    // console.log(track);
  } catch (error) {
    console.error(error);
  }
  return track;
};

module.exports = getGenieChart;
