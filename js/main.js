var $ = jQuery;
var winWidth = jQuery(window).width();

function reloadSlider() {
    var winWidth = $(window).width();
    if (winWidth < 1300 && winWidth > 1024) {
        bx.reloadSlider({
            minSlides: 2,
            maxSlides: 4,
            slideWidth: 200,
            slideMargin: 10,
            infiniteLoop: false,
            moveSlides: 1,
            hideControlOnEnd: true,
            pager: false,
            controls: true,
            // touchEnabled: false,
            nextText: '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
            prevText: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
        });
    } else if (winWidth < 1025 && winWidth > 991) {
        bx.reloadSlider({
            minSlides: 4,
            maxSlides: 4,
            // touchEnabled: false,
            slideWidth: 225,
            slideMargin: 10,
            infiniteLoop: false,
            moveSlides: 1,
            hideControlOnEnd: true,
            pager: false,
            controls: true,
            nextText: '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
            prevText: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
        });
    } else if (winWidth < 991 && winWidth > 767) {
        bx.reloadSlider({
            minSlides: 2,
            maxSlides: 3,
            // touchEnabled: false,
            slideWidth: 210,
            slideMargin: 10,
            infiniteLoop: false,
            moveSlides: 1,
            hideControlOnEnd: true,
            pager: false,
            controls: true,
            nextText: '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
            prevText: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
        });
    } else if (winWidth < 767) {
        bx.destroySlider();
        scrollable();
    } else {
        bx.reloadSlider({
            minSlides: 2,
            maxSlides: 5,
            // touchEnabled: false,
            slideWidth: 260,
            slideMargin: 10,
            infiniteLoop: false,
            moveSlides: 1,
            hideControlOnEnd: true,
            pager: false,
            controls: true,
            nextText: '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
            prevText: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
        });
    }
}

// color block anchor link
function goToChart() {
}


function fn_chart1() {
    var winWidth = jQuery(window).width();
    if (winWidth < 767) {
        chart1.destroySlider();
    } else {
        chart1.reloadSlider({
            captions: false,
            infiniteLoop: false,
            controls: false,
            infiniteLoop: false,
            // touchEnabled: false,
        })
    }
}


function fn_chart2() {
    var winWidth = jQuery(window).width();
    if (winWidth < 767) {
        chart2.destroySlider();
    } else {
        chart2.reloadSlider({
            captions: false,
            infiniteLoop: false,
            controls: false,
            infiniteLoop: false,
            // touchEnabled: false,
        })
    }
}

function fn_chart14() {
    var winWidth = jQuery(window).width();
    if (winWidth < 767) {
        chart14.destroySlider();
    } else {
        chart14.reloadSlider({
            captions: false,
            infiniteLoop: false,
            controls: false,
            infiniteLoop: false,
            // touchEnabled: false,
        });
        jQuery(document).trigger("sliderSlide", ["chart-14", null, {index: 0}]);
    }
}

function fn_chart15() {
    var winWidth = jQuery(window).width();
    if (winWidth < 767) {
        chart15.destroySlider();
    } else {
        chart15.reloadSlider({
            captions: false,
            infiniteLoop: false,
            controls: false,
            infiniteLoop: false,
            // touchEnabled: false,
        });
        jQuery(document).trigger("sliderSlide", ["chart-15", null, {index: 0}]);
    }
}

function fn_chart18() {
    var winWidth = jQuery(window).width();
    if (winWidth < 767) {
        chart18.destroySlider();
    } else {
        chart18.reloadSlider({
            captions: false,
            infiniteLoop: false,
            controls: false,
            infiniteLoop: false,
            // touchEnabled: false,
        });
        jQuery(document).trigger("sliderSlide", ["chart-18", null, {index: 0}]);
    }
}

function fn_chart17() {
    var winWidth = jQuery(window).width();
    if (winWidth < 767) {
        chart17.destroySlider();
    } else {
        chart17.reloadSlider({
            captions: false,
            infiniteLoop: false,
            controls: false,
            infiniteLoop: false,
            // touchEnabled: false,
        });
        jQuery(document).trigger("sliderSlide", ["chart-17", null, {index: 0}]);
    }
}

function gototop() {
    if ($(this).scrollTop() > 150) {
        $('.gotoTop').fadeIn();
    } else {
        $('.gotoTop').fadeOut();
    }
}

function settingOpen() {
    $('.setting-list').height('auto');

    var winHT = $(window).height(),
        settingHT = $('.setting-list').height(),
        headerHT = $('header.adm-header').innerHeight(),
        finalHT = 0;
    $('.setting-icon').addClass('active');
    if ((winHT - headerHT) < settingHT) {
        $('.setting-list').addClass('settingScroll');
        $('.setting-list').height(winHT - headerHT);
    }
    $('.setting-list').slideDown();
}

function settingClose() {
    $('.setting-list').removeClass('settingScroll');
    $('.setting-icon').removeClass('active');
    $('.setting-list').css({
        'height': ''
    });
    $('.setting-list').slideUp();
}

function settingScroll() {
    $('header .setting .setting-list ul li a').click(function (e) {
        e.preventDefault();
        var isChecked = ($(this).siblings('.fa').hasClass('fa-check-circle')) ? 1 : 0;
        if (isChecked) {
            var HREF = $(this).attr('href'),
                headerHT = $('header').innerHeight();
            if ($(HREF).length) {
                // if(winWidth <= 1024 && winWidth > 768 ) {
                //     headerHT = headerHT - 25;
                // }
                $('html, body').animate({
                    scrollTop: ($(HREF).offset().top - headerHT + 1)
                });
            }
        } else {

        }
    });
}


function toggleChevron(e) {
    $(e.target)
        .prev('.panel-heading')
        .find("i.indicator")
        .toggleClass('down-arrow up-arrow');

    $('.setting-list').height('auto');
    var winHT = $(window).height(),
        settingHT = $('.setting-list').height(),
        headerHT = $('header.adm-header').innerHeight(),
        finalHT = 0;
    // $('.setting-icon').addClass('active');
    if ((winHT - headerHT) < settingHT) {
        $('.setting-list').addClass('settingScroll');
        $('.setting-list').height(winHT - headerHT);
        $('.setting .setting-list > .panel').css({
            'width': 'auto'
        });

    } else {
        $('.setting-list').removeClass('settingScroll');
        $('.setting-list').height('auto');
        $('.setting .setting-list > .panel').css({
            'width': '100%'
        });
    }
}

function heightAuto(item) {
    var THIS = $(item);
    THIS.height('auto');
}

function scrollable() {
    var blockWidth = $('.color-blocks .item').width() + 20;
    var countBlock = parseInt($('.color-blocks .item').length);
    var sum = blockWidth * countBlock;
    $('.color-blocks').width(sum);
}

$(document).ready(function () {

    new WOW().init();


    $('#myCollapsible').collapse({
        toggle: false
    });

    // ==================color block anchor link ==================
    $('.cost-block-wrap ').on('click', '.item', function () {
        var getTarget = $(this).attr('data-target-chart');
        var navHeight = $('header.adm-header').innerHeight();
        var targetTopPoz = $('#' + getTarget).offset().top - navHeight + 1;
        $('html,body').animate({
            scrollTop: targetTopPoz
        })
    })

    $('.logoHolder').click(function () {
        $('html,body').animate({
            scrollTop: 0
        })
    })


    // ==================Header Setting ===========================
    $('.setting-icon').click(function () {

        if ($(this).hasClass('active')) {
            settingClose()
        } else {
            settingOpen()
        }
    })

    function getNumberFromId(sectionId) {
        sectionId = $.trim(sectionId);
        sectionId = sectionId.replace(/[^\d.-]/g, '');
        return sectionId;
    }

    function getArr() {
        var costBlock = $('.cost-block .item');
        var sectionNum = [];
        costBlock.each(function () {
            var sectionId = $(this).data('target-chart');
            sectionId = $.trim(sectionId);
            sectionId = sectionId.replace(/[^\d.-]/g, '');
            sectionNum.push(sectionId);
        });
        return sectionNum;
    }

    function fuctionNear(arrayVal, singleNum) {
        var closest = arrayVal.reduce(function (prev, curr) {
            return (Math.abs(curr - singleNum) < Math.abs(prev - singleNum) ? curr : prev);
        });
        return closest;
    }

    function appendSlide(sectionId, cloneHtml) {
        var arrayID = getArr();
        var singleID = getNumberFromId(sectionId);
        var nearID = fuctionNear(arrayID, singleID);
        singleID = parseInt(singleID);
        nearID = parseInt(nearID);
        if (singleID > nearID) {
            $('.cost-block-wrap .color-blocks .item[data-target-chart="section' + nearID + '"]').after(cloneHtml).html();
        } else if (singleID < nearID) {
            $('.cost-block-wrap .color-blocks .item[data-target-chart="section' + nearID + '"]').before(cloneHtml).html();
        }
    }

    var showSettingItem = function (item, defalutValue) {
        var visibleChart = $(item).parent('li').attr('data-visible-chart');
        var idChart = $(item).parent().attr("data-visible-chart");
        if ($(item).hasClass('fa-circle-thin') || defalutValue) {
            $(item).removeClass('fa-circle-thin').addClass('fa-check-circle');
            $('#' + idChart).removeClass('visibility-hidden');
            //----------------------------------------------------------
            $('.hidden-colortiles .item').each(function (index) {
                var targetHiddenColorTile = $(this).attr('data-target-chart');
                if (targetHiddenColorTile === visibleChart) {


                    if ($('.cost-block .item').length) {
                        appendSlide(targetHiddenColorTile, $(this).clone());
                    } else {
                        $('.cost-block-wrap .color-blocks').prepend($(this).clone()).html();
                    }
                    $('.cost-block').addClass('colortile-loading');
                    $('.cost-block-wrap').animate({
                        opacity: 0
                    }, 50, function () {


                    });
                    $(this).remove().delay(1000).queue(function () {
                        equalheight('.cost-block .single-cost');
                        reloadSlider();
                        $('.cost-block-wrap').animate({
                            opacity: 1
                        }, 50);
                        $('.cost-block').removeClass('colortile-loading');
                        $(this).dequeue();
                    })


                }
            })
            //----------------------------------------------------------
        } else {
            $(item).addClass('fa-circle-thin').removeClass('fa-check-circle')
            $('#' + idChart).addClass('visibility-hidden');
            //var faRemove = $(item).addClass('fa-circle-thin');
            //var visibilityRemove = $('#' + idChart).addClass('visibility-hidden');
            //localStorage.setItem("fa", faRemove);
            //localStorage.setItem("visibility", visibilityRemove);
            //----------------------------------------------------------
            $('.cost-block-wrap .color-blocks .item').each(function (index) {
                var targetColorTile = $(this).attr('data-target-chart');
                if (targetColorTile === visibleChart) {
                    $('.hidden-colortiles').append($(this).clone()).html();
                    $('.cost-block').addClass('colortile-loading');
                    $('.cost-block-wrap').animate({
                        opacity: 0
                    }, 50);
                    $(this).remove().delay(1000).queue(function () {
                        equalheight('.cost-block .single-cost');
                        reloadSlider();
                        $('.cost-block-wrap').animate({
                            opacity: 1
                        }, 50);
                        $('.cost-block').removeClass('colortile-loading');
                        $(this).dequeue();
                    })
                }
            })
            //----------------------------------------------------------
        }
    };

    $('.setting-list li i').each(function () {
        var visibleChart = $(this).parent('li').attr('data-visible-chart');
        var value = localStorage.getItem(visibleChart);
        showSettingItem(this, value === 'true' || !value);
    });

    //Auto save the user setting into browser
    $('.setting-list li i').click(function () {
        var visibleChart = $(this).parent('li').attr('data-visible-chart');
        localStorage.setItem(visibleChart, $(this).hasClass('fa-circle-thin'))
        showSettingItem(this);
    });

    // ==================Header Scroll ===========================
    $(window).scroll(function (e) {
        var header = $('header.adm-header');
        if ($(this).scrollTop() > 0) {
            $('header').addClass("fixed");
        } else if ($(this).scrollTop() < header.height() - 1) {
            $('header').removeClass("fixed");
        }
    });


    $(window).scroll(function (event) {
        var scrollPos = $(document).scrollTop();
        $('header.adm-header .mainMenu ul.primary-menu li a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top - ($('header.adm-header').innerHeight()) <= scrollPos && refElement.position().top + ($('header.adm-header').innerHeight()) > scrollPos) {
                $('header.adm-header .mainMenu ul.primary-menu li a').removeClass("active");
                currLink.addClass("active");
            } else {
                currLink.removeClass("active");
            }
        });
    });

    // ==================Hamburger Click =============================
    $('.menu-toggle').click(function () {
        // $(this).toggleClass('open');
        if ($(this).hasClass('open')) {
            $('.mob-mainMenu').slideUp(400);
            $(this).removeClass('open');
        } else {
            $('.mob-mainMenu').slideDown(400);
            $(this).addClass('open');
        }
    })


    // ==================Menu Item Click Function =============================
    $('.mob-mainMenu ul.mob-primary-menu li a').click(function () {
        $('.mob-mainMenu').slideUp(400);
        $('.menu-toggle').removeClass('open');
    })


    // ==================Cost-Block Equal Height ===========================

    equalheight = function (container) {
        var currentTallest = 0,
            currentRowStart = 0,
            rowDivs = new Array(),
            $el,
            topPosition = 0;
        $(container).each(function () {
            $el = $(this);
            $($el).height('auto')
            topPostion = $el.position().top;
            if (currentRowStart != topPostion) {
                for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                    rowDivs[currentDiv].height(currentTallest);
                }
                rowDivs.length = 0; // empty the array
                currentRowStart = topPostion;
                currentTallest = $el.height();
                rowDivs.push($el);
            } else {
                rowDivs.push($el);
                currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
            }
            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
        });
    };
    var menuHT = $('mob-mainMenu').innerHeight();

    equalheight('.cost-block .single-cost');


    // bx slider for colored-blocks
    bx = $(".color-blocks").bxSlider({
        minSlides: 2,
        maxSlides: 5,
        slideWidth: 260,
        // touchEnabled: false,
        slideMargin: 10,
        infiniteLoop: false,
        moveSlides: 1,
        hideControlOnEnd: true,
        pager: false,
        controls: true,
        nextText: '<i class="fa fa-chevron-right" aria-hidden="true"></i>',
        prevText: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',

    });

    reloadSlider();


    // chart1 = $("#chart-1").bxSlider({
    //     captions: false,
    //     infiniteLoop: false,
    //     controls: false,
    //     pager: false,
    // });
    //
    //
    // chart2 = $("#chart-2").bxSlider({
    //     captions: false,
    //     infiniteLoop: false,
    //     controls: false,
    //     // touchEnabled: false,
    // });
    chart14 = $("#chart-14").bxSlider({
        captions: false,
        infiniteLoop: false,
        controls: false,
        // touchEnabled: false,
    });

    chart15 = $("#chart-15").bxSlider({
        captions: false,
        infiniteLoop: false,
        controls: false

    });

    chart18 = $("#chart-18").bxSlider({
        captions: false,
        infiniteLoop: false,
        controls: false,
        // touchEnabled: false,
    });
    //
    // chart17 = $("#chart-17").bxSlider({
    //     captions: false,
    //     infiniteLoop: false,
    //     controls: false
    // });


    //fn_chart1();
    //fn_chart2();
    fn_chart14();
    fn_chart15();
    fn_chart18();
    //fn_chart17();


    // ==================   GOTO TOP===========================
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.gotoTop').fadeIn();
        } else {
            $('.gotoTop').fadeOut();
        }
    });

    $('.gotoTop, .toplogo').click(function (e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });
    gototop();

    // ==================   SETTING HEIGHT ===========================

    settingScroll()


    $('.setting .setting-list').on('hidden.bs.collapse', toggleChevron);
    $('.setting .setting-list').on('shown.bs.collapse', toggleChevron);


    $('.setting-list li i').each(function () {
        var visibleChart = $(this).parent('li').attr('data-visible-chart');
        var idChart = $(this).parent().attr("data-visible-chart");
        if ($(this).hasClass('fa-circle-thin')) {
            $('.cost-block-wrap .color-blocks .item').each(function (index) {
                var targetColorTile = $(this).attr('data-target-chart');
                if (targetColorTile === visibleChart) {
                    $('.hidden-colortiles').append($(this).clone()).html();
                    $('.cost-block').addClass('colortile-loading');
                    $('.cost-block-wrap').animate({
                        opacity: 0
                    }, 50);
                    $(this).remove().delay(1000).queue(function () {
                        reloadSlider();
                        $('.cost-block-wrap').animate({
                            opacity: 1
                        }, 50);
                        $('.cost-block').removeClass('colortile-loading');
                        $(this).dequeue();
                    })
                }
            })
            //----------------------------------------------------------
        }
    })



});
// end of document ready

// ==================   window resize===========================
var width = $(window).width();
$(window).resize(function () {
    if ($(this).width() != width) {
        settingClose();
        reloadSlider();
        //fn_chart1();
        //fn_chart2();
        fn_chart14();
        fn_chart15();
        fn_chart18();
        //fn_chart17();
        // fn_chart4();
        //$("#chart17").resize();
        //$("#chart15").resize();
        // chart15.reloadShow();
        // chart17.reloadShow();
    }
    width = $(window).width();
    width += 1;

});

$(window).load(function () {
    equalheight('.cost-block .single-cost');
})

$(window).resize(function () {
    // ==================Cost-Block Equal Height ===========================
    equalheight('.cost-block .single-cost');
    // $(window).resizeBy(100, 100);
});

// end of window resize


//Benchmark click button
//$(".excIn").click(function () {
//  $("#chart15").show();
//  $("#chart17").hide();
//});
//
//$(".excEx").click(function () {
//  $("#chart17").show();
//  $("#chart15").hide();
//  
//});

$(".incIn").css({pointerEvents: "none"});

$(".incIn").click(function () {
    $(this).addClass("active incPres").css({pointerEvents: "none"});
    $(".incEx").removeClass("active incPres").css({pointerEvents: ""});
    var numnber = chart17.getCurrentSlide();

    $("#chart17").hide();
    $("#chart15").show().trigger("reloadSlider").trigger("resize");
    chart15.goToSlide(numnber, "now");

});

$(".incEx").click(function () {
    $(".incIn").removeClass("active incPres").css({pointerEvents: ""});
    $(this).addClass("active incPres").css({pointerEvents: "none"});
    var numnber = chart15.getCurrentSlide();

    $("#chart15").hide();
    $("#chart17").show().trigger("reloadSlider").trigger("resize");
    chart17.goToSlide(numnber, "now");
});


$(".wauinc").click(function () {
    $("#chart18").show();
    $("#chart19").hide();
    $("#chart-5").show();
    $("#chart-6").hide();
    $(this).addClass("active wauPressed");
    $(".wauexc").removeClass("active wauPressed");
});

$(".wauexc").click(function () {
    $("#chart19").show();
    $("#chart18").hide();
    $("#chart-6").show();
    $("#chart-5").hide();
    $(this).addClass("active wauPressed");
    $(".wauinc").removeClass("active wauPressed");
});

