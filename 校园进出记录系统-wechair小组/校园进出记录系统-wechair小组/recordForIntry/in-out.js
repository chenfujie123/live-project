var EventUtil = {
    //跨浏览器添加事件处理程序
    addHandler: function(element, type, handler){
        if(element.addEventListener){
            element.addEventListener(type, handler, false);
        }else if(element.attachEvent){
            element.attachEvent("on"+type,handler);
        }else{
            element["on"+handler] = handler;
        }

    },
    //跨浏览器移除事件处理程序
    removeHandler: function(element,type,handler){
        if(element.addEventListener){
            element.removeEventListener(type, handler, false);
        }else if (element.detachEvent){
            element.detachEvent("on"+type,handler);
        }else{
            element["on"+type] = null;
        }
    },
    //跨浏览器的事件对象
    getEvent: function(event){
        return event ? event : window.event;
    },
    getTarget: function(event){
        return event.target || event.srcElement;
    },
    preventDefault: function(event){
        if (event.preventDefault){
            event.preventDefault();
        }else{
            event.returnValue = false;
        }
    },
    stopPropagation: function(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else {
            event.cancelBubble = true;
        }
    }
};
var oForm = document.getElementById('form');
var oId = document.getElementById('id');
var oName = document.getElementById('name');
var oInt = document.getElementById('inttime');
var oOut = document.getElementById('outtime');
var oContent = document.getElementById('content');

EventUtil.addHandler(oForm,'submit',submitForm);
function submitForm(event){
    var event = EventUtil.getEvent(event);
    EventUtil.preventDefault(event);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange=function()
    {
        if (xhr.readyState==4 && xhr.status==200)
        {
            var str = xhr.responseText;
            str = str.replace(/\s/g,'');
            str = str.replace(/Array/g,'');
            str = str.replace(/\[0\]=>/g,'');
            str = str.slice(1,-1);
            console.log(str);
            // str = str.replace(/\s/g,'');
            // str = str.replace(/\[\D+?\]=>[^\[]+/g,',');

            // console.log(str);
            str = str.replace(/\[\d\]=>/g,',');
            // str = str.slice(0,-1);
            // console.log(str);
            var arr = str.split(',');
            var oTr = document.createElement('tr');
            var oTd1 = document.createElement('td');
            var oTd2 = document.createElement('td');
            var oTd3 = document.createElement('td');
            var oTd4 = document.createElement('td');
            // var oDiv = document.createElement('div');
            // oDiv.innerHTML = "学号："+arr[0]+" 姓名："+arr[1]+" 进入时间："+arr[2]+" 出来时间："+arr[3];
            oTd1.innerHTML = arr[0];
            oTd2.innerHTML = arr[1];
            oTd3.innerHTML = arr[2];
            oTd4.innerHTML = arr[3];
            oTr.appendChild(oTd1);
            oTr.appendChild(oTd2);
            oTr.appendChild(oTd3);
            oTr.appendChild(oTd4);
            if(oContent.firstChild.nextSibling == null){
                oContent.appendChild(oTr);
            }else{
                oContent.insertBefore(oTr,oContent.firstChild.nextSibling);
            }
            // str = str.replace(/\[\d\]=>/g,'^%$^');
            // str = str.slice(1,-1);
            // var arr1 = str.split(')^%$^(');
            // for(var i = 0; i < arr1.length; i++){
            //
            // }
        }
    }
    xhr.open("post","recordForIntry/insert.php",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send("id="+oId.value+"&name="+oName.value+"&intime="+oInt.value+"&outtime="+oOut.value);
}
