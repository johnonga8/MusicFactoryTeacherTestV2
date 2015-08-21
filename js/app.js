//INITIATE APP
/**document.addEventListener("deviceready", function () {  
   navigator.splashscreen.hide();

    app = new kendo.mobile.Application($(document.body), { initial: "#login" });
}, false);**/
var app = new kendo.mobile.Application($(document.body), { initial: "#lesson-details-infant" });
//CLEAR STORAGE
ClearStorage();
function ClearStorage(){
    localStorage.clear();
    window.localStorage.clear();
    window.sessionStorage.clear();
}
//DRAWER
function hideDrawerIC() {
    $("#table-of-contents-cover-infant").data("kendoMobileDrawer").hide();
}
function hideDrawerIP() {
    $("#table-of-contents-preface-infant").data("kendoMobileDrawer").hide();
}
function hideDrawerID() {
    $("#table-of-contents-theme-infant").data("kendoMobileDrawer").hide();
}
function hideDrawerIG() {
    $("#table-of-contents-glossary-infant").data("kendoMobileDrawer").hide();
}
function hideDrawerKC() {
    $("#table-of-contents-cover-kinder").data("kendoMobileDrawer").hide();
}
function hideDrawerKP() {
    $("#table-of-contents-preface-kinder").data("kendoMobileDrawer").hide();
}
function hideDrawerKD() {
    $("#table-of-contents-chapter-kinder").data("kendoMobileDrawer").hide();
}
function hideDrawerKG() {
    $("#table-of-contents-glossary-kinder").data("kendoMobileDrawer").hide();
}
function onShowDrawer(){
    var isVisible = $('.table-of-contents').getKendoMobileDrawer().visible;
    var toCheadHeight = $(".bookdetails-drawer-head").height();
    var libraryheight = $(window).height();
    $('#scroller').css('height', (libraryheight - toCheadHeight - 50));
    closeNav();
};
//MEDIA
function PauseMedia() {
  if ( $( "audio" ).length ) { 
    $("audio").trigger("pause");
    $("audio").load();
  } else {
    console.log("no audio");
  }
};
function stopMedia(){
  if ( $( "audio" ).length ) { 
    $("audio").trigger("pause");
  } else {
    console.log("no audio");
  }
};
//REMOVE SCROLL
function removeScroll(){
    $("#lesson-details-kinder .km-scroll-container").css("-webkit-transform","translate3d(0px, 0px, 0px)");
    $("#lesson-details-infant .km-scroll-container").css("-webkit-transform","translate3d(0px, 0px, 0px)");
};

//REMOVE COLLAPSIBLE ON PAGE LOAD
function closeNav() {
  $(".js-subnav-link").siblings('ul').hide();
  $(".js-subnav-link").removeClass("active-link");
  $(".js-subnav-link").parent("li").removeClass("li-active-link");
  $(".js-subnav-link").children(".glyphicon").removeClass("glyphicon-triangle-top").addClass("glyphicon-triangle-bottom"); 
  $("#scroller .km-scroll-container").css("transform","translate3d(0px, 0px, 0px)");
  $("#scroller .km-scroll-container").css("-webkit-transform","translate3d(0px, 0px, 0px)");
};
//COLLAPSABLE NAV
function DropNav(){
  $(".js-subnav-link").click(function(){
  $(this).siblings('ul').slideToggle();
  $(this).toggleClass("active-link");
  $(this).parent("li").toggleClass("li-active-link");
  $(this).children(".glyphicon").toggleClass("glyphicon-triangle-bottom glyphicon-triangle-top");  
  $(".bookdetails-drawer-firstnav .km-scroll-container").css("transform","translate3d(0px, 0px, 0px)");
  $(".bookdetails-drawer-firstnav .km-scroll-container").css("-webkit-transform","translate3d(0px, 0px, 0px)");
  });
};
//FANCYBOX
$(document).ready(function() {
  $('.fancybox').fancybox({
  });
	$('.fancybox-notify').fancybox({
    closeBtn: false,
    wrapCSS: "notify-wrap",
    maxWidth: 600,
    minHeight: 200,
	});
});
//FLEXSLIDER
function FlexsliderReference(){
  $('.gallery-refer').flexslider({
    slideshow: false,
    animation: "slide",
    controlNav: "thumbnails"
  });  
};
function FlexsliderMusic(){
  $('.gallery-music').flexslider({
    slideshow: false,
    animation: "slide",
    controlNav: "thumbnails"
  });  
};
//TABS Initialize
function InitializeTabs(){
  $(".js-kindertabs .bookdetails-tabs li").removeClass('tab-active');
  $(".js-kindertabs .tab-control-01").addClass("tab-active");
  $(".js-kindertabs .tab-content-01").show();
  $(".js-kindertabs .tab-content-02").hide();
  $(".js-kindertabs .tab-content-03").hide();
  $(".js-kindertabs .tab-content-04").hide();
  $(".js-kindertabs .tab-content-05").hide();
    
  $(".js-infanttabs .bookdetails-tabs li").removeClass('tab-active');
  $(".js-infanttabs .tab-control-01").addClass("tab-active");
  $(".js-infanttabs .tab-content-01").show();
  $(".js-infanttabs .tab-content-02").hide();
  $(".js-infanttabs .tab-content-03").hide();
  $(".js-infanttabs .tab-content-04").hide();
  $(".js-infanttabs .tab-content-05").hide();
};

//LINQ INITIALIZATION
Array.prototype.First = function (predicate, def) {
    var l = this.length;
    if (!predicate) return l ? this[0] : def == null ? null : def;
    for (var i = 0; i < l; i++)
        if (predicate(this[i], i, this))
            return this[i];
    return def == null ? null : def;
};

Array.prototype.Last = function (predicate, def) {
    var l = this.length;
    if (!predicate) return l ? this[ l-1 ] : def == null ? null : def;
    for (var i = l-1; i >= 0; i--)
        if (predicate(this[i], i, this))
            return this[i];
    return def == null ? null : def;
};




