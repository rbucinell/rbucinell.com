let CSS_COLOR_NAMES = ["Indigo", "DarkOrange", "AntiqueWhite", "Ivory", "DarkRed", "Aqua", "RoyalBlue", "DarkSalmon", "SaddleBrown", "LawnGreen", "Salmon", "MidnightBlue", "Black", "LightBlue", "SeaGreen", "DeepPink", "Silver", "DodgerBlue", "Olive", "FireBrick", "Orange", "OrangeRed", "Tan", "Crimson", "GhostWhite", "Gold", "Tomato", "DarkBlue", "Magenta", "Maroon", "MediumAquaMarine", "PeachPuff", "Wheat", "WhiteSmoke", "DarkKhaki", "Yellow", "PowderBlue", "MediumBlue", "PapayaWhip", "Gainsboro", "Lime", "Gray", "PaleVioletRed", "Teal", "Coral", "White", "Blue", "MistyRose", "Black"];
const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const TIMESTAMP_COL = 1;
const SCORE_QUARTER_COL = 17;
const NFC_SCORE_COL = 18;
const AFC_SCORE_COL = 19;
const url2022 = 'https://docs.google.com/spreadsheets/u/0/d/1bafC30PCbiUhXolvacKnws0jh676hyytj8Y1lkpT8Us/gviz/tq?tqx=out:html&tq=select+*';
const url2024 = 'https://docs.google.com/spreadsheets/d/1Fk_SoEVAvAp1cGk8SeDg_mwHkBs1PyHcD_hfL7FnbXU/gviz/tq?tqx=out:html&tq=select+*';
const kickoff = new Date('February 11, 2023 18:00:00');
const picks = [];
let sequences = {
    afc: { q1: [], q2: [], q3: [], q4: [] },
    nfc: { q1: [], q2: [], q3: [], q4: [] }
};

(async() => { 
    const spreadsheetData = await getSpreadsheetData( url2022 );
    //await updateScores( spreadsheetData );
    await updateSquares( spreadsheetData );
    await pickNumbers();
})();

async function getSpreadsheetData( url ){
    const response = await fetch( url );
    const html = await response.text();
    return html;
}

function parseSpreadSheet( spreadsheetHTML ){
    let parser = new DOMParser();
    let doc = parser.parseFromString( spreadsheetHTML, "text/html");
    let trs = [...doc.querySelectorAll("table tr")];
    trs.shift(); //clear header row
    return trs;
}

async function updateScores( spreadsheetData ){
    let trs = parseSpreadSheet( spreadsheetData );
    trs = trs.filter( tr => tr.children[SCORE_QUARTER_COL].innerText.trim() !== '' );
    let scores = [];
    ['Q1','Q2','Q3','Q4'].forEach( qtr => {
        console.log( qtr );
        let row = trs.find( tr => tr.children[SCORE_QUARTER_COL].innerText.trim() === qtr );
        const score = {
            'qtr': qtr.toLowerCase(),
            'nfc': row.children[NFC_SCORE_COL].innerText.trim(), 
            'afc': row.children[AFC_SCORE_COL].innerText.trim() 
        };
        scores.push(score);
    });
    
    for( let score of scores ){
        document.querySelector( `#${score.qtr}afc` ).innerText = score.afc || '--';
        document.querySelector( `#${score.qtr}nfc` ).innerText = score.nfc || '--';
    }
}

function updateSquares( spreadsheetHTML ){
    let trs = parseSpreadSheet( spreadsheetHTML );
    trs = trs.filter( tr => tr.children[TIMESTAMP_COL].innerText.trim() !== '' );
    trs.forEach( tr => {
        let pick = {
            timeStamp: tr.children[0].innerText.trim(),
            email: tr.children[1].innerText.trim(),
            fName: tr.children[2].innerText.trim(),
            lName: tr.children[3].innerText.trim(),
            paid: tr.children[15].innerText.trim() === '✔',
            squares: []
        }
        for( let i  = 4; i <= 14; i++ ){
            let letter = alphabet[i-4];
            let data = tr.children[i].innerText.trim();
            if( data ){
                let numbers = data.split(',');
                pick.squares.push( ...numbers.map( n => `${letter}${n}` ));
            }
        }
        picks.push( pick );
        console.log( picks );
    });
}


/**
 * fetch all sequences from RANDOM.ORG and update DOM with results
 **/
async function pickNumbers()
{
    if( !localStorage.getItem('sequences') )
    {
        for( let q = 1; q <= 4; q++ )
        {
            sequences.afc[`q${q}`] = await sequence(`superbowl2024afcq${q}`);
            sequences.nfc[`q${q}`] = await sequence(`superbowl2024nfcq${q}`);
        }
        localStorage.setItem('sequences', JSON.stringify(sequences) );
    }else{
        sequences = JSON.parse(localStorage.getItem('sequences'));
    }

    console.log( 'sequences', sequences);
    if( Date.now() >= kickoff )
    {
        for( let q = 1; q <= 4; q++)
        {
            for( let i = 0; i < 10; i++)
            {
                document.querySelector(`#nfchq${q} > table > tbody > tr > td:nth-child(${i+1})`).innerText = sequences.nfc[`q${q}`][i];
                document.querySelector(`#afchq${q} > table > tbody > tr:nth-child(${i+1}) > td`).innerText = sequences.afc[`q${q}`][i];
            }
        }
    }
}

async function sequence( key )
{
    let response = await fetch(`https://www.random.org/sequences/?min=0&max=9&col=10&format=plain&rnd=id.${key}`);
    let data = await response.text();
    return data.trim().split('\t');
}