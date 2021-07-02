import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function read(question, onlyNumber=true){
    return new Promise(async(resolve, reject)=>{
        try{
            rl.question(question, async function(answer){
               resolve(answer)
            })
        }catch(err){
            reject(err);
        }
    })
}

export default read;


