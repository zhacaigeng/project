# React的关键点

## nrm （npm registry manager）

```

class ClassName extends React.Comopnent{
  contrustor(){

  }
  render(){

    return (
      <Our>****<Our/> 
    )
  }
  

}
function Our (){
    *******
}
React.DOM(
  <ClassName />,
  document.getElementById("XXXXXX")
)


react的关键点是ClassName必须和 class 之后的类名保持一致（must）
return 出来的jsx标签名字，必须在class外层有这个名字的声明函数（如果是html标签，择免于声明）

