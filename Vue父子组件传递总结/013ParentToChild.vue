// 父组件
<template>
    <div>
        <child @sendToChild = 'SendTo'></child>
    </div>
</template>

<script>
    export default {
        el: "",
        data: function  () {
            return {
                SendTo: '张三丰'
            }
        }


    }
</script>

// 子组件

<script>
    export default {
        el:"",
        data: function  () {
            return {
                *** : this.sendToChild
            }
        },
        pros:["sendToChild"]
    }
</script>
