(function ($) {
    var startpage = getQueryString('page') ? parseInt(getQueryString('page')) : 1;
    var searchText = getQueryString('searchText') ? getQueryString('searchText') : '';
    var  searchText1 = escape(searchText);
    var pageSize = 40;
    var totalPage = 0;
    var getUrl = 'http://search.china.org.cn/hlftiweb/en/jsonfn.jsp?strUrl=pmtkcde.org.cn&channel=1&page=' + startpage + '&nItem=' + pageSize + '&searchText=' + searchText1;

    $.getScript(getUrl);
    window.searchRes = function (data) {
        var len = data.size;
        var pageHref = [];
        var temp = [];
        totalPage = Math.ceil(len / pageSize);
        $('#yText').html(searchText)
        $('#yInfo').html('Results ' + (startpage * pageSize - pageSize + 1) + ' - ' + startpage * pageSize + ' of ' + len);
        for (var i = 0; i < data.list.length; i++) {
            temp.push('<li><p>' + data.list[i].title + '</p><span>'+data.list[i].sub+'</span></li>');
        }
        $('#yList').html(temp.join(''));
        pageObj();
    };

    function pageObj() {
        var i = 0; 
        var key = 'searchText';
        var pageHref = [];
        var txt = getQueryString(key) ? getQueryString(key) : '';

        var pagination_buf = [];
        // prev
        pagination_buf.push(startpage > 1 ? '<a href="?strUrl=pmtkcde.org.cn&channel=1&page=' + (startpage - 1) + '&' + key + '=' + txt + '">Prev</a>' : '<span>Prev</span>');
        // pagination
        if (totalPage <= 10) {
            for (i = 1; i <= totalPage; i++) {
                pagination_buf.push(i == startpage ? '<span>' + i + '</span>' : '<a href="?strUrl=pmtkcde.org.cn&channel=1&page=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
            }
        } else {
            // total page > 10
            if (startpage <= 4) {
                // 1 2 3 4 5 ... 8 9 10 11
                for (i = 1; i <= 5; i++) {
                    pagination_buf.push(i == startpage ? '<span>' + i + '</span>' : '<a href="?strUrl=pmtkcde.org.cn&channel=1&page=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
                pagination_buf.push('<span>...</span>');
                for (i = totalPage - 2; i <= totalPage; i++) {
                    pagination_buf.push('<a href="?strUrl=pmtkcde.org.cn&channel=1&page=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
            } else if (startpage >= totalPage - 3) {
                // 1 2 3 ... 7 8 9 10 11
                for (i = 1; i <= 3; i++) {
                    pagination_buf.push('<a href="?strUrl=pmtkcde.org.cn&channel=1&page=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
                pagination_buf.push('<span>...</span>');
                for (i = totalPage - 4; i <= totalPage; i++) {
                    pagination_buf.push(i == startpage ? '<span>' + i + '</span>' : '<a href="?strUrl=pmtkcde.org.cn&channel=1&page=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
            } else {
                // 1 2 ... 5 6 7 ... 9 10 11
                for (i = 1; i <= 2; i++) {
                    pagination_buf.push('<a href="?strUrl=pmtkcde.org.cn&channel=1&page=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
                pagination_buf.push('<span>...</span>');
                for (i = startpage - 1; i <= startpage + 1; i++) {
                    pagination_buf.push(i == startpage ? '<span>' + i + '</span>' : '<a href="?strUrl=pmtkcde.org.cn&channel=1&page=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
                pagination_buf.push('<span>...</span>');
                for (i = totalPage - 1; i <= totalPage; i++) {
                    pagination_buf.push('<a href="?strUrl=pmtkcde.org.cn&channel=1&page=' + i + '&' + key + '=' + txt + '">' + i + '</a>');
                }
            }
        }
        // next
        pagination_buf.push(startpage < totalPage ? '<a href="?strUrl=pmtkcde.org.cn&channel=1&page=' + (startpage + 1) + '&' + key + '=' + txt + '">Next</a>' : '<span>Next</span>');
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
        if (r != null) return window.decodeURIComponent(r[2]); return false;
    }
})(jQuery);

