
// 父组件
<template>
    <div>
        <child @SendToParent="Hello"></child>
                //儿子         父亲
    </div>
</template>
<script>
    export default {
        methods:{
        Hello:  function (arguments) {
            console.log(argurment)//  "i am son"
            }
        }
    }
</script>
    
    
// 子组件
<script>
    this.$emit('SendToParent', 'i am son')
</script>




