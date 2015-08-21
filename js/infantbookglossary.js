DropNav();
var bookdetailsfullheightglossary = $(window).height();
//BINDING STARTS
//Function for drawer
function beforeShowInfantglossary(e)
{
  BindInfantGlossaryDetails(currentBook);
  closeNav();
}
function afterShowInfantglossary(e)
{
  $(".preloader-mf").hide();
}
function beforeHideInfantglossary(e)
{
//Do Something
}