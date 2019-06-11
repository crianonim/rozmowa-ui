<template>
  <div class="container">
    <div class="status">
      <div>{{statusText}}</div>
    </div>
    <div v-if="dialog" class="dialog">
      <div class="intro">{{dialog.intro.textInterpolated}}</div>
      <div
        @click="chooseOption"
        :data-option="key"
        class="option"
        v-for="(option,key) in dialog.options"
        :key="key"
      >{{option.textInterpolated}}</div>
    </div>
    <div v-if="debug" class="debug">
        Dialog name: {{dialogName}}, Context : {{context}}
    </div>
  </div>
</template>

<script>
import dialog from "rozmowa/index.mjs";
import gameData from "../../game-data/adventure-2/index.mjs";

export default {
  name: "Gra",
  props: {
    msg: String
  },
  data() {
    return {
        debug:true,
      dialogName: null,
      ctx: null,
      dialog: null,
      status: null,
      dialogs: null
    };
  },
  computed: {
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
    updateDialog() {
      console.log("dialog liczony", this.dialogName);
      if (this.dialogName == null) this.dialog = null;
      else {
        this.dialog = dialog.processDialog(
          this.dialogs,
          this.dialogName,
          this.ctx
        );
      }
    },
    chooseOption(event) {
      let id = event.target.dataset.option;
      let result = dialog.processOptionChoice(
        this.dialog.options[id],
        this.ctx
      );
      console.log("CHOOSE OPTION",id, result);
      if (!result) this.dialogName = null;
      if (typeof result == "string") this.dialogName = result;
      this.updateDialog();
    }
  },
  mounted() {
    this.ctx = gameData.ctx;
    this.dialogName = gameData.dialogName;
    this.status = gameData.status;
    this.dialogs = gameData.dialogs;
    gameData.init();
    this.updateDialog();
  }
};
</script>

<style>
.container {
    width: 800px;
    margin: 60px    auto;

}
.status,.dialog {
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
    margin-top:200px;
}
</style>
