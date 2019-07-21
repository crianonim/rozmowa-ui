export default
    [{
        id:"options",
        intro:[
            {text:"Options. You have {{$INVENTORY()}}"},

        ],
        options:[
            {text:"Look at yourself.",go:"look-at-self"},
            {text:"Eat a meal",if:"$inventory.meal > 0 & $stats.energy < 10 ",run:"$inventory.meal--; $stats.energy+=3; $stats.energy = $stats.energy > 10  ? 10 : $stats.energy"},
            {text:"Rest an hour",if:"$stats.energy < 10",run:"$TURN(4); $stats.energy ++"},
            {text:"Wait an hour",run:"$TURN(4)"},
            {each:"(value,i) in  Object.keys($inventory)",text:"Buy {{$value}} at  {{$i}}"},
            {text:"Sleep until morning",run:"$flags.sleeping=1;$WAIT_UNTIL_MORNING();$flags.sleeping=0;$stats.energy=15"},
            {text:"Save Game",run:"$SAVE()"},
            {text:"Load Game",run:"$LOAD()"},
            {text:"Back",go:"return"},
        ]
    },
//     {
// id:"start",
// intro:[
//     {text:"Jest"},
// ],
// options:[
//     {text:"Ki"}
// ]

//     },
        {
            id:"start",
            intro:[
                {text:`You wake up on the side of a road. Your head hurts and you don\'t remember anything. 
                {{$flags.looked_around ? "The road seems to lead to some village, you have a feeling that the other way is trouble." : "" }}` }
            ],
            options:[
                // {text:"Look around.",if:" !$flags.looked_around ",run:"$flags.looked_around++"},
                {text:"Look around.",if:" !$flags.looked_around ",run:"$flags.looked_around++ ; $TURN(1)"},
                {text:"Go towards the village",if:"$flags.looked_around",go:"village",run:"$TURN(2)"}

                // {text:"Go towards the village",if:"$flags.looked_around",go:"village"}
            ]
        },
        {
            id: "look-at-self",
            // run:"1 TURN",
            run:"$TURN(1)",

            intro: [
                { text: `You look {{ $stats.energy > 4 ?  "rested" : "tired"}}, no obvious damage. {{$flags.dirty ? "You are dirty." : "" }}` }
            ],
            options: [
                { text: "Back", go: "return" }
            ]
        },
        {
            id: "village",
            intro: [
                { text: `You are in the village. {{$IS_DAY()?"There are some people around." : "Everyone gone inside for the night"}}` }
            ],
            options: [
                { text: `Talk to {{!$flags.met_bernie ? "an elderly man" : "Bernie"}} sitting on a bench on the green`, go: "talk_bernie", if:"!$flags.bartender_favor_bernie_finished" },
                { text:`Go to the pond.`,go:"pond"},
                { text:`Go to the inn.`,go:"inn"},
                // { text: "Back to the road", run:"2 TURN", go: "return" }
            ]
        },
        //BERNIE
        {
            id: "talk_bernie",
            run:"$flags.met_bernie++",
            intro: [
                { text: `"Hello again. How is it going? What can I do for you?" said Bernie`,if:"$flags.met_bernie > 1" },
                { text: `"Hi there. My name is Bernie. What can I do for you" said elderly man.` },

            ],
            options: [
                { text: "Can you tell me what is this place?", go: "bernie_what_is_this_place" },
                { text:"The bartender says he is sorry and would like to go the the inn for a meal",if:"$flags.bartender_favor_bernie_asked  & !$flags.bartender_favor_bernie_finished",go:"bernie_agrees"},
                { text: "Nothing, I'm leaving", go: "return" }
            ]
        },
        {

            id: "bernie_agrees",
            intro: [
                { text: `"Ok. Free meal? I guess I can forgive him. Let's go!"` }
            ],
            options: [
                {text:"OK.",go:"task_bartender_favor_bernie_finished"},///?
                // { text: "Thanks.", go: "return" }
            ]
        },
        {

            id: "bernie_what_is_this_place",
            run:"$flags.citaa_remembered=1",
            intro: [
                { text: `'It's just a simple village.' we are the last stop before the sea port town of Oppa.
                 People usually go there if they need to get to Citaa, the capital'. You just remembered! You need to get to Citaa!` }
            ],
            options: [
                {text:"I just remembered! I need to to Citaa! How can I get there?",go:"bernie_how_citaa"},
                { text: "Thanks.", go: "return" }
            ]
        },
        {
            id:"bernie_how_citaa",
            intro:[
                {text:"Well, the ships to Citaa leave every 12 days, and you can catch a carriage to Oppa every afternoon, the bartender knows the current price."}
            ],
            options:[
                {text:"Thanks",go:"return"}
            ]
        },
        // POND
        {
            id: "pond",
            intro: [
                { text: "You find yourself by a pond." }
            ],
            options: [
                { text: "Wash yourself.", if: "$flags.dirty", run:"$TURN(2);$flags.dirty=0" },
                { text: "Try to fish",go:"fishing"},
                { text: "Back to village", go: "village" }
            ]
        },

        {  
            id: "fishing",
            run :`$TURN(2); $catch = $TEST_ROLL(50) ? 1 : 0; $inventory.fish+=$catch`,
            intro: [
                { text: "You caught a fish!",if:"$catch" },
                { text:"Sorry, no bonus"},
            ],
            options: [
                { text: "Back", go: "return" }
            ]
        },
        // INN
        {
            id: "inn",
            intro: [
                { text: "You are in a small inn. There is a bartender at the bar." }
            ],
            options: [
                { text: "Talk to the bartender",go:"bartender_talk"},
                { text: "Talk to Bernie", go:"talk_bernie",if:"$flags.bartender_favor_bernie_finished"},
                { text: "Back to village", go: "village" }
            ]
        },
        {
            id: "bartender_talk",
            
            intro: [
                { text :`What can I do for you?`,if:"$flags.talked_to_bartender"},
                { text: `"Hello there. Who are you stranger?"` }
            ],
            options: [
                { text:"I don't remember.",run:"$flags.talked_to_bartender=1",if:"!$flags.talked_to_bartender"},
                { text:"Thats's not your business! Bye.",go:"return",run:"$flags.talked_to_bartender=1",if:"!$flags.talked_to_bartender"},
                { text:"How can I earn some money?",if:"$flags.talked_to_bartender",go:"bartender_money"},
                { text:"I would like to buy something.",if:"$flags.talked_to_bartender",go:"bartender_sells"},

                { text:"All I remember is need to get to Citaa.",if:"$flags.citaa_remembered",run:"$flags.talked_to_bartender=1",go:"bartender_talk_citaa"},
                {text:"Nothing",go:"return",if:"$flags.talked_to_bartender"}
            ]
        },
        {
            id: "bartender_talk_citaa",
            intro: [
                { text :`"I hope you have a lot of money. The ship fare costs 100 coins."`,if:"$flags.talked_to_bartender"},
            ],
            options: [
                {text:"I understand.",go:"return"}
            ]
        },
        {
            id: "bartender_money",
            run:"$flags.bartender_favor_bernie_asked=1",
            intro: [
                { text :`"I always can buy fish from you.{{!$flags.bartender_favor_bernie_finished ? "Go and tell Bernie I'm sorry, ask him to come here and you both will get free meal." : ""  }}"`},
            ],
            options: [
                {text:`Sell 1 fish`,if:"$inventory.fish > 0",run:"$inventory.fish--;$inventory.money+=3"},
                {text:"I understand.",go:"return"}
            ]
        },
        {
            id: "bartender_sells",
            intro: [
                { text :`"I have meals for 5 gold."`}
            ],
            options: [
                {text:`Buy 1 meal`,if:"$inventory.money > 4",run:"$inventory.money-=5;$inventory.meal++"},
                {text:"Thanks.",go:"return"}
            ]
        },
        {
            run:"$flags.bartender_favor_bernie_finished=1; $inventory.meal++",
            id: "task_bartender_favor_bernie_finished",
            intro: [
                { text: `You both went to the inn. The Bartender says "Thanks for that! Meals for you!" and gives you a nice hot meal.` }
            ],
            options: [
                {text:"Thanks.",go:"inn"},
                // { text: "Thanks.", go: "return" }
            ]
        },
        
        
    ]