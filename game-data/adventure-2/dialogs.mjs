export default
    [{
        id:"options",
        intro:[
            {text:"Options. You have {{INVENTORY}}"},
        ],
        options:[
            {text:"Eat a meal",if:"inventory.meal 0 > stats.energy 10 < &",run:"inventory.meal -1 INC_BY; stats.energy 3 INC_BY ; 10 stats.energy stats.energy 10 > ? DEBUG stats.energy :="},
            {text:"Rest an hour",if:"stats.energy 10 <",run:"4 TURN; stats.energy INC"},
            {text:"Wait an hour",run:"4 TURN"},
            {text:"Save Game",run:"SAVE"},
            {text:"Load Game",run:"LOAD"},
            {text:"Back",go:"return"},
        ]
    },
        {
            id:"start",
            intro:[
                {text:`You wake up on the side of a road. Your head hurts and you don\'t remember anything. 
                {{"The road seems to lead to some village, you have a feeling that the other way is trouble." "" flags.looked_around ?}}` }
            ],
            options:[
                {text:"Look at yourself.",go:"look-at-self"},
                {text:"Look around.",if:"flags.looked_around !",run:"1 flags.looked_around := ; 1 TURN"},
                {text:"Go towards the village",if:"flags.looked_around",go:"village",run:"2 TURN"}
            ]
        },
        {
            id: "look-at-self",
            run:"1 TURN",
            intro: [
                { text: `You look {{"rested" "tired" stats.energy 4 > ?}}, no obvious damage. {{"You are dirty." "" flags.dirty ?}}` }
            ],
            options: [
                { text: "Back", go: "return" }
            ]
        },
        {
            id: "village",
            intro: [
                { text: `You are in the village. {{"There are some people around." "Everyone gone inside for the night" IS_DAY ?}}` }
            ],
            options: [
                { text: `Talk to {{"an elderly man" "Bernie" flags.met_bernie ! ?}} sitting on a bench on the green`, go: "talk_bernie", if:"flags.bartender_favor_bernie_finished !" },
                { text:`Go to the pond.`,go:"pond"},
                { text:`Go to the inn.`,go:"inn"},
                { text: "Back to the road", run:"2 TURN", go: "return" }
            ]
        },
        //BERNIE
        {
            id: "talk_bernie",
            run:"flags.met_bernie INC",
            intro: [
                { text: `"Hello again. How is it going? What can I do for you?" said Bernie`,if:"flags.met_bernie 1 >" },
                { text: `"Hi there. My name is Bernie. What can I do for you" said elderly man.` },

            ],
            options: [
                { text: "Can you tell me what is this place?", go: "bernie_what_is_this_place" },
                { text:"The bartender says he is sorry and would like to go the the inn for a meal",if:"flags.bartender_favor_bernie_asked flags.bartender_favor_bernie_finished ! &",go:"bernie_agrees"},
                { text: "Nothing, I'm leaving", go: "return" }
            ]
        },
        {

            id: "bernie_agrees",
            intro: [
                { text: `"Ok. Free meal? I guess I can forgive him. Let's go!"` }
            ],
            options: [
                {text:"OK.",go:"flags.bartender_favor_bernie_finished"},
                // { text: "Thanks.", go: "return" }
            ]
        },
        {

            id: "bernie_what_is_this_place",
            run:"1 flags.citaa_remembered :=",
            intro: [
                { text: `'It's just a simple village.' we are the last stop before the sea port town of Oppa.
                 People usually go there if they need to get to Citaa, the capital'. You just remembered! You need to get to Citaa!` }
            ],
            options: [
                {text:"I just remembered! I need to to Citaa! How can I get there?"},
                { text: "Thanks.", go: "return" }
            ]
        },
        // POND
        {
            id: "pond",
            intro: [
                { text: "You find yourself by a pond." }
            ],
            options: [
                { text: "Wash yourself.", if: "flags.dirty", run:"2 TURN;0 flags.dirty :=" },
                { text: "Try to fish",go:"fishing"},
                { text: "Back", go: "return" }
            ]
        },

        {  
            id: "fishing",
            run :`2 TURN; 1 0 50 TEST ? catch := ; inventory.fish  catch INC_BY`,
            intro: [
                { text: "You caught a fish!",if:"catch" },
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
                { text: "Talk to Bernie", go:"talk_bernie",if:"flags.bartender_favor_bernie_finished"},
                { text: "Back", go: "return" }
            ]
        },
        {
            id: "bartender_talk",
            
            intro: [
                { text :`What can I do for you?`,if:"flags.talked_to_bartender"},
                { text: `"Hello there. Who are you stranger?"` }
            ],
            options: [
                { text:"I don't remember.",run:"1 flags.talked_to_bartender :=",if:"flags.talked_to_bartender !"},
                { text:"Thats's not your business! Bye.",go:"return",run:"1 flags.talked_to_bartender :=",if:"flags.talked_to_bartender !"},
                { text:"How can I earn some money?",if:"flags.talked_to_bartender",go:"bartender_money"},
                { text:"I would like to buy something.",if:"flags.talked_to_bartender",go:"bartender_sells"},

                { text:"All I remember is need to get to Citaa.",if:"flags.citaa_remembered",run:"1 flags.talked_to_bartender :=",go:"bartender_talk_citaa"},
                {text:"Nothing",go:"return",if:"flags.talked_to_bartender"}
            ]
        },
        {
            id: "bartender_talk_citaa",
            intro: [
                { text :`"I hope you have a lot of money. The ship fare costs 100 coins."`,if:"flags.talked_to_bartender"},
            ],
            options: [
                {text:"I understand.",go:"return"}
            ]
        },
        {
            id: "bartender_money",
            run:"1 flags.bartender_favor_bernie_asked :=",
            intro: [
                { text :`"I always can buy fish from you.{{"Go and tell Bernie I'm sorry, ask him to come here and you both will get free meal." "" flags.bartender_favor_bernie_finished ! ?}}"`},
            ],
            options: [
                {text:`Sell 1 fish`,if:"inventory.fish 0 >",run:"inventory.fish -1 INC_BY;inventory.money 3 INC_BY"},
                {text:"I understand.",go:"return"}
            ]
        },
        {
            id: "bartender_sells",
            intro: [
                { text :`"I have meals for 5 gold."`}
            ],
            options: [
                {text:`Buy 1 meal`,if:"inventory.money 4 >",run:"inventory.money -5 INC_BY;inventory.meal INC"},
                {text:"Thanks.",go:"return"}
            ]
        },
        {
            run:"1 flags.bartender_favor_bernie_finished :=; inventory.meal INC",
            id: "flags.bartender_favor_bernie_finished",
            intro: [
                { text: `You both went to the inn. The Bartender says "Thanks for that! Meals for you!" and gives you a nice hot meal.` }
            ],
            options: [
                {text:"Thanks.",go:"inn"},
                // { text: "Thanks.", go: "return" }
            ]
        },
        
        
    ]