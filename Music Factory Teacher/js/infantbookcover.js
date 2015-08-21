function InfantafterShow(){
    setTimeout(function () {
        $("#table-of-contents-cover-infant").data("kendoMobileDrawer").show();
    }, 1);
}
//NAV
DropNav();
//FULL HEIGHT
var bookdetailsfullheightcover = $(window).height();
$('.js-fullheight-cover').css('min-height', (bookdetailsfullheightcover - 100));
//BINDING STARTS
//Function for drawer
function initInfantcover(e)
{
//Do Something
}
function beforeShowInfantcover(e)
{
  if (isPostBack == false)
  {
  GetInfantBookById("7bbb7bb3-986e-67b9-8ff0-ff0000d15b77", "zh");
  GetLessonlessonContentLabels("zh");
  GetTeacherAppLabels("zh");
  isPostBack = true;
  }
  BindInfantCoverDetails(currentBook);
  closeNav();
}
function afterShowInfantcover(e)
{  
  $(".preloader-mf").hide();
  InfantafterShow();
}
function beforeHideInfantcover(e)
{
  //Do Something
}