// const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-mumbai-indians-41st-match-1216521/full-scorecard";
const request = require("request");
const cheerio = require("cheerio");

function processScorecard(url) {
    request(url, cb);
}

function cb(err, response, html) {
    if(err) {
        console.log(err);
    } else {
        extractMatchDetails(html);
    }
}

function extractMatchDetails(html) {
    let $ = cheerio.load(html);
    console.log('LKS');
    // ds-text-tight-m ds-font-regular ds-text-ui-typo-mid
    let descElem = $(".ds-text-tight-m.ds-font-regular.ds-text-ui-typo-mid");
    let result = $(".ds-text-tight-m.ds-font-regular.ds-truncate.ds-text-typo-title");
    // anchorElem.attr("href");
    let stringArr = descElem.text().split(",");
    let venue = stringArr[1].trim();
    let date = stringArr[2].trim();
    result = result.text();

    // console.log(descElem.text());
    // console.log(result);
    
    
    let htmlStr = "";
    let innings = $(".ds-mb-4");
    for(let i = 0; i < 2; i++) {
        let teamName = $(innings[i]).find('.ds-py-3').text();
        teamName = teamName.split("INNINGS")[0].trim();
        let opponentIndex = i == 0 ? 1 : 0;
        let opponentName = $(innings[opponentIndex]).find('.ds-py-3').text();
        opponentName = opponentName.split("INNINGS")[0].trim();
        // console.log(teamName, opponentName);
        // console.log(`${venue} ${date} ${teamName} ${opponentName} ${result}`);
        // htmlStr += $(innings[i]).html();
        let cInnings = $(innings[i]);
        let allRows = cInnings.find(".ds-border-b.ds-border-line.ds-text-tight-s");
        for(let j = 0; j < allRows.length; j++) {
            let allCols = $(allRows[j]).find(".ds-min-w-max");
            // let isWorthy = $(allCols[0]).hasClass("");
            // if(isWorthy) {
                let playerName = $(allCols[0]).text().trim();
                let runs = $(allCols[2]).text().trim();
                let balls = $(allCols[3]).text().trim();
                let fours = $(allCols[5]).text().trim();
                let sixes = $(allCols[6]).text().trim();
                let sr = $(allCols[7]).text().trim();
            // }
            console.log(playerName, runs, balls, fours, sixes, sr);
        }
    }
    // let teamName = $(innings[i]).find("5").text();


    // console.log(htmlStr);
    // console.log(scorecard1.length);
    // getAllMatchesLink("https://www.espncricinfo.com" + link);
}

module.exports = {
    ps: processScorecard
}