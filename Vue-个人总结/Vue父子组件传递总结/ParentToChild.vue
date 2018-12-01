// 父组件
<template>
    <div>
        <child @sendToChild = 'SendTo'></child>
        //       儿子           父亲
    </div>
</template>

<script>
    export default {
        el: "",
        data: function  () {
            return {
                SendTo: 'i am father'
            }
        }
    }
</script>

// 子组件
<script>
        el:"",
        props:["sendToChild"]
        data: function  () {
            return {
                *** : this.sendToChild  //'i am father'
            }
        },    
</script>
