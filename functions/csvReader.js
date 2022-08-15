const fs = require('fs');
const readline = require('readline');

const file = 'data/test.csv';

// 逐行读文件，要求文件符合：首行为特征名；其余每行作为一条记录，用逗号分隔各项特征值
// return obj-array
async function readCSV(filePath) {
    let res = [];
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    let lines = [];
    for await (const line of rl) {
        lines.push(line.split(','));
    }
    let features = lines.shift();
    for(let i=0; i<lines.length; i++){
        let curItem = lines[i];
        if(curItem.length!==features.length){
            throw new Error("特征项数目与首行特征项数目不一致！")
        }
        let curObj = {};
        for(let j=0; j<curItem.length; j++){
            curObj[features[j]] = curItem[j];  
        }
        res.push(curObj);
    }
    return res;
}

async function run(){
    let res = await readCSV(file);
    console.log(res);
}
run()

