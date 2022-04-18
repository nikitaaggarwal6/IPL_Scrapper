// const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/chennai-super-kings-vs-mumbai-indians-41st-match-1216521/full-scorecard";
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const json = require("json");
const xlsx = require("xlsx");

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
            processPlayer(teamName, playerName, runs, balls, fours, sixes, sr, opponentName, venue, date, result);
        }
    }
}

function processPlayer(teamName, playerName, runs, balls, fours, sixes, sr, opponentName, venue, date, result) {
    let teamPath = path.join(__dirname, "ipl", teamName);
    dirCreator(teamPath);
    let filePath = path.join(teamPath, playerName + ".xlsx");
    let content = readExcel(filePath, playerName);
    let playerObj = {
        teamName, 
        playerName,
        runs, 
        balls,
        fours,
        sixes,
        sr,
        opponentName,
        venue,
        date,
        result
    }
    content.push(playerObj);
    createExcel(content, playerName, filePath);
}


function dirCreator(FilePath) {
    if(!fs.existsSync(FilePath)) fs.mkdirSync(FilePath);
}


function createExcel(data, sheetName, fileName) {
    // way to create and copy data in an excel file 
    // wb -> filePath, ws -> name, json data
    // new worksheet
    let newWB = xlsx.utils.book_new();

    // json data -> excel format convert
    let newWS  = xlsx.utils.json_to_sheet(data);

    // takes input -> wb, ws, sheetname
    xlsx.utils.book_append_sheet(newWB, newWS, sheetName);

    // takes input -> filePath
    xlsx.writeFile(newWB, fileName);
}


function readExcel(excelFile, sheet) {
    if(!fs.existsSync(excelFile)) return [];
    
    // way to read an excel file
    // workbook get
    let wb = xlsx.readFile(excelFile);
    // sheet
    let excelData = wb.Sheets[sheet];
    // sheet data get
    let ans = xlsx.utils.sheet_to_json(excelData);
    return ans;
}


module.exports = {
    ps: processScorecard
}