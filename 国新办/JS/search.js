(function ($) {
    var startpage = getQueryString('page') ? parseInt(getQueryString('page')) : 1;
    var searchText = getQueryString('searchText') ? getQueryString('searchText') : '';
    var subtitle = "";
    var pageSize = 40;
    var totalPage = 0;
    var arr = [
            "White Paper",
            "Leaders",
            "SCIO News",
            "Public Diplomacy",
            "Int'l Cooperation",
            "Economy",
            "Sci-Tech",
            "Press Conference",
            "Policy Briefing",
            "Culture",
            "Policy",
            "CPC",
            "National Defense",
            "Society",
            "Around China",
            "Belt & Road",
            "Education",
            "Think Tank",
            "Politics",
            "Int'l Exchange",
            "Diplomacy",
            "Human Rights",
            "Environment",
            "Media Cooperation",
			"International Cooperation",
            "International Exchanges",
            "Aid",
            "Two Sessions 2018",
            "Press Minutes",
            "2019 NPC & CPPCC",
            "2020 NPC & CPPCC"
  ];
    exec = function () {
        var index = $.inArray(searchText, arr);
         if(index >= 0){
            $.getScript('http://query.china.com.cn/news/queryFn?index=ciic_en_scio&noFields=channel&nokws=2&startPage=' + startpage + '&pageSize=' + pageSize + '&field=subtitle&kw=' + searchText );
         }else{
           $.getScript('http://query.china.com.cn/news/queryFn?index=ciic_en_scio&noFields=channel&nokws=2&startPage=' + startpage + '&pageSize=' + pageSize + '&kw=' + searchText );
         }
      
    };
    exec();
    window.queryRes = function (data) {
        var len = data.recordCount;
        var temp = [];
        totalPage = Math.ceil(len / pageSize);
        $('#yInfo').html('Results ' + (startpage * pageSize - pageSize + 1) + ' - ' + startpage * pageSize + ' of ' + len);
        $.each(data.recordList, function (i, v) {
            var re=new RegExp(" amp ","g");
            var re1=new RegExp("BampR","g");
            var newstr="";
            var newsub="";
            if(v.abstra.match(re)){
               newstr=v.abstra.replace(re," & "); 
            }else if(v.abstra.match(re1)){
                newstr=v.abstra.replace(re1,"B&R");
            }else{
                newstr=v.abstra;
            }
            if(v.subtitle.match(re)){
               newsub=v.subtitle.replace(re," & "); 
            }else{
                newsub=v.subtitle;
            }
            temp.push('<li><h3><span class="mmmm">' + newsub + '</span>' + v.date.substr(0, 10) + '</h3><h1><a href="' + v.url.replace(/http:\/\/www.china.org.cn\/englishscio\//, "http://english.scio.gov.cn/") + '">' + v.title.replace(/<span style='color:red' >/g,'').replace(/<\/span>/g,'') + '</a></h1><p>' + newstr + '</p></li>');
        })
        $('#yList').html(temp.join(''));
        pageObj();
        keyHref();
    };

    function pageObj() {
        var i = 0;
    

        var pagination_buf = [];
        // prev
        pagination_buf.push(startpage > 1 ? '<a href="#"  data-page="'+(startpage - 1)+'" >Prev</a>' : '<span>Prev</span>');
        // pagination
        if (totalPage <= 10) {
        for (i = 1; i <= totalPage; i++) {
            pagination_buf.push(i == startpage ? '<span>' + i + '</span>' : '<a href="#"  data-page="'+i+'">' + i + '</a>');
        }
        } else {
        // total page > 10
        if (startpage <= 4) {
            // 1 2 3 4 5 ... 8 9 10 11
            for (i = 1; i <= 5; i++) {
                pagination_buf.push(i == startpage ? '<span>' + i + '</span>' : '<a href="#"  data-page="'+i+'">' + i + '</a>');
            }
            pagination_buf.push('<span>...</span>');
            for (i = totalPage - 2; i <= totalPage; i++) {
                pagination_buf.push('<a href="#"  data-page="'+i+'">' + i + '</a>');
            }
        } else if (startpage >= totalPage - 3) {
            // 1 2 3 ... 7 8 9 10 11
            for (i = 1; i <= 3; i++) {
                pagination_buf.push('<a href="#"  data-page="'+i+'">' + i + '</a>');
            }
            pagination_buf.push('<span>...</span>');
            for (i = totalPage - 4; i <= totalPage; i++) {
                pagination_buf.push(i == startpage ? '<span>' + i + '</span>' : '<a href="#"  data-page="'+i+'">' + i + '</a>');
            }
        } else {
            // 1 2 ... 5 6 7 ... 9 10 11
            for (i = 1; i <= 2; i++) {
                pagination_buf.push('<a href="#"  data-page="'+i+'">' + i + '</a>');
            }
            pagination_buf.push('<span>...</span>');
            for (i = startpage - 1; i <= startpage + 1; i++) {
                pagination_buf.push(i == startpage ? '<span>' + i + '</span>' : '<a href="#"  data-page="'+i+'">' + i + '</a>');
            }
            pagination_buf.push('<span>...</span>');
            for (i = totalPage - 1; i <= totalPage; i++) {
                pagination_buf.push('<a href="#"  data-page="'+i+'">' + i + '</a>');
            }
        }
    }
    // next
    pagination_buf.push(startpage < totalPage ? '<a href="#"  data-page="'+(startpage + 1)+'">Next</a>' : '<span>Next</span>');
        $('#autopage').html(pagination_buf.join(''));
    }


    function sortby(int) {
        if (int == 1) {
            window.location.href = location.href + '&strSortBy=1';
        } else {
            window.location.href = location.href + '&strSortBy=2';
        }
    }

    $('#autopage').on('click', 'a', function() {
        var page = window.parseInt($(this).attr('data-page'));
        pageturn(page);
    });
    window.pageturn = function(n){
        startpage = n;
        exec();
    }

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return window.decodeURIComponent(r[2]); return false;
    }

    function keyHref() {
        var arr = {
            "White Paper": 'w1',
            "Leaders": 'w2',
            "SCIO News": 'w3',
            "Public Diplomacy": 'w4',
            "Int'l Cooperation": 'w5',
            "Economy": 'w6',
            "Sci-Tech": 'w7',
            "Press Conference": 'w8',
            "Policy Briefing": 'w9',
            "Culture": 'w10',
            "Policy": 'w11',
            "CPC": 'w12',
            "National Defense": 'w13',
            "Society": 'w14',
            "Around China": 'w15',
            "Belt & Road": 'w16',
            "Education": 'w17',
            "Think Tank": 'w18',
            "Politics": 'w19',
            "Int'l Exchange": 'w20',
            "Diplomacy": 'w21',
            "Human Rights": 'w22',
            "Environment": 'w23',
            "Media Cooperation": 'w24',
			"International Cooperation": 'w25',
            "International Exchanges": 'w26',
            "Aid": 'w27',
            "Two Sessions 2018": 'w28',
            "Press Minutes": 'w29',
            "2019 NPC & CPPCC": 'w30',
            "2020 NPC & CPPCC": 'w31'
        };
        $('.mmmm').each(function () {
            var curTitle = $.trim($(this).text());
            $(this).addClass(arr[curTitle]).html('<a href="http://english.scio.gov.cn/search.htm?searchText='+ curTitle +'&strUrl=englishscio" target="_top">'+ curTitle +'</a>');
        });
    }
    
})(jQuery);

(function ($) {
    var wTop = $('.ban2').offset().top;
    $(window).scroll(function () {
        var t = $(document).scrollTop();
        if (t >= wTop) {
            $('.ban2').css({ 'position': 'fixed', 'z-index': '99999', 'top': '0' });
        } else {
            $('.ban2').css({ 'position': 'static', 'margin': '0 auto 30px auto' });
        }
    });
})(jQuery);

(function ($) {
    var wTop = $('.ban2').offset().top;
    $(window).scroll(function () {
        var t = $(document).scrollTop();
        if (t >= wTop) {
            $('.ban2').css({ 'position': 'fixed', 'z-index': '99999', 'top': '0' });
        } else {
            $('.ban2').css({ 'position': 'static', 'margin': '0 auto 30px auto' });
        }
    });
})(jQuery);