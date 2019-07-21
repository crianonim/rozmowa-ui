import dialogs from './dialogs.mjs';
import * as screept from '../../src/lib/screept';
// import screept from 'screept/index.mjs';
// console.log("ROZMOWA",rozmowa);

// const dialogName = "start";

const ctx = {
    dialogName:"start",
    stack:[],
    other: {
        met: -1
    },
    turn: 25,
    inventory: {
        money: 20,
        sword: 0,
        fish: 1,
        meal: 2
    },
    stats: {
        energy: 6
    },
   
    flags:{
        dirty: 1,
        passedOut:0,
        sleeping:0,
        looked_around:0,
        met_bernie:0,
        talked_to_bartender:0,
        bartender_favor_bernie_finished:0,
        bartender_favor_bernie_asked:0,
        citaa_remembered:0,
    },

}

const TURNS_PER_HOUR = 4;

function status() {
    // let s = `It is currently {{turn}} turn. Time is {{HOUR}}. It's {{"day" "night" IS_DAY ?}}
    //  You have: ${ Object.entries(ctx.inventory).filter(entry=>entry[1]).map(entry=>entry[0]+":"+entry[1]).join(", ") }
    //  Energy: {{stats.energy}}
    //  `
//  let s = `
//  {{"You have passed out, falling asleep where you where! " "" flags.passedOut ?}}{{0 flags.passedOut :=; ""}}
//  Time is {{HOUR}} o'clock. It's {{DAY_NUMBER}} {{"day" "night" IS_DAY ?}}.
//   You have {{inventory.money}} coins. Energy: {{stats.energy}}`;
    let s="JAN"
    return screept.interpolate(s, ctx)
}

function init() {
    console.log("INIT RUN")
    screept.addVerb("INC", 1, a => {
        a.object[a.key] = Number(a.value || 0) + 1;
        return a.object[a.key];
    });
    screept.addVerb("INC_BY", 2, (a, b) => {
        a.object[a.key] = Number(a.value || 0) + Number(b.value || 0);
        return a.object[a.key];
    });
    ctx.TURN= (x)=>{
        for (let i = 0; i < x; i++) {
            nextTurn();
        }
    }
    
    screept.addVerb("HOUR", 0, () => {
        return ((ctx.turn / TURNS_PER_HOUR) >> 0) % 24;
    })
    ctx.IS_DAY = ()=>{
        let hour = ((ctx.turn / TURNS_PER_HOUR) >> 0) % 24;
        if (hour > 5 && hour < 20) return true;
        return false;
    }
    // screept.addVerb("IS_DAY", 0, () => {
    //     let hour = ((ctx.turn / TURNS_PER_HOUR) >> 0) % 24;
    //     if (hour > 5 && hour < 20) return true;
    //     return false;
    // })
    screept.addVerb("DAY_NUMBER",0,()=>{
        return 1+(ctx.turn / TURNS_PER_HOUR / 24 )>>0
    })
    screept.addVerb("WAIT_UNTIL_MORNING",0,()=>{
        waitUntilMorning();
    })
    //take percentage and return true or false 
    ctx.TEST_ROLL = (a)=> Math.random()*100 < a;
        
    
    // screept.addVerb("TEST_ROLL", 1, (a) => {
        // let roll = Math.random() * 100;
        // return roll < a.value;
    // })
    screept.addVerb("DEBUG", 1, (a) => {
        console.log("DEBUG",a.value)
        return a.value;
    })
    ctx.INVENTORY=()=>{
        return Object.entries(ctx.inventory).filter(entry=>entry[1]).map(entry=>entry[0]+":"+entry[1]).join(", ")
    }
    screept.addVerb("SAVE",0,()=>{
        localStorage.setItem('save',JSON.stringify(ctx))
    })
    screept.addVerb("LOAD",0,()=>{
        let save=JSON.parse(localStorage.getItem('save'));
        Object.keys(ctx).forEach(key=>{
            ctx[key]=save[key];
        });
        
    })
    function nextTurn(){
        console.log("Turn passed, new turn ", ++ctx.turn);
            if (ctx.turn % (TURNS_PER_HOUR*24)===TURNS_PER_HOUR*22){
                console.log("Pass out!");
                if (!ctx.flags.sleeping){
                    ctx.flags.passedOut=1;
                }
                waitUntilMorning();
            }
    }
    function waitUntilMorning(){
        while (ctx.turn % (TURNS_PER_HOUR*24)!==TURNS_PER_HOUR*6){
            nextTurn();
        }
    }

}
export default {
    dialogs,
    status,
    // dialogName,
    ctx,
    init
}