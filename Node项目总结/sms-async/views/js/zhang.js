function loadData() {
  $.ajax({
    url: '/list',
    method: 'get',
    // dataType: 'json',
    success: function (data) {
      console.log(data,typeof data)
      $('#stbody').empty()
      //拿到data数据之后开始渲染
      data.list.forEach((val, index) =>
        $('<tr></tr>')
        .append('<td>' + val._id.slice(-5) + '</td>')
        .append('<td>' + val.sno + '</td>')
        .append('<td>' + val.sname + '</td>')
        .append('<td>' + val.sgender + '</td>')
        .append('<td>' + val.sbirthday + '</td>')
        .append('<td>' + val.sphone + '</td>')
        .append('<td>' + val.saddr + '</td>')
        .append('<td>' + val.smajor + '</td>')
        .append('<td> <a class="info"  href="/info?_id=' + val._id + '">查看</a> | <a class="edit"  href="/info?_id=' + val._id + '">编辑</a> | <a class="delete"  href="/delete?_id=' + val._id + '">删除</a> </td>')
        .appendTo($('#stbody'))
      );
    }
  })
}
$(function () {
  // 获取当前当前所有学生信息
  $('#btnLoad').click(function () {
    loadData();
    console.log('zhangkaka');
  })

  //点击查看页面获取当前学生具体信息
  $('#stbody').on('click', 'a.info', function () {
    $.ajax({
      url: $(this).attr('href'),
      method: 'get',
      dataType: 'json',
      success: data => {
        $('#dvInfo>ul').empty();
        for (var key in data.stuinfo) {
          $('<li>' + key + ':' + data.stuinfo[key] + '</li>').appendTo($('#dvInfo>ul'))
        }
        $('#dvInfo').show()


      },
    })
    return false
  })


  //查看详情关闭按钮
  $('#btnCloseInfo').click(function () {
    $(this).parent().hide()
  })



  //添加学员
  $('#addLink').click(function () {
    //读取城市信息
    $.ajax({
      url: '/cities',
      method: 'get',
      dataType: 'json',
      success: function (data) {
        data.cities.forEach(function (ele, index) {

          $('<option value="' + ele.cname + '">' + ele.cname + '</option>').appendTo($('#saddr'))
        })
      }
    })
    //读取专业信息
    $.ajax({
      url: '/majors',
      method: 'get',
      dataType: 'json',
      success: function (data) {
        data.majors.forEach(function (ele, index) {

          $('<option value="' + ele.name + '">' + ele.name + '</option>').appendTo($('#smajor'))
        })
      }
    })
    $('#dvAdd').show();
    return false
    //显示div
  })
  $("#btnCloseAdd").click(function () {
    $(this).parent().parent().parent().hide()
  })


  $('#btnSave').click(function () {
    //传输数据
    var postData = $('#addForm').serialize();
    console.log(postData);

    $.ajax({
      url: '/add',
      method: 'post',
      data: postData,
      dataType: 'json',
      success: function (data) {
        loadData();
        $('#addForm')[0].reset();
        $('#dvAdd').hide()
      }
    })
    return false
  })
  //编辑学员信息
  $('#stbody').on('click', 'a.edit', function () {
    //读取城市信息
    $.ajax({
      url: '/cities',
      method: 'get',
      dataType: 'json',
      success: function (data) {
        data.cities.forEach(function (ele, index) {

          $('<option value="' + ele.cname + '">' + ele.cname + '</option>').appendTo($('#saddrEdit'))
        })
      }
    })
    //读取专业信息
    $.ajax({
      url: '/majors',
      method: 'get',
      dataType: 'json',
      success: function (data) {
        data.majors.forEach(function (ele, index) {

          $('<option value="' + ele.name + '">' + ele.name + '</option>').appendTo($('#smajorEdit'))
        })
      }
    })
    $.ajax({
      url: $(this).attr('href'),
      method: 'get',
      dataType: 'json',
      success: data => {
        var studentInfo = data.stuinfo;
        $('#_idEdit').val(studentInfo._id)
        
        $('#snoEdit').val(studentInfo.sno)
        $('#snameEdit').val(studentInfo.sname)

        $(':radio').val([studentInfo.sgender === '男'? "M":"F"])

        $('#sbirthdayEdit').val(studentInfo.sbirthday)
        $('#sphoneEdit').val(studentInfo.sphone)
        $('#saddrEdit').val(studentInfo.saddr)
        $('#smajorEdit').val(studentInfo.smajor)
        
        $('#dvEdit').show()


      },
    })
    return false
  })
  //编辑后提交
  $('#editbtnSave').click(function() {

    var postData = $('#editForm').serialize();
    console.log(postData);
    
    $.ajax({
      url: '/edit',
      method: 'post',
      data:postData,
      dataType: 'json',
      success: function(data) {
        $('#dvEdit').hide();
        loadData();
      }
    })
    return false
  })

  //关闭编辑页面
  $('#btnCloseEdit').click(function(arguments) {
    $('#dvEdit').hide()
  })

  //处理删除逻辑
  $('#stbody').on('click', 'a.delete', function () {
    //读取城市信息
    alert('确认要删除吗')
    $.ajax({
      url: $(this).attr('href'),
      method: 'get',
      dataType: 'json',
      success: function (data) {
        loadData()
      }
    })
    
   
    return false
  })

})
