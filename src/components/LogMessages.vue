<template>
  <section class="box log-messages-div">
    <header><span class="log-messages-header-text">Messages</span><button @click="handleArrow(1)">↑</button> <button @click="handleArrow(-1)">↓</button><input class="expanded-check" type="checkbox" v-model="expanded"></header>
    <p
      v-for="value in messageList"
      class="log-message-p"
      :class="'log-class-'+value.type"
      :key="value.id"
    ><span class='log-messages-turn'>{{value.turn}}:</span> <span class="log-messages-text"> {{value.text}}</span></p>
  </section>
</template>

<script>
export default {
  name: "LogMessages",
  props: {
    messages: Array
  },
  data() {
    return {
      expanded: false,
      showCount:5,
      expandedCount:8,
      offset:0,
    };
  },
  methods:{
      handleArrow(x){
          this.offset+=x;
          if (this.offset<0) this.offset=0;
          if (this.offset>this.messages.length-this.count) this.offset=this.messages.length-this.count;
      }
  },
  computed:{
      count(){
          return this.expanded?this.expandedCount:this.showCount;
      },
      messageList(){
          return this.offset?this.messages.slice(-(this.count+this.offset),-this.offset):this.messages.slice(-this.count);
      }
  }
};
</script>

<style>
.log-message-p {
  margin: 0;
}
header {
    background-color: black;
    color:white;
    padding: 0.25em;
    display: flex;
}
.log-messages-header-text {
    flex-grow: 1;
}
button {
    border:1px solid white;
    margin:1px;
}
.expanded-check {
    align-self: center;
}
</style>
