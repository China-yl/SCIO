function lun(a,b,c,d,e,f,g,w,p){
    var i = 0;
    var clone = $(c).first().clone();
    $(b).append(clone);
    var size = $(c).size();
    for (var j = 0; j < size-1; j++) {
        $(d).append("<li></li>");
    }
    $(c).first().addClass("show");
    $(e).first().addClass("on");
    if(p=="true"){
        var t = setInterval(function () { i++; move();},2000); 
        $(a).hover(function () {
            clearInterval(t);
        }, function () {
            t = setInterval(function () { i++; move(); }, 2000);
        });
    }
    $(e).hover(function () {
        var index = $(this).index();
        i = index;
        $(b).stop().animate({ left: -index * w }, 500);
        $(c).eq(i).addClass("show").siblings().removeClass("show");
        $(this).addClass("on").siblings().removeClass("on");
    });

    /*向右*/
    $(f).click(function () {
        i++;
        move();
    })

    /*向左*/
    $(g).click(function () {
        i--;
        move();
    })

    /*移动事件*/
    function move() {
        if (i == size) {
            $(b).css({ left: 0 });
            i = 1;
        }
        if (i == -1) {
            $(b).css({ left: -(size - 1) * w });
            i = size - 2;
        }
        $(b).stop().animate({ left: -i * w }, 500);

        if (i == size - 1) {
            $(c).eq(0).addClass("show").siblings().removeClass("show");
            $(e).eq(0).addClass("on").siblings().removeClass("on");
        } else {
            $(c).eq(i).addClass("show").siblings().removeClass("show");
            $(e).eq(i).addClass("on").siblings().removeClass("on");
        }
    }
}