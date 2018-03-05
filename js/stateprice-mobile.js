define([
    "text!/extensions/ABM/template/mobile/multi-view-mobile.html",
    "/extensions/ABM/js/chart-obj-mapping.js",
    "/extensions/ABM/js/chart-helper.js"
], function (template, chartObjMap, chartHelper) {
    var chartCache = [];

    return {
        template: function () {
            return template;
        },

        render: function (app) {

            var chart1 = chartObjMap["StateChart"],
                chart2 = chartObjMap["StateTable"];

            var pageButtons = $("#sub-viewport .view-header .button");
            $("#first-btn").text("Price Trend");
            $("#second-btn").text("State Price");

            pageButtons.click(function(){
                pageButtons.removeClass("selected");
                $(this).addClass("selected");

                if($(this).attr("id") === "first-btn"){
                    $("#second-page").hide();
                    $("#first-page").show();

                    chartHelper.showChart(app, chart1, "first-chart", chartCache);

                } else if($(this).attr("id") === "second-btn"){
                    $("#first-page").hide();
                    $("#second-page").show();

                    chartHelper.showChart(app, chart2, "second-chart", chartCache);
                }
            });

            chartHelper.showChart(app, chart1, "first-chart", chartCache);
        }
    };
});
