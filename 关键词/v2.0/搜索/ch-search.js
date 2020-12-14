(function ($) {
    var startpage = getQueryString('page') ? parseInt(getQueryString('page')) : 1;
    var searchText = getQueryString('searchText') ? getQueryString('searchText') : '';
    var pageSize = 40;
    var totalPage = 0;
    exec = function () {
        $.getScript('http://query.china.com.cn/news/queryFn?index=en&fields=channel,path,subtitle&kws=1,chinese/china_key_words,%E4%B8%AD%E6%96%87,' + searchText + '&pageSize=' + pageSize + '&startPage=' + startpage);
    };
    exec(); 
    window.queryRes = function (data) {
    var len = data.recordCount;
    var temp = [];
    totalPage = Math.ceil(len / pageSize);
    $('#yText').html(searchText)
    $('#yInfo').html('Results ' + (startpage * pageSize - pageSize + 1) + ' - ' + startpage * pageSize + ' of ' + len);
    $.each(data.recordList, function (i, v) {
        temp.push('<li><p><span></span><a href="' + v.url + '">'+ v.title.replace(/<span style="color:red" >/g,'').replace(/<\/span>/g,'') + '</a></p></li>');
        })
        $('#yList').html(temp.join(''));
        pageObj();
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
})(jQuery);