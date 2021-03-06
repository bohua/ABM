define(["../js/chart-helper"], function (helper) {
    var mapformatter = function (key, data, image) {
        return ('<span class="datalabel ' + key + '"> <span style="color: black">' + key + '</span> <img src="images/' + image + '" width="25"></span>');
    };

    return {
        getData: function (data) {

            var lhd = [];
            var budgetPerformance = helper.Qlik2Lhd(data);

            for (var i = 0; i < budgetPerformance.length; i++) {
                lhd = budgetPerformance[i]["LHD"];
                if (lhd === "NBM") {
                    var nbmValue = budgetPerformance[i]["Value"];
                    var nbmName = budgetPerformance[i]["LHD"];
                }
                if (lhd === "CC") {
                    var ccValue = budgetPerformance[i]["Value"];
                    var ccName = budgetPerformance[i]["LHD"];
                }
                if (lhd === "WS") {
                    var wsValue = budgetPerformance[i]["Value"];
                    var wsName = budgetPerformance[i]["LHD"];
                }
                if (lhd === "NS") {
                    var nsValue = budgetPerformance[i]["Value"];
                    var nsName = budgetPerformance[i]["LHD"];

                }
                if (lhd === "SYD") {
                    var sValue = budgetPerformance[i]["Value"];
                    var sName = budgetPerformance[i]["LHD"];

                }
                if (lhd === "SES") {
                    var sesValue = budgetPerformance[i]["Value"];
                    var sesName = budgetPerformance[i]["LHD"];

                }
                if (lhd === "SWS") {
                    var swsValue = budgetPerformance[i]["Value"];
                    var swsName = budgetPerformance[i]["LHD"];

                }
                if (lhd === "IS") {
                    var ishValue = budgetPerformance[i]["Value"];
                    var isName = budgetPerformance[i]["LHD"];
                }

            }
            var nbm = {
                "name": nbmName,
                'value': nbmValue,
                "path": "M131,-631C122,-643,124,-656,127,-668C131,-681,130,-684,117,-686C112,-687,107,-687,103,-689C94,-693,86,-698,82,-683C80,-679,76,-682,73,-684C68,-687,62,-690,64,-697C69,-719,63,-737,46,-752C40,-757,40,-766,39,-773C36,-783,36,-794,33,-804C32,-809,34,-817,24,-817C24,-817,23,-819,23,-820C29,-831,19,-841,21,-853C24,-864,19,-874,10,-880C3,-885,0,-892,1,-900C3,-912,9,-916,20,-912C22,-911,25,-910,27,-910C34,-910,41,-899,46,-907C52,-916,57,-928,53,-940C48,-958,48,-958,63,-970C65,-971,68,-972,68,-974C72,-983,76,-987,87,-991C104,-997,118,-996,133,-991C145,-986,157,-981,169,-990C174,-993,175,-988,176,-985C180,-976,183,-966,183,-956C182,-949,185,-944,193,-943C203,-940,213,-937,223,-938C225,-939,228,-939,229,-938C243,-926,260,-930,276,-929C279,-929,283,-928,284,-932C286,-936,283,-937,281,-940C279,-942,275,-945,278,-948C280,-952,284,-950,287,-949C291,-947,294,-948,298,-949C314,-953,326,-944,327,-927C327,-922,328,-916,332,-915C347,-911,361,-904,377,-909C380,-910,383,-912,384,-915C388,-921,392,-927,401,-924C409,-921,410,-913,410,-906C410,-904,410,-901,409,-899C405,-898,405,-895,405,-891C405,-884,405,-877,405,-869C405,-852,403,-836,386,-826C384,-824,382,-821,382,-819C381,-806,373,-802,362,-801C359,-801,357,-799,354,-798C342,-792,341,-789,347,-777C357,-754,353,-733,336,-719C327,-712,315,-707,305,-703C296,-699,298,-698,303,-693C316,-680,322,-663,320,-644C319,-634,315,-630,306,-632C289,-636,272,-629,256,-635C254,-636,251,-634,249,-633C240,-630,231,-629,222,-629C214,-628,206,-628,198,-633C191,-637,189,-645,189,-654C179,-645,170,-640,158,-640C155,-640,153,-639,151,-637C145,-631,138,-630,131,-631z"
            }

            var ns = {
                "name": nsName,
                'value': nsValue,
                "path": "M442,-760C443,-751,441,-744,431,-737C442,-737,448,-741,454,-744C459,-747,461,-745,464,-741C471,-733,469,-724,469,-715C469,-705,457,-707,455,-700C464,-698,463,-692,461,-685C459,-680,457,-675,458,-670C458,-669,458,-668,459,-667C450,-667,450,-657,445,-655C432,-648,420,-641,405,-646C404,-647,402,-648,400,-647L400,-647C401,-649,400,-650,399,-652C385,-666,376,-683,375,-703C374,-736,389,-768,388,-802C396,-791,419,-795,416,-774C430,-779,430,-779,437,-764C438,-763,438,-762,439,-761C440,-760,440,-759,442,-760L442,-760z"
            }

            var ses = {
                "name": sesName,
                'value': sesValue,
                color: '#f7b567',
                "path": "M375,-597C375,-602,381,-600,382,-604C388,-602,393,-604,395,-609C398,-620,403,-615,408,-611C410,-610,412,-609,414,-608L414,-608C415,-607,415,-607,416,-606C418,-601,413,-597,412,-593C411,-587,405,-580,417,-578C419,-578,419,-576,419,-575C419,-554,407,-537,387,-528C387,-528,387,-528,387,-528C387,-530,386,-530,385,-530C377,-537,369,-542,360,-544C353,-545,352,-549,352,-554C352,-565,358,-573,361,-583C361,-583,361,-583,361,-583C364,-584,366,-585,364,-589C365,-590,366,-591,367,-592C372,-590,374,-593,375,-597z"
            }

            var sws = {
                "name": swsName,
                'value': swsValue,
                "path": "M175,-321C161,-328,146,-325,132,-319C130,-318,127,-318,126,-322C124,-330,117,-333,111,-337C102,-344,97,-351,99,-364C101,-376,104,-391,87,-399C97,-403,100,-409,93,-418C90,-422,94,-427,98,-430C104,-435,107,-441,107,-448C106,-462,100,-467,87,-463C79,-461,74,-462,69,-468C64,-474,64,-480,66,-487C68,-493,72,-495,79,-493C86,-490,89,-493,89,-501C90,-515,95,-530,79,-542C91,-547,99,-543,107,-535C101,-561,119,-576,133,-591C135,-593,137,-595,139,-597C146,-606,144,-611,133,-612C126,-613,124,-616,123,-622C123,-625,119,-630,127,-631C131,-626,138,-624,143,-627C154,-636,168,-635,179,-641C183,-643,185,-644,187,-640C193,-628,203,-625,215,-624C235,-622,254,-635,274,-627C274,-627,275,-627,275,-627C285,-631,295,-629,305,-628C321,-626,322,-631,325,-644C326,-649,321,-654,323,-658C326,-665,333,-655,337,-661C344,-657,352,-653,359,-649C362,-645,367,-645,371,-643C389,-635,389,-635,387,-617L387,-617C382,-617,382,-614,384,-611C388,-607,382,-606,382,-604C381,-600,375,-602,375,-597C371,-597,369,-595,367,-592C366,-591,365,-590,364,-589C362,-587,359,-586,361,-583L361,-583C352,-580,350,-571,350,-564C350,-544,339,-527,332,-509C329,-502,330,-489,316,-493C315,-493,314,-492,314,-491C312,-485,308,-482,302,-482C297,-482,295,-478,294,-473C292,-467,289,-461,287,-455C279,-437,271,-420,264,-402C261,-393,259,-384,267,-378C274,-372,272,-370,266,-366C258,-361,249,-356,243,-347C240,-357,235,-356,228,-353C209,-344,189,-338,175,-321z"
            }

            var ws = {
                "name": wsName,
                'value': wsValue,
                color: '#f7b567',
                "path": "M337,-661C317,-665,319,-686,306,-696C312,-702,319,-706,326,-709C340,-714,351,-723,355,-737C358,-749,356,-762,352,-774C348,-789,351,-795,366,-798C382,-800,384,-798,382,-780C380,-765,377,-750,374,-735C368,-712,368,-689,382,-668C386,-663,386,-656,391,-651C394,-648,391,-645,389,-643C388,-639,385,-641,383,-642C375,-645,368,-651,359,-649C352,-653,344,-657,337,-661z"
            }

            var s = {
                "name": sName,
                'value': sValue,
                dataLabels: {
                    x: -10,
                    y: -5
                },
                "path": "M387,-617C394,-620,391,-626,391,-630C392,-637,391,-645,400,-647C400,-647,400,-647,400,-647C401,-644,403,-644,405,-643C411,-641,418,-641,424,-642C429,-643,434,-643,437,-638C438,-634,445,-630,439,-626C429,-620,417,-616,406,-619C399,-620,396,-620,392,-615C388,-610,387,-613,387,-617L387,-617z"
            }

            var ish = {
                "name": isName,
                'value': ishValue,
                "path": "M387,-528C386,-518,380,-513,371,-512C368,-511,364,-511,365,-508C367,-498,359,-495,355,-489C353,-485,349,-480,349,-476C348,-457,338,-441,341,-422C342,-417,341,-412,338,-408C331,-420,324,-420,317,-409C316,-408,316,-408,316,-408C314,-402,308,-396,313,-390C317,-384,323,-391,327,-392C339,-376,326,-360,326,-344C326,-336,324,-329,322,-321C320,-311,315,-301,302,-300C297,-300,294,-297,295,-291C295,-281,294,-270,299,-260C302,-254,303,-248,304,-241C305,-232,307,-225,318,-223C325,-222,323,-216,322,-212C321,-207,321,-201,314,-200C310,-199,307,-201,307,-205C306,-207,307,-209,307,-211C307,-219,306,-227,299,-231C292,-234,287,-228,281,-225C274,-220,274,-213,275,-206C276,-200,282,-192,277,-189C272,-185,264,-189,257,-191C255,-192,253,-194,250,-195C247,-196,243,-196,241,-193C239,-189,240,-186,242,-183C252,-169,252,-168,239,-156C238,-156,237,-155,237,-154C231,-142,223,-132,214,-122C211,-119,211,-114,213,-110C217,-99,212,-91,205,-84C193,-72,187,-59,189,-41C191,-33,186,-26,181,-21C175,-16,170,-11,168,-3C166,2,162,3,157,1C153,0,148,-2,149,-9C151,-27,141,-34,125,-26C111,-20,97,-17,83,-25C72,-31,68,-39,71,-52C73,-61,77,-70,81,-78C84,-86,87,-94,86,-103C85,-112,89,-117,97,-119C115,-124,124,-138,132,-153C134,-158,136,-164,131,-167C120,-174,114,-185,108,-196C104,-201,99,-206,95,-212C91,-216,92,-221,93,-227C94,-239,95,-251,97,-263C97,-266,92,-270,90,-273C85,-282,81,-292,87,-302C90,-309,94,-310,100,-305C120,-287,121,-287,145,-302C154,-308,165,-312,176,-317C179,-317,183,-319,184,-322C193,-335,207,-338,220,-344C236,-351,236,-351,243,-335C247,-351,259,-357,271,-364C277,-368,280,-373,273,-378C264,-386,266,-394,269,-404C278,-427,291,-448,298,-472C299,-475,300,-477,303,-477C314,-478,319,-492,331,-490C333,-490,336,-494,335,-496C333,-510,343,-519,346,-531C349,-541,356,-541,363,-538C370,-536,376,-532,382,-528C384,-528,385,-528,387,-528L387,-528z"
            }
            var cc = {
                "name": ccName,
                'value': ccValue,
                "path": "M409,-899C410,-901,410,-904,410,-906C413,-909,414,-912,420,-909C435,-903,441,-906,449,-921C458,-937,464,-938,476,-923C482,-917,485,-909,487,-901C490,-891,494,-882,505,-881C515,-880,526,-881,531,-893C531,-894,533,-896,534,-896C544,-890,542,-900,543,-904C547,-904,548,-900,550,-898C560,-889,561,-883,548,-877C539,-872,539,-865,540,-858C541,-853,541,-848,533,-846C536,-853,535,-858,529,-863C526,-851,514,-845,510,-833C508,-826,497,-827,491,-825C486,-827,482,-830,476,-831C472,-831,467,-832,464,-827C463,-823,464,-821,466,-819C471,-816,475,-814,480,-818C482,-821,484,-824,488,-822C493,-818,498,-819,503,-823C506,-825,509,-827,512,-823C514,-821,515,-818,513,-814C506,-801,504,-787,498,-773C494,-763,485,-760,476,-766C473,-768,471,-767,468,-765C467,-763,465,-760,464,-758C456,-750,449,-751,442,-760L442,-760C443,-762,442,-764,440,-765C441,-771,439,-777,434,-778C423,-781,417,-794,406,-797C401,-798,397,-801,393,-804C383,-812,383,-818,393,-825C401,-832,406,-841,408,-852C410,-868,409,-884,409,-899z"
            }


            //put this in any color, these points have no data
            var areaWithoutName = [{
                // "name": '4',
                dataLabels: {
                    enabled: false
                },
                "path": "M440,-638C444,-643,459,-646,466,-643C472,-640,469,-635,468,-631C467,-629,467,-627,464,-628C454,-629,449,-625,449,-614C448,-610,449,-606,448,-602C447,-597,444,-594,439,-599C433,-604,427,-607,419,-606C418,-608,416,-609,414,-608L414,-608C415,-611,412,-615,419,-615C424,-616,430,-618,436,-620C446,-624,447,-628,440,-638z"
            },

                {
                    //"name": '5',

                    dataLabels: {
                        enabled: false
                    },
                    "path": "M422,-579C423,-583,427,-583,429,-584C432,-585,434,-589,438,-587C440,-586,439,-584,439,-582C437,-579,433,-578,430,-579C428,-579,425,-579,422,-579z"
                },

                {
                    //"name": '6',
                    dataLabels: {
                        enabled: false
                    },
                    "path": "M405,-643C403,-644,401,-644,400,-647C402,-648,404,-647,405,-646C405,-645,405,-644,405,-643z"
                },
                {
                    //"name": '7',
                    dataLabels: {
                        enabled: false
                    },
                    "path": "M414,-608C416,-609,418,-608,419,-606C418,-606,417,-606,416,-606C415,-607,415,-607,414,-608z"
                },

                {
                    //"name": '9',
                    dataLabels: {
                        enabled: false
                    },
                    "path": "M364,-589C366,-585,364,-584,361,-583C359,-586,362,-587,364,-589z"
                },
                {
                    // "name": '10',
                    dataLabels: {
                        enabled: false
                    },
                    "path": "M382,-528C383,-529,384,-530,385,-530C386,-530,387,-530,387,-528C385,-528,384,-528,382,-528z"
                },

                {
                    // "name": '11',
                    dataLabels: {
                        enabled: false
                    },
                    "path": "M439,-761C439,-763,439,-764,440,-765C442,-764,443,-762,442,-760C440,-759,440,-760,439,-761z"
                }, {
                    //"name": '12',
                    dataLabels: {
                        enabled: false
                    },
                    "path": "M330,-395L330,-396,331,-396"
                },
                {
                    //"name": '13',
                    dataLabels: {
                        enabled: false
                    },
                    "path": "M375,-597C374,-593,372,-590,367,-592C369,-595,371,-597,375,-597z"
                }];


            var green = [];
            var yellow = [];
            var red = [];

            var dataColor = [nbm, ns, ses, sws, ws, s, ish, cc];
            for (var i = 0; i < dataColor.length; i++) {
                if (dataColor[i]["value"] > 0.5) {
                    red.push(dataColor[i]);
                    dataColor[i]["value"] = dataColor[i]["value"];
                }
                if (dataColor[i]["value"] > 0 && dataColor[i]["value"] <= 0.5) {
                    yellow.push(dataColor[i]);
                    dataColor[i]["value"] = dataColor[i]["value"];
                }
                if (dataColor[i]["value"] <= 0) {
                    green.push(dataColor[i]);
                    dataColor[i]["value"] = dataColor[i]["value"];
                }
            }
            //put empty area into green area without label on it.

            for (var i = 0; i < areaWithoutName.length; i++) {
                yellow.push(areaWithoutName[i]);
            }


            $("#a1").click(function () {
                if ($(".green1").css('display') === 'none') {
                    $(".green1").css("display", "block");
                } else if ($("#svhn-panel").hasClass("green1")) {
                    $(".green1").css("display", "none");
                }
                if ($(window).width() > 767) {
                    $('#container4 .highcharts-legend-item:nth-child(2)').click();
                }
                $('#container5 .highcharts-legend-item:nth-child(2)').click();
                $(this).toggleClass("leg-clicked");
                return false;
            });
            $("#a2").click(function () {
                if ($(".yellow1").css('display') === 'none') {
                    $(".yellow1").css("display", "block");
                } else if ($("#svhn-panel").hasClass("yellow1")) {
                    $(".yellow1").css("display", "none");
                }
                if ($(window).width() > 767) {
                    $('#container4 .highcharts-legend-item:nth-child(3)').click();
                }
                $('#container5 .highcharts-legend-item:nth-child(3)').click();
                $(this).toggleClass("leg-clicked");
                return false;
            });
            $("#a3").click(function () {
                if ($(".red1").css('display') === 'none') {
                    $(".red1").css("display", "block");
                } else if ($("#svhn-panel").hasClass("red1")) {
                    $(".red1").css("display", "none");
                }

                if ($(window).width() > 767) {
                    $('#container4 .highcharts-legend-item:nth-child(4)').click();
                }
                $('#container5 .highcharts-legend-item:nth-child(4)').click();
                $(this).toggleClass("leg-clicked");
                return false;
            });

            /*mobile*/
            $("#a10").click(function () {
                if ($(window).width() < 767) {
                    $('#container4 .highcharts-legend-item:nth-child(2)').click();
                }
                $(this).toggleClass("leg-clicked");
                return false;
            });
            $("#a11").click(function () {
                if ($(window).width() < 767) {
                    $('#container4 .highcharts-legend-item:nth-child(3)').click();
                }
                $(this).toggleClass("leg-clicked");
                return false;
            });
            $("#a12").click(function () {
                if ($(window).width() < 767) {
                    $('#container4 .highcharts-legend-item:nth-child(4)').click();
                }
                $(this).toggleClass("leg-clicked");
                return false;
            });

            /*=========================================*/
            $("#a4").click(function () {
                if ($(".green2").css('display') === 'none') {
                    $(".green2").css("display", "block");
                } else if ($("#svhns-panel").hasClass("green2") || $("#schns-panel").hasClass("green2")) {
                    $(".green2").css("display", "none");
                }
                if ($(window).width() > 767) {
                    $('#container6 .highcharts-legend-item:nth-child(2)').click();
                }
                $('#container7 .highcharts-legend-item:nth-child(2)').click();
                $(this).toggleClass("leg-clicked");
                return false;
            });
            $("#a5").click(function () {
                if ($(".yellow2").css('display') === 'none') {
                    $(".yellow2").css("display", "block");
                } else if ($("#svhns-panel").hasClass("yellow2") || $("#schns-panel").hasClass("yellow2")) {
                    $(".yellow2").css("display", "none");
                }
                if ($(window).width() > 767) {
                    $('#container6 .highcharts-legend-item:nth-child(3)').click();
                }
                $('#container7 .highcharts-legend-item:nth-child(3)').click();
                $(this).toggleClass("leg-clicked");
                return false;
            });
            $("#a6").click(function () {
                if ($(".red2").css('display') === 'none') {
                    $(".red2").css("display", "block");
                } else if ($("#svhns-panel").hasClass("red2") || $("#schns-panel").hasClass("red2")) {
                    $(".red2").css("display", "none");
                }

                if ($(window).width() > 767) {
                    $('#container6 .highcharts-legend-item:nth-child(4)').click();
                }
                $('#container7 .highcharts-legend-item:nth-child(4)').click();
                $(this).toggleClass("leg-clicked");
                return false;
            });

            /*$(window).resize(function() {
                if ($(window).width() > 767) {

                }
            });*/


            /*mobile*/
            $("#a7").click(function () {
                $('#container6 .highcharts-legend-item:nth-child(2)').click();
                $(this).toggleClass("leg-clicked");
                return false;
            });
            $("#a8").click(function () {
                $('#container6 .highcharts-legend-item:nth-child(3)').click();
                $(this).toggleClass("leg-clicked");
                return false;
            });
            $("#a9").click(function () {
                $('#container6 .highcharts-legend-item:nth-child(4)').click();
                $(this).toggleClass("leg-clicked");
                return false;
            });


            /*This function for zoom count */

            /*$('.zoomOut').css('display', 'none');
        /*    function zoomData(){
                var zoomInVal = $(this).attr('data-zoom');
                zoomInVal=parseInt(zoomInVal)
                if(zoomInVal){
                    if(zoomInVal<8){
                        zoomInVal=parseInt(zoomInVal)+1;
                        $(this).attr('data-zoom', zoomInVal);
                        $(this).siblings('.zoomOut').attr('data-zoom', zoomInVal);
                    }
                }else{
                    $(this).attr('data-zoom', '1');
                    $(this).siblings('.zoomOut').attr('data-zoom', '1');
                }
            }*/

            $('.zoomIn').click(function () {
                $(this).parent('.mapWrap').find('.highcharts-button:first').click();
                //$(this).siblings('.zoomOut').css('display', 'inline-block');
            });

            $('.zoomOut').click(function () {
                $(this).parent('.mapWrap').find('.highcharts-button:last').click();
            });
            // Initiate the chart
            $('#container7').highcharts('Map', {
                chart: {
                    backgroundColor: '#e5e5e5',
                    spacingBottom: 0,
                    spacingTop: 0,
                    spacingLeft: 0,
                    spacingRight: 0
                },

                title: {
                    text: '',
                },
                tooltip: {
                    enabled: true,
                    borderWidth: 0,
                    borderRadius: 10,
                    shadow: false,
                    useHTML: true,
                    backgroundColor: 'transparent',
                    style: {
                        padding: 0
                    },
                    formatter: function () {
                        if (this.series.name == 'mapbg' || this.point.value === undefined) {
                            return false;
                        } else {
                            return '<span style="padding:10px; display:block; background:#34474f; border-radius:0px; color: #fff">' +
                                /*'<b>Series name: ' +*/
                                this.point.name + '<br>' +
                                'Var to PAC : ' + this.point.value +
                                '</span>';
                        }

                    },
                },
                legend: {
                    align: 'center',
                    x: 0,
                    y: 10,
                    backgroundColor: '#272D31',
                    color: '#fff',
                    layout: 'horizontal',
                    floating: true,
                    verticalAlign: 'top',
                    shadow: false,
                    border: 0,
                    borderRadius: 0,
                    borderWidth: 0,

                },

                credits: {
                    enabled: false
                },

                mapNavigation: {
                    enabled: true,
                    enableMouseWheelZoom: false,
                    buttonOptions: {
                        verticalAlign: "bottom"
                    }
                },
                buttonOptions: {
                    align: "right",
                    enabled: true
                },
                series: [{
                    "type": "map",
                    name: 'mapbg',
                    color: '#ccc',
                    borderColor: '#fff',
                    dataLabels: {
                        enabled: false,
                        useHTML: false,
                        // formatter: function() {
                        //     return ('<span class="datalabel"><img src="images/crush.png" width="25"></span>');
                        // }
                        //format: '{point.name}<br> <img src="http://192.168.0.60/abm/image/crush.png" width="25">'
                    },
                    "data": [{
                        "path": "M131,-631C122,-643,124,-656,127,-668C131,-681,130,-684,117,-686C112,-687,107,-687,103,-689C94,-693,86,-698,82,-683C80,-679,76,-682,73,-684C68,-687,62,-690,64,-697C69,-719,63,-737,46,-752C40,-757,40,-766,39,-773C36,-783,36,-794,33,-804C32,-809,34,-817,24,-817C24,-817,23,-819,23,-820C29,-831,19,-841,21,-853C24,-864,19,-874,10,-880C3,-885,0,-892,1,-900C3,-912,9,-916,20,-912C22,-911,25,-910,27,-910C34,-910,41,-899,46,-907C52,-916,57,-928,53,-940C48,-958,48,-958,63,-970C65,-971,68,-972,68,-974C72,-983,76,-987,87,-991C104,-997,118,-996,133,-991C145,-986,157,-981,169,-990C174,-993,175,-988,176,-985C180,-976,183,-966,183,-956C182,-949,185,-944,193,-943C203,-940,213,-937,223,-938C225,-939,228,-939,229,-938C243,-926,260,-930,276,-929C279,-929,283,-928,284,-932C286,-936,283,-937,281,-940C279,-942,275,-945,278,-948C280,-952,284,-950,287,-949C291,-947,294,-948,298,-949C314,-953,326,-944,327,-927C327,-922,328,-916,332,-915C347,-911,361,-904,377,-909C380,-910,383,-912,384,-915C388,-921,392,-927,401,-924C409,-921,410,-913,410,-906C410,-904,410,-901,409,-899C405,-898,405,-895,405,-891C405,-884,405,-877,405,-869C405,-852,403,-836,386,-826C384,-824,382,-821,382,-819C381,-806,373,-802,362,-801C359,-801,357,-799,354,-798C342,-792,341,-789,347,-777C357,-754,353,-733,336,-719C327,-712,315,-707,305,-703C296,-699,298,-698,303,-693C316,-680,322,-663,320,-644C319,-634,315,-630,306,-632C289,-636,272,-629,256,-635C254,-636,251,-634,249,-633C240,-630,231,-629,222,-629C214,-628,206,-628,198,-633C191,-637,189,-645,189,-654C179,-645,170,-640,158,-640C155,-640,153,-639,151,-637C145,-631,138,-630,131,-631z"
                    }, {
                        "path": "M387,-528C386,-518,380,-513,371,-512C368,-511,364,-511,365,-508C367,-498,359,-495,355,-489C353,-485,349,-480,349,-476C348,-457,338,-441,341,-422C342,-417,341,-412,338,-408C331,-420,324,-420,317,-409C316,-408,316,-408,316,-408C314,-402,308,-396,313,-390C317,-384,323,-391,327,-392C339,-376,326,-360,326,-344C326,-336,324,-329,322,-321C320,-311,315,-301,302,-300C297,-300,294,-297,295,-291C295,-281,294,-270,299,-260C302,-254,303,-248,304,-241C305,-232,307,-225,318,-223C325,-222,323,-216,322,-212C321,-207,321,-201,314,-200C310,-199,307,-201,307,-205C306,-207,307,-209,307,-211C307,-219,306,-227,299,-231C292,-234,287,-228,281,-225C274,-220,274,-213,275,-206C276,-200,282,-192,277,-189C272,-185,264,-189,257,-191C255,-192,253,-194,250,-195C247,-196,243,-196,241,-193C239,-189,240,-186,242,-183C252,-169,252,-168,239,-156C238,-156,237,-155,237,-154C231,-142,223,-132,214,-122C211,-119,211,-114,213,-110C217,-99,212,-91,205,-84C193,-72,187,-59,189,-41C191,-33,186,-26,181,-21C175,-16,170,-11,168,-3C166,2,162,3,157,1C153,0,148,-2,149,-9C151,-27,141,-34,125,-26C111,-20,97,-17,83,-25C72,-31,68,-39,71,-52C73,-61,77,-70,81,-78C84,-86,87,-94,86,-103C85,-112,89,-117,97,-119C115,-124,124,-138,132,-153C134,-158,136,-164,131,-167C120,-174,114,-185,108,-196C104,-201,99,-206,95,-212C91,-216,92,-221,93,-227C94,-239,95,-251,97,-263C97,-266,92,-270,90,-273C85,-282,81,-292,87,-302C90,-309,94,-310,100,-305C120,-287,121,-287,145,-302C154,-308,165,-312,176,-317C179,-317,183,-319,184,-322C193,-335,207,-338,220,-344C236,-351,236,-351,243,-335C247,-351,259,-357,271,-364C277,-368,280,-373,273,-378C264,-386,266,-394,269,-404C278,-427,291,-448,298,-472C299,-475,300,-477,303,-477C314,-478,319,-492,331,-490C333,-490,336,-494,335,-496C333,-510,343,-519,346,-531C349,-541,356,-541,363,-538C370,-536,376,-532,382,-528C384,-528,385,-528,387,-528L387,-528z"
                    }, {
                        "path": "M442,-760C443,-751,441,-744,431,-737C442,-737,448,-741,454,-744C459,-747,461,-745,464,-741C471,-733,469,-724,469,-715C469,-705,457,-707,455,-700C464,-698,463,-692,461,-685C459,-680,457,-675,458,-670C458,-669,458,-668,459,-667C450,-667,450,-657,445,-655C432,-648,420,-641,405,-646C404,-647,402,-648,400,-647L400,-647C401,-649,400,-650,399,-652C385,-666,376,-683,375,-703C374,-736,389,-768,388,-802C396,-791,419,-795,416,-774C430,-779,430,-779,437,-764C438,-763,438,-762,439,-761C440,-760,440,-759,442,-760L442,-760z"
                    },

                        {
                            "path": "M440,-638C444,-643,459,-646,466,-643C472,-640,469,-635,468,-631C467,-629,467,-627,464,-628C454,-629,449,-625,449,-614C448,-610,449,-606,448,-602C447,-597,444,-594,439,-599C433,-604,427,-607,419,-606C418,-608,416,-609,414,-608L414,-608C415,-611,412,-615,419,-615C424,-616,430,-618,436,-620C446,-624,447,-628,440,-638z"
                        },

                        {
                            "path": "M422,-579C423,-583,427,-583,429,-584C432,-585,434,-589,438,-587C440,-586,439,-584,439,-582C437,-579,433,-578,430,-579C428,-579,425,-579,422,-579z"
                        },

                        {
                            "path": "M405,-643C403,-644,401,-644,400,-647C402,-648,404,-647,405,-646C405,-645,405,-644,405,-643z"
                        }, {
                            "path": "M414,-608C416,-609,418,-608,419,-606C418,-606,417,-606,416,-606C415,-607,415,-607,414,-608z"
                        }, {
                            "path": "M375,-597C374,-593,372,-590,367,-592C369,-595,371,-597,375,-597z"
                        },

                        {
                            "path": "M364,-589C366,-585,364,-584,361,-583C359,-586,362,-587,364,-589z"
                        }, {
                            "path": "M382,-528C383,-529,384,-530,385,-530C386,-530,387,-530,387,-528C385,-528,384,-528,382,-528z"
                        },

                        {
                            "path": "M439,-761C439,-763,439,-764,440,-765C442,-764,443,-762,442,-760C440,-759,440,-760,439,-761z"
                        }, {
                            "path": "M330,-395L330,-396,331,-396"
                        }, {
                            "path": "M337,-661C317,-665,319,-686,306,-696C312,-702,319,-706,326,-709C340,-714,351,-723,355,-737C358,-749,356,-762,352,-774C348,-789,351,-795,366,-798C382,-800,384,-798,382,-780C380,-765,377,-750,374,-735C368,-712,368,-689,382,-668C386,-663,386,-656,391,-651C394,-648,391,-645,389,-643C388,-639,385,-641,383,-642C375,-645,368,-651,359,-649C352,-653,344,-657,337,-661z"
                        }, {
                            "path": "M409,-899C410,-901,410,-904,410,-906C413,-909,414,-912,420,-909C435,-903,441,-906,449,-921C458,-937,464,-938,476,-923C482,-917,485,-909,487,-901C490,-891,494,-882,505,-881C515,-880,526,-881,531,-893C531,-894,533,-896,534,-896C544,-890,542,-900,543,-904C547,-904,548,-900,550,-898C560,-889,561,-883,548,-877C539,-872,539,-865,540,-858C541,-853,541,-848,533,-846C536,-853,535,-858,529,-863C526,-851,514,-845,510,-833C508,-826,497,-827,491,-825C486,-827,482,-830,476,-831C472,-831,467,-832,464,-827C463,-823,464,-821,466,-819C471,-816,475,-814,480,-818C482,-821,484,-824,488,-822C493,-818,498,-819,503,-823C506,-825,509,-827,512,-823C514,-821,515,-818,513,-814C506,-801,504,-787,498,-773C494,-763,485,-760,476,-766C473,-768,471,-767,468,-765C467,-763,465,-760,464,-758C456,-750,449,-751,442,-760L442,-760C443,-762,442,-764,440,-765C441,-771,439,-777,434,-778C423,-781,417,-794,406,-797C401,-798,397,-801,393,-804C383,-812,383,-818,393,-825C401,-832,406,-841,408,-852C410,-868,409,-884,409,-899z"
                        }, {
                            "path": "M375,-597C375,-602,381,-600,382,-604C388,-602,393,-604,395,-609C398,-620,403,-615,408,-611C410,-610,412,-609,414,-608L414,-608C415,-607,415,-607,416,-606C418,-601,413,-597,412,-593C411,-587,405,-580,417,-578C419,-578,419,-576,419,-575C419,-554,407,-537,387,-528C387,-528,387,-528,387,-528C387,-530,386,-530,385,-530C377,-537,369,-542,360,-544C353,-545,352,-549,352,-554C352,-565,358,-573,361,-583C361,-583,361,-583,361,-583C364,-584,366,-585,364,-589C365,-590,366,-591,367,-592C372,-590,374,-593,375,-597z"
                        }, {
                            "path": "M175,-321C161,-328,146,-325,132,-319C130,-318,127,-318,126,-322C124,-330,117,-333,111,-337C102,-344,97,-351,99,-364C101,-376,104,-391,87,-399C97,-403,100,-409,93,-418C90,-422,94,-427,98,-430C104,-435,107,-441,107,-448C106,-462,100,-467,87,-463C79,-461,74,-462,69,-468C64,-474,64,-480,66,-487C68,-493,72,-495,79,-493C86,-490,89,-493,89,-501C90,-515,95,-530,79,-542C91,-547,99,-543,107,-535C101,-561,119,-576,133,-591C135,-593,137,-595,139,-597C146,-606,144,-611,133,-612C126,-613,124,-616,123,-622C123,-625,119,-630,127,-631C131,-626,138,-624,143,-627C154,-636,168,-635,179,-641C183,-643,185,-644,187,-640C193,-628,203,-625,215,-624C235,-622,254,-635,274,-627C274,-627,275,-627,275,-627C285,-631,295,-629,305,-628C321,-626,322,-631,325,-644C326,-649,321,-654,323,-658C326,-665,333,-655,337,-661C344,-657,352,-653,359,-649C362,-645,367,-645,371,-643C389,-635,389,-635,387,-617L387,-617C382,-617,382,-614,384,-611C388,-607,382,-606,382,-604C381,-600,375,-602,375,-597C371,-597,369,-595,367,-592C366,-591,365,-590,364,-589C362,-587,359,-586,361,-583L361,-583C352,-580,350,-571,350,-564C350,-544,339,-527,332,-509C329,-502,330,-489,316,-493C315,-493,314,-492,314,-491C312,-485,308,-482,302,-482C297,-482,295,-478,294,-473C292,-467,289,-461,287,-455C279,-437,271,-420,264,-402C261,-393,259,-384,267,-378C274,-372,272,-370,266,-366C258,-361,249,-356,243,-347C240,-357,235,-356,228,-353C209,-344,189,-338,175,-321z"
                        }, {
                            "path": "M387,-617C394,-620,391,-626,391,-630C392,-637,391,-645,400,-647C400,-647,400,-647,400,-647C401,-644,403,-644,405,-643C411,-641,418,-641,424,-642C429,-643,434,-643,437,-638C438,-634,445,-630,439,-626C429,-620,417,-616,406,-619C399,-620,396,-620,392,-615C388,-610,387,-613,387,-617L387,-617z"
                        }
                    ]
                }, {
                    // name: 'on budget or favourable',
                    name: '± 1% variation from target',
                    color: '#facc99',
                    dataLabels: {
                        enabled: true,
                        useHTML: true,
                        allowOverlap: true,
                        formatter: function (data) {
                            return mapformatter(this.key, data, "check.png");
                            // return ('<span class="datalabel"><img src="images/green-circ.png" width="25"></span>');
                        }
                        //format: '{point.name}<br><img src="images/green-circ.png" width="25">'
                    },

                    "data": green
                }, {
                    "type": "map",
                    name: '> 0 but  ≤ 0.5 Unfavourable',
                    color: '#facc99',
                    dataLabels: {
                        enabled: true,
                        useHTML: true,
                        allowOverlap: true,
                        formatter: function () {
                            return mapformatter(this.key, data, "right-down.png");
                            //return ('<span class="datalabel"><img src="images/yellow-circ.png" width="25"></span>');
                        }
                        //format: '{point.name}<br><img src="images/yellow-circ.png" width="25">'
                    },

                    "data": yellow
                }, {
                    "type": "map",
                    name: '> 0.5 Unfavourable',
                    color: '#f59e33',
                    dataLabels: {
                        enabled: true,
                        useHTML: true,
                        allowOverlap: true,
                        formatter: function () {
                            return mapformatter(this.key, data, "crush.png");
                            //return ('<span class="datalabel"><img src="images/red-circ.png" width="25"></span>');
                        }
                        //format: '{point.name}<br> <img src="images/red-circ.png" width="25">'
                    },
                    "data": red
                }]
            });

            //Mini Fix to show NS label
            $(".WS").css("margin-left", "-15px");
        }
    };
});