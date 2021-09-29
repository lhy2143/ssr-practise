<template>
    <div id="lottie"></div>
</template>
<script>
    import lottie from 'lottie-web';
import animationJsonData from '../assets/birds.json';  
export default {

mounted(){
const lot = lottie.loadAnimation({
   container: document.getElementById('lottie'), 
   renderer: 'svg',
   loop: true,
   autoplay: false,
   animationData: animationJsonData,
//    path:
        // "https://gw.alipayobjects.com/os/sage/10726a69-0e6a-484f-a784-d57a812af9a6/lottie.json" 
    
 });
 console.log("开始播放动画");

// 开始播放动画
lot.play();
}

}
</script>
<style>
#lottie{
    width: 300px;
    height: 300px;
    margin: auto;
}
</style>