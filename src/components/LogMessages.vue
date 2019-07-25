<template>
  <section class="box log-messages-div">
    <header>Messages</header>
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
      expanded: true,
      showCount:5,
      offset:1,
    };
  },
  computed:{
      messageList(){
          return this.offset?this.messages.slice(-(this.showCount+this.offset),-this.offset):this.messages.slice(-this.showCount);
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
}
</style>
