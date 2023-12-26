const express = require('express');
const router = express.Router();
const getMelonChart = require("../crawling/melonCrawling");
const getBugsChart = require("../crawling/bugsCrawling");
const getGenieChart = require("../crawling/genieCrawling");

router.get('/', async (req, res) => {
    try{
        const { first, second, third } = req.query;

        // Process the selected priorities (for demonstration, just sending them back as JSON)
        const priority = { first, second, third };
        console.log(priority);

        let track = {};
        // first=1.8, second=1.5, third=1.3의 가중치를 가짐
        if(first == "melon")
            track = await getMelonChart(1.8);
        else if(first == "genie")
            track = await getGenieChart(1.8);
        else
            track = await getBugsChart(1.8);

        if(second == "melon")
            await mergeTrack(track, await getMelonChart(1.5));
        else if(second == "genie")
            await mergeTrack(track, await getGenieChart(1.5));
        else
            await mergeTrack(track, await getBugsChart(1.5));

        if(third == "melon")
            await mergeTrack(track, await getMelonChart(1.3));
        else if(third == "genie")
            await mergeTrack(track, await getGenieChart(1.3));
        else
            await mergeTrack(track, await getBugsChart(1.3));

        const sortedTrack = Object.entries(track)
            .sort(([, a], [, b]) => b.score - a.score).slice(0,100);
        console.log(sortedTrack);
        res.json(sortedTrack);
    }
    catch(err){
        console.log(err);
    }
});

const mergeTrack = (track1, track2) => {
    Object.entries(track2).map(([title, value]) => {
        if(track1.hasOwnProperty(title)){
            track1[title].score += value.score;
        }
        else{
            track1[title] = value;
        }
    })
    return track1;
}
module.exports = router;