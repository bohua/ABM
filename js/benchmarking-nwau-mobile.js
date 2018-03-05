define([
    "text!/extensions/ABM/template/mobile/single-view-mobile.html",
    "/extensions/ABM/js/chart-obj-mapping.js"
], function (template, chartObjMap) {
    return {
        template: function () {
            return template;
        },

        render: function (app) {
            var selState = app.selectionState(),
                benYear = app.field("Benchmark Year").getData();

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

            $("#benchmark-filter ul").click(function (e) {
                var a = $(e.target);

                if (!a.parent("li").hasClass("disabled")) {
                    $(".benchmark-current-year").text(a.text());
                    benYear.select([a.data("id")], false, true);
                }
            });

            selState.OnData.bind(function(){
                benYear.getData();
            });

            $("#benchmark-filter").show();

            app.visualization.get(chartObjMap["BenNWAU"]).then(function (vis) {
                //Ready for rendering chart
                vis.setOptions({showTitles:true});
                vis.show("first-chart");
            });

        }
    };
});
