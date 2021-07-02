

import PipelineBuilder from './pipeline-builder';
import PipelineExecuter from './pipeline-executer';

function run(){
  const builder = new PipelineBuilder();
  builder.on('pipelineInitFinish', (steps)=>{
    const pipelineExecuter = new PipelineExecuter(steps);
    pipelineExecuter.run();
  });
  builder.buildSteps();
};

run();