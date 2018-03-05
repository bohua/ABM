define([
    "text!/extensions/ABM/template/mobile/single-view-mobile.html",
    "/extensions/ABM/js/chart-obj-mapping.js"
], function (template, chartObjMap) {
    return {
        template: function () {
            return template;
        },

        render: function (app) {
            app.visualization.get(chartObjMap["RqChart"]).then(function (vis) {
                //Ready for rendering chart
                vis.setOptions({showTitles:true});
                vis.show("first-chart");
            });

        }
    };
});
