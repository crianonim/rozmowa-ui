export function addFunctions(ctx, CFG) {
    Object.keys(functions)
    .filter(fn=>fn===fn.toUpperCase())
    .forEach(function(fn){
        ctx[fn]=function(...args){
           return functions[fn](ctx,CFG,...args);
        }
    })
   
   return;
   
   
    
//    ctx.GET_MINUTES = () => (ctx.turn % CFG.TURNS_PER_HOUR) * 15;



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
        console.log(ctx,CFG,text,type);
        let message = {
            turn: ctx.turn,
            id: ctx.messageId++,
            text,
            type
        }
        ctx.messages = ctx.messages.concat(message) 
    },
    ITEM_TYPES(ctx,CFG,arr){
        let all=arr.map(item => item.startsWith('tag:') ? ctx.types.filter(t => t.tags && t.tags.includes(item.slice(4))).map(t => t.name) : item).flat();
        let unique=Array.from(new Set(all));
        return unique;
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
        console.log("STACK", ctx.stack);
        ctx.stack = ctx.stack.slice(0, ctx.stack.length-2)
        console.log("AFTER", ctx.stack)
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
    /**
     * 
     * @param ctx 
     * @param CFG 
     * @param a Number
     */
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
                this.MSG(ctx, CFG,`You passed out, it was too late!`);
            }
            this.WAIT_UNTIL_MORNING(ctx, CFG);
            this.MSG(ctx, CFG,`You woke up in the morning.`)
        }
    },
    SAVE(ctx, CFG){
        let {recipes,types,...toStore} = ctx;
        console.log(toStore);
        localStorage.setItem("save", JSON.stringify(toStore));
    },

    LOAD(ctx, CFG){
        let save = JSON.parse(localStorage.getItem("save"));
        Object.keys(save).forEach(key => {
            ctx[key] = save[key];
        });
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



  MINE(ctx,CFG){
        let stone = (Math.random() * (ctx.depth + 2)) >> 0;
        this.TURN(ctx,CFG,4);
        this.TIRE(ctx,CFG,10);
        ctx.message = `You found ${stone} stones.`;
        this.INV(ctx,CFG,'stone', stone);
    },
    FORAGE(ctx,CFG) {
        let stick = (Math.random() * (ctx.depth + 2)) >> 0;
        this.TURN(ctx,CFG,4);
        this.TIRE(ctx,CFG,4);
        ctx.message = `You found ${stick} sticks.`;
        this.INV(ctx,CFG,'stick', stick);

    },
    EXPLORE(ctx,CFG,place){
        let places=Object.keys(place);
        let count=places.length;
        let undiscovered=Object.entries(place).filter(sub=>!sub[1]);
        console.log("UND",undiscovered,"CHA",undiscovered.length/count*50);

        if (this.TEST_ROLL(ctx,CFG,undiscovered.length/count*50)){
            let found = undiscovered[ctx.RND(ctx,CFG,undiscovered.length)][0];
            place[found]=true;
            console.log("FOUND",found)
        } else {
            console.log("NOT FOUND");
        }

    }
    ,
    CRAFT(ctx,CFG,item){
        let recipe = ctx.recipes.find(this.FINDER(ctx,CFG,'name', item));
        recipe.ing.forEach(ing => {
            let [name, amount] = ing;
            console.log("C",name,amount);
            this.INV(ctx,CFG,name, -amount);
        })
        this.INV(ctx,CFG,item, 1);
        this.TURN(ctx,CFG,1);
    },


    TRADER_ITEMS (ctx,CFG){ return ctx.types.filter(type=>
        ctx.trader.sells.some(selling=>selling===type.name || selling.startsWith('tag:')&& type.tags && type.tags.includes(selling.slice(4)))
    ).map(type=>type.name) },


    COMBAT_START(ctx,CFG,opponentName){
        ctx.opponent = ctx.npc.find(this.FINDER(ctx,CFG,'name', opponentName));
        ctx.combat_forced = true;
        this.COMBAT_PREPARE(ctx,CFG);
    },
    COMBAT_PREPARE(ctx,CFG){
        let opponent = ctx.opponent;
        if (opponent.generic) {
            opponent.stats.energy = opponent.stats.energy_max;
        }
    },

    COMBAT_IS_FINISHED(ctx,CFG) {return ctx.combat_won || ctx.combat_lost || ctx.stats.energy < 1 || ctx.opponent.stats.energy < 1},
    COMBAT_ATTACK(ctx,CFG) {
        let player_dmg = this.RND(ctx,CFG,10);
        this.TIRE(ctx,CFG,1);
        this.STAT(ctx,CFG,'energy', -player_dmg, ctx.opponent);
        ctx.message = `You hit ${ctx.opponent.name} for ${player_dmg} damage. `, 'combat';
        this.MSG(ctx,CFG,`You hit ${ctx.opponent.name} for ${player_dmg} damage. `, 'combat');
    },
    COMBAT_NPC_ATTACK(ctx,CFG) {
        if (ctx.opponent.stats.energy > 0) {
            let opp_dmag = this.RND(ctx,CFG,10);
            this.STAT(ctx,CFG,'energy', -opp_dmag);
            ctx.message += ` You are hit for ${opp_dmag} damage. `, 'combat';
            this.MSG(ctx,CFG,` You are hit for ${opp_dmag} damage. `, 'combat')
        }
    },
    COMBAT_STATE(ctx,CFG) {
        if (ctx.opponent.stats.energy < 1) {
            ctx.message += ` You defeated ${ctx.opponent.name}!`;
            ctx.combat_won = true;
        } else if (ctx.stats.energy < 1) {
            ctx.message += ` You have been defeated! `;
            ctx.flags.passedOut = 1;

            this.MSG(ctx,CFG,` You have been defeated! `)
            this.MSG(ctx,CFG,`You have passed out for some time...`);
            ctx.combat_lost = true;
            this.TURN(ctx,CFG,CFG.TURNS_PER_HOUR * 8);
            ctx.flags.passedOut = 0;

            ctx.stats.energy = (ctx.stats.energy_max / 2) >> 0;
        }
    },
    COMBAT_ROUND(ctx,CFG) {
        this.COMBAT_ATTACK(ctx,CFG,);
        this.TEST_ROLL(ctx,CFG,10) ? ctx.TURN(ctx,CFG,1) : null;
        this.COMBAT_NPC_ATTACK(ctx,CFG,);
        this.COMBAT_STATE(ctx,CFG,);
    },
    COMBAT_TRY_FLEE(ctx,CFG) {
        let attempt = ctx.RND(ctx,CFG,10);
        if (attempt < 4) {
            ctx.message += "You managed to escape. "
            this.STACK_POP(ctx,CFG,);
            console.log("Success")
        } else if (attempt < 8) {
            //espace with hit
            ctx.message += "You managed to escape, but... "

            this.COMBAT_NPC_ATTACK(ctx,CFG,);
            console.log("Success kinda")
            this.STACK_POP(ctx,CFG,);
        } else {
            ctx.message += "You didn't manage to escape. "

            this.COMBAT_NPC_ATTACK(ctx,CFG);
            console.log("Fail!")

        }
    }



}