import { shallowMount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'
import index from '../../game-data/adventure-2/index.mjs';
import {functions} from '../../game-data/adventure-2/verbs.mjs';
import {types} from '../../game-data/adventure-2/types.mjs';
// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })
const CFG={}
CFG.TURNS_PER_HOUR = 4;
function getContext1(){
  return {turn:3,farm:[]}
}

describe('Testing helpers',()=>{
  it('FINDER',()=>{
    index.init();
    expect([{a:"v"},{b:"c"},{a:"v"}].filter(functions.FINDER({},CFG,'a','v'))).toStrictEqual([{a:"v"},{a:"v"}]);
  })
  it("WAIT_UNTIL_MORNING",()=>{
    const ctx=getContext1()
    functions.WAIT_UNTIL_MORNING(ctx,CFG);
    // console.log(ctx)
    expect(ctx.turn).toBeTruthy();
  })
  it("MSG",()=>{
    const ctx={turn:3,messages:[],messageId:7};
    functions.MSG(ctx,CFG,'Jestem','combat');
    console.log(ctx.messages)
    expect(ctx.messageId).toBe(8);
  });
  it("TURN",()=>{
    const ctx=getContext1();
    functions.TURN(ctx,CFG);
    expect(ctx.turn).toBe(4);
  });
  it("TURN with arguments",()=>{
    const ctx=getContext1();
    functions.TURN(ctx,CFG,5);
    expect(ctx.turn).toBe(8);
  });
  it("TYPE",()=>{
    const ctx={types};
    expect(functions.TYPE(ctx,CFG,"fish").name).toBe("fish");
    expect(functions.TYPE(ctx,CFG,"cabbage").foodValue).toBe(10);

  });
  it("STACK_POP",()=>{
    const ctx={stack:["1","2"]};
    functions.STACK_POP(ctx,CFG);
    expect(ctx.stack).toStrictEqual(["1"]);
  });
  it("STAT",()=>{
    const ctx={stats:{energy:12,energy_max:20}};
    functions.STAT(ctx,CFG,'energy',-3)
    expect(ctx.stats.energy).toBe(9);
    functions.STAT(ctx,CFG,'energy',-30)
    expect(ctx.stats.energy).toBe(0);
    functions.STAT(ctx,CFG,'energy',30)
    expect(ctx.stats.energy).toBe(20);
    
  });
  it("INV",()=>{
    const ctx={inventory:{money:3,meal:1}}
    expect(functions.INV(ctx,CFG,'money')).toBe(3);
    functions.INV(ctx,CFG,'money',7);
    expect(ctx.inventory.money).toBe(10);
    functions.INV(ctx,CFG,'sword',1);
    expect(ctx.inventory.sword).toBe(1);
    functions.INV(ctx,CFG,'sword',-31);
    expect(ctx.inventory.sword).toBe(0);

  })
  it("TIRE",()=>{
    const ctx={stats:{energy:12,energy_max:20}};
    functions.TIRE(ctx,CFG,5);
    expect(ctx.stats.energy).toBe(7);
    functions.TIRE(ctx,CFG);
    expect(ctx.stats.energy).toBe(6);
    functions.TIRE(ctx,CFG,10);
    expect(ctx.stats.energy).toBe(0);

  })
})
describe("Plant functions",()=>{
  it("PLANT",()=>{
    const ctx={farm:[{},{}]};
    functions.PLANT(ctx,CFG,1,"cabbage_seed");
    expect(ctx.farm[1]).toStrictEqual({plant:"cabbage",stage:0});
  });
  it("PLANT_STATUS",()=>{
    const ctx={farm:[{plant:"cabbage",stage:0}]}
    expect(functions.PLANT_STATUS(ctx,CFG,{plant:"cabbage",stage:2})).toBe("cabbage (2/10)")
  });
  it("HARVEST",()=>{
    const ctx={farm:[{plant:"cabbage",stage:10}],inventory:{}};
    functions.HARVEST(ctx,CFG,0);
    expect(ctx.inventory.cabbage).toBe(1);
    expect(ctx.farm[0]).toStrictEqual({plant:"",stage:0});
    functions.HARVEST(ctx,CFG,0);
    expect(ctx.inventory.cabbage).toBe(1);

  })

})