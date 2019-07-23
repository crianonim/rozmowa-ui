import dialogs from "./dialogs.mjs";
import * as screept from "../../src/lib/screept";
import {recipes} from './recipes.mjs';
import {addFunctions} from './verbs.mjs';
// import screept from 'screept/index.mjs';
// console.log("ROZMOWA",rozmowa);

// const dialogName = "start";

const ctx = {
  // dialogName: "village",
  dialogName: "options",
  message:'',
  stack: [],
  other: {
    met: -1
  },
  depth:0,
  turn: 25,
  inventory: {
    money: 20,
    sword: 0,
    fish: 1,
    meal: 2,
    cabbage_seed: 2,
    radish_seed: 1,
    stick:5,
    stone:10,
  },
  npc:[
    { name:"Zach",
    sells:[
      "cabbage_seed", "radish_seed" // make tags #veg
    ],
    buys:["cabbage","fish","radish"]
  },
{
  name:"Bartender",
  sells:["meal"],
  buys:["fish","cabbage"]
},
{
  name:"goblin",
  generic:true,
  stats:{
    energy:50,
    energy_max:50,
    attack:120,
    defence:75,
  }
  
}
],
  
  planting: "cabbage_seed",
  farm: [{ plant: "cabbage", stage: 8 }, { plant: "" }],
  stats: {
    energy: 60,
    energy_max: 100,
  },
  types: {
    cabbage: {
      foodValue: 10,
      grow: 2,
      price: 5
    },
    cabbage_seed:{
      price:7
    },
    radish_seed:{
      price:1
    },
    radish: {
      foodValue: 5,
      grow: 3,
      price: 3
    },
    meal: {
        foodValue: 30,
        price:10
    },
    fish:{
        foodValue: 20,
        price:8,
    }
  },
  flags: {
    dirty: 1,
    passedOut: 0,
    sleeping: 0,
    looked_around: 0,
    met_bernie: 0,
    talked_to_bartender: 0,
    bartender_favor_bernie_finished: 0,
    bartender_favor_bernie_asked: 0,
    citaa_remembered: 0
  },
  recipes: recipes,
};

const CFG={}
CFG.TURNS_PER_HOUR = 4;

function status() {
  // let s = `It is currently {{turn}} turn. Time is {{HOUR}}. It's {{"day" "night" IS_DAY ?}}
  //  You have: ${ Object.entries(ctx.inventory).filter(entry=>entry[1]).map(entry=>entry[0]+":"+entry[1]).join(", ") }
  //  Energy: {{stats.energy}}
  //  `
  let s = `
 {{ $flags.passedOut ? "You have passed out, falling asleep where you where! " : ""}}{{$flags.passedOut0; ""}}
 Time is {{$GET_HOUR()}} o'clock. It's {{$GET_DAY()}} {{ $IS_DAY() ?"day": "night"}}.
  You have {{$inventory.money}} coins. Energy: {{$stats.energy}}`;
  // let s="JAN"
  return screept.interpolate(s, ctx);
}

function init() {
  console.log("INIT RUN");
  addFunctions(ctx,CFG);
  
}
export default {
  dialogs,
  status,
  // dialogName,
  ctx,
  init
};
