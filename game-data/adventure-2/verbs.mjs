export function addFunctions(ctx, CFG) {

    ctx.TURN = x => {
        for (let i = 0; i < x; i++) {
            nextTurn();
        }
    };
    ctx.STAT = (stat, n) => {
        const stats = ctx.stats;
        stats[stat] += n;
        if (stats[stat] > stats[stat + "_max"]) {
            stats[stat] = stats[stat + "_max"];
        }
        if (stats[stat] < 0) stats[stat] = 0;
    }
    ctx.INV = (item, n) => {
        const inventory = ctx.inventory;
        if (!n) {
            return inventory[item] || 0;
        } else {
            let count = inventory[item] || 0;
            inventory[item] = count + Number(n);
            if (inventory[item] < 0) inventory[item] = 0;
        }
    }
    ctx.TIRE = x => {
        return ctx.stats.energy -= x;
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
        if (plant.plant) {
            return `${plant.plant} (${plant.stage}/10)`;

        } else return `- empty -`
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
        ctx.INV(plot.plant, 1);
        plot.plant = "";
        plot.stage = 0;
    };
    ctx.GET_HOUR = () => ((ctx.turn / CFG.TURNS_PER_HOUR) >> 0) % 24;
    ctx.GET_MINUTES = () => (ctx.turn % CFG.TURNS_PER_HOUR) * 15;
   
    ctx.IS_DAY = () => {
        let hour = ((ctx.turn / CFG.TURNS_PER_HOUR) >> 0) % 24;
        if (hour > 5 && hour < 20) return true;
        return false;
    };
    // screept.addVerb("IS_DAY", 0, () => {
    //     let hour = ((ctx.turn / CFG.TURNS_PER_HOUR) >> 0) % 24;
    //     if (hour > 5 && hour < 20) return true;
    //     return false;
    // })
    ctx.GET_DAY = () => (1 + ctx.turn / CFG.TURNS_PER_HOUR / 24) >> 0;
   
    ctx.WAIT_UNTIL_MORNING = () => waitUntilMorning();
    // screept.addVerb("WAIT_UNTIL_MORNING",0,()=>{
    // waitUntilMorning();
    // })
    //take percentage and return true or false
    ctx.TEST_ROLL = a => Math.random() * 100 < a;

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
        addFunctions(ctx,CFG)
    };
    // screept.addVerb("LOAD",0,()=>{
    //     let save=JSON.parse(localStorage.getItem('save'));
    //     Object.keys(ctx).forEach(key=>{
    //         ctx[key]=save[key];
    //     });

    // })
    ctx.MINE = () => {
        let stone = (Math.random() * (ctx.depth + 2)) >> 0;
        ctx.message = `You found ${stone} stones.`;
        ctx.INV('stone', stone);
    }
    ctx.FORAGE = () => {
        let stick = (Math.random() * (ctx.depth + 2)) >> 0;
        ctx.message = `You found ${stick} sticks.`;
        ctx.INV('stick', stick);
    }
    ctx.CRAFT = (item) => {
        let recipe = ctx.recipes.find(el => el.name === item);
        recipe.ing.forEach(ing => {
            let [name, amount] = ing;
            ctx.INV(name, -amount);
        })
        ctx.INV(item, 1);
    }

    function nextTurn() {
        console.log("Turn passed, new turn ", ++ctx.turn);
        if (ctx.turn % (CFG.TURNS_PER_HOUR * 24) === CFG.TURNS_PER_HOUR * 6) {
            console.log("New day!");
            ctx.PLANTS_GROW();
        }
        if (ctx.turn % (CFG.TURNS_PER_HOUR * 24) === CFG.TURNS_PER_HOUR * 22) {
            console.log("Pass out!");
            if (!ctx.flags.sleeping) {
                ctx.flags.passedOut = 1;
            }
            waitUntilMorning();
        }
    }

    function waitUntilMorning() {
        while (ctx.turn % (CFG.TURNS_PER_HOUR * 24) !== CFG.TURNS_PER_HOUR * 6) {
            nextTurn();
        }
    }
}