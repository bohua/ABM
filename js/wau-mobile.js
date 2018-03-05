define([
    "text!/extensions/ABM/template/mobile/single-view-mobile.html",
    "/extensions/ABM/js/chart-obj-mapping.js",
    "/extensions/ABM/js/chart-helper.js"
], function (template, chartObjMap, chartHelper) {

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

                var chart;
                if (access === 'USER') {
                    chart = chartObjMap["WauAvgCostLimit"];

                } else if (access === 'ADMIN') {
                    chart = chartObjMap["WauAvgCost"];
                }

                app.visualization.get(chart).then(function (vis) {
                    //Ready for rendering chart
                    vis.setOptions({showTitles:true});
                    vis.show("first-chart");
                });
            });

        }
    };
});
