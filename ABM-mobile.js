var appId = "224431b8-d826-459d-83ed-bfb1aba36579"; //In server version, get the hashed app id from QMC
var tiles = {};
var prefix = window.location.pathname.substr(0, window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1);
var config = {
    host: window.location.hostname,
    prefix: prefix,
    port: window.location.port,
    isSecure: window.location.protocol === "https:"
};

var openChart;

require.config({
    baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
});

require([
    "js/qlik",
    "../extensions/ABM/js/chart-obj-mapping"
], function (qlik, chartObjMap) {
    //Trick to hide address bar in Chrome Mobile
    window.scrollTo(0,1);

    //callbacks -- inserted here --
    function popError(error) {
        $('#popupText').text(error.message);
        $('#popup').fadeIn(1000);
    }

    qlik.setOnError(popError);
    $("#closePopup").click(function () {
        $('#popup').hide();
    });

    //open apps
    var app = qlik.openApp(appId, config);
    var selState = app.selectionState();

    //Trick to align with old main-mobile=>OpenChart function
    openChart = function(chart) {
        settingClose();
        require(["../extensions/ABM/js/" + chart], function (controller) {
            $("#sub-viewport").html(controller.template()).animate({"left": 0, "opacity": 1}, function () {
                $("#content-panel .adm-header").animate({"top": "-70px", "opacity": 0}, function () {

                    controller.render(app);

                    $("#clearbtn").show().click(function () {
                        app.clearAll();
                    });

                    //Set return buttopn
                    $("#resetbtn").show().click(function () {

                        $("#sub-viewport").animate({"left": "-200vh", "opacity": 0}, function () {
                            $("#content-panel .adm-header").animate({"top": 0, "opacity": 1});
                        }).empty();

                        ToggleLoading(false);
                        $("body").css("overflow", "auto");
                    });
                });
            });
        }, function (error) {
            popError(error);

            ToggleLoading(false);
            $("body").css("overflow", "auto");
        });
    };

    var listener = function () {
        selState.OnData.unbind(listener);

        //Get Tiles
        initTiles();

        $(document).on('click', '[data-target-chart]', callSubViewport(app, 'target-chart'));
    };
    selState.OnData.bind(listener);

    initSelection(app);


    //Helper functions
    function callSubViewport(app, dataTag) {
        return function(){
            ToggleLoading(true);
            $("body").css("overflow", "hidden");
            var module = $(this).data(dataTag);

            if (!module) {
                ToggleLoading(false);
                $('#popupText').text("Error: No chart found!");
                $('#popup').fadeIn(1000);

                return;
            }

            openChart(module);
        }
    }

    function renderTile(container, tileName) {
        var dfd = new $.Deferred();

        app.visualization.get(chartObjMap[tileName]).then(function (vis) {
            container.find('.qs-subtitle').text(vis.model.layout.title);
            container.find('.qs-year').text(vis.model.layout.subtitle);
            container.find('.qs-value').text(vis.model.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText);

            vis.close();
            dfd.resolve();
        });

        return dfd.promise();
    }

    function initTiles() {
        //ToggleLoading(true);
        var queue = [];

        queue.push(renderTile($("#tile-benchmark-nwau"), "BenTile"));
        queue.push(renderTile($("#tile-benchmark-enct"), "BenTile-enct"));
        queue.push(renderTile($("#tile-benchmark-alos"), "BenTile-alos"));
        queue.push(renderTile($("#tile-budget"), "BudTile"));
        queue.push(renderTile($("#tile-target"), "ApTile"));
        queue.push(renderTile($("#tile-rqscore"), "RqTile"));
        queue.push(renderTile($("#tile-wau"), "WauTile"));
        queue.push(renderTile($("#tile-wau-stats"), "WauTileStats"));
        queue.push(renderTile($("#tile-wau-total"), "WauTileTotal"));
        queue.push(renderTile($("#tile-snap"), "SnapTile"));
        queue.push(renderTile($("#tile-stateprice"), "StateTile"));
        queue.push(renderTile($("#tile-fte"), "FteTile"));


        $.when.apply($, queue).then(function () {
            ToggleLoading(false);
        });
    }

    function initSelection(app) {
        app.variable.getContent("vBenchmarkDefaultSelection", function (model) {
            if (model && model.qContent) {
                app.field("Benchmark Year").selectValues([model.qContent.qString], false, true);
                app.field('Benchmark Year').lock();
            } else {
                popError('Failed to get initial selection from variables');
            }
        });
    }
});