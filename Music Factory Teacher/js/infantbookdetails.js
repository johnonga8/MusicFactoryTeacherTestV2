(function () {
    //NAV
    DropNav();
    //FULL HEIGHT
    var bookdetailsfullheight = $(window).height();
    $('.js-fullheight').css('min-height', (bookdetailsfullheight - 100));
    $('.js-drawerheight .km-listview-wrapper').css('min-height', (bookdetailsfullheight - 100));
    //TABS
    $('.infant-tabs li').click(function(){
      var tab_id = $(this).attr('data-tab');
      $('.infant-tabs li').removeClass('tab-active');
      $('.js-infanttabs .tab-content-wrap').hide();
      $(this).addClass('tab-active');
      $("#"+tab_id).show();
        if(currentVideoUrl != null)
        {
          initializeJWPlayer("video_infant", currentVideoUrl);
          InfantFullScreen();
         }
        if ( $( "audio" ).length ) { 
          $("audio").trigger("pause");
          $("#"+tab_id).find("audio").load();
        } else {
          //do nothing
        }
      if (tab_id === "infanttab-2"){
        FlexsliderReference();
      } else if (tab_id === "infanttab-3") {
        FlexsliderMusic();
      } else if (tab_id === "infanttab-4"){
        $.fancybox.open([{ href: '#comingsoon',wrapCSS: "comingsoon-wrap" }]);
        /*INPUT TEMP
        $(".moments-publish").click(function(){
          $(".moments-img input").toggle();
          $(".moments-active").toggle();
          $(".phototooltip").toggle();
          $(".photoselected").toggle();
        });**/
      } else {
        console.log('no slider');
      }
    })
    //INPUT TEMP
    $(".moments-publish").click(function(){
      $(".moments-img input").toggle();
      $(".moments-active").toggle();
      $(".phototooltip").toggle();
      $(".photoselected").toggle();
    });
}());
//BINDING STARTS
//Function for drawer
function beforeShowInfantthemes(e)
{
  if (isPostBack == false)
  {
  GetInfantBookById("7bbb7bb3-986e-67b9-8ff0-ff0000d15b77", "zh");
  GetLessonlessonContentLabels("zh");
  GetTeacherAppLabels("en");
  currentChapterNumber = 1;
  currentLessonNumber = 1;
  isPostBack = true;
  }
  BindInfantLessonDetails(currentBook);
  $(".preloader-mf").show();
  closeNav();
  InitializeTabs();
  PauseMedia();
}
function afterShowInfantthemes(e)
{
  $(".preloader-mf").hide();
}
function beforeHideInfantthemes(e)
{
  stopMedia();
  if(currentVideoUrl != null)
  {
    jwplayer("video_infant").pause(true);
  }
}
