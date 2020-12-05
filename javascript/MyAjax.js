function obj2str(obj){
  /* 
  {
    "userName":"sl",
    "userPwd":"123",
    "t":"231"
  }
  */
 obj.t = new Date().getTime();
 var res = [];
 for(var key in obj){
   res.push(encodeURIComponent(key)+"="+encodeURIComponent(obj[key]));    // [userName=sl,userPwd=123];
 }
 return res.join("&")            //  userName= sl&userPwd=123
}


function Ajax(url,obj,timeout,success, error) {
  //  将对象转换为字符串
  var str = obj2str(obj);  //  key=value&key=value;
  //1. 创建一个异步对象
  var xhr;
  if(window.XMLHttpRequest){
    xhr = new XMLHttpRequest();
  }else{
    xhr = new ActiveXObject("Microsoft.XMLHTTP")
  }
  //2. 设置请求方式和请求地址
  xhr.open("get",url+"?"+str,true);
  //3. 发送请求
  xhr.send();
  //4. 监听状态的变化
  xhr.onreadystatechange = function (){
     if(xhr.readyState === 4){
       clearInterval(timer);
     // 判断是否成功
     if(xhr.status >= 200 && xhr.status <300 || xhr.status === 304){
     //处理返回结果
          success(xhr.responseText);
    }else{
          error("请求错误");
    }
  } 
} 
// 判断外界是否传入了超时时间
 if(timeout) {
  timer = setInterval(function(){
    xhr.abort();
    clearInterval(timer);
  },timeout);
}
}