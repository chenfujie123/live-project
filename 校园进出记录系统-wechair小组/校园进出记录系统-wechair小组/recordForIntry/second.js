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


var oTable = document.getElementById('containerTable');

var xhr = new XMLHttpRequest();
xhr.onreadystatechange=function(){
    if (xhr.readyState==4 && xhr.status==200)
    {
        var str = xhr.responseText;
        str = str.replace(/\s/g,'');
        str = str.replace(/Array/g,'');
        str = str.replace(/\[\d+?\]=>\(/g,'');
        str = str.replace(/\)/g,',');
        str = str.slice(1,-2);
        str = str.replace(/\[0\]=>/g,'');
        str = str.replace(/\[\d\]=>/g,'^!*^');
        console.log(str);
        var arr1 = str.split(',');
        var arr2;
        for (var i = 0; i < arr1.length; i++){
            arr2 = arr1[i].split('^!*^');
            console.log(arr2[0]+' '+arr2[1]+' '+arr2[2]+' '+arr2[3]+'\n');
            var oTr = document.createElement('tr');
            var oTd1 = document.createElement('td');
            var oTd2 = document.createElement('td');
            var oTd3 = document.createElement('td');
            var oTd4 = document.createElement('td');
            // var oDiv = document.createElement('div');
            // oDiv.innerHTML = "学号："+arr[0]+" 姓名："+arr[1]+" 进入时间："+arr[2]+" 出来时间："+arr[3];
            oTd1.innerHTML = arr2[0];
            oTd2.innerHTML = arr2[1];
            oTd3.innerHTML = arr2[2];
            oTd4.innerHTML = arr2[3];
            oTr.appendChild(oTd1);
            oTr.appendChild(oTd2);
            oTr.appendChild(oTd3);
            oTr.appendChild(oTd4);
            if(oTable.firstChild.nextSibling == null){
                oTable.appendChild(oTr);
            }else{
                oTable.insertBefore(oTr,oTable.firstChild.nextSibling);
            }
        }
    }
}
xhr.open("post","recordForIntry/select.php",true);
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xhr.send("");









