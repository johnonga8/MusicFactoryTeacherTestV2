//FULL HEIGHT
var indexFullheight = $(window).height();
$('.js-fullheight-index').css('min-height', indexFullheight);


$("#appLanguage").val();

function afterShowIndex(e)
{
   $(".preloader-mf").hide();
}
function beforeHideIndex(e)
{
  $(".preloader-mf").show();
}

function beforeShowIndex(e)
{
    var langSelect = $(".choose-language select").val();
    $("#appLanguage").val(langSelect);
    currentAppCultureName = $("#appLanguage").val()
    GetTeacherAppLabels(currentAppCultureName);
    BindLoginDetails();
}
//PASSWORD
function beforeShowPassword(e)
{
    $(".preloader-mf").hide();
}

$( ".login-input" ).focus(function() {
  $(".login-error").hide();
});
