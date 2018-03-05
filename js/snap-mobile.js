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

            chartHelper.getUserAccess(app).then(function (access) {
                var ok = access && (access === 'USER' || access === 'ADMIN');

                if (!ok) {
                    //popError("User access is not defined");
                    return;
                }

                var chart1;
                var chart2;

                if (access === 'USER') {
                    chart1 = chartObjMap["SnapUngroupedLimit"];
                    chart2 = chartObjMap["SnapEpisodesLimit"];

                } else if (access === 'ADMIN') {
                    chart1 = chartObjMap["SnapUngrouped"];
                    chart2 = chartObjMap["SnapEpisodes"];
                }

                var pageButtons = $("#sub-viewport .view-header .button");
                $("#first-btn").text("Ungrouped Eps");
                $("#second-btn").text("Eps without error");

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
            });

        }
    };
});
