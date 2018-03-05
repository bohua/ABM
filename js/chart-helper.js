define([], function () {
    var isPortrait = function () {
        return $(window).height() > $(window).width();
    };

    return {
        Qlik2Lhd: function (cube) {
            return $(cube).map(function (index, value) {
                return {
                    "LHD": value[0].qText,
                    "Value": value[1].qText.replace("%", "") / 1
                };
            });

        },

        isPortrait: isPortrait,

        resizeChart: function resizeChart(c) {
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

            c.setSize(w, chartHeight, false);

            //$('.orientation-message').css('top', window.innerHeight * 0.9);
        },

        getUserAccess: function (app) {
            var dfd = new $.Deferred();

            var myField = app.field("LHD_ACCESS");

            myField.OnData.bind(function () {
                if (myField.rowCount === 1) {
                    dfd.resolve('USER');
                    return;
                }

                dfd.resolve('ADMIN');
            });

            myField.getData();

            return dfd.promise();
        },

        showChart: function(app, chart, container, chartsCache){
        if(!chartsCache[chart]){
            app.visualization.get(chart).then(function (vis) {
                vis.setOptions({showTitles:true});
                vis.show(container);

                chartsCache[chart] = vis;
            });
        }else{
            chartsCache[chart].show(container);
        }
    }

    };
});
