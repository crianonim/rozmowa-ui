export function run(text,ctx={}){
    text=text.replace(/\$(\w+\W?)/g," ctx.$1");
    console.log("EVAL",text)
    return eval(text);
}
    
export function interpolate(s, ctx) {
    return s.replace(/{{(.*?)}}/g, (full, scr) => {
        let result = run(scr, ctx)
        console.log("RESULT of interpolation",result)
        return result;
    })
}

export function addVerb(){};