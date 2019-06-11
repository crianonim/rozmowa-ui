import dialogs from './dialogs.mjs';
import rozmowa from 'rozmowa/index.mjs';
// import screept from 'screept/index.mjs';
const screept=rozmowa.screept;
console.log("ROZMOWA",rozmowa);

const dialogName = "adventure";

const ctx = { other: { met: -1 }, turn: 0, score: 0, backpack: 1, inventory: { money: 5, sword:0}, stats:{energy:10} }

function status() {
    let s=`It is currently {{turn}} turn. You have {{score}} points.
     You have: ${ Object.entries(ctx.inventory).filter(entry=>entry[1]).map(entry=>entry[0]+":"+entry[1]) }
     Energy: {{stats.energy}}
     `
    return screept.interpolate(s,ctx)
}
function init(){
    console.log("INIT RUN")
    screept.addVerb("INC", 1, a => {
        a.object[a.key] = Number(a.value || 0) + 1;
        return a.object[a.key];
      });
      screept.addVerb("INC_BY", 2, (a, b) => {
        a.object[a.key] = Number(a.value || 0) + Number(b.value || 0);
        return a.object[a.key];
      });
      screept.addVerb("TURN",1,(a)=>{
          for (let i=0;i<a.value;i++){
              console.log("Turn passed, new turn ",++ctx.turn);
          }
      })
}
export default{
    dialogs,
    status,
    dialogName,
    ctx,
    init
}