import dialogs from "./dialogs.mjs";
import * as screept from "../../src/lib/screept";
// import screept from 'screept/index.mjs';
// console.log("ROZMOWA",rozmowa);

// const dialogName = "start";

const ctx = {
  dialogName: "village",
  stack: [],
  other: {
    met: -1
  },
  turn: 25,
  inventory: {
    money: 20,
    sword: 0,
    fish: 1,
    meal: 2,
    cabbage_seed: 2,
    cabbage: 0,
    radish_seed: 1,
    radish: 0
  },
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
  }
};

const TURNS_PER_HOUR = 4;

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
  screept.addVerb("INC", 1, a => {
    a.object[a.key] = Number(a.value || 0) + 1;
    return a.object[a.key];
  });
  screept.addVerb("INC_BY", 2, (a, b) => {
    a.object[a.key] = Number(a.value || 0) + Number(b.value || 0);
    return a.object[a.key];
  });
  ctx.TURN = x => {
    for (let i = 0; i < x; i++) {
      nextTurn();
    }
  };
  ctx.STAT = (stat,n) =>{
    const stats=ctx.stats;
    stats[stat]+=n;
    if (stats[stat]>stats[stat+"_max"]){
      stats[stat]=stats[stat+"_max"];
    }
    if (stats[stat]<0) stats[stat]=0;
  }
  ctx.TIRE = x => {
      return ctx.stats.energy-=x;
  }
  ctx.DEBUG = x => {
    console.log("DEBUG:", x);
  };
  ctx.PLANT = (plotKey, seed) => {
    let plant = seed.replace(/_seed/, "");
    let plot = ctx.farm[plotKey];
    plot.plant = plant;
    plot.stage = 0;
    console.log("PLOT", plot);
  };
  ctx.PLANT_STATUS = plant => {
    return JSON.stringify(plant);
  };
  ctx.PLANTS_GROW = () => {
    ctx.farm.forEach(plot => {
      if (plot.plant) {
        plot.stage += ctx.types[plot.plant].grow;
        if (plot.stage > 10) plot.stage = 10;
      }
    });
  };
  ctx.HARVEST = plotKey => {
    let plot = ctx.farm[plotKey];
    ctx.inventory[plot.plant]++;
    plot.plant = "";
    plot.stage = 0;
  };
  ctx.GET_HOUR = () => ((ctx.turn / TURNS_PER_HOUR) >> 0) % 24;
  ctx.GET_MINUTES = () => (ctx.turn % TURNS_PER_HOUR) * 15;
  screept.addVerb("HOUR", 0, () => {
    return ((ctx.turn / TURNS_PER_HOUR) >> 0) % 24;
  });
  ctx.IS_DAY = () => {
    let hour = ((ctx.turn / TURNS_PER_HOUR) >> 0) % 24;
    if (hour > 5 && hour < 20) return true;
    return false;
  };
  // screept.addVerb("IS_DAY", 0, () => {
  //     let hour = ((ctx.turn / TURNS_PER_HOUR) >> 0) % 24;
  //     if (hour > 5 && hour < 20) return true;
  //     return false;
  // })
  ctx.GET_DAY = () => (1 + ctx.turn / TURNS_PER_HOUR / 24) >> 0;
  screept.addVerb("DAY_NUMBER", 0, () => {
    return (1 + ctx.turn / TURNS_PER_HOUR / 24) >> 0;
  });
  ctx.WAIT_UNTIL_MORNING = () => waitUntilMorning();
  // screept.addVerb("WAIT_UNTIL_MORNING",0,()=>{
  // waitUntilMorning();
  // })
  //take percentage and return true or false
  ctx.TEST_ROLL = a => Math.random() * 100 < a;

  // screept.addVerb("TEST_ROLL", 1, (a) => {
  // let roll = Math.random() * 100;
  // return roll < a.value;
  // })
  screept.addVerb("DEBUG", 1, a => {
    console.log("DEBUG", a.value);
    return a.value;
  });
  ctx.INVENTORY = () => {
    return Object.entries(ctx.inventory)
      .filter(entry => entry[1])
      .map(entry => entry[0] + ":" + entry[1])
      .join(", ");
  };
  ctx.SAVE = () => {
    localStorage.setItem("save", JSON.stringify(ctx));
  };
  // screept.addVerb("SAVE",0,()=>{
  // localStorage.setItem('save',JSON.stringify(ctx))
  // })

  ctx.LOAD = () => {
    let save = JSON.parse(localStorage.getItem("save"));
    Object.keys(ctx).forEach(key => {
      ctx[key] = save[key];
    });
    init();
  };
  // screept.addVerb("LOAD",0,()=>{
  //     let save=JSON.parse(localStorage.getItem('save'));
  //     Object.keys(ctx).forEach(key=>{
  //         ctx[key]=save[key];
  //     });

  // })
  function nextTurn() {
    console.log("Turn passed, new turn ", ++ctx.turn);
    if (ctx.turn % (TURNS_PER_HOUR * 24) === TURNS_PER_HOUR * 6) {
      console.log("New day!");
      ctx.PLANTS_GROW();
    }
    if (ctx.turn % (TURNS_PER_HOUR * 24) === TURNS_PER_HOUR * 22) {
      console.log("Pass out!");
      if (!ctx.flags.sleeping) {
        ctx.flags.passedOut = 1;
      }
      waitUntilMorning();
    }
  }
  function waitUntilMorning() {
    while (ctx.turn % (TURNS_PER_HOUR * 24) !== TURNS_PER_HOUR * 6) {
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
};
