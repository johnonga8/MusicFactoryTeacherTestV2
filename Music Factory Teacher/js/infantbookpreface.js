//FULL HEIGHT
var bookdetailsfullheightpreface = $(window).height();
$('.js-fullheight-preface').css('min-height', (bookdetailsfullheightpreface - 100));
//BINDING STARTS
//Function for drawer
function beforeShowInfantpreface(e)
{
  $(".preloader-mf").show();
  BindInfantPrefaceDetails(currentBook);
  closeNav();
}
function afterShowInfantpreface(e)
{ 
  $(".preloader-mf").hide();
}
function beforeHideInfantpreface(e)
{
//Do Something
}