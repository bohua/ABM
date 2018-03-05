define([
    "text!/extensions/ABM/template/mobile/budget-mobile.html",
    "/extensions/ABM/charts/mobile-charts-map.js",
    "/extensions/ABM/charts/mobile-charts-budget.js",
    "/extensions/ABM/js/chart-obj-mapping.js",
    "/extensions/ABM/js/chart-helper.js"
], function (template, Map, BudgetCharts, chartObjMap, chartHelper) {
    var chartCache = [];

    return {
        template: function () {
            return template;
        },

        render: function (app) {
            Map.init();

            app.visualization.get(chartObjMap["BudMap"]).then(function (vis) {
                BudgetCharts.getData(vis.model.layout.qHyperCube.qDataPages[0].qMatrix, Map);
            });

            var pageButtons = $("#sub-viewport .view-header .button")
            pageButtons.click(function () {
                pageButtons.removeClass("selected");
                $(this).addClass("selected");

                if ($(this).attr("id") === 'mapnswbtn') {
                    $("#perc").hide();
                    $("#mapnsw").show();
                    $("#mapsyd").show();

                } else if ($(this).attr("id") === 'percbtn') {
                    $("#mapnsw").hide();
                    $("#mapsyd").hide();
                    $("#perc").show();

                    chartHelper.showChart(app, chartObjMap["BudTable"], "third-chart", chartCache);
                }
            });
        }
    };
});
