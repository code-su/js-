function animate(obj, target, callback) {
  // console.log(callback);  callback = function(){}  调用的时候 callback()
  // 当我们不断点击这个按钮，这个元素就会的速度就会越来越快，因为开启了太多的定时器
  // 解决方案就是 让我们元素只有一个定时器执行
  // 先清除以前的定时器，只保留当前的一个定时器执行
  clearInterval(obj.timer);
  obj.timer = setInterval(function() {
    // 步长值写到定时器里面  把我们步长改为整数，不要出现小数问题
    var step = (target - obj.offsetLeft) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);
    // console.log(step);
    if (obj.offsetLeft == target) {
      // 停止定时器
      clearInterval(obj.timer);
      // 回调函数写到定时器结束后面
      if (callback) {
        // 调用函数
        callback();
      }
    } else {
      // 把每次加1 这个步长值改为一个慢慢变小的值 步长公式：(目标值 - 现在的位置) / 10
      obj.style.left = obj.offsetLeft + step + "px";
    }
  }, 15);
}
