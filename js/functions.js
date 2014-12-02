$(document).foundation('reveal', {
    animation: 'fade',
    animationspeed: 200
});

var pathRoot = window.location.protocol + '//' + window.location.hostname + window.location.pathname;
var titleRoot = document.title;

function load_omniture() {
        var omni = $('#omniture').html();
        $('#omniture').after('<div id="new_omni">' + omni + '</div>');
}
function build_url(path) {
        var url = pathRoot + path;
        return url;
}
function rewrite_url(path, new_title) {
        var url = build_url(path);
        document.title = new_title + ' - ' + titleRoot;
        window.history.replaceState('', new_title, url);
        load_omniture();
}

function revealCredits() {
    $('#credits').foundation('reveal', 'open');
}

function scrollDownTo(whereToScroll, scrollOffset) {
    scrollOffset = typeof scrollOffset !== 'undefined' ? scrollOffset : 60;
    $('html,body').animate({
        scrollTop: ($(whereToScroll).offset().top - scrollOffset)
    }, 300);
}

var playerClear = false;

function playerCreator(embedId, playerId, divId) {
    divId = typeof divId !== 'undefined' ? divId : false;
    playerClear = true;
    if (divId) {
        $(divId).animate({backgroundColor:'rgba(153,0,0,0.3)',paddingLeft:'.5em',paddingRight:'.5em'}, 350).delay(2000).animate({backgroundColor:'transparent',paddingLeft:'0',paddingRight:'0'},1000);
    }
    OO.Player.create(embedId, playerId, {'autoplay':true});
    setTimeout(function() { playerClear = false; },2000);
}

function playerScroller(embedId, playerId, divId) {
    scrollDownTo(('#' + embedId),100);
    playerCreator(embedId, playerId, divId);
}
function getNodePosition(node) {
    var eTop = $(node).offset().top;
    return Math.abs(eTop - $(window).scrollTop());
}
function isVisible(element) {
    var vidTop = $(element).offset().top;
    var vidBot = $(element).offset().top + $(element).height();
    var fromTop = $(window).scrollTop() + $(element).height() / 2;
    if ( fromTop > vidTop && fromTop < vidBot ) {
        return true;
    } else {
        return false;
    }
}

function darkBackground(element, reverse) {
    if (!(/(iPad|iPhone|iPod)/g.test(navigator.userAgent))) {
        if (!reverse) {
            $(element).animate({backgroundColor:'#222'}, 750);
            $(element + ' p.caption').animate({color:'rgba(255,255,255,0.6)'}, 750);
            $(element + ' .lowertitle h1').animate({color:'rgba(255,255,255,0.6)'}, 750);
            $('.fixed').animate({top:'-45px'},350);
        } else {
            $(element).animate({backgroundColor:'#fff'}, 750);
            $(element + ' p.caption').animate({color:'rgba(0,0,0,0.6)'}, 750);
            $('.fixed').animate({top:'0'},750);
        }
    }
}

$('#maintitle').on("click", function() {
    scrollDownTo('#overviewvid',0);
});

$(function() {
    if (!(window.navigator.userAgent.indexOf("MSIE ") > 0)) {
        $('#thetable').on("mouseover", function() {
            document.body.style.overflow='hidden';
        });
        $('#thetable').on("mouseout", function() {
            document.body.style.overflow='auto';
        });
    }
});

$('.top-top').click(function(evt) {
    $('.toggle-topbar').click();
});

$('.vid-embed').on("mouseenter", function() {
    $(this).find('.playicon').fadeTo(300, 0);
    $(this).find('.playtext').fadeTo(300, 1);
});
$('.vid-embed').on("mouseleave", function() {
    $(this).find('.playicon').fadeTo(300, 1);
    $(this).find('.playtext').fadeTo(300, 0);
});

var moreAd = true;
var titleFade = true;
var vidBack = true;
var scrollvis = false;
var slideBack = true;

function fadeNavBar(reverse) {
    if (reverse) {
        $('.fixed').animate({top:'-45px'},350);
        titleFade = true;
    } else {
        $('.fixed').animate({top:'0'},750);
        titleFade = false;
    }
}

function hideAdManual() {
    $('#adwrapper').fadeOut(300);
    $('#adwrapper a.boxclose').css('display', 'none');
    $('#footer-bar').delay(150).animate({marginBottom:'0'},300);
    $('#adframewrapper').html('');
    moreAd = false;
}

$(document).keyup(function(e) {
    if (!moreAd && e.keyCode == 27) {
        hideAdManual();
    }    
});

function getAdSize() {
    if ( $(window).width() >= 740 ) {
        var adSizes = ['ad=medium','728','90'];
        return adSizes;
    } else {
        return false;
    }
    /* else if ( $(window).width() >= 300 && $(window).width() < 740 ) {
        var adSizes = ['ad=small','300','50'];
        return adSizes;
    }*/
}

function showAd() {
    var adSize = getAdSize();
    if (moreAd && adSize) {
        $('#adframewrapper').html('<iframe src="' + pathRoot + 'ad.html?' + adSize[0] + '" seamless height="' + adSize[2] + '" width="' + adSize[1] + '" frameborder="0"></iframe>');
        $('#adwrapper').fadeIn(400);
        $('a.boxclose').fadeIn(400);
        var adH = $('#adwrapper').height();
        $('#footer-bar').css('margin-bottom',adH);
        moreAd = false;
    }
}

function getAdTimes(numAds) {
    var adReturns = [];
    var docHeight = $(document).height();
    var chunkHeight = docHeight / numAds;
    var innerHeight = (window.innerHeight * 2);
    for (i=1;i<=numAds;i++) {
        adReturns.push( Math.round( innerHeight + (chunkHeight * i) ) );
    }
    return adReturns;
}

var adTimes = getAdTimes(0);

$('#timothyphotos').find('img').unveil(300, function() {
    $('#timothyphotos.centergallery').slick({
        centerMode: true,
        centerPadding: '15%',
        slidesToShow: 1,
        prevArrow: '<button type="button" class="slick-prev"><span>&lt;</span></button>',
        nextArrow: '<button type="button" class="slick-next"><span>&gt;</span></button>',
        responsive: [{
            breakpoint: 800,
            settings: {
                arrows: true,
                centerMode: true,
                centerPadding: '8%',
                slidesToShow: 1
            }
        }]
    });
});
$('#onthestreet').find('img').unveil(300, function() {
    $('#onthestreet.centergallery').slick({
        centerMode: true,
        centerPadding: '15%',
        slidesToShow: 1,
        prevArrow: '<button type="button" class="slick-prev"><span>&lt;</span></button>',
        nextArrow: '<button type="button" class="slick-next"><span>&gt;</span></button>',
        responsive: [{
            breakpoint: 800,
            settings: {
                arrows: true,
                centerMode: true,
                centerPadding: '8%',
                slidesToShow: 1
            }
        }]
    });
});

$(document).ready(function() {
    if ( $(window).scrollTop() > (window.innerHeight / 2) ) {
        if (titleFade) {
            fadeNavBar(false);
        }
    }
    if ( $(window).scrollTop() > adTimes[0] ) {
        if (moreAd) {
            showAd();
        }
    }
});

$(window).scroll(function() {
    for (var i = 1; i < adTimes.length; i++) {
        if (adTimes[i] > ($(window).scrollTop() - 35) && adTimes[i] < ($(window).scrollTop() + 35)) {
            hideAdManual();
            moreAd = true;
        }
    }
    if ($(window).scrollTop() > adTimes[0] ) {
        if (moreAd) {
            showAd();
        }
    }
    if ( $(window).scrollTop() > (window.innerHeight / 2) ) {
        if (titleFade) {
            fadeNavBar(false);
        }
    } else if (!titleFade) {
        fadeNavBar(true);
    }
    if (isVisible('#homeless')) {
        var triggerDiv = $('#homeless');
        if ($(triggerDiv).hasClass('omnitrig')) {
            rewrite_url($(triggerDiv).data('omniUrl'),$(triggerDiv).data('omniTitle'));
            $(triggerDiv).removeClass('omnitrig');
        }
    }
});