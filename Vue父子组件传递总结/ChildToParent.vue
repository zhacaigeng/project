
// 父组件
<template>
    <div>
        <child @SendToParent="zhangsanf"></child>
    </div>
</template>



    methods:{
        zhangsanf:  function (arguments) {
            conosle.log(argurment)
            //  "i am son"
        }
    }





// 子组件
<script>
    this.$emit('SendToParent','i am son')
</script>




