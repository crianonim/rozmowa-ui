
import * as screept from './screept.js'
console.log("SCREEPT",screept)
function processDialog(data,dialogName,ctx={}){
    function runCond(obj){
        return obj?screept.run(obj,ctx):undefined;
    }
    console.log("DATA",data)
    let dialog=data.find(d=>d.id==dialogName);
    if (!dialog) return;
    runCond(dialog.run)
    let intro=dialog.intro.find(intro=>intro.if?screept.run(intro.if,ctx):true);
    intro.textInterpolated=screept.interpolate(intro.text,ctx);
    runCond(intro.run)
    let options=[]
    dialog.options.forEach(option=>{
        if (option.each){
            let [_,first,array]=option.each.match(/^\((.*)\) in (.*)/);
            let [value,key]=first.split(/\s?,\s?/);
            console.log("FIRST",first);
            console.log(`x${value}x x${key}x`)
            console.log("ARR",array);
            let arr=screept.run(array);
            arr.forEach( (v,i)=>{
                ctx[value]=v;
                ctx[key]=i
                option.push(option);
            })
            ctx[value]
        }
        else options.push(option);
    })
    options=options.filter(option=>option.if?screept.run(option.if,ctx):true).map(option=>{option.textInterpolated=screept.interpolate(option.text,ctx);return option});
    return {intro,options};
}
function processOptionChoice(option,ctx){
    if (option.run){
        console.log("OPTION to run",option.run)
        screept.run(option.run,ctx)
    }
    if (option.go){
        if (option.go=="exit") return false;
        return option.go
    }
    return true;
}

export default {
    processDialog,
    hello(){
        console.log("Hello.");
    },
    processOptionChoice,
    screept

}