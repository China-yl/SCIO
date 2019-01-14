(function ($) {
    var startpage = getQueryString('page') ? parseInt(getQueryString('page')) : 1;
    var searchText = getQueryString('searchText') ? getQueryString('searchText') : '';
    var sub = getQueryString('sub');
    var pageSize = 40;
    var totalPage = 0;
    var getUrl = '';
    if (sub) {
        getUrl = 'http://search.china.org.cn/hlftiweb/en/jsonfn.jsp?strUrl=english.scio.gov.cn&channel=1&page=' + startpage + '&nItem=' + pageSize + '&sub=' + sub;
    } else {
        getUrl = 'http://search.china.org.cn/hlftiweb/en/jsonfn.jsp?strUrl=english.scio.gov.cn&channel=1&page=' + startpage + '&nItem=' + pageSize + '&searchText=' + searchText;
    }

    $.getScript(getUrl);
    window.searchRes = function (data) {
        var len = data.size;
        var pageHref = [];
        var temp = [];
        totalPage = Math.ceil(len / pageSize);
        $('#yInfo').html('Results ' + (startpage * pageSize - pageSize + 1) + ' - ' + startpage * pageSize + ' of ' + len);
        for (var i = 0; i < data.list.length; i++) {
            var re=new RegExp(" amp ","g");
            var re1=new RegExp("BampR","g");
            var newstr="";
            if(data.list[i].abstract.match(re)){
               newstr=data.list[i].abstract.replace(re," & "); 
            }else if(data.list[i].abstract.match(re1)){
                newstr=data.list[i].abstract.replace(re1,"B&R");
            }else{
                newstr=data.list[i].abstract;
            }
            temp.push('<li><h3><span class="mmmm">' + data.list[i].sub + '</span>' + data.list[i].date + '</h3><h1><a href="' + data.list[i].url.replace(/http:\/\/www.china.org.cn\/englishscio\//, "http://english.scio.gov.cn/") + '">' + data.list[i].title + '</a></h1><p>' + newstr + '</p></li>');
        }
        $('#yList').html(temp.join(''));
        pageObj();
        keyHref();
    };

    function pageObj() {
        var i, key = '';
        var pageHref = [];
        if (sub) {
            key = 'sub';
        } else {
            key = 'searchText';
        }
        var txt = getQueryString(key) ? getQueryString(key) : '';

        var pagination_buf = [];
        // prev
        pagination_buf.push(startpage > 1 ? '<a href="?strUrl=english.scio.gov.cn&channel=1&page=' + (startpage - 1) + '&' + key + '=' + txt + '">Prev</a>' : '<span>Prev</span>');
        // pagination
        if (totalPage <= 10) {
            for (i = 1; i <= totalPage; i++) {
                pagination_buf.push(i == startpage ? '<span>' + i + '</span>' : '<a href="?strUrl=english.scio.gov.cn&channel=1&page=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
            }
        } else {
            // total page > 10
            if (startpage <= 4) {
                // 1 2 3 4 5 ... 8 9 10 11
                for (i = 1; i <= 5; i++) {
                    pagination_buf.push(i == startpage ? '<span>' + i + '</span>' : '<a href="?strUrl=english.scio.gov.cn&channel=1&page=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
                pagination_buf.push('<span>...</span>');
                for (i = totalPage - 2; i <= totalPage; i++) {
                    pagination_buf.push('<a href="?strUrl=english.scio.gov.cn&channel=1&page=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
            } else if (startpage >= totalPage - 3) {
                // 1 2 3 ... 7 8 9 10 11
                for (i = 1; i <= 3; i++) {
                    pagination_buf.push('<a href="?strUrl=english.scio.gov.cn&channel=1&page=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
                pagination_buf.push('<span>...</span>');
                for (i = totalPage - 4; i <= totalPage; i++) {
                    pagination_buf.push(i == startpage ? '<span>' + i + '</span>' : '<a href="?strUrl=english.scio.gov.cn&channel=1&page=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
            } else {
                // 1 2 ... 5 6 7 ... 9 10 11
                for (i = 1; i <= 2; i++) {
                    pagination_buf.push('<a href="?strUrl=english.scio.gov.cn&channel=1&page=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
                pagination_buf.push('<span>...</span>');
                for (i = startpage - 1; i <= startpage + 1; i++) {
                    pagination_buf.push(i == startpage ? '<span>' + i + '</span>' : '<a href="?strUrl=english.scio.gov.cn&channel=1&page=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
                pagination_buf.push('<span>...</span>');
                for (i = totalPage - 1; i <= totalPage; i++) {
                    pagination_buf.push('<a href="?strUrl=english.scio.gov.cn&channel=1&page=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
            }
        }
        // next
        pagination_buf.push(startpage < totalPage ? '<a href="?strUrl=english.scio.gov.cn&channel=1&page=' + (startpage + 1) + '&' + key + '=' + txt + '">Next</a>' : '<span>Next</span>');
        $('#autopage').html(pagination_buf.join(''));
    }

    function sortby(int) {
        if (int == 1) {
            window.location.href = location.href + '&strSortBy=1';
        } else {
            window.location.href = location.href + '&strSortBy=2';
        }
    }

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
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
            "Press Minutes": 'w29'
        };
        $('.mmmm').each(function () {
            var curTitle = $.trim($(this).text());
            $(this).addClass(arr[curTitle]).html('<a href="?strUrl=english.scio.gov.cn&channel=1&sub=' + curTitle + '" target="_top">' + curTitle + '</a>')
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