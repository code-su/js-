


function getStyle(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    }
    else {
        return getComputedStyle(obj, null)[name];
    }
}

window.onload = function () {
    var oDiv = document.getElementById('div1');

    alert(getStyle(oDiv, 'width'));
};




function getByClass(oParent,sClass) {
    var aResult = [];
    var aEle = oParent.getElementsByTagname('*');

    for (var i=0; i<aEle.length; i++) {
        if(aEle[i].className == sClass) {
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}



function getPos(ev) {
    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
    var scrollleft = document.documentElement.scrollleft||document.body.scrollleft;

    return {x: ev.clientX + scrollleft, y: ev.clientY + scrollTop};
}

function myAddEvent(obj,ev,fn){
    if(obj.attachEvent){
        obj.attachEvent('on'+ev,fn);
    }
    else{
        obj.addEventListener(ev,fn,flase);
    }
}
