var $ = jQuery;
var winWidth = jQuery(window).width();

function reloadSlider() {}

// display loading spinner firstly, then display charts
function ToggleLoading(showLoading) {
  $('.cost-block').css('display', showLoading ? 'none' : 'block');
  $('#processing').css('display', showLoading ? 'inline-block' : 'none');
}

function ToggleLoadingChart(showLoading){
    //$('.container').css('display', showLoading ? 'none' : 'block');
    $('#processing-chart').css('display', showLoading ? 'inline-block' : 'none');
}


function settingOpen() {
  $('.settings-overlay').css('display', 'initial');
  $('.setting-list').height('auto');

  var winHT = $(window).height(),
  settingHT = $('.setting-list').height(),
  headerHT = $('header.adm-header').innerHeight();
  $('.setting-icon').addClass('active');  
  if ((winHT - headerHT) < settingHT) {
    $('.setting-list').addClass('settingScroll');
    $('.setting-list').height(winHT - headerHT);
  }
  $('.setting-list').slideDown();  
  //$('.cost-block').addClass('noscroll');  
}

function settingClose() {
  $('.settings-overlay').css('display', 'none');
  $('.setting-list').removeClass('settingScroll');
  $('.setting-icon').removeClass('active');
  $('.setting-list').css({
    'height': ''
  });
  $('.setting-list').slideUp(); 
  
 // $('.cost-block').removeClass('noscroll');  
}


var showSettingItem = function (item, override) {
  
  var chart = $(item).parent('li').attr('data-visible-chart');
  var ison = $(item).hasClass('fa-circle-thin') || override;  

  if (allitems && override==null) {
    var result = $.grep(allitems, function (e) {
      if (e.id[0].attributes['2'].value == chart){
        e.visible = !(ison == undefined);
        if (e.visible) {
          e.id[0].className += ' visible';
        }
      }
    });
  }

  $(item).removeClass(ison ? 'fa-circle-thin' : 'fa-check-circle').addClass(!ison ? 'fa-circle-thin' : 'fa-check-circle');


  $('.cost-block-wrap .color-blocks .item[data-target-chart="' + chart + '"]').each(function () {
    $(this).toggleClass('visible', ison);       
  });  
};

function organiseTiles() {
  // css selector nth-child(4n+1) does not work with hidden elements, use jQuery  
  var cols = $(window).width() > $(window).height() ? 3 : 2; // 2 cols in portrait, 3 in landscape  

  var table = $('#tiles-container tbody');  
  //var visibles = $('.item.visible');
  var visibles = $.grep(allitems, function (e) {
    return e.visible;
  });
  table.empty();

  $.each(visibles, function (index, value) {
    var tile = value.id;
    tile.toggleClass('first-color', index % 4 === 0);
    tile.toggleClass('second-color', index % 4 === 1);
    tile.toggleClass('third-color', index % 4 === 2);
    tile.toggleClass('fourth-color', index % 4 === 3);
    var row = Math.floor(index / cols);
    var rowel = table.find('tr')[row];
    if (!rowel) {
      rowel = $('<tr></tr>');
      table.append(rowel);
    } else {
      rowel = $(rowel);
    }
    var td = $('<td></td>');
    td.append(tile);
    rowel.append(td);
  });

  //visibles.each(function (index) {
  //  var tile = $(this);
  //  tile.toggleClass('first-color', index % 4 === 0);
  //  tile.toggleClass('second-color', index % 4 === 1);
  //  tile.toggleClass('third-color', index % 4 === 2);
  //  tile.toggleClass('fourth-color', index % 4 === 3);    
  //  var row = Math.floor(index / cols);
  //  var rowel = table.find('tr')[row];
  //  if (!rowel) {
  //    rowel = $('<tr></tr>');
  //    table.append(rowel);
  //  } else {
  //    rowel = $(rowel);
  //  }
  //  var td = $('<td></td>');
  //  td.append(tile);
  //  rowel.append(td);
  //});
}

$(document).ready(function () {
  $('.settings-overlay').click(settingClose);
  $('.setting-icon').click(function () {
    if ($(this).hasClass('active')) {
      settingClose();
    } else {
      settingOpen();
    }
  });

  $('#statepriority').click(function () {
    $('.setting-list').height('auto');
  });

  $('#abmpriority').click(function () {
    if ($(window).width() > $(window).height())
    {
      if (!$("#abf").hasClass('in')) {
        $('.setting-list').addClass('settingScroll');
        var winHT = $(window).height(),
        headerHT = $('header.adm-header').innerHeight();
        $('.setting-list').height(winHT - headerHT);
        //$('.cost-block').addClass('noscroll');        
        //  $('.setting-list').height(290);

      } else {
        $('.setting-list').height('auto');
        //$('.cost-block').removeClass('noscroll');        
      }
    }
    else
    {
      if (!$("#abf").hasClass('in')) {
        $('.setting-list').addClass('settingScroll');

        var winHT = $(window).height(),
          headerHT = $('header.adm-header').innerHeight();
        $('.setting-list').height(winHT - headerHT);  

        //$('.cost-block').addClass('noscroll');        
      }
      else {
        $('.setting-list').height('auto');
       // $('.cost-block').removeClass('noscroll');        
      }
     // $('.setting-list').height('auto');
    }    
  });
  var allitems;  

  $('.setting-list li i').click(function () {        
    var chart = $(this).parent('li').attr('data-visible-chart');
    localStorage.setItem(chart, $(this).hasClass('fa-circle-thin'));
    showSettingItem(this);
    organiseTiles();       
  });  

  $('.setting-list li a').click(function () {    
    var chart = $(this).parent('li').attr('data-visible-chart');
    var visible = localStorage.getItem(chart);
    visible = (visible === 'true' || !visible);
    if (visible) openChart(chart);
    return false;
  });
});

$(document).on("init", function () {
  allitems = new Array();
  $('.item').each(function (index) {
    var tile = $(this);
    var item = { id: tile, visible: true };
    allitems.push(item);
  });

  $('.setting-list li i').each(function () {
    var chart = $(this).parent('li').attr('data-visible-chart');
    var visible = localStorage.getItem(chart);

    var result = $.grep(allitems, function (e) {
      if (e.id[0].attributes['2'].value == chart) {
        e.visible = visible==null || visible=='true';        
      }
    });

    visible = (visible === 'true' || !visible);
    showSettingItem(this, visible);
  });
  
  organiseTiles();
  
});

$(document).trigger("init");

/*
$(window).on("orientationchange", function (e) {
  setTimeout(function () {
    var settingdisplay = $('.settings-overlay').css('display');
    if (settingdisplay == 'block') {
      settingOpen();
    }
    organiseTiles();
  }, 100);  
});
*/
$(window).on("resize", function () {
  var settingdisplay = $('.settings-overlay').css('display');
  if (settingdisplay == 'block') {
    settingOpen();
  }
  organiseTiles();  
});

$(window).bind("pageshow", function (event) {
  if (event.originalEvent.persisted) {
    window.location.reload();
  }
});

// $(document).on('click','.color-blocks .item', function() {
//   var chart = $(this).data('target-chart');
//   openChart(chart);
// })