export default (input)=>{
    if(input.length > 0){
        const varName = input.trim().split('')[0];
        console.log("varName : ", varName)
        return new Function(varName, `return ${input}`);
    }
    return new Function("x", `return true`);
}