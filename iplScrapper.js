// venue date opponent result runs balls fours sixes sr 

const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
const request = require("request");
const cheerio = require("cheerio");
const { gAlmatches } = require("./allMatch");
request(url, cb);
function cb(err, response, html) {
    if(err) {
        console.log(err);
    } else {
        extractLink(html);
    }
}

function extractLink(html) {
    let $ = cheerio.load(html);
    console.log('LKS');
    let anchorElem = $(".ds-block.ds-text-center.ds-uppercase.ds-text-ui-typo-primary.ds-underline-offset-4.ds-block");
    let link = anchorElem.attr("href");
    console.log(link);
    gAlmatches("https://www.espncricinfo.com" + link);
}














// console.log("After");
// function extractHtml(html) {
//     let $ = cheerio.load(html);
//     let elemsArr = $(".ds-inline-flex.ds-items-center.ds-leading-none .ds-text-tight-l.ds-font-bold");
//     // console.log(elemsArr);
//     // let team = $(elemsArr[1]).text();
//     // let htmldata = $(elemsArr[1]).html();
//     // console.log("text-data", team);
//     // console.log("html-data", htmldata);
//     let all = $(".ds-bg-fill-content-prime.ds-rounded-lg");
//     // console.log($(all[1]).text());
//     for(let i = 0; i < all.length; i++) {
//         // let hasClass = $(all[i]).hasClass("")
//         let teamNameall = $(all[i]).find(".ds-text-tight-s.ds-font-bold.ds-uppercase");
//         let teamName = teamNameall.text();
//         console.log(teamName);
//         teamName = teamName.split(" INNINGS")[0];
//         // console.log(teamName);
//         if(winningTeamName == teamName) {
//             console.log(teamName);

//             let ass = $(all[i]).find(".ds-border-b.ds-border-line.ds-text-tight-s.ds-border-none");
//             for(let j = 0; j < allBowlers.length; j++) {
        
//                 let allColsOfPlayer = $(allBowlers[j]).find("td");
//                 let playerName = $(allColsOfPlayer[0]).text();
//                 let wickets = $(allColsOfPlayer[4]).text();

//                 if(wickets >= hwt) {
//                     hwt = wickets;
//                     hwtName = playerName;
//                 }
//             }
            
            
//             console.log(hwtName, hwt); 
//         }

//     }
//     let i
// }

