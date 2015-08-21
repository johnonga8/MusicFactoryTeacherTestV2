(function () {
    var fullheight = $(window).height();
    $('.js-fullheight-side').css('min-height', fullheight);
    $('.listing-books').css('height', fullheight - 85);
}());
//BINDING STARTS
function beforeShowListing(e)
{
    BindBooklistingDetails(allBooks);
}
function beforeHideListing(e)
{
  //Do Something
}
function afterShowListing(e)
{
    $(".preloader-mf").hide();
}
//SIGN OUT
/*$(".bttn-signout").click(function(){
    LogoutUser (currentUserName);
    app.navigate("#");
});*/



