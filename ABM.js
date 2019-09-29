/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var appId = "Portal on the Go WIP Limit"; //In server version, get the hashed app id from QMC
var visCache = {};
var prefix = window.location.pathname.substr(0, window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1);
var config = {
    host: window.location.hostname,
    prefix: prefix,
    port: window.location.port,
    isSecure: window.location.protocol === "https:"
};

require.config({
    baseUrl: (config.isSecure ? "https://" : "http://") + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
});

require([
    "js/qlik",
    "../extensions/ABM/js/chart-obj-mapping",
    "../extensions/ABM/charts/activity-sydney-map",
    "../extensions/ABM/charts/activity-nsw-map",
    "../extensions/ABM/charts/budget-sydney-map",
    "../extensions/ABM/charts/budget-nsw-map"
], function (qlik,
             chartObjMap,
             activitySydneyMap,
             activityNswMap,
             budgetSydneyMap,
             budgetNswMap
) {
    function popError(error) {
        $('#popupText').text(error.message + "<br>");
        $('#popup').fadeIn(1000);
    }

    qlik.setOnError(popError);
    $("#closePopup").click(function () {
        $('#popup').hide();
    });

    //callbacks -- inserted here --
    //open apps -- inserted here --
    var app = qlik.openApp(appId, config),
        userAccess = getUserAccess(),
        selState = app.selectionState();


    //Version info
    app.visualization.get(chartObjMap["VersionInfo"]).then(function (vis) {
        $("#last-updated").text(vis.model.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText);
    });

    //Benchmarking Filter
    var benYear = app.field("Benchmark Year").getData();
    benYear.OnData.bind(function () {
        var select = $("#benchmark-filter ul");
        select.empty();

        benYear.rows.forEach(function (row) {
            var option = $("<li><a data-id='" + row.qElemNumber + "'>" + row.qText + "</a></li>");
            if (row.qState === 'S' || row.qState === 'L') {
                $(".benchmark-current-year").text(row.qText);
                option.addClass("disabled");
            }

            select.append(option);
        });
    });

    app.variable.getContent("vBenchmarkDefaultSelection", function (model) {
        if (model && model.qContent) {
            benYear.selectValues([model.qContent.qString], false, true);
            app.field('Benchmark Year').lock();
        } else {
            popError('Failed to get initial selection from variables');
        }
    });

    //$($("#benchmark-filter ul li")[1]).addClass("disabled");

    $("#benchmark-filter ul").click(function (e) {
        var a = $(e.target);

        if (!a.parent("li").hasClass("disabled")) {
            $(".benchmark-current-year").text(a.text());
            benYear.select([a.data("id")], false, true);
        }
    });

    //get objects -- inserted here --
    userAccess.then(function (access) {
        var ok = access && (access === 'USER' || access === 'ADMIN');

        if (!ok) {
            popError("User access is not defined");
            return;
        }

        initTiles();
        selState.OnData.bind(refreshData);

        //******************************************************
        //State Section
        //State Refresh
        app.visualization.get(chartObjMap["StateRefresh"]).then(function (vis) {
            $("#state-refresh").text("Refreshed: " + vis.model.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText);
            vis.close();
        });

        //State Chart
        app.visualization.get(chartObjMap["StateChart"]).then(function (vis) {
            $("#state-subtitle").text(vis.model.layout.title);
            vis.setOptions({showTitles:false});
            vis.show("chart2-0");
        });

        //State Table
        app.visualization.get(chartObjMap["StateTable"]).then(function (vis) {
            vis.setOptions({showTitles:false});
            vis.show("chart2-1");
        });

        //******************************************************
        //Benchmarking Section

        //Benchmarking Charts
        var chart15_0 = chartObjMap["BenNWAU"];

        app.visualization.get(chart15_0).then(function (vis) {
            vis.setOptions({showTitles:false});
            vis.show("chart15-0");
            visCache["TileBenchmarkNWAU"] = vis;
            $("#benchmark-nwau .ben-subtitle").replaceWith("<p class='ben-subtitle'>" + vis.model.layout.title + "</p>");
        });


        //Benchmarking Refreshed
        app.visualization.get(chartObjMap["BenRefresh"]).then(function (vis) {
            $("#benchmark-refresh").text("Refreshed: " + vis.model.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText);
            vis.close();
        });


        //******************************************************
        //Budget Performance Section

        //Budget Performance Refresh
        app.visualization.get(chartObjMap["BudRefresh"]).then(function (vis) {
            $("#budget-refresh").text("Refreshed: " + vis.model.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText);
            vis.close();
        });


        //Budget Performance Table
        app.visualization.get(chartObjMap["BudTable"]).then(function (vis) {
            $(".budget-performance-table .budget-title").text(vis.model.layout.title);
            vis.setOptions({showTitles:false});
            vis.show("chart-4");
        });

        //Budget Performance Map
        app.visualization.get(chartObjMap["BudMap"]).then(function (vis) {
            $("#budget-subtitle").text(vis.model.layout.title);
            budgetSydneyMap.getData(vis.model.layout.qHyperCube.qDataPages[0].qMatrix);
            budgetNswMap.getData(vis.model.layout.qHyperCube.qDataPages[0].qMatrix);

            vis.close();
        });

        //******************************************************
        //Activity Performance Section
        var percentageTable;
        var hashtagTable;
        if (access === 'USER') {
            percentageTable = chartObjMap["ApPercentageTableLimit"];
            hashtagTable = chartObjMap["ApHashtagTableLimit"];
        } else if (access === 'ADMIN') {
            percentageTable = chartObjMap["ApPercentageTable"];
            hashtagTable = chartObjMap["ApHashtagTable"];
        }

        //Activity Performance Refresh
        app.visualization.get(chartObjMap["ApRefresh"]).then(function (vis) {
            $("#abf-refresh").text("Refreshed: " + vis.model.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText);
            vis.close();
        });

        //Activity Performance Map
        app.visualization.get(chartObjMap["ApMap"]).then(function (vis) {
            $("#activity-subtitle").text(vis.model.layout.title);
            activitySydneyMap.getData(vis.model.layout.qHyperCube.qDataPages[0].qMatrix);
            activityNswMap.getData(vis.model.layout.qHyperCube.qDataPages[0].qMatrix);

            vis.close();
        });

        //Activity Performance Table
        app.visualization.get(percentageTable).then(function (percentage) {
            percentage.setOptions({showTitles:false});
            percentage.show("chart-3");
            $('.abf-target-table .table-heading p').text(percentage.model.layout.title);

            app.visualization.get(hashtagTable).then(function (hashtag) {
                hashtag.setOptions({showTitles:false});

                $('.table-title-icons>span').bind('click', function () {
                    var THIS = $(this),
                        dataTable = THIS.attr('data-table');
                    if (!THIS.hasClass('active')) {
                        THIS.siblings().removeClass('active');
                        THIS.addClass('active');

                        eval(dataTable + ".show('chart-3')");

                        eval("$('.abf-target-table .table-heading p').text(" + dataTable + ".model.layout.title)");
                    }
                })
            });
        });


        //******************************************************
        //RQ Score Section
        var chart13 = chartObjMap["RqChart"];
        //RQ Score Refresh
        app.visualization.get(chartObjMap["RqRefresh"]).then(function (vis) {
            $("#rq-refresh").text("Refreshed: " + vis.model.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText);
        });

        //RQ Score Chart
        app.visualization.get(chart13).then(function (vis) {
            $("#rq-subtitle").text(vis.model.layout.title);
            vis.setOptions({showTitles:false});
            vis.show("chart13-0");
        });

        //******************************************************
        //WAU Section
        var chart18_0;
        var chart18_1;
        var chart6;
        if (access === 'USER') {
            chart18_0 = chartObjMap["WauAvgCostLimit"];
            chart18_1 = chartObjMap["WauTotalLimit"];
            chart6 = chartObjMap["WauStatsLimit"];
        } else if (access === 'ADMIN') {
            chart18_0 = chartObjMap["WauAvgCost"];
            chart18_1 = chartObjMap["WauTotal"];
            chart6 = chartObjMap["WauStats"];
        }

        //WAU Refresh
        app.visualization.get(chartObjMap["WauRefresh"]).then(function (vis) {
            $("#wau-refresh").text("Refreshed: " + vis.model.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText);
            vis.close();
        });

        //WAU Charts
        app.visualization.get(chart18_0).then(function (vis1) {
            vis1.setOptions({showTitles:false});
            vis1.show("chart18-0");
            visCache["TileWauAvgCost"] = vis1;
            $("#section18 .wau-subtitle").replaceWith("<p class='wau-subtitle'>" + vis1.model.layout.title + "</p>");

            app.visualization.get(chart18_1).then(function (vis2) {
                vis2.setOptions({showTitles:false});
                visCache["TileWauTotal"] = vis2;
            });
        });

        //WAU Table
        app.visualization.get(chart6).then(function (vis) {
            vis.setOptions({showTitles:false});
            vis.show("chart-6");
        });

        //******************************************************
        //SNAP Section
        var chart14_0;
        var chart14_1;
        if (access === 'USER') {
            chart14_0 = chartObjMap["SnapUngroupedLimit"];
            chart14_1 = chartObjMap["SnapEpisodesLimit"];
        } else if (access === 'ADMIN') {
            chart14_0 = chartObjMap["SnapUngrouped"];
            chart14_1 = chartObjMap["SnapEpisodes"];
        }

        //SNAP Refresh
        app.visualization.get(chartObjMap["SnapRefresh"]).then(function (vis) {
            $("#snap-refresh").text("Refreshed: " + vis.model.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText);
            vis.close();
        });

        //SNAP Charts
        app.visualization.get(chart14_0).then(function (vis1) {
            vis1.setOptions({showTitles:false});
            vis1.show("chart14-0");
            visCache["TileSnapUngrouped"] = vis1;

            app.visualization.get(chart14_1).then(function (vis2) {
                vis2.setOptions({showTitles:false});
                visCache["TileSnapEpisodes"] = vis2;
            });
        });

    });


    //create cubes and lists -- inserted here --

    //Help functions

    $('.resetbtn.reset-zoom').click(function () {
        app.clearAll();
    });

    $(document)
        .bind('sliderSlide',
            function (e, id, slider, active) {

                var hoverChartIndex = active.index;
                var tile = '';

                if (id === "chart-15" || id === "chart-17") {
                    if (hoverChartIndex === 0) {
                        tile = visCache["TileBenchmarkNWAU"];

                        $(".ben-subtitle")
                            .replaceWith("<p class='ben-subtitle'>" + tile.model.layout.title + "</p>");

                        tile.show("chart15-0");
                        // $("#chart15-1").empty();
                        // $("#chart15-2").empty();
                    }
                    if (hoverChartIndex === 1) {
                        tile = visCache["TileBenchmarkEnct"];
                        if (!tile) {
                            app.visualization.get(chartObjMap["BenEnct"]).then(function (vis) {
                                visCache["TileBenchmarkEnct"] = vis;

                                $(".ben-subtitle")
                                    .replaceWith("<p class='ben-subtitle'>" + vis.model.layout.title + "</p>");

                                vis.setOptions({showTitles:false});
                                vis.show("chart15-1");
                                // $("#chart15-0").empty();
                                // $("#chart15-2").empty();
                            });
                            return;
                        }

                        $(".ben-subtitle")
                            .replaceWith("<p class='ben-subtitle'>" + tile.model.layout.title + "</p>");

                        tile.show("chart15-1");
                        // $("#chart15-0").empty();
                        // $("#chart15-2").empty();

                    }
                    if (hoverChartIndex === 2) {
                        tile = visCache["TileBenchmarkAlos"];

                        if (!tile) {
                            app.visualization.get(chartObjMap["BenAlos"]).then(function (vis) {
                                visCache["TileBenchmarkAlos"] = vis;

                                $(".ben-subtitle")
                                    .replaceWith("<p class='ben-subtitle'>" + vis.model.layout.title + "</p>");

                                vis.setOptions({showTitles:false});
                                vis.show("chart15-2");
                                // $("#chart15-0").empty();
                                // $("#chart15-1").empty();
                            });
                            return;
                        }

                        $(".ben-subtitle")
                            .replaceWith("<p class='ben-subtitle'>" + tile.model.layout.title + "</p>");

                        tile.show("chart15-2");
                        // $("#chart15-0").empty();
                        // $("#chart15-1").empty();
                    }
                }
                if (id === "chart-14") {
                    if (hoverChartIndex === 0) {
                        tile = visCache["TileSnapUngrouped"];
                        $(".snap-subtitle")
                            .replaceWith("<p class='snap-subtitle'>" + tile.model.layout.title + "</p>");


                        if (tile) tile.show("chart14-0");
                        $("#chart14-1").empty();
                    }
                    if (hoverChartIndex === 1) {
                        tile = visCache["TileSnapEpisodes"];
                        $(".snap-subtitle")
                            .replaceWith("<p class='snap-subtitle'>" + tile.model.layout.title + "</p>");


                        tile.show("chart14-1");
                        $("#chart14-0").empty();
                    }
                }
                if (id === "chart-18") {
                    if (hoverChartIndex === 0) {
                        tile = visCache["TileWauAvgCost"];
                        $(".wau-subtitle")
                            .replaceWith("<p class='wau-subtitle'>" + tile.model.layout.title + "</p>");

                        tile = visCache["TileWauAvgCost"];
                        if (tile) tile.show("chart18-0");
                        $("#chart18-1").empty();
                    }
                    if (hoverChartIndex === 1) {
                        tile = visCache["TileWauTotal"];
                        $(".wau-subtitle")
                            .replaceWith("<p class='wau-subtitle'>" + tile.model.layout.title + "</p>");

                        tile.show("chart18-1");
                        $("#chart18-0").empty();
                    }
                }
            });

    function getUserAccess() {
        var dfd = new $.Deferred();

        var myField = app.field("LHD_ACCESS");
        //console.log(myField);

        myField.OnData.bind(function () {
            if (myField.rowCount === 1) {
                dfd.resolve('USER');
                return;
            }

            dfd.resolve('ADMIN');
        });

        myField.getData();

        return dfd.promise();
    }

    function renderTile(container, tileName){
        var dfd = new $.Deferred();

        app.visualization.get(chartObjMap[tileName]).then(function (vis) {
            var val = vis.model.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qNum;

            if(tileName == 'BudTile'){
                if(val <=0){
                    container.find('.qs-arrow').addClass('fa-arrow-circle-up');
                }else{
                    container.find('.qs-arrow').addClass('fa-arrow-circle-down');
                }
            }

            if(tileName == 'ApTile'){
                if(val <=0.01 && val >=-0.01){
                    container.find('.qs-arrow').addClass('fa-arrow-circle-up');
                }else{
                    container.find('.qs-arrow').addClass('fa-arrow-circle-down');
                }
            }

            container.find('.qs-subtitle').text(vis.model.layout.title);
            container.find('.qs-year').text(vis.model.layout.subtitle);
            container.find('.qs-value').text(vis.model.layout.qHyperCube.qDataPages[0].qMatrix[0][0].qText);

            vis.close();
            dfd.resolve();
        });

        return dfd.promise();
    }

    function initTiles() {
        var queue = [];

        queue.push(renderTile($("#tile-benchmark"), "BenTile"));
        queue.push(renderTile($("#tile-budget"), "BudTile"));
        queue.push(renderTile($("#tile-target"), "ApTile"));
        queue.push(renderTile($("#tile-rqscore"), "RqTile"));
        queue.push(renderTile($("#tile-wau"), "WauTile"));
        queue.push(renderTile($("#tile-snap"), "SnapTile"));
        queue.push(renderTile($("#tile-stateprice"), "StateTile"));


        $.when.apply($, queue).then(function () {
            reloadSlider();
            $(".cost-block .bx-loading").remove();
            setTimeout(
                function(){
                    width += 1;
                    $(window).trigger('resize');
                    reloadSlider();
                }, 500);
        });
    }

    function refreshData() {
        //Benchmarking Title
        var benIndex = chart15.getCurrentSlide(),
            currentBenChart;

        if (benIndex === 0) {
            currentBenChart = chartObjMap["BenNWAU"];
        } else if (benIndex === 1) {
            currentBenChart = chartObjMap["BenEnct"];
        } else {
            currentBenChart = chartObjMap["BenAlos"];
        }

        app.getObjectProperties(currentBenChart).then(function (model) {
            $("#benchmark-nwau .ben-subtitle").replaceWith("<p class='ben-subtitle'>" + model.layout.title + "</p>");
        });

        benYear.getData();

        //reloadSlider();
        //$(".cost-block .bx-loading").remove();
        //setTimeout(function(){$(window).trigger('resize')});
    }
});
