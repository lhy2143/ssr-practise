<template>
  <div>
    <div>{{title}}</div>
    <router-link to="/main">Main</router-link>-
    <router-link to="/doc">Doc</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data(){
    return {
      title:''
    }
  },
  mounted(){
    setTimeout(()=>{
      this.title = "调用接口获取的Title"
    },1000)
  }
  
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background: red;
}
</style>
