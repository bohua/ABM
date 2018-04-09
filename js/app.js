var tiles;
window['userSettings'] = null;

/**
 * ETP - Emergency Treatment Performance
 * ESAP - Elective Surgery Access Performance
 * Target - ABF Targets
 * Budget- Budget Performance
 * RQScore - RQ Score
 * SNAP - SNAP Ungrouped
 * Benchmark - Benchmarking
 */

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getTiles(cb) {
  $.get("srv/tiles",
    function (data) {
      if (typeof data === "string") {
        //location.href = "index.html";
      } else {
        tiles = data;
        cb.call(data);
      }
    }).fail(function (e) {
      //location.href = "index.html";
      console.log(e);      
  });
}

function getData(type, cb) {
  var getDataImpl = function(c) {
    $.get("srv/entity/" + type, c);
  };
  if (!tiles) {
    getTiles(function() {
      getDataImpl.call(type, cb);
    });
  } else {
    getDataImpl.call(type, cb);
  }
}

function getTargets(cb) {
  $.get("srv/targets",
    function(data) {
      cb(data);
    });


}

function getBudgets(cb) {
  $.get("srv/budgets",
    function(data) {
      cb(data);

    });
}

function getWauapp(cb) {
  $.get("srv/wauapp",
    function (data) {
      cb(data);
    });
}


function getVersion() {
  $.get("srv/version", 
    function(data) {
      $("#last-updated").html(data);
    });
}

function getUserSettings(cb) {
  $.get("srv/usersettings",
    function (data) {
      cb(data);
    }).fail(function () {
      //location.href = "index.html";
    });
}

function commafy(num) {
  var str = num.toString().split('.');
  if (str[0].length >= 4) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  if (str[1] && str[1].length >= 4) {
    str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  return str.join(',');
}

var lhdlist = [
  { "LHDID": "NSW", "LHD": "NSW"},
  { "LHDID": "X740", "LHD": "WS"},
  { "LHDID": "X760", "LHD": "NS"},
  { "LHDID": "X720", "LHD": "SES"},
  { "LHDID": "X700", "LHD": "SYD"},
  { "LHDID": "X850", "LHD": "WNSW"},
  { "LHDID": "X800", "LHD": "HNE"},
  { "LHDID": "X710", "LHD": "SWS"},
  { "LHDID": "X820", "LHD": "MNC"},
  { "LHDID": "X690", "LHD": "SVHN"},
  { "LHDID": "X830", "LHD": "SNSW"},
  { "LHDID": "X750", "LHD": "NBM"},
  { "LHDID": "X810", "LHD": "NNSW"},
  { "LHDID": "X840", "LHD": "MUR"},
  { "LHDID": "X770", "LHD": "CC"},
  { "LHDID": "X860", "LHD": "FW"},
  { "LHDID": "X730", "LHD": "IS"},
  { "LHDID": "X630", "LHD": "SCHN" }
];

function getLHD(lhdshn) {
  var lhd = "";
  if (lhdshn === "Central Coast LHD") lhd = "CC";
  else if (lhdshn === "Far West LHD") lhd = "FW";
  else if (lhdshn === "Hunter New England LHD") lhd = "HNE";
  else if (lhdshn === "Illawarra Shoalhaven LHD") lhd = "IS";
  else if (lhdshn === "Mid North Coast LHD") lhd = "MNC";
  else if (lhdshn === "Murrumbidgee LHD") lhd = "M";
  else if (lhdshn === "Nepean Blue Mountains LHD") lhd = "NBM";
  else if (lhdshn === "Northern NSW LHD") lhd = "NNSW";
  else if (lhdshn === "Northern Sydney LHD") lhd = "NS";
  else if (lhdshn === "South Eastern Sydney LHD") lhd = "SES";
  else if (lhdshn === "South Western Sydney LHD") lhd = "SWS";
  else if (lhdshn === "Southern NSW LHD") lhd = "SNSW";
  else if (lhdshn === "St Vincent's Health Network") lhd = "SVHN";
  else if (lhdshn === "Sydney Children's Hospitals Network") lhd = "SCHN";
  else if (lhdshn === "Sydney LHD") lhd = "S";
  else if (lhdshn === "Western NSW LHD") lhd = "WNSW";
  else if (lhdshn === "Western Sydney LHD") lhd = "WS";
  else if (lhdshn === "NSW") lhd = "NSW";
  return lhd;
}

var processingdrilldown = false;
function drilldowncharts(chartid, lhdname) {
  if (processingdrilldown) return;
  processingdrilldown = true;
  if (userSettings.IsAdmin || userSettings.IsSuperUser) {
    $('.reset-drill').show();
    var hightChartIds = [
      { id: "chart13-0", pos: 0 }, { id: "chart14-0", pos: 0 }, { id: "chart14-1", pos: 0 },
      { id: "chart15-0", pos: 2, text: "Average Cost Per NWAU" },
      { id: "chart15-1", pos: 1, text: "Average Cost Per Encounter" },
      { id: "chart15-2", pos: 1, text: "IP ALOS (Days)" }, { id: "chart17-0", pos: 2, text: "Average Cost Per NWAU" },
      { id: "chart17-1", pos: 1, text: "Average Cost Per Encounter" },
      { id: "chart17-2", pos: 1, text: "IP ALOS (Days)" },
      { id: "chart18-0", pos: 1 }, { id: "chart19-0", pos: 1 }
    ];

    hightChartIds.forEach(function(c) {
      if (chartid === c.id) {
        return;
      }
      var series = $('#' + c.id).highcharts().series[c.pos];
      if (!series) return;
      series.data.forEach(function(f) {
        if (f.name === lhdname) {
          f.doDrilldown();
        }
      });
    });

    if (chartid !== "section3") {
      $("#section3 .percentage-table th").each(function() {
        if ($(this).text() === lhdname) {
          $(this).click();
        }
      });
    }
    if (chartid !== "waulhd") {
      $(".waulhd").each(function() {
        if ($(this).text() === lhdname) {
          $(this).click();
        }
      });
    }
    if (chartid !== "section4") {
      var visibleIndexes = [];
      $('#section4 .data-table .table-head th').each(function() {
        var index = $(this).index() + 1;
        if ($(this).text() === lhdname) {
          visibleIndexes.push(index);
        }
      });

      $("#section4 .data-table tr").each(function() {
        function hideColumn() {
          var index = $(this).index() + 1;
          if (visibleIndexes.indexOf(index) < 0) {
            $(this).hide();
          }
        }

        $(this).find("td").each(hideColumn);
        $(this).find("th").each(hideColumn);
      });
    }

    processingdrilldown = false;
  } else {
    
    var chartnames = chartid.split('-');
    var hightChartIds = [
      { id: "chart13-0", pos: 0 }, { id: "chart14-0", pos: 0 }, { id: "chart14-1", pos: 0 },
      { id: "chart15-0", pos: 2, text: "Average Cost Per NWAU" },
      { id: "chart15-1", pos: 1, text: "Average Cost Per Encounter" },
      { id: "chart15-2", pos: 1, text: "IP ALOS (Days)" }, { id: "chart17-0", pos: 2, text: "Average Cost Per NWAU" },
      { id: "chart17-1", pos: 1, text: "Average Cost Per Encounter" },
      { id: "chart17-2", pos: 1, text: "IP ALOS (Days)" },
      { id: "chart18-0", pos: 1 }, { id: "chart19-0", pos: 1 }
    ];

    hightChartIds.forEach(function(c) {
      if (chartid === c.id) {
        return;
      }

      if (c.id.indexOf(chartnames[0]) !== -1) {
        if ($('#' + c.id).highcharts()) {          
          var series = $('#' + c.id).highcharts().series[c.pos];
          if (!series) return;
          series.data.forEach(function(f) {
            if (f.name === lhdname) {
              f.doDrilldown();
            }
          });
        }
      }
    });

    processingdrilldown = false;
  }
  //else {
  //  $('.reset-drill').show();
  //  var hightChartIds = [ 
  //    { id: "chart14-0", pos: 0 }, { id: "chart14-1", pos: 0 },
  //    { id: "chart15-0", pos: 2, text: "Average Cost Per NWAU" },
  //    { id: "chart15-1", pos: 1, text: "Average Cost Per Encounter" },
  //    { id: "chart15-2", pos: 1, text: "IP ALOS (Days)" }
  //  ];

  //  hightChartIds.forEach(function (c) {
  //    if (chartid === c.id) {
  //      return;
  //    }

  //    if ($('#' + c.id).highcharts()) {
  //      var series = $('#' + c.id).highcharts().series[c.pos];
  //      if (!series) return;
  //      series.data.forEach(function(f) {
  //        if (f.name === lhdname) {
  //          f.doDrilldown();
  //        }
  //      });
  //    }
  //  });

  //  //if (chartid !== "section3") {
  //  //  $("#section3 .percentage-table th").each(function () {
  //  //    if ($(this).text() === lhdname) {
  //  //      $(this).click();
  //  //    }
  //  //  });
  //  //}
  //  if (chartid !== "waulhd") {
  //    $(".waulhd").each(function () {
  //      if ($(this).text() === lhdname) {
  //        $(this).click();
  //      }
  //    });
  //  }
  //  if (chartid !== "section4") {
  //    var visibleIndexes = [];
  //    $('#section4 .data-table .table-head th').each(function () {
  //      var index = $(this).index() + 1;
  //      if ($(this).text() === lhdname) {
  //        visibleIndexes.push(index);
  //      }
  //    });

  //    $("#section4 .data-table tr").each(function () {
  //      function hideColumn() {
  //        var index = $(this).index() + 1;
  //        if (visibleIndexes.indexOf(index) < 0) {
  //          $(this).hide();
  //        }
  //      }

  //      $(this).find("td").each(hideColumn);
  //      $(this).find("th").each(hideColumn);
  //    });
  //  }

  //  processingdrilldown = false;
  //}
}

jQuery(document)
  .ready(function ($) {

    if (typeof ToggleLoading != "undefined")
      ToggleLoading(true);

    //if the showESAP and showETP is true we will hide these parts
    getUserSettings(function(data) {
      if (!data["showESAP"]) {
        $("#showESAP").hide();
        $("#section2").hide();
        $("#tile-esap").detach();
      }
      if (!data["showETP"]) {
        $("#showETP").hide();
        $('#section1').hide();
        $('#tile-etp').detach();
        $(".menu-section-premier-priorities").detach();
      }      
      data.highlightColor = {
        linearGradient: {
          x1: 0,
          x2: 0,
          y1: 0,
          y2: 1
        },
        stops: [
          [0, '#75d4fb'],
          [1, '#4cb3e9']
        ]
      };
      window['userSettings'] = data;
      //with the LHD ID and LHD show correct list
      var showTileData = function (tileTable, dataType) {
        var tileData = tiles[tileTable][0];
        var tile = $("#tile-" + dataType);

        var tiletext = tiles[tileTable][0]['Tile'];

        tile.find(".tile-percent-dollar").text(numberWithCommas((tileData["Period_Value"] || tileData["Value"]).toFixed(0)));
        tile.find(".tile-percent").text(numberWithCommas((tileData["Period_Value"] || tileData["Value"]).toFixed(1)));

        tile.find("." + dataType + '-tile').text(tiletext);

        if (tileTable === 'TileWAUApp') {
          tile.find(".tile-month").text(tileData["Period"] + ' Avg Cost / ' + tiletext);
        } else {
          if (dataType.indexOf('benchmark') <0) {
            tile.find(".tile-month").text(tileData["Period"]);
          }
          else
            tile.find(".tile-month").text(tileData["Period"]);
        }

        var arrowDirection = tileData["Arrow_Direction"] || tileData["ArrowDirection"];
        if (!isNaN(arrowDirection)) {
            if (arrowDirection === 0) {
                arrowDirection = "none";
            }
        }
        tile.find(".fa-arrow").addClass("fa-arrow-circle-" + (arrowDirection).toLowerCase());
        
      };
        
      getTiles(function () {
        var date = new Date(tiles["TileETP"][0]["DateCreated"]);
        $("#last-updated").text(date.toDateString());
        $(".target-month").text(tiles["TileTarget"][0]["Period"]);
        $(".budget-month").text(tiles["TileBudget"][0]["Period"]);
        showTileData("TileETP", "etp");
        showTileData("TileESAP", "esap");
        showTileData("TileTarget", "target");
        showTileData("TileBudget", "budget");
        showTileData("TileRQScore", "rqscore");
        showTileData("TileSNAP", "snap");        
        showTileData("TileWAUApp", "wau");
        showTileData("TileWAUApp", "wau-stats");
        showTileData("TileBenchmark", "benchmark"); // desktop 
        showTileData("TileBenchmarkNWAU", "benchmark-nwau"); // mobiles
        showTileData("TileBenchmarkEnct", "benchmark-enct"); // mobiles
        showTileData("TileBenchmarkAlos", "benchmark-alos"); // mobiles

        //set desktop wau report period tile
        $('.waureport-tile-desktop').text(tiles["TileWAUApp"][0]["Tile"]);

        $('.snap-report-period-desktop').text(tiles['TileSNAP'][0]['Period']);

        var benPeroid = tiles["TileBenchmark"][0]["Period"];
        $(".benchmar-months").text(benPeroid);

        $('.ben-subtitle').text(tiles["TileBenchmarkNWAU"][0]["Tile"]);
        $('.benchmak-year-desktop').text(' '+ tiles["TileBenchmark"][0]["Period"]);

        var wauyear = tiles["TileWAUApp"][0]["Period"] + ' Avg Cost / ' + tiles["TileWAUApp"][0]["Tile"];
        $(".wau-year").text(wauyear);
       // $(".snap-subtitle").text('Category - SNAP Ungrouped Episodes Rate YTD ' + tiles["TileSNAP"][0]["Period"]);

        $('.map-text').text('ABM Performance Indicator: Cost per ' + tiles["TileBudget"][0]["Tile"] + ' (All excl. Non-Admitted)');
        $('.RQScoreTextTile').text('Category - RQ Score By LHD - ' + tiles["TileRQScore"][0]["Period"]);
        reloadSlider();
        $(".bx-loading").hide();

        if ( typeof ToggleLoading != "undefined")
          ToggleLoading(false);
      });

      $(document).trigger("init");

      if (userSettings.IsAdmin || userSettings.IsSuperUser) {
        var dp = function() {
          $(".abf-target-bottom-legend").hide();
          $(".chart")
            .each(function(c) {
              try {
                $(this).highcharts().drillUp();
              } catch (err) {
              }
              $("#section15 .highcharts-legend").show();
              $(".reset-drill").hide();
            });

          $(".highcharts-legend")
            .each(function() {
              $(this).attr('style', 'display: block');
              $("#section4 .highcharts-legend").attr('style', 'display: none');
              $("#section3 .highcharts-legend").attr('style', 'display: none');
            });
        };
        var drillupBudget = function() {
          $("#section4 .data-table tr").each(function() {
            function showColumn() {
              $(this).show();
            }

            $(this).find("td").each(showColumn);
            $(this).find("th").each(showColumn);
          });
        };
        $(".reset-drill").click(function() {
          $(".tableDrill").click();
          $(".lhdexc").click();
          drillupBudget();
          dp();
        });
        $(".tableDrill").click(function() {
          $(".lhdexc").trigger("drillup");
          drillupBudget();
          dp();
        });
        $(".lhdexc").click(function() {
          $(".tableDrill").trigger("drillup");
          drillupBudget();
          dp();
        });
        //after drillup move to SNAP part.
        $("#section14")
          .click(function() {
//            $('a[href$="#section14"]').click();
            $('html, body').animate({
                scrollTop: $("#section14").offset().top
              },
              1000);

          });      
      }
      else {
        var dp = function () {
          //$(".abf-target-bottom-legend").hide();
          $(".chart")
            .each(function (c) {
              try {
                //for snap report and WAU Report, not allow user drill up
                if ($(this)[0].id.indexOf('chart18') == -1 && $(this)[0].id.indexOf('chart14') == -1) {
                  $("#" + $(this)[0].id + " .highcharts-legend").show();
                  $(this).highcharts().drillUp();
                }
              }
              catch (err) {
                console.log('drill up error:', err);
              }
             
              $(".reset-drill").hide();
            });         
        };

        $(".reset-drill").click(function () {                 
          dp();
        });
      }
    });
  });

