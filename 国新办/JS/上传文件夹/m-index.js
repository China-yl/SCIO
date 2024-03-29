(function($) {
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
        "2022 NPC & CPPCC": 'w36',
        "Health": 'w37'
    };
    $('.mmmm').each(function() {
        var curTitle = $.trim($(this).text());
        $(this).addClass(arr[curTitle]).html('<a href="http://english.scio.gov.cn/search.htm?searchText=' + curTitle + '&strUrl=englishscio" target="_top">' + curTitle + '</a>');
    });
})(jQuery);

function checkUser() {
    document.getElementById("formid").submit();
}

function closelist() {
    document.getElementById('listshow').style.display = 'none';
}

function showlist() {
    document.getElementById('listshow').style.display = 'block';
}

function show1() {
    if (showdiv_display = document.getElementById('box41').style.display == 'none') {
        document.getElementById('box41').style.display = 'block';
        document.getElementById('btn1').innerHTML = "x";
    } else {
        document.getElementById('box41').style.display = 'none';
        document.getElementById('btn1').innerHTML = "+";
    }

}

function show2() {
    if (showdiv_display = document.getElementById('box51').style.display == 'none') {
        document.getElementById('box51').style.display = 'block';
        document.getElementById('btn2').innerHTML = "x";
    } else {
        document.getElementById('box51').style.display = 'none';
        document.getElementById('btn2').innerHTML = "+";
    }

}