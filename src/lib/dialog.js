
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
            let [_v,_k]=first.split(/\s?,\s?/);
            console.log("FIRST",first);
            console.log(`x${_v}x x${_k}x`)
            console.log("ARR",array);
            let arr=screept.run(array,ctx);
            console.log("ARRR",arr)
            arr.forEach( (value,key)=>{
                let nO=JSON.parse(JSON.stringify(option));
                ctx[_v]=value;
                ctx[_k]=key
                nO.textInterpolated=screept.interpolate(nO.text,ctx);
                let pre="$"+_v+"="+JSON.stringify(value)+"; $"+_k+"="+JSON.stringify(key)+";"
                if (nO.run) {
                    nO.run=pre+nO.run;
                }
                if (nO.if){
                    nO.if=pre+nO.if;
                }
                console.log("NO",nO)
                options.push(nO);
            })
        }
        else {
            option.textInterpolated=screept.interpolate(option.text,ctx);
            options.push(option);
        };
    })
    options=options.filter(option=>option.if?screept.run(option.if,ctx):true);
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