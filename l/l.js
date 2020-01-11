  //滚动时保存滚动位置
  $(window).scroll(function(){
    if($(document).scrollTop()!=0){
      sessionStorage.setItem("offsetTop", $(window).scrollTop());
    }
  });
  //onload时，取出并滚动到上次保存位置
  window.onload = function(){
    var offset = sessionStorage.getItem("offsetTop");
    $(document).scrollTop(offset);
  };