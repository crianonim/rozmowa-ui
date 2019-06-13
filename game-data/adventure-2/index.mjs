import dialogs from './dialogs.mjs';
import rozmowa from 'rozmowa/index.mjs';
// import screept from 'screept/index.mjs';
const screept = rozmowa.screept;
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
 let s = `Time is {{HOUR}} o'clock. It's {{"day" "night" IS_DAY ?}}. You have {{inventory.money}} coins. Energy: {{stats.energy}}`;

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
    screept.addVerb("TURN", 1, (a) => {
        for (let i = 0; i < a.value; i++) {
            nextTurn();
        }
    })
    screept.addVerb("HOUR", 0, () => {
        return ((ctx.turn / TURNS_PER_HOUR) >> 0) % 24;
    })
    screept.addVerb("IS_DAY", 0, () => {
        let hour = ((ctx.turn / TURNS_PER_HOUR) >> 0) % 24;
        if (hour > 5 && hour < 20) return true;
        return false;
    })
    //take percentage and return true or false 
    screept.addVerb("TEST", 1, (a) => {
        let roll = Math.random() * 100;
        return roll < a.value;
    })
    screept.addVerb("DEBUG", 1, (a) => {
        console.log("DEBUG",a.value)
        return a.value;
    })
    screept.addVerb("INVENTORY",0,()=>{
        return Object.entries(ctx.inventory).filter(entry=>entry[1]).map(entry=>entry[0]+":"+entry[1]).join(", ")
    })

    function nextTurn(){
        console.log("Turn passed, new turn ", ++ctx.turn);
            if (ctx.turn % (TURNS_PER_HOUR*24)===TURNS_PER_HOUR*22){
                console.log("TEN!")
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