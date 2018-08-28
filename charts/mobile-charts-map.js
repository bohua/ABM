define([], function () {
    function toggleMap(syd) {
        Highcharts.each(Highcharts.charts, resizeChart);
    }

    function mapformatter(key, image) {
        return ('<span class="map-label"><span class="map-label-name">' + key + '</span><img class="map-label-img" src="images/' + image + '" width="25"></span>');
    }

    function isPortrait() {
        return $(window).height() > $(window).width();
    }


    // override default resizeChart behaviour for maps
    function resizeChart(c) {
        var chartHeight;

        var w = window.innerWidth;
        var h = window.innerHeight - 60;

        chartHeight = h;

        if (w > h) {
            w = w * 0.73;
        } else {
            if (c.index === 1) {
                chartHeight = w + 45;
            }
            else
                chartHeight = w;
            h = w;
        }

        //var btn = localStorage.getItem(uniqueid('header-button'));
        //if (!btn || btn == 'mapnswbtn') { //initially load table, set height of table taller, otherwise set height to map height
        $('div.body').height(h + 60);

        if (!isPortrait())
            $('.nsw-map-title').css('display', 'none');
        else
            $('.nsw-map-title').css('display', 'block');
        //}

        c.setSize(w,chartHeight , false);

        //$('.orientation-message').css('top', window.innerHeight * 0.9);
    }

    function showHideSeries(idx, specialCls) {
        Highcharts.each(Highcharts.charts, function (c) {
            var series = c.series[idx];
            if (series.visible) {
                series.hide();
                $('.' + specialCls + '1').hide();
                $('.' + specialCls + '2').hide();
            }
            else {
                series.show();
                $('.' + specialCls + '1').show();
                $('.' + specialCls + '2').show();
            }
        });
        return false;
    };

    return {
        init: function (cube) {
            $('.mapsydftrbtn').click(function () {
                toggleMap(true);
            });
            $('.mapnswftrbtn').click(function () {
                toggleMap(false);
            });

            $('.chart-list-controls button').click(function () {
                var visible = $(this).attr('id') === 'mapnswbtn';
                $('#mapsyd, .mapnswftrbtn').css('display', visible ? 'block' : 'none');
                $('#mapnsw, .mapsydftrbtn').css('display', visible ? 'block' : 'none');

                //$('.title-container').css('display', !visible ? 'block' : 'none');

                resizeMapBody(visible);

                if (visible) {
                    Highcharts.each(Highcharts.charts, resizeChart);
                }
            });


            /*=========================================*/
            $(".map-legend-green").click(function () {
                return showHideSeries(1, 'green');
            });

            $(".map-legend-yellow").click(function () {
                return showHideSeries(2, 'yellow');
            });

            $(".map-legend-red").click(function () {
                return showHideSeries(3, 'red');
            });
        },

        resizeChart : resizeChart,

        mapformatter: mapformatter
    };
});