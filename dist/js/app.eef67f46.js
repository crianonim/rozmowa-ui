(function(e){function t(t){for(var o,i,s=t[0],l=t[1],c=t[2],g=0,f=[];g<s.length;g++)i=s[g],a[i]&&f.push(a[i][0]),a[i]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(e[o]=l[o]);u&&u(t);while(f.length)f.shift()();return r.push.apply(r,c||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],o=!0,s=1;s<n.length;s++){var l=n[s];0!==a[l]&&(o=!1)}o&&(r.splice(t--,1),e=i(i.s=n[0]))}return e}var o={},a={app:0},r=[];function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var u=l;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var o=n("64a9"),a=n.n(o);a.a},"1f73":function(e,t,n){},"221c":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"run",function(){return run}),__webpack_require__.d(__webpack_exports__,"interpolate",function(){return interpolate});var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("a481"),core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__);function run(text){var ctx=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return text=text.replace(/\$(\w+\W?)/g," ctx.$1"),console.log("EVAL",text),eval(text)}function interpolate(e,t){return e.replace(/{{(.*?)}}/g,function(e,n){var o=run(n,t);return console.log("RESULT of interpolation",o),o})}},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var o=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Gra",{attrs:{msg:"Welcome to Your Vue.js App"}})],1)},r=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("div",{staticClass:"status"},[n("div",{domProps:{innerHTML:e._s(e.statusText)}}),e.ctx.options?n("div",{staticClass:"option",attrs:{"data-option":"options"},on:{click:e.chooseOption}},[e._v("Options")]):e._e()]),e.dialog?n("div",{staticClass:"dialog"},[n("div",{staticClass:"intro",domProps:{innerHTML:e._s(e.dialog.intro.textInterpolated)}}),e._l(e.dialog.options,function(t,o){return n("div",{key:e.ctx.dialogName+"_"+o+" "+t.text.length,staticClass:"option",attrs:{"data-option":o,test:e.ctx.dialogName+"_"+o+" "+t.text.length},on:{click:e.chooseOption}},[e._v(e._s(t.textInterpolated))])})],2):e._e(),n("input",{directives:[{name:"model",rawName:"v-model",value:e.debug,expression:"debug"}],attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.debug)?e._i(e.debug,null)>-1:e.debug},on:{change:function(t){var n=e.debug,o=t.target,a=!!o.checked;if(Array.isArray(n)){var r=null,i=e._i(n,r);o.checked?i<0&&(e.debug=n.concat([r])):i>-1&&(e.debug=n.slice(0,i).concat(n.slice(i+1)))}else e.debug=a}}}),e.debug?n("debug",{attrs:{ctx:e.ctx}}):e._e()],1)},s=[],l=(n("4917"),n("768b")),c=(n("ac6a"),n("28a5"),n("7514"),n("221c"));function u(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};function o(e){return e?c["run"](e,n):void 0}console.log("DATA",e);var a=e.find(function(e){return e.id==t});if(a){o(a.run);var r=a.intro.find(function(e){return!e.if||c["run"](e.if,n)});r.textInterpolated=c["interpolate"](r.text,n).split("^nl").join("<br>"),console.log("TI",r.textInterpolated),o(r.run);var i=[];return a.options.forEach(function(e){if(e.each){var t=e.each.match(/^\((.*)\) in (.*)/),o=Object(l["a"])(t,3),a=(o[0],o[1]),r=o[2],s=a.split(/\s?,\s?/),u=Object(l["a"])(s,2),g=u[0],f=u[1];console.log("FIRST",a),console.log("x".concat(g,"x x").concat(f,"x")),console.log("ARR",r);var d=c["run"](r,n);console.log("ARRR",d),d.forEach(function(t,o){var a=JSON.parse(JSON.stringify(e));n[g]=t,n[f]=o,a.textInterpolated=c["interpolate"](a.text,n).split("^nl").join("<br>");var r="$"+g+"="+JSON.stringify(t)+"; $"+f+"="+JSON.stringify(o)+";";a.run&&(a.run=r+a.run),a.if&&(a.if=r+a.if),console.log("NO",a),i.push(a)})}else e.textInterpolated=c["interpolate"](e.text,n).split("^nl").join("<br>"),i.push(e)}),i=i.filter(function(e){return!e.if||c["run"](e.if,n)}),{intro:r,options:i}}}function g(e,t){return e.run&&(console.log("OPTION to run",e.run),c["run"](e.run,t)),!e.go||"exit"!=e.go&&e.go}console.log("SCREEPT",c);var f={processDialog:u,hello:function(){console.log("Hello.")},processOptionChoice:g,screept:c},d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h2",[e._v("Debug")]),n("h1",{staticClass:"dialogName"},[e._v("Dialog: "+e._s(e.ctx.dialogName)+" Turn: "+e._s(e.ctx.turn))]),n("h1",[e._v("Stack")]),n("div",{staticClass:"stack flex-wrapped"},e._l(e.ctx.stack,function(t,o){return n("div",{key:t+o},[e._v(e._s(t))])}),0),n("h1",[e._v("Flags")]),n("div",{staticClass:"flags flex-wrapped"},e._l(e.ctx.flags,function(t,o){return n("div",{key:o,class:{flagOn:t}},[e._v(e._s(o)+"("+e._s(t)+")")])}),0),n("h1",[e._v("Inventory")]),n("div",{staticClass:"inventory flex-wrapped"},e._l(e.ctx.inventory,function(t,o){return n("div",{key:o,class:{flagOn:t}},[e._v(e._s(o)+"("+e._s(t)+")")])}),0),n("h1",[e._v("Stats")]),n("div",{staticClass:"stats flex-wrapped"},e._l(e.ctx.stats,function(t,o){return n("div",{key:o},[e._v(e._s(o)+"("+e._s(t)+")")])}),0)])},_=[],p={name:"Debug",props:["ctx"]},h=p,$=(n("fa7e"),n("2877")),m=Object($["a"])(h,d,_,!1,null,"77f9bd40",null),x=m.exports,v=[{id:"options",intro:[{text:"Options. You have {{$INVENTORY()}}"}],options:[{text:"Craft",go:"craft"},{text:"Cook",run:"$crafting_station='kitchen'",go:"craft"},{text:"Fight",run:"$opponent=$npc.find($FINDER('name','goblin'));$COMBAT_PREPARE()",go:"combat"},{text:"Look at yourself.",go:"look-at-self"},{text:"Eat",go:"eat"},{text:"Eat a meal {{$INV('widget')}}",if:"$INV('meal') > 0 & $stats.energy < 100; ",run:"$INV('meal',-1); $INV('widget',2)"},{text:"Rest an hour",if:"$stats.energy < 100",run:"$TURN(4); $STAT('energy',10)"},{text:"Wait an hour",run:"$TURN(4)"},{text:"Sleep until morning",run:"$flags.sleeping=1;$WAIT_UNTIL_MORNING();$flags.sleeping=0;$stats.energy=$stats.energy_max*1.2",go:"return"},{text:"Save Game",run:"$SAVE()"},{text:"Load Game",run:"$LOAD()"},{text:"* Grow Plants *",run:"$PLANTS_GROW()"},{text:"Back",go:"return"}]},{id:"message",intro:[{text:"{{$message}}"}],options:[{text:"OK",run:"$message=''",go:"return"}]},{id:"eat",intro:[{text:"What do you want to eat?"}],run:"$DEBUG($TYPE('cabbage'))",options:[{each:"(v,k) in Object.entries($inventory).filter( (va)=>va[1] && $TYPE(va[0]) && $TYPE(va[0]).foodValue)",text:"{{$v[0]}} (you have {{$v[1]}})",run:"$STAT('energy',$TYPE($v[0]).foodValue);$INV($v[0],-1);$TURN(1)"},{text:"Nothing",go:"return"}]},{id:"craft",intro:[{text:"Craft {{$crafting_station||''}}"}],options:[{each:"(v,k) in $recipes",if:"( ($v.workstation || $crafting_station) ?$crafting_station==$v.workstation : true ) && $v.ing.every(ing=>$INV(ing[0])>=ing[1])",text:"{{$v.name}}",run:"$CRAFT($v.name)"},{text:"Nothing",run:"$crafting_station=''",go:"return"}]},{id:"farm",intro:[{text:"Your farm has {{$farm.length}} plots. Growing {{$farm.map($PLANT_STATUS).join(', ')}}"}],options:[{text:"Plant",if:"$farm.find(plot=>!plot.plant)",go:"plant"},{text:"Harvest",if:"$farm.find($FINDER('stage',10))",go:"harvest"},{text:"Grow",run:"$PLANTS_GROW()"},{text:"Back",go:"return"}]},{id:"plant",intro:[{text:"Currently planting {{$planting}} and you have {{$INV($planting)}}",if:"$planting"},{text:"No seeds chosen."}],options:[{text:"Change seeds",go:"choose_planting"},{each:"(v,k) in  $farm",if:"!$v.plant && $INV($planting)",text:"Plant {{$planting}}",run:"$DEBUG($k);$DEBUG($v); \n              $PLANT($k,$planting); $TIRE(1); $TURN(5);$INV($planting,-1)"},{text:"Back",go:"return"}]},{id:"choose_planting",intro:[{text:"Currently planting {{$planting}} and you have {{$INV($planting)}} ",if:"$planting"},{text:"No seeds chosen."}],options:[{text:"Nothing.",run:"$planting=null"},{each:"(v,k) in Object.keys($inventory).filter(item=>item.includes('_seed'))",text:"You have {{$INV($v)}} of {{$v}}",run:"$planting=$v",go:"return"},{text:"Back",go:"return"}]},{id:"trade",run:"$trader=$npc.find($FINDER('name',$traderName))",intro:[{text:"Hello my name is {{$trader.name}} and I'd like to trade!"}],options:[{each:"(v,k) in $trader.sells",if:"$INV('money')>=$TYPE($v).price",text:"Buy 1 {{$v}} for {{$TYPE($v).price}} .",run:"$INV($v,1);$INV('money',-$TYPE($v).price)"},{each:"(v,k) in $trader.buys",if:"$INV($v)",text:"Sell 1 {{$v}} for {{$TYPE($v).price}}",run:"$INV($v,-1);$INV('money',$TYPE($v).price)"},{text:"Back",go:"return"}]},{id:"combat",run:"$DEBUG($opponent);$options=false;$DEBUG($options)",intro:[{text:"{{$message}} The fight is over!",if:"$combat_won||$combat_lost",run:"$message=''"},{text:"{{$message}}You are fighting with {{$opponent.name}} that has {{$opponent.stats.energy}} energy",run:"$message=''"}],options:[{text:"Attack!",if:"!$COMBAT_IS_FINISHED()",run:"$COMBAT_ROUND()"},{text:"Flee!",if:"!$COMBAT_IS_FINISHED()",go:"combat_flee"},{text:"Great!",if:"$combat_won",run:"$combat_won=false;$combat_lost=false;$options=true",go:"return"},{text:"Oh well...",if:"$combat_lost",run:"$options=true",go:"return"}]},{id:"combat_flee",run:"$COMBAT_TRY_FLEE()",intro:[{text:"You try to flee. {{$message}}  ",run:"$message=''"}],options:[{text:"OK",go:"return"}]},{id:"harvest",intro:[{text:"What you want to harvest?"}],options:[{each:"(v,k) in $farm",if:"$v.stage===10",text:"Harvest {{$v.plant}}",run:"$DEBUG($k);$HARVEST($k);$TIRE(2);$TURN(1)"},{text:"Back",go:"return"}]},{id:"start",intro:[{text:'You wake up on the side of a road. Your head hurts and you don\'t remember anything. \n                {{$flags.looked_around ? "The road seems to lead to some village, you have a feeling that the other way is trouble." : "" }}'}],options:[{text:"Look around.",if:" !$flags.looked_around ",run:"$flags.looked_around++ ; $TURN(1)"},{text:"Go towards the village",if:"$flags.looked_around",go:"village",run:"$TURN(2)"}]},{id:"look-at-self",run:"$TURN(1)",intro:[{text:'You look {{ $stats.energy > 40 ?  "rested" : "tired"}}, no obvious damage. {{$flags.dirty ? "You are dirty." : "" }}'}],options:[{text:"Back",go:"return"}]},{id:"village",intro:[{text:'You are in the village. {{$IS_DAY()?"There are some people around." : "Everyone gone inside for the night"}}'}],options:[{text:'Talk to {{!$flags.met_bernie ? "an elderly man" : "Bernie"}} sitting on a bench on the green',go:"talk_bernie",if:"!$flags.bartender_favor_bernie_finished"},{text:"Go to the pond.",go:"pond"},{text:"Go to the inn.",go:"inn"},{text:"Go to the shop.",run:"$traderName='Zach'",go:"trade"},{text:"Go to your farm.",go:"farm"},{text:"Go to the forest",go:"forest"},{text:"Go to the caves",go:"caves"}]},{id:"talk_bernie",run:"$flags.met_bernie++",intro:[{text:'"Hello again. How is it going? What can I do for you?" said Bernie',if:"$flags.met_bernie > 1"},{text:'"Hi there. My name is Bernie. What can I do for you" said elderly man.'}],options:[{text:"Can you tell me what is this place?",go:"bernie_what_is_this_place"},{text:"The bartender says he is sorry and would like to go the the inn for a meal",if:"$flags.bartender_favor_bernie_asked  & !$flags.bartender_favor_bernie_finished",go:"bernie_agrees"},{text:"Nothing, I'm leaving",go:"return"}]},{id:"bernie_agrees",intro:[{text:'"Ok. Free meal? I guess I can forgive him. Let\'s go!"'}],options:[{text:"OK.",go:"task_bartender_favor_bernie_finished"}]},{id:"bernie_what_is_this_place",run:"$flags.citaa_remembered=1",intro:[{text:"'It's just a simple village.' we are the last stop before the sea port town of Oppa.\n                 People usually go there if they need to get to Citaa, the capital'. You just remembered! You need to get to Citaa!"}],options:[{text:"I just remembered! I need to to Citaa! How can I get there?",go:"bernie_how_citaa"},{text:"Thanks.",go:"return"}]},{id:"bernie_how_citaa",intro:[{text:"Well, the ships to Citaa leave every 12 days, and you can catch a carriage to Oppa every afternoon, the bartender knows the current price."}],options:[{text:"Thanks",go:"return"}]},{id:"pond",intro:[{text:"You find yourself by a pond."}],options:[{text:"Wash yourself.",if:"$flags.dirty",run:"$TURN(2);$flags.dirty=0"},{text:"Try to fish",go:"fishing"},{text:"Back to village",go:"village"}]},{id:"fishing",run:"$TURN(2); $catch = $TEST_ROLL(50) ? 1 : 0; $INV('fish',$catch); $TIRE(2)",intro:[{text:"You caught a fish!",if:"$catch"},{text:"Sorry, no bonus"}],options:[{text:"Back",go:"return"}]},{id:"inn",intro:[{text:"You are in a small inn. There is a bartender at the bar."}],options:[{text:"Talk to the bartender",go:"bartender_talk"},{text:"Talk to Bernie",go:"talk_bernie",if:"$flags.bartender_favor_bernie_finished"},{text:"Trade",run:"$traderName='Bartender'",go:"trade"},{text:"Back to village",go:"village"}]},{id:"bartender_talk",intro:[{text:"What can I do for you?",if:"$flags.talked_to_bartender"},{text:'"Hello there. Who are you stranger?"'}],options:[{text:"I don't remember.",run:"$flags.talked_to_bartender=1",if:"!$flags.talked_to_bartender"},{text:"Thats's not your business! Bye.",go:"return",run:"$flags.talked_to_bartender=1",if:"!$flags.talked_to_bartender"},{text:"How can I earn some money?",if:"$flags.talked_to_bartender",go:"bartender_money"},{text:"I would like to buy something.",if:"$flags.talked_to_bartender",go:"bartender_sells"},{text:"All I remember is need to get to Citaa.",if:"$flags.citaa_remembered",run:"$flags.talked_to_bartender=1",go:"bartender_talk_citaa"},{text:"Nothing",go:"return",if:"$flags.talked_to_bartender"}]},{id:"bartender_talk_citaa",intro:[{text:'"I hope you have a lot of money. The ship fare costs 100 coins."',if:"$flags.talked_to_bartender"}],options:[{text:"I understand.",go:"return"}]},{id:"bartender_money",run:"$flags.bartender_favor_bernie_asked=1",intro:[{text:'"I always can buy fish from you.{{!$flags.bartender_favor_bernie_finished ? "Go and tell Bernie I\'m sorry, ask him to come here and you both will get free meal." : ""  }}"'}],options:[{text:"Sell 1 fish",if:"$INV('fish') > 0",run:"$INV('fish',-1);$INV('money',3)"},{text:"I understand.",go:"return"}]},{id:"bartender_sells",intro:[{text:'"I have meals for 5 gold."'}],options:[{text:"Buy 1 meal",if:"$INV('money') > 4",run:"$INV('money',-5);$INV('meal',1)"},{text:"Thanks.",go:"return"}]},{run:"$flags.bartender_favor_bernie_finished=1; $INV('meal',1)",id:"task_bartender_favor_bernie_finished",intro:[{text:'You both went to the inn. The Bartender says "Thanks for that! Meals for you!" and gives you a nice hot meal.'}],options:[{text:"Thanks.",go:"inn"}]},{id:"forest",run:"$TEST_ROLL(($depth+1)*10)?$COMBAT_START('goblin'):false",intro:[{text:"You are at the {{$depth}}. You are being attacked by {{$opponent.name}}",if:"$combat_forced"},{text:"You are at the {{$depth}}."}],options:[{text:"Go deeper",run:"$depth++",if:"!$combat_forced",go:"forest"},{text:"Forage",run:"$FORAGE();",if:"!$combat_forced",go:"message"},{text:"Go back to the village",if:"!$depth && !$combat_forced",go:"village"},{text:"Go back a bit",if:"$depth && !$combat_forced",run:"$depth--",go:"forest"},{text:"Fight!",if:"$combat_forced",run:"$combat_forced=false",go:"combat"}]},{id:"caves",intro:[{text:"You are at the {{$depth}} of the caves."}],options:[{text:"Go deeper",run:"$depth++",go:"caves"},{text:"Mine",run:"$MINE()",go:"message"},{text:"Go back to the village",if:"!$depth",go:"village"},{text:"Go back a bit",if:"$depth",run:"$depth--",go:"caves"}]}],b=[{name:"axe",ing:[["stone",2],["stick",3]]},{name:"widget",ing:[["stick",1]]},{name:"cooked_fish",ing:[["fish",1]],workstation:"kitchen"}];n("3846"),n("7f7f"),n("456d"),n("ffc1"),n("a481"),n("c5f6");function T(e,t){var n=function(e,t){return function(n){return n[e]===t}};function o(){console.log("Turn passed, new turn ",++e.turn),e.turn%(24*t.TURNS_PER_HOUR)===6*t.TURNS_PER_HOUR&&(console.log("New day!"),e.PLANTS_GROW()),e.turn%(24*t.TURNS_PER_HOUR)===22*t.TURNS_PER_HOUR&&(console.log("Pass out!"),e.flags.sleeping||(e.flags.passedOut=1),a())}function a(){while(e.turn%(24*t.TURNS_PER_HOUR)!==6*t.TURNS_PER_HOUR)o()}e.FINDER=n,e.TURN=function(e){for(var t=0;t<e;t++)o()},e.MSG=function(t){var n=e.turn+": "+t;e.messages=e.messages.concat(n).slice(-5)},e.TYPE=function(t){return e.types.find(n("name",t))},e.STACK_POP=function(){console.log("STACK",e.stack),e.stack=e.stack.slice(0,e.stack.slice.length),console.log("AFTER",e.stack)},e.STAT=function(t,n){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:e,a=o.stats;a[t]+=n,a[t]>a[t+"_max"]&&(a[t]=a[t+"_max"]),a[t]<0&&(a[t]=0)},e.INV=function(t,n){var o=e.inventory;if(!n)return o[t]||0;var a=o[t]||0;o[t]=a+Number(n),o[t]<0&&(o[t]=0)},e.TIRE=function(t){return e.STAT("energy",-t)},e.DEBUG=function(e){console.log("DEBUG:",e)},e.PLANT=function(t,n){var o=n.replace(/_seed/,""),a=e.farm[t];a.plant=o,a.stage=0,console.log("PLOT",a)},e.PLANT_STATUS=function(e){return e.plant?"".concat(e.plant," (").concat(e.stage,"/10)"):"- empty -"},e.PLANTS_GROW=function(){e.farm.forEach(function(t){t.plant&&(t.stage+=e.TYPE(t.plant).grow,t.stage>10&&(t.stage=10))})},e.HARVEST=function(t){var n=e.farm[t];e.INV(n.plant,1),n.plant="",n.stage=0},e.GET_HOUR=function(){return(e.turn/t.TURNS_PER_HOUR>>0)%24},e.GET_MINUTES=function(){return e.turn%t.TURNS_PER_HOUR*15},e.IS_DAY=function(){var n=(e.turn/t.TURNS_PER_HOUR>>0)%24;return n>5&&n<20},e.GET_DAY=function(){return 1+e.turn/t.TURNS_PER_HOUR/24>>0},e.WAIT_UNTIL_MORNING=function(){return a()},e.TEST_ROLL=function(e){return 100*Math.random()<e},e.RND=function(e){return Math.random()*e>>0},e.INVENTORY=function(){return Object.entries(e.inventory).filter(function(e){return e[1]}).map(function(e){return e[0]+":"+e[1]}).join(", ")},e.SAVE=function(){localStorage.setItem("save",JSON.stringify(e))},e.LOAD=function(){var n=JSON.parse(localStorage.getItem("save"));Object.keys(e).forEach(function(t){e[t]=n[t]}),T(e,t)},e.MINE=function(){var t=Math.random()*(e.depth+2)>>0;e.message="You found ".concat(t," stones."),e.INV("stone",t)},e.FORAGE=function(){var t=Math.random()*(e.depth+2)>>0;e.message="You found ".concat(t," sticks."),e.INV("stick",t)},e.CRAFT=function(t){var o=e.recipes.find(n("name",t));o.ing.forEach(function(t){var n=Object(l["a"])(t,2),o=n[0],a=n[1];e.INV(o,-a)}),e.INV(t,1)},e.COMBAT_START=function(t){e.opponent=e.npc.find(n("name","goblin")),e.combat_forced=!0,e.COMBAT_PREPARE()},e.COMBAT_PREPARE=function(){var t=e.opponent;t.generic&&(t.stats.energy=t.stats.energy_max)},e.COMBAT_IS_FINISHED=function(){return e.combat_won||e.combat_lost||e.stats.energy<1||e.opponent.stats.energy<1},e.COMBAT_ATTACK=function(){var t=e.RND(10);e.STAT("energy",-t,e.opponent),e.message="You hit ".concat(e.opponent.name," for ").concat(t," damage. "),e.MSG("You hit ".concat(e.opponent.name," for ").concat(t," damage. "))},e.COMBAT_NPC_ATTACK=function(){if(e.opponent.stats.energy>0){var t=e.RND(10);e.STAT("energy",-t),e.message+=" You are hit for ".concat(t," damage. "),e.MSG(" You are hit for ".concat(t," damage. "))}},e.COMBAT_STATE=function(){e.opponent.stats.energy<1?(e.message+=" You defeated ".concat(e.opponent.name,"!"),e.combat_won=!0):e.stats.energy<1&&(e.message+=" You have been defeated! ",e.MSG(" You have been defeated! "),e.combat_lost=!0,a(),e.stats.energy=e.stats.energy_max/2>>0)},e.COMBAT_ROUND=function(){e.COMBAT_ATTACK(),e.COMBAT_NPC_ATTACK(),e.COMBAT_STATE()},e.COMBAT_TRY_FLEE=function(){var t=e.RND(10);t<4?(e.message+="You managed to escape. ",e.STACK_POP(),console.log("Success")):t<8?(e.message+="You managed to escape, but... ",e.COMBAT_NPC_ATTACK(),console.log("Success kinda"),e.STACK_POP()):(e.message+="You didn't manage to escape. ",e.COMBAT_NPC_ATTACK(),console.log("Fail!"))}}var y=[{name:"cabbage",foodValue:10,grow:2,price:5},{name:"cabbage_seed",price:7},{name:"radish_seed",price:1},{name:"radish",foodValue:5,grow:3,price:3},{name:"meal",foodValue:30,price:10},{name:"fish",foodValue:20,price:8}],N={dialogName:"village",options:!0,message:"",messages:[],stack:[],other:{met:-1},depth:0,turn:25,inventory:{money:20,sword:0,fish:1,meal:2,cabbage_seed:2,radish_seed:1,stick:5,stone:10},npc:[{name:"Zach",sells:["cabbage_seed","radish_seed"],buys:["cabbage","fish","radish"]},{name:"Bartender",sells:["meal"],buys:["fish","cabbage"]},{name:"goblin",generic:!0,stats:{energy:50,energy_max:50,attack:120,defence:75}}],planting:"cabbage_seed",farm:[{plant:"cabbage",stage:8},{plant:""}],stats:{energy:60,energy_max:100},types:y,flags:{dirty:1,passedOut:0,sleeping:0,looked_around:0,met_bernie:0,talked_to_bartender:0,bartender_favor_bernie_finished:0,bartender_favor_bernie_asked:0,citaa_remembered:0},recipes:b};console.log(N.types);var k={};function O(){var e='\n {{ $flags.passedOut ? "You have passed out, falling asleep where you where! " : ""}}{{$flags.passedOut0; ""}}\n Time is {{$GET_HOUR()}} o\'clock. It\'s {{$GET_DAY()}} {{ $IS_DAY() ?"day": "night"}}.\n  You have {{$inventory.money}} coins. Energy: {{$stats.energy}} ^nl\n  {{$messages.join(\'^nl\')}}\n  ',t=c["interpolate"](e,N).split("^nl").join("<br>");return t}function R(){console.log("INIT RUN"),T(N,k)}k.TURNS_PER_HOUR=4;var I={dialogs:v,status:O,ctx:N,init:R},E={name:"Gra",props:{msg:String},components:{Debug:x},data:function(){return{debug:!0,ctx:{},status:null,dialogs:null}},computed:{dialog:function(){return this.ctx.dialogName?(console.log("dialog liczony",this.ctx.dialogName),f.processDialog(this.dialogs,this.ctx.dialogName,this.ctx)):null},context:function(){return console.log("Context liczony"),JSON.stringify(this.ctx)},statusText:function(){if(console.log("Status liczony"),JSON.stringify(this.ctx)&&this.status)return this.status()}},methods:{chooseOption:function(e){var t,n=e.target.dataset.option;t="options"===n?"options":f.processOptionChoice(this.dialog.options[n],this.ctx),console.log("RESULT IS",t),"return"===t?this.ctx.dialogName=this.ctx.stack.pop():t?"string"==typeof t?(t!==this.ctx.stack[this.ctx.stack.length-1]&&this.ctx.stack.push(this.ctx.dialogName),this.ctx.dialogName=t):!0===t&&console.log("RUN RUN RUN",this.ctx.farm):this.ctx.dialogName=null,console.log("CHOOSE OPTION",n,t,"STACK",this.ctx.stack.join(","))}},mounted:function(){this.dialogs=I.dialogs,this.status=I.status,this.ctx=I.ctx,I.init()}},A=E,S=(n("db64"),Object($["a"])(A,i,s,!1,null,null,null)),w=S.exports,P={name:"app",components:{Gra:w}},C=P,U=(n("034f"),Object($["a"])(C,a,r,!1,null,null,null)),Y=U.exports;o["a"].config.productionTip=!1,new o["a"]({render:function(e){return e(Y)}}).$mount("#app")},"64a9":function(e,t,n){},a236:function(e,t,n){},db64:function(e,t,n){"use strict";var o=n("a236"),a=n.n(o);a.a},fa7e:function(e,t,n){"use strict";var o=n("1f73"),a=n.n(o);a.a}});
//# sourceMappingURL=app.eef67f46.js.map