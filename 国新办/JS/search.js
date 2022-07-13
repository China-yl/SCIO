(function($) {
    var startpage = getQueryString('page') ? parseInt(getQueryString('page')) : 1;
    var searchText = getQueryString('searchText') ? getQueryString('searchText') : '';
    var pageSize = 60;
    var totalPage = 0;
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
        "2020 NPC & CPPCC": 'w31',
        "2021 NPC & CPPCC": 'w32',
        "People's Livelihood": 'w33',
        "Agriculture": 'w34',
        "Beijing 2022": 'w35',
        "2022 NPC & CPPCC": 'w36'
    };
    exec = function() {
        var index = $.inArray(searchText, Object.keys(arr));
        if (index >= 0) {
            $.getScript('http://query.china.com.cn/news/queryFn?index=ciic_en_scio&h=1&noFields=channel&nokws=2&startPage=' + startpage + '&pageSize=' + pageSize + '&field=subtitle&kw=' + searchText);
        } else {
            $.getScript('http://query.china.com.cn/news/queryFn?index=ciic_en_scio&h=1&noFields=channel&nokws=2&startPage=' + startpage + '&pageSize=' + pageSize + '&kw=' + searchText);
        }

    };
    exec();
    window.queryRes = function(data) {
        var len = data.recordCount;
        var temp = [];
        var url = ["topnews", "pressroom", "scionews", "chinavoices", "beltandroad", "in-depth", "aboutscio", "internationalexchanges", "infographics", "videos", "whitepapers", "featured", "chinafacts"];
        totalPage = Math.ceil(len / pageSize);
        $('#yInfo').html('Results ' + (startpage * pageSize - pageSize + 1) + ' - ' + startpage * pageSize + ' of ' + len);
        $.each(data.recordList, function(i, v) {
            $.each(url, function() {
                if (v.url.indexOf(this) != -1) {
                    if (v.url.split("_").length - 1 < 2) {
                        if (v.title.indexOf("Notice") != -1) {
                            temp.push('<li><h3>' + v.date.substr(0, 10) + '</h3><h1><a href="' + v.url.replace(/http:\/\/www.china.org.cn\/englishscio\//, "http://english.scio.gov.cn/") + '">' + v.title.split(" ").slice(0, -2).join(" ") + " (" + v.title.split(" ").slice(-2).join(" ") + ")" + '</a></h1></li>');
                        } else {
                            temp.push('<li><h3>' + v.date.substr(0, 10) + '</h3><h1><a href="' + v.url.replace(/http:\/\/www.china.org.cn\/englishscio\//, "http://english.scio.gov.cn/") + '">' + v.title + '</a></h1></li>');
                        }
                    }
                }
            })
        })
        $('#yList').html(temp.join(''));
        pageObj();
    };

    function pageObj() {
        var i = 0;
        var pagination_buf = [];
        // prev
        pagination_buf.push(startpage > 1 ? '<a href="#"  data-page="' + (startpage - 1) + '" >Prev</a>' : '<span>Prev</span>');
        // pagination
        if (totalPage <= 10) {
            for (i = 1; i <= totalPage; i++) {
                pagination_buf.push(i == startpage ? '<span>' + i + '</span>' : '<a href="#"  data-page="' + i + '">' + i + '</a>');
            }
        } else {
            // total page > 10
            if (startpage <= 4) {
                // 1 2 3 4 5 ... 8 9 10 11
                for (i = 1; i <= 5; i++) {
                    pagination_buf.push(i == startpage ? '<span>' + i + '</span>' : '<a href="#"  data-page="' + i + '">' + i + '</a>');
                }
                pagination_buf.push('<span>...</span>');
                for (i = totalPage - 2; i <= totalPage; i++) {
                    pagination_buf.push('<a href="#"  data-page="' + i + '">' + i + '</a>');
                }
            } else if (startpage >= totalPage - 3) {
                // 1 2 3 ... 7 8 9 10 11
                for (i = 1; i <= 3; i++) {
                    pagination_buf.push('<a href="#"  data-page="' + i + '">' + i + '</a>');
                }
                pagination_buf.push('<span>...</span>');
                for (i = totalPage - 4; i <= totalPage; i++) {
                    pagination_buf.push(i == startpage ? '<span>' + i + '</span>' : '<a href="#"  data-page="' + i + '">' + i + '</a>');
                }
            } else {
                // 1 2 ... 5 6 7 ... 9 10 11
                for (i = 1; i <= 2; i++) {
                    pagination_buf.push('<a href="#"  data-page="' + i + '">' + i + '</a>');
                }
                pagination_buf.push('<span>...</span>');
                for (i = startpage - 1; i <= startpage + 1; i++) {
                    pagination_buf.push(i == startpage ? '<span>' + i + '</span>' : '<a href="#"  data-page="' + i + '">' + i + '</a>');
                }
                pagination_buf.push('<span>...</span>');
                for (i = totalPage - 1; i <= totalPage; i++) {
                    pagination_buf.push('<a href="#"  data-page="' + i + '">' + i + '</a>');
                }
            }
        }
        // next
        pagination_buf.push(startpage < totalPage ? '<a href="#"  data-page="' + (startpage + 1) + '">Next</a>' : '<span>Next</span>');
        $('#autopage').html(pagination_buf.join(''));
    }

    $('#autopage').on('click', 'a', function() {
        var page = window.parseInt($(this).attr('data-page'));
        pageturn(page);
    });
    window.pageturn = function(n) {
        startpage = n;
        exec();
    }

    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return window.decodeURIComponent(r[2]);
        return false;
    }

})(jQuery);
(function($) {
    var wTop = $('.ban2').offset().top;
    $(window).scroll(function() {
        var t = $(document).scrollTop();
        if (t >= wTop) {
            $('.ban2').css({
                'position': 'fixed',
                'z-index': '99999',
                'top': '0'
            });
        } else {
            $('.ban2').css({
                'position': 'static',
                'margin': '0 auto 30px auto'
            });
        }
    });
})(jQuery);