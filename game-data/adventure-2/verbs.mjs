export function addFunctions(ctx, CFG) {
    
    Object.keys(functions)
    .filter(fn=>fn===fn.toUpperCase())
    .forEach(function(fn){
        ctx[fn]=function(...args){
           return functions[fn](ctx,CFG,...args);
        }
    })
   
   return;
   
   
    
    ctx.GET_HOUR = () => ((ctx.turn / CFG.TURNS_PER_HOUR) >> 0) % 24;
    ctx.GET_MINUTES = () => (ctx.turn % CFG.TURNS_PER_HOUR) * 15;

    // screept.addVerb("IS_DAY", 0, () => {
    //     let hour = ((ctx.turn / CFG.TURNS_PER_HOUR) >> 0) % 24;
    //     if (hour > 5 && hour < 20) return true;
    //     return false;
    // })
   
    // screept.addVerb("WAIT_UNTIL_MORNING",0,()=>{
    // waitUntilMorning();
    // })
    //take percentage and return true or false
   
    
    
    // screept.addVerb("LOAD",0,()=>{
    //     let save=JSON.parse(localStorage.getItem('save'));
    //     Object.keys(ctx).forEach(key=>{
    //         ctx[key]=save[key];
    //     });

    // })
    ctx.MINE = () => {
        let stone = (Math.random() * (ctx.depth + 2)) >> 0;
        ctx.TURN(4);
        ctx.TIRE(10);
        ctx.message = `You found ${stone} stones.`;
        ctx.INV('stone', stone);
    }
    ctx.FORAGE = () => {
        let stick = (Math.random() * (ctx.depth + 2)) >> 0;
        ctx.TURN(4);
        ctx.TIRE(4);
        ctx.message = `You found ${stick} sticks.`;
        ctx.INV('stick', stick);

    }
    ctx.CRAFT = (item) => {
        let recipe = ctx.recipes.find(finder('name', item));
        recipe.ing.forEach(ing => {
            let [name, amount] = ing;
            ctx.INV(name, -amount);
        })
        ctx.INV(item, 1);
        ctx.TURN(1);
    }
    ctx.COMBAT_START = (opponentName) => {
        ctx.opponent = ctx.npc.find(finder('name', 'goblin'));
        ctx.combat_forced = true;
        ctx.COMBAT_PREPARE();
    }
    ctx.COMBAT_PREPARE = () => {
        let opponent = ctx.opponent;
        if (opponent.generic) {
            opponent.stats.energy = opponent.stats.energy_max;
        }
    }

    ctx.COMBAT_IS_FINISHED = () => ctx.combat_won || ctx.combat_lost || ctx.stats.energy < 1 || ctx.opponent.stats.energy < 1;
    ctx.COMBAT_ATTACK = () => {
        let player_dmg = ctx.RND(10);
        ctx.TIRE(1);
        ctx.STAT('energy', -player_dmg, ctx.opponent);
        ctx.message = `You hit ${ctx.opponent.name} for ${player_dmg} damage. `, 'combat';
        ctx.MSG(`You hit ${ctx.opponent.name} for ${player_dmg} damage. `, 'combat');
    }
    ctx.COMBAT_NPC_ATTACK = () => {
        if (ctx.opponent.stats.energy > 0) {
            let opp_dmag = ctx.RND(10);
            ctx.STAT('energy', -opp_dmag);
            ctx.message += ` You are hit for ${opp_dmag} damage. `, 'combat';
            ctx.MSG(` You are hit for ${opp_dmag} damage. `, 'combat')
        }
    }
    ctx.COMBAT_STATE = () => {
        if (ctx.opponent.stats.energy < 1) {
            ctx.message += ` You defeated ${ctx.opponent.name}!`;
            ctx.combat_won = true;
        } else if (ctx.stats.energy < 1) {
            ctx.message += ` You have been defeated! `;
            ctx.flags.passedOut = 1;

            ctx.MSG(` You have been defeated! `)
            ctx.MSG(`You have passed out for some time...`);
            ctx.combat_lost = true;
            ctx.TURN(CFG.TURNS_PER_HOUR * 8);
            ctx.flags.passedOut = 0;

            ctx.stats.energy = (ctx.stats.energy_max / 2) >> 0;
        }
    }
    ctx.COMBAT_ROUND = () => {
        ctx.COMBAT_ATTACK();
        ctx.TEST_ROLL(10) ? ctx.TURN(1) : null;
        ctx.COMBAT_NPC_ATTACK();
        ctx.COMBAT_STATE();
    }
    ctx.COMBAT_TRY_FLEE = () => {
        let attempt = ctx.RND(10);
        if (attempt < 4) {
            ctx.message += "You managed to escape. "
            ctx.STACK_POP();
            console.log("Success")
        } else if (attempt < 8) {
            //espace with hit
            ctx.message += "You managed to escape, but... "

            ctx.COMBAT_NPC_ATTACK();
            console.log("Success kinda")
            ctx.STACK_POP();
        } else {
            ctx.message += "You didn't manage to escape. "

            ctx.COMBAT_NPC_ATTACK();
            console.log("Fail!")

        }
    }

    ctx.TAGGED_TYPES = (tags) => {
        let types = [];
        // tags.map(tag=>)
    }

    ctx.TRADER_ITEMS = () => ctx.trader.sells.map(
        item => item.startsWith('#') ? ctx.types.filter(t => t.tags && t.tags.includes(item.slice(1))).map(t => t.name) : item).flat();




}
export const functions = {
    WAIT_UNTIL_MORNING(ctx, CFG) {
        while (ctx.turn % (CFG.TURNS_PER_HOUR * 24) !== CFG.TURNS_PER_HOUR * 6) {
            this.nextTurn(ctx,CFG);
        }
    },
    FINDER(ctx,CFG,key, value) {
        return (el) => el[key] === value
    },
    MSG(ctx,CFG,text, type = 'info'){
        let message = {
            turn: ctx.turn,
            id: ctx.messageId++,
            text,
            type
        }
        ctx.messages = ctx.messages.concat(message) 
    },
    TYPE(ctx,CFG,x){
        return ctx.types.find(this.FINDER(ctx,CFG,'name',x));
        
    },
    TURN(ctx,CFG,x=1){
        for (let i = 0; i < x; i++) {
            this.nextTurn(ctx,CFG);
        }
    },
    GET_HOUR(ctx,CFG){return ((ctx.turn / CFG.TURNS_PER_HOUR) >> 0) % 24},
    GET_DAY(ctx,CFG){return (1 + ctx.turn / CFG.TURNS_PER_HOUR / 24) >> 0},

    IS_DAY(ctx,CFG) {
        let hour = ((ctx.turn / CFG.TURNS_PER_HOUR) >> 0) % 24;
        if (hour > 5 && hour < 20) return true;
        return false;
    },
    TIRE(ctx,CFG,x=1) {
        return this.STAT(ctx,CFG,'energy', -x);
    },
    DEBUG(ctx,CFG,...x){
        console.log("DEBUG:",...x);
    },
    STACK_POP(ctx,CFG){
        // console.log("STACK", ctx.stack);
        ctx.stack = ctx.stack.slice(0, ctx.stack.slice.length-1)
        // console.log("AFTER", ctx.stack)
    },
    STAT(ctx,CFG,stat, n,entity){
        entity = entity || ctx;
        const stats = entity.stats;
        stats[stat] += n;
        if (stats[stat] > stats[stat + "_max"]) {
            stats[stat] = stats[stat + "_max"];
        }
        if (stats[stat] < 0) stats[stat] = 0;
    },
    INVENTORY(ctx,CFG){
        return Object.entries(ctx.inventory)
            .filter(entry => entry[1])
            .map(entry => entry[0] + ":" + entry[1])
            .join(", ");
    },
    INV(ctx,CFG,item, n){
        const inventory = ctx.inventory;
        if (!n) {
            return inventory[item] || 0;
        } else {
            let count = inventory[item] || 0;
            inventory[item] = count + Number(n);
            if (inventory[item] < 0) inventory[item] = 0;
        }
    },
    TEST_ROLL(ctx,CFG,a){return Math.random() * 100 < a},
    RND(ctx,CFG,a){return (Math.random() * a) >> 0},
    nextTurn(ctx, CFG) {
        console.log("Turn passed, new turn ", ++ctx.turn);
        if (ctx.turn % (CFG.TURNS_PER_HOUR * 24) === CFG.TURNS_PER_HOUR * 6) {
            // console.log("New day!");
            this.PLANTS_GROW(ctx, CFG);
        }
        if (ctx.turn % (CFG.TURNS_PER_HOUR * 24) === CFG.TURNS_PER_HOUR * 22) {
            console.log("Pass out!");
            if (!ctx.flags.sleeping && !ctx.flags.passedOut) {
                // ctx.flags.passedOut = 1;
                this.MSG(`You passed out, it was too late!`);
            }
            this.WAIT_UNTIL_MORNING(ctx, CFG);
            this.MSG(`You woke up in the morning.`)
        }
    },
    SAVE(ctx, CFG){
        localStorage.setItem("save", JSON.stringify(ctx));
    },

    LOAD(ctx, CFG){
        let save = JSON.parse(localStorage.getItem("save"));
        Object.keys(ctx).forEach(key => {
            ctx[key] = save[key];
        });
        //TODO!!!
        // addFunctions(ctx, CFG)
    },


    // PLANTS

    PLANTS_GROW(ctx, CFG){
        ctx.farm.forEach(plot => {
            if (plot.plant) {
                plot.stage += ctx.TYPE(plot.plant).grow;
                if (plot.stage > 10) plot.stage = 10;
            }
        });
    },
    PLANT(ctx, CFG,plotKey, seed){
        let plant = seed.replace(/_seed/, "");
        let plot = ctx.farm[plotKey];
        plot.plant = plant;
        plot.stage = 0;
        // console.log("PLOT", plot);
    },
    PLANT_STATUS(ctx, CFG,plant){
        if (plant.plant) {
            return `${plant.plant} (${plant.stage}/10)`;

        } else return `- empty -`
    },
   
    HARVEST(ctx, CFG,plotKey){
        let plot = ctx.farm[plotKey];
        this.INV(ctx,CFG,plot.plant, 1);
        plot.plant = "";
        plot.stage = 0;
    },
}