import EventEmitter from 'events';
import rl from './utils/readline';
import pipelineOptions, 
{ needValue, 
  getExtraInputQuestion, 
  isValidExtraValue, 
  convertValue } from './pipeline-options';

class PipelineBuilder extends EventEmitter{
    constructor(){
        super();
    }

    async buildSteps(index=0, steps=[]){
        let q = "";
        let optLength = Object.keys(pipelineOptions).length;
        q= index === 0? "Construct your pipeline by choosing from the list of operations below:\n": "";
        Object.keys(pipelineOptions).map(key=>{
        q+=`${pipelineOptions[key]}. ${key}\n`;
        })
        q+=`${optLength + 1}. Finish and run\n`
        
        let answer = await rl(q);
        if(isNaN(answer) || Number(answer) < 1 || Number(answer) > optLength+1){
            this.buildSteps(index, steps);
        }
        if(answer === ""+(optLength + 1)){ // if the user finished building the pipeline
            return this.emit("pipelineInitFinish", steps);
        }
        answer = Number(answer);
        let extraVal = null
        if(needValue(answer)){
            extraVal = await this.getExtraValue(answer);
        }
        steps.push({type: answer, value: extraVal, index});
        this.buildSteps(index + 1, steps);
    }


    getExtraValue(option){
        return new Promise(async(resolve, reject)=>{
          try{
            const answer = await rl(getExtraInputQuestion(option));
            if(!isValidExtraValue(option, answer)){
              console.log("Invalid value. please try again.");
              this.getExtraValue(option);
            }
      
            return resolve(convertValue(option, answer));
           
          }catch(err){
            return reject(err);
          }
        })
      }
      
}

export default PipelineBuilder;