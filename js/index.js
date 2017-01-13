window.onload=function(){
    var canvas=document.querySelector(".canvas");
    var canvasW=canvas.offsetWidth;
    var canvasH=canvas.offsetHeight;
    var canvas=document.querySelector("canvas");
    var cobj=canvas.getContext("2d");
    var copy=document.querySelector(".copy");
    canvas.width=canvasW;
    canvas.height=canvasH;
    var drawObj=new shape(canvas,copy,cobj);

    /*菜单操作*/

    //$(".menu li").click(function(){
    //    var index=$(".menu li").index(this);
    //    $(".option").hide().eq(index).slideToggle(100);
    //    drawObj.isshowxp=false;
    //    $(".xp").css("display","none");
    //})
    //
    //$(".option li").click(function(){
    //    $(".option li").css("color","#000").css("text-shadow","none");
    //    $(this).css("color","red").css("text-shadow","0 0 3px red");
    //
    //})


    /*画图*/
    $(".option:eq(1) li").click(function(){
        console.log(1)
        var fn=$(this).attr("data-role");
        if(fn=="bian"){
            drawObj.bianNum=prompt("请输入边数", 5);
        }
        if(fn=="jiao"){
            drawObj.jiaoNum=prompt("请输入角数", 5);
        }
        if(fn!=="pen"){
            drawObj.type=fn;
            drawObj.draw();
        }else{
            drawObj.pen();
        }
    })

    /*画图方式*/
    $(".option:eq(3) li").click(function(){
        var fn=$(this).attr("data-role");
        drawObj.style=fn;
        drawObj.draw();
    })
    /*画图的颜色*/
    $(".option:eq(2) input").change(function(){
        drawObj[$(this).attr("data-role")]=$(this).val();
        drawObj.draw();
    })
    /*线条的粗细*/
    $(".option:eq(4) li").click(function(){
        var num=$(this).attr("data-role");
        if(num!=="null"){
            drawObj.linew=num;
            drawObj.draw();
        }
    })
    $(".option:eq(4) li input").change(function(){
        var num=$(this).val();
        drawObj.linew=num;
        drawObj.draw();
    })
    /*文件*/
    $(".option:eq(0) li").click(function(){
        var index=$(".option:eq(0) li").index(this);
        if(index==0){
            if(drawObj.historys.length>0){
                var yes=confirm("是否保存");
                if(yes){
                    var url=canvas.toDataURL();
                    var newurl=url.replace("image/png","stream/octet");
                    location.href=newurl;
                }
            }
            cobj.clearRect(0,0,canvas.width,canvas.height);
            drawObj.historys=[];
        }else if(index==1){
            if(drawObj.historys.length==0){
                cobj.clearRect(0,0,canvas.width,canvas.height);
                setTimeout(function(){
                    alert("不能返回");
                },10)
            }else{
                if(drawObj.isback){
                    if(drawObj.historys.length==1){
                        drawObj.historys.pop();
                        cobj.clearRect(0,0,canvas.width,canvas.height);
                    }else{
                        drawObj.historys.pop();
                        cobj.putImageData(drawObj.historys.pop(),0,0);
                    }
                }else{
                    cobj.putImageData(drawObj.historys.pop(),0,0);
                }
                drawObj.isback=false;
            }
        }else if(index==2){
            var url=canvas.toDataURL();
            var newurl=url.replace("image/png","stream/octet");
            location.href=newurl;
        }
    })
    /*橡皮*/

    $(".xiang").click(function(){
        alert(1)
        var xpObj=$(".xp");
        drawObj.xp(xpObj);
        drawObj.isshowxp=true;
    });
    $(".option:last input").change(function() {

         //alert(1)
        drawObj.xpsize = $(this).val();
        $(".xp").css({
            width: $(this).val() + "px",
            height: $(this).val() + "px"
        })
    })

//$(".menu li:last").click(function(){
//	drawObj.xp();
//})
//$(".option:last input").change(function(){
//	drawObj.xpsize=$(this).val();
//})
}