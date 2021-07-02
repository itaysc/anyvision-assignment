
import createFunc from './utils/create-func-from-input';

const options = {
    STDIN_SOURCE: 1,
    FILTER: 2,
    FIXED_EVENT_WINDOW: 3,
    FOLD_SUM: 4,
    FOLD_MEDIAN: 5,
    FILE_SINK: 6
}

export const needValue = (option)=>{
    return option === options.FIXED_EVENT_WINDOW || 
           option === options.FILTER
}

export const getExtraInputQuestion = (option)=>{
    switch(option){
        case options.FILTER: return "Please enter predicate (e.g: x>1).\n";
        case options.FIXED_EVENT_WINDOW: return "Please enter event window length\n";
        default: return "";
    }
}

export const isValidExtraValue = (option, value)=>{
    switch(option){
        case options.FILTER: return true; // assuming valid input
        case options.FIXED_EVENT_WINDOW: return !isNaN(value);
        default: return "";
    }
}

export const convertValue = (option, value)=>{
    switch(option){
        case options.FILTER: return createFunc(value)
        case options.FIXED_EVENT_WINDOW: return Number(value);
        default: return "";
    }
}

export default options;

