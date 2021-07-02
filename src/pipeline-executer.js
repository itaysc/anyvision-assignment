import rl from './utils/readline';
import pipelineOptions from './pipeline-options';
import sortFunc from './utils/sort-function';
class PipelineExecuter{
    constructor(steps){
        this._steps = steps;
        this._arrays = [];
    }

    async run(){
        this.initArrays.call(this);
        this.runSingleStep(0, 0);
    }

    runSingleStep(value, index){
        if(index >= this._steps.length)
            index = 0; // start over again
        const type = this._steps[index].type
        if(index === 0 && type !== pipelineOptions.STDIN_SOURCE){
            process.exit(); // we have nothing to do if the first step is not STDIN_SOURCE
        }
        switch(type){
            case pipelineOptions.STDIN_SOURCE: return this.stdinSrc(index);
            case pipelineOptions.FILTER: return this.filter(value, index, this._steps[index].value);
            case pipelineOptions.FIXED_EVENT_WINDOW: return this.fixedWindow(value, index);
            case pipelineOptions.FILE_SINK: return this.fileSink(value, index);
        }
    }   

    printSteps(){
        console.log(this._steps);
    }

    onStepFinished({value, index}){
        this.runSingleStep(value, index+1);
    }

    onFixedWindowReached({arrIndex, index}){
        index = index + 1;
        if(index >= this._steps.length)
            index = 0;

        switch(this._steps[index].type){
            case pipelineOptions.FOLD_SUM: 
                let sum = this._arrays[arrIndex].array.reduce((a, b) => a + b, 0);
                //this._arrays[arrIndex].array = [];
                return this.runSingleStep(sum, index+1);
            case pipelineOptions.FOLD_MEDIAN: 
                const len = this._arrays[arrIndex].maxLength;
                const mid = Math.ceil(len / 2);
                const median = len % 2 == 0 ? (this._arrays[arrIndex].array[mid] + this._arrays[arrIndex].array[mid - 1]) / 2 
                : this._arrays[arrIndex].array[mid - 1];
                //this._arrays[arrIndex].array = [];
                return this.runSingleStep(median, index+1);
            default: return this.runSingleStep(0, index+1);// we should not get here if input is valid.
        }
    }

    initArrays(){
        this._steps.map(step=>{
            if(step.type === pipelineOptions.FIXED_EVENT_WINDOW){
                this._arrays.push({array: [], maxLength: step.value, index: step.index})
            }
        })
    }

    async stdinSrc(index){
        const answer = await rl("");
        if(isNaN(answer)){
            this.stdinSrc();
        }
        console.log(`>${answer}\n`)
        this.onStepFinished({value: Number(answer), index});
    }

    filter(value, index, filterFunc){
        if(!(filterFunc(value))){
            return this.runSingleStep(0, 0);
        }

        return this.runSingleStep(value, index+1);
    }

   

    fixedWindow(value, index){
        for (let i =0; i < this._arrays.length; i++){
            let data = this._arrays[i];
            if(data.array.length === data.maxLength && index <= data.index) {
                data.array = []
            }else if(data.array.length === data.maxLength){
                continue;
            }

            data.array.push(value);
            data.array.sort(sortFunc); // keep array sorted
            if(data.array.length === data.maxLength){
                return this.onFixedWindowReached({arrIndex: i, index});
            } 
            return this.runSingleStep(0, 0);
        }
    }

    fileSink(value, index){
        console.log(`${value}\n`);
        return this.runSingleStep(value, index+1);
    }

    getInput(){
        return new Promise((resolve, reject)=>{
            try{
                const answer = rl("");
                if(isNaN(answer)){
                    return this.getInput();
                }
                resolve(Number(answer));
            }catch(err){
                reject(err);
            }
        })
    }
}

export default PipelineExecuter;