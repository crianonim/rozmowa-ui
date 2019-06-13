<template>
  <div>
    <h2>Debug</h2>
    <h1 class="dialogName">Dialog: {{ctx.dialogName}} Turn: {{ctx.turn}}</h1>
    <h1>Stack</h1>
    <div class="stack flex-wrapped">
        <div v-for="dialog in ctx.stack" :key="dialog">{{dialog}}</div>
    </div>
    <h1>Flags</h1>
    <div class="flags flex-wrapped">
        <div v-for="(flag,key) in ctx.flags" :class="{flagOn:flag}" :key="key" >{{key}}({{flag}})</div>
    </div>
    <h1>Inventory</h1>
    <div class="inventory flex-wrapped">
        <div v-for="(item,key) in ctx.inventory" :class="{flagOn:item}" :key="key" >{{key}}({{item}})</div>
    </div>
    <h1>Stats</h1>
    <div class="inventory flex-wrapped">
        <div v-for="(stat,key) in ctx.stats"  :key="key" >{{key}}({{stat}})</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Debug",
  props: ["ctx"]
};
</script>

<style scoped>
h1 {
    font-size: 1rem;
    margin: 0;
    padding: 2px;
}
.dialogName {
    background-color: bisque;
}
.flex-wrapped {
     display:flex;
    flex-wrap: wrap;
}

.flex-wrapped > * {
    padding: 2px;
    border: 1px solid black;
    margin: 2px;
}
.flagOn {
    background-color:green;
    color: white;
    
}
.stack > * {
    border-color: cadetblue;
}
</style>
