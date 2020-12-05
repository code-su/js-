(function (window, undefined) {
  var sujQuery = function (selector) {
    return new sujQuery.prototype.init(selector);
  }
  sujQuery.prototype = {
    constructor: sujQuery,
    init: function (selector) {
      /*
      1.传入‘’ null undefined NaN 0 false, 返回空的jQuery对象
      2.字符串：
      代码片段：会将创建好的DOM元素存储到jQuery对象中返回
      选择器：会将找到的所有元素存储到jQuery对象中返回
      3.数组：
      会将数组中存储的元素依次存储到jQuery对象中返回
      4.除上述类型以外的
      会将传入的数据存储到jQuery对象中返回
      */

      // 1.传入‘’ null undefined NaN 0 false, 返回空的jQuery对象
      if (!selector) {
        return this;
      }

      // 2. 方法处理
      else if (sujQuery.isFunction(selector)) {
       sujQuery.ready(selector);
      }
      // 2.字符串
      else if (sujQuery.isString(selector)) {
        // 2.1判断是不是代码片段 <a>
        if (sujQuery.isHTML(selector)) {
          // 根据代码片段创建所有的元素
          var temp = document.createElement('div');
          temp.innerHTML = selector;
          /*
         // 将创建好的一级元素添加到jQuery当中
         for(var i = 0; i < temp.children.length; i++) {
           this[i] = temp.children[i]; 
         }
         // 给jQuery对象添加length属性
         this.length = temp.children.length;
         */
          [].push.apply(this, temp.children);
          // 此时此刻的this是sujQuery对象
          // 返回加工好的this(jQuery)

        }
        // 2.2判断是否是选择器
        else {
          //1.根据传入的选择器找到相应的元素
          var res = document.querySelectorAll(selector);
          //2.将找到的元素添加到sujQuery上
          [].push.apply(this, res);
          //3.返回加工好的this

        }
      }
      // 3.数组
      // else if(typeof selector === "object" &&
      //  "length" in selector &&
      //  selector != window){
      else if (sujQuery.isArray(selector)) {
        /*
         //3.1真数组
         if(({}).toString.apply(selector) == "[object Array]"){
           [].push.apply(this,selector);
           return this;
         }
         //3.2伪数组
         else{
           // 将自定义的伪数组转换为真数组
           var arr = [].slice.call(selector);
           // 将真数组转换为伪数组
           [].push.apply(this,arr);
           return this;
         }
          */
        // 将自定义的伪数组转换为真数组
        var arr = [].slice.call(selector);
        // 将真数组转换为伪数组
        [].push.apply(this, arr);
        return this;
      }
      // 4.除上述类型以外的
      else {
        this[0] = selector;
        this.length = 1;

      }
      return this;
    }
    jQuery:"1.0.0",
    selector: "",
    length: 0,
    //[].push找到数组的push方法
    //冒号前面的push将来由sujQuery对象先用
    //相当于[].push.apply(this);
    push: [].push,
    sort: [].sort,
    splice: [].splice
  }

  sujQuery.extend = sujQuery.prototype.extend = function (obj) {
    // console.log(this)
    for (var key in obj) {
      this[key] = obj[key];
    }
  }
  sujQuery.extend({
    isString: function (str) {
      return typeof str === 'string'
    },
    isHTML: function (str) {
      return str.charAt(0) == '<' &&
        str.charAt(str.length - 1) == '>' &&
        str.length >= 3
    },

    trim: function (str) {
      if (!sujQuery.isString(str)) {
        return str;
      }
      //判断是否支持trim方法
      if (str.trim) {
        return str.trim();
      }
      else {
        return str.replace(/^\s+| \s+$/g)
      }
    },
    isObject: function (sele) {
      return typeof sele === "object"
    },
    isWindow: function (sele) {
      return typeof sele === window
    },
    isArray: function (sele) {
      if (sujQuery.isObject(sele) &&
        !sujQuery.isWindow(sele) &&
        "length" in sele) {
        return true;
      }
      return false;
    },
    isFunction: function (sele) {
      return typeof sele === "function"
    },
    ready: function (fn) {
      //判断DOM元素是否加载完毕
      if(document.readyState == 'complete') {
         fn();
      }else if(document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function (){
         fn();
        })
      }else{
        document.attachEvent('onreadystatechange', function(){
          if(document.readyState == 'complete') {
           fn();
          }
         })
      }
      fn();
    }
  })

  sujQuery.prototype.init.prototype = sujQuery.prototype;
  window.sujQuery = window.$ = sujQuery;
})(window);