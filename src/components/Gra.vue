<template>
  <div class="container">
    <div class="status">
      <div v-html="statusText"></div>
      <div @click="chooseOption" data-option="options" v-if="ctx.options" class="option">Options</div>
    </div>
    <div v-if="dialog" class="dialog">
      <div class="intro" v-html="dialog.intro.textInterpolated"></div>
      <div
        @click="chooseOption"
        :data-option="key"
        class="option"
        v-for="(option,key) in dialog.options"
        :test="ctx.dialogName+'_'+key+' '+option.text.length"
        :key="ctx.dialogName+'_'+key+' '+option.text.length"
      >{{option.textInterpolated}}</div>
    </div>
    <log-messages :messages="ctx.messages"></log-messages>
    <input type="checkbox" v-model="debug">
    <debug v-if="debug" :ctx="ctx"></debug>
  </div>
</template>

<script>
import Dialog from "../lib/dialog.js";
import Debug from './Debug';
import LogMessages from './LogMessages';
import gameData from "../../game-data/adventure-2/index.mjs";

export default {
  name: "Gra",
  props: {
    msg: String
  },
  components:{
    Debug,
    LogMessages
  },
  data() {
    return {
      debug: true,
      // dialogName: null,
      ctx: {},
      // dialog: null,
      status: null,
      dialogs: null
      // stack: []
    };
  },
  computed: {
    dialog() {
      if (!this.ctx.dialogName) return null;
      console.log("dialog liczony", this.ctx.dialogName);
      return Dialog.processDialog(this.dialogs, this.ctx.dialogName, this.ctx); // potentially check if null, not sure how it deals with lack of dialogname
    },
    context() {
      console.log("Context liczony");
      return JSON.stringify(this.ctx);
    },
    statusText() {
      console.log("Status liczony");
      if (JSON.stringify(this.ctx) && this.status) return this.status(); // first part so its recomputed;
    }
  },
  methods: {
    
    chooseOption(event) {
      let id = event.target.dataset.option;
      let result;
      if (id === "options") {
        result = "options";
      } else {
        result = Dialog.processOptionChoice(this.dialog.options[id], this.ctx);
      }
      console.log("RESULT IS",result)
      if (result === "return") {
        this.ctx.dialogName = this.ctx.stack.pop();
      } else if (!result) {
        this.ctx.dialogName = null;
      } else if (typeof result == "string") {
        if (result !== this.ctx.stack[this.ctx.stack.length - 1]) {
          this.ctx.stack.push(this.ctx.dialogName);
        }
          this.ctx.dialogName = result;
      } else if (result===true){
        console.log("RUN RUN RUN",this.ctx.farm);
      }
      // if (!result) this.dialogName = null;
  
      console.log(
        "CHOOSE OPTION",
        id,
        result,
        "STACK",
        this.ctx.stack.join(",")
      );
      // this.updateDialog();
    }
  },
  mounted() {
    // this.cdialogName = gameData.dialogName;
    this.dialogs = gameData.dialogs;
    this.status = gameData.status;
    this.ctx = gameData.ctx;
    gameData.init();
    // this.updateDialog();
  }
};
</script>

<style>
.container {
  /* width: 100%; */
  max-width: 800px;
  margin: auto;
}
.status,
.dialog,
.box {
  border: 1px solid black;
  box-shadow: 3px 3px;
  padding: 5px;
  border-radius: 3px;
  margin-bottom: 20px;
}
.intro {
  font-style: italic;
  padding: 5px;
}
.option {
  padding: 5px;
  margin: 5px 0;
  border: 1px solid black;
  transition: 0.5s all;
  cursor: pointer;
}
.option:hover {
  background-color: black;
  color: white;
}
.debug {
  font-family: monospace;
  font-size: 0.8;
  margin-top: 200px;
}

</style>
