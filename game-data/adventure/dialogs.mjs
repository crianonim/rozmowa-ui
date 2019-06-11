export default
    [
        {
            id: "basic",
            intro: [
                { text: "Hello, my name is noone." }
            ],
            options: [
                { text: "Hello to you to", go: "other" },
                { text: "I don't want to talk", go: "exit" }
            ]
        },
        {
            id: "other",
            run: "other.met INC",
            intro: [
                { text: "Hello, I hate you. Met you too many times", if: "other.met 2 >" },
                { text: "Hello, I already met you!", if: "other.met 0 >" },
                { text: "Hello, stranger!", run: '"Jan" other.x :=' }
            ],
            options: [
                { text: "Same here", if: "other.met 0 >", go: "basic" },
                { text: "Hello to you to", run: "other.met 1 - other.met :=" },
                { text: "I don't want to talk", go: "exit" }]
        },
        {
            id: "game",
            run: "turn INC",
            intro:[
                {text:"Hello we have turn {{turn}} and you have {{money 0 +}} money and enough points ({{score}}) to advance! ",if:"score 3 >",run:"1 achieved :="},

                {text:"Hello we have turn {{turn}} and you have {{money 0 +}} money and scored {{score}}"}
            ],
            options:[
                {text:"I want to get a point!",if:"score 2 <",run:"score INC"},
                {text:"I just want to wait until turn {{turn 1 +}}."},
                {text:"I will work for extra 2 turns",run:"money INC; turn INC"},
                {text:"I want to buy a point for 3 money",if:"money 2 >",run:"money -3 INC_BY ; score INC"},
                {text:"I can affort 2 points for 5!",if:"money 4 >",run:"money -5 INC_BY ; score 2 INC_BY"},
                {text:"Proceed",go:"advance",if:"achieved"}
            
            ]
        },
        {
            id: "advance",
            run: "turn 2 + turn :=",
            intro:[

                {text:"Welcome to advanced. Hello we have turn {{turn}} and you have {{money 0 +}} money and scored {{score}}"}
            ],
            options:[
                {text:"I want to get a point!",if:"score 2 <",run:"score 1 + score :="},
                {text:"I just want to wait until turn {{turn 1 +}}."},
                {text:"I will work for extra 2 turns",run:"money 1 + money :=; turn 1 + turn :="},
                {text:"I want to buy a point for 3 money",if:"money 2 >",run:"money 3 - money := ; score 1 + score :="},
                {text:"I can affort 2 points for 5!",if:"money 4 >",run:"money 5 - money := ; score 2 + score :="},
            
            ]
        },
        {
           
            id:"adventure",
            intro:[
                {text:'You are standing in the village green. {{"You see a backpack" "" backpack ?}}'}
            ],
            options:[
                {text:'Pick up the backpack',if:"backpack",run:"0 backpack :=; 1 inventory.backpack :="},
                {text:'Sit on a bench and rest a bit',if:"stats.energy 10 <",run:"stats.energy INC;2 TURN"},
                {text:'Do some paid work',if:'stats.energy 1 >', run:"stats.energy -2 INC_BY ; inventory.money 1 INC_BY; 5 TURN"},
                {text:'Go to the tavern',go:"tavern",run:"1 TURN"},
                {text:'Nothing...'},
            ]
        },
        {
            id:"tavern",
            intro:[
                {text:'You are in the tavern'}
            ],
            options:[
                {text:'Talk to bartender',if:"talked_to_bartender !",go:'bartender'},
                {text:'Leave',go:"adventure"},
            ]
        },
        {
            run:"1 TURN;talked_to_bartender INC",
            id:"bartender",
            intro:[
                {text:'Hello, here\'s the sword to kill dragon' ,run:'inventory.sword INC'}
            ],
            options:[
                {text:'Leave',go:"adventure"},
            ]
        }
    ]