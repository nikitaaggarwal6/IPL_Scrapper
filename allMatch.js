const request = require("request");
const cheerio = require("cheerio");
const scoreCardOBJ = require("./iplScorecard");

function getAllMatchesLink(url) {
    request(url, function (err, response, html) {
        if (err) {
            console.log(err);
        } else {
            extractAllLinks(html);
        }
    })
}

function extractAllLinks(html) {
    let $ = cheerio.load(html);
    let scorecardElems = $(".ds-text-ui-typo.ds-underline-offset-4");
    // console.log($(scorecardElems[0]).text());
    for (let i = 0; i < scorecardElems.length; i++) {
        if ($(scorecardElems[i]).text() === "Scorecard") {
            let link = $(scorecardElems[i]).attr("href");
            let fullLink = "https://www.espncricinfo.com" + link;
            // console.log(fullLink);
            scoreCardOBJ.ps(fullLink);
        }
    }
}

module.exports = {
    gAlmatches: getAllMatchesLink
}