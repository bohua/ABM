define([
    "text!/extensions/ABM/template/mobile/abm-mobile.html",
    "/extensions/ABM/charts/mobile-charts-map.js",
    "/extensions/ABM/charts/mobile-charts-abm.js",
    "/extensions/ABM/js/chart-obj-mapping.js",
    "/extensions/ABM/js/chart-helper.js"
], function (template, Map, BudgetCharts, chartObjMap, chartHelper) {
    var chartCache= [];

    return {
        template: function () {
            return template;
        },

        render: function (app) {
            Map.init();

            app.visualization.get(chartObjMap["ApMap"]).then(function (vis) {
                BudgetCharts.getData(vis.model.layout.qHyperCube.qDataPages[0].qMatrix, Map);
            });

            chartHelper.getUserAccess(app).then(function (access) {
                var ok = access && (access === 'USER' || access === 'ADMIN');

                if (!ok) {
                    //popError("User access is not defined");
                    return;
                }

                var percentageTable;
                var hashtagTable;

                if (access === 'USER') {
                    percentageTable = chartObjMap["ApPercentageTableLimit"];
                    hashtagTable = chartObjMap["ApHashtagTableLimit"];

                } else if (access === 'ADMIN') {
                    percentageTable = chartObjMap["ApPercentageTable"];
                    hashtagTable = chartObjMap["ApHashtagTable"];
                }

                var pageButtons = $("#sub-viewport .view-header .button")
                pageButtons.click(function () {
                    pageButtons.removeClass("selected");
                    $(this).addClass("selected");

                    if ($(this).attr("id") === 'mapnswbtn') {
                        $("#perc").hide();
                        $("#hash").hide();
                        $("#mapnsw").show();
                        $("#mapsyd").show();

                    } else if ($(this).attr("id") === 'percbtn') {
                        $("#mapnsw").hide();
                        $("#mapsyd").hide();
                        $("#hash").hide();
                        $("#perc").show();

                        chartHelper.showChart(app, percentageTable, "third-chart", chartCache);

                    } else if ($(this).attr("id") === 'hashbtn') {
                        $("#mapnsw").hide();
                        $("#mapsyd").hide();
                        $("#perc").hide();
                        $("#hash").show();


                        chartHelper.showChart(app, hashtagTable, "forth-chart", chartCache);
                    }
                });
            });
        }
    };
});
