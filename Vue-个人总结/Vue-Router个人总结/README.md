#vue路由传参的三种基本方式#

#方案一：
      getDescribe(id) {
//   直接调用$router.push 实现携带参数的跳转
        this.$router.push({
          path: `/describe/${id}`,
        })
#方案一，需要对应路由配置如下：

   {
     path: '/describe/:id',
     name: 'Zhangdb',
     component: Zhangdb
   }
需要在path中添加/:id来对应 $router.push 中path携参数。在子组件中可以使用获取参数值。

this.$route.params.id
#方案二：
父组件中：通过属性中的name来确定路由匹配，通过params来传参。

       this.$router.push({
          name: 'Zhangdb',
          params: {
            id: id
          }
        })
 不用:/id来传递参数了，因为父组件已用params携带参数。

   {
     path: '/describe',
     name: 'Zhangdb',
     component: Zhangdb
   }
子组件中: 这样来获取参数

this.$route.params.id

#方案三：
父组件：使用path来匹配通过query传参
这种情况下 query传参数是在url后面?id=？

    this.$router.push({
          path: '/describe',
          query: {
            id: id
          }
        })
对应路由配置：

   {
     path: '/describe',
     name: 'Zhangdb',
     component: Zhangdb
   }
对应子组件: 这样来获取参数

this.$route.query.id