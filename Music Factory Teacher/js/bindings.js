//------GLOBAL VARIABLES-----//
var currentBookId;
var currentBookCultureName;
var currentBookType;
var currentBook;
var currentLessonNumber;
var currentChapterNumber;
var domain = "http://mf-live.a8hosting.com/";
var currentUserName;
var currentAppCultureName;
var appLabels;
var lessonContentLabels;
var playerInstance;
var currentVideoUrl;
var isPostBack = false;

//------FUNCTIONS FOR INFANT BOOK DETAILS START-----// 
function GetInfantBookById(_bookId, _cultureName) {
    $.ajax({
        type: "POST",
        url: domain + "Custom/Services/A8_MusicFactoryService.svc/GetInfantBookById",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ bookId: _bookId, cultureName: _cultureName }),
        async: false,
        success: function (result) {
            var book = result.d;
            currentBook = book;
        },
        error: function () { alert("error GetInfantById"); }
    });
};

function BindInfantCoverDetails(book) {
    var BookViewModel = GenerateInfantTableOfContents(book);
    kendo.bind($("#table-of-contents-cover-infant"), BookViewModel);
    GenerateInfantCoverDetails(book);
}

function BindInfantPrefaceDetails(book) {
    var BookViewModel = GenerateInfantTableOfContents(book);
    kendo.bind($("#table-of-contents-preface-infant"), BookViewModel);
    GenerateInfantPrefaceDetails(book);
}

function BindInfantLessonDetails(book) {
    var BookViewModel = GenerateInfantTableOfContents(book);
    kendo.bind($("#table-of-contents-theme-infant"), BookViewModel);
    GenerateInfantLessonDetails(book, currentChapterNumber, currentLessonNumber);
}

function BindInfantGlossaryDetails(book) {
    var BookViewModel = GenerateInfantTableOfContents(book);
    kendo.bind($("#table-of-contents-glossary-infant"), BookViewModel);
    GenerateInfantGlossaryDetails(book);
}

function GenerateInfantTableOfContents(infantbook) {
    var BookViewModel = kendo.observable({
        Book: infantbook,
        Themes: infantbook.Themes,
        CoverLabel: lessonContentLabels.First(function (label) { return label.key == "TableOfContents_CoverLabel" }).value,
        PrefaceTitle: infantbook.PrefaceTitle,
        GlossaryTitle: infantbook.GlossaryTitle,
        SlideToggle: function (e) {
            $(e.currentTarget).toggleClass('active-link');
            $(e.currentTarget).parent("li").toggleClass("li-active-link");
            $(e.currentTarget).siblings('ul').slideToggle();
            $(e.currentTarget).children(".glyphicon").toggleClass("glyphicon-triangle-bottom glyphicon-triangle-top");
        },
        SelectLesson: function (e) {
            currentLessonNumber = $(e.currentTarget).children('input.js-lessonnumber').val();
            currentChapterNumber = $(e.currentTarget).children('input.js-chapternumber').val();
            InitializeTabs();
            removeScroll();
            //$('#lesson-details-infant .km-scroll-container').hide().slideUp();
            //$('#lesson-details-infant .km-scroll-container').slideDown();
            if (window.location.href.indexOf("bookdetails") > -1) {
                hideDrawerID();
                GenerateInfantLessonDetails(currentBook, currentChapterNumber, currentLessonNumber);
            }
            else {
                //window.location = "#views/mf-infantbookdetails.html";
               // $(".preloader-mf").show();
                app.navigate("#lesson-details-infant");
            }
        },
        GoToPreface: function (e) {
            app.navigate("views/mf-infantbookpreface.html");
        },
        GoToCover: function (e) {
            app.navigate("#cover-details-infant");
        },
        GoToGlossary: function (e) {
            app.navigate("views/mf-infantbookglossary.html");
        },
    });
    return BookViewModel;
}

function GenerateInfantCoverDetails(book) {
    var bookdetailsfullheightcover = $(window).height();
    var CoverViewModel = kendo.observable({
        BookTitle: book.Title,
        CoverImageUrl: book.CoverImageUrl,
        PrefaceTitle: book.PrefaceTitle,
		Next: appLabels.First(function (label) { return label.key == "InfantCover_Next" }).value,
        GoToHomeLabel: appLabels.First(function (label) { return label.key == "GoToHomeLabel" }).value,
        TableOfContentsLabel: appLabels.First(function (label) { return label.key == "TableOfContentsLabel" }).value,
        GoToLibrary: function (e) {
            $(".preloader-mf").show();
            setTimeout(ajaxPreloader, 100);
            function ajaxPreloader(){
               app.navigate(dashboardURL);
            }
        },
    });
    kendo.bind($("#cover-details-infant"), CoverViewModel);
}

function GenerateInfantPrefaceDetails(book) {
    var firstLesson = book.Themes.First().Lessons.First();
    var PrefaceViewModel = kendo.observable({
        BookTitle: book.Title,
        PrefaceContent: book.Preface,
        FirstLessonNumber: firstLesson.LessonNumber,
		Next: appLabels.First(function (label) { return label.key == "InfantPreface_Next" }).value,
        BackCover: appLabels.First(function (label) { return label.key == "InfantPreface_BackCover" }).value,
        GoToHomeLabel: appLabels.First(function (label) { return label.key == "GoToHomeLabel" }).value,
        TableOfContentsLabel: appLabels.First(function (label) { return label.key == "TableOfContentsLabel" }).value,
        NextLessonClick: function (e) {
            currentLessonNumber = firstLesson.LessonNumber;
            currentChapterNumber = firstLesson.ThemeNumber;
            $(".preloader-mf").show();
            app.navigate("#lesson-details-infant");
        },
        GoToLibrary: function (e) {
            $(".preloader-mf").show();
            setTimeout(ajaxPreloader, 100);
            function ajaxPreloader(){
               app.navigate(dashboardURL);
            }
        },
    });
    kendo.bind($("#preface-details-infant"), PrefaceViewModel, kendo.ui, kendo.mobile.ui);
}

function GenerateInfantLessonDetails(book, chapterNumber, lessonNumber) {
    var currentLesson = GetLessonByNumber(book.Lessons, lessonNumber);
    var currentChapter = GetChapterByNumber(book.Themes, currentLesson.ThemeNumber)

    var currentIndex = jQuery.inArray(currentLesson, book.Lessons)

    var prevLessonNumber = "";
    var prevLesson;
    if (currentIndex > 0) {
        prevLesson = book.Lessons[currentIndex - 1];
    }
    if (prevLesson == null || prevLesson.LessonNumber == 0) {
        $(".bttn-prev-lesson").addClass("hide");
        $(".bttn-prev-preface").removeClass("hide");
    }
    else {
        prevLessonNumber = prevLesson.LessonNumber;
        $(".bttn-prev-lesson").removeClass("hide");
        $(".bttn-prev-preface").addClass("hide");
    }


    var nextLessonNumber = "";
    var nextLesson;
    if (currentIndex < (book.Lessons.length - 1)) {
        //nextLesson = GetLessonByNumber(book.Lessons, (parseInt(lessonNumber) + 1));
        nextLesson = book.Lessons[currentIndex + 1]
    }
    if (nextLesson == null) {
        $(".bttn-next-lesson").addClass("hide");
        $(".bttn-glossary-lesson").removeClass("hide");
    }
    else {
        nextLessonNumber = nextLesson.LessonNumber;
        $(".bttn-next-lesson").removeClass("hide");
        $(".bttn-glossary-lesson").addClass("hide");
    }

    var LessonViewModel = kendo.observable({
        Book: book,
        BookWelcome: book.WelcomeSong,
        BookGoodbye: book.GoodbyeSong,
        PrevLessonNumber: prevLessonNumber,
        CurrentLesson: currentLesson,
        CurrentTheme: currentChapter,
        NextLessonNumber: nextLessonNumber,
        GoToHomeLabel: appLabels.First(function (label) { return label.key == "GoToHomeLabel" }).value,
        TableOfContentsLabel: appLabels.First(function (label) { return label.key == "TableOfContentsLabel" }).value,
        PrefaceTitle: book.PrefaceTitle,
        BackPreface: appLabels.First(function (label) { return label.key == "InfantLesson_BackPreface" }).value,
        Back: appLabels.First(function (label) { return label.key == "InfantLesson_Back" }).value,
        GlossaryTitle: book.GlossaryTitle,
        NextGlossary: appLabels.First(function (label) { return label.key == "InfantLesson_NextGlossary" }).value,
        Next: appLabels.First(function (label) { return label.key == "InfantLesson_Next" }).value,
        Tab1: lessonContentLabels.First(function (label) { return label.key == "InfantLesson_Tab1" }).value,
        Tab2: lessonContentLabels.First(function (label) { return label.key == "InfantLesson_Tab2" }).value,
        Tab3: lessonContentLabels.First(function (label) { return label.key == "InfantLesson_Tab3" }).value,
        Tab4: lessonContentLabels.First(function (label) { return label.key == "InfantLesson_Tab4" }).value,
        PlayWelcomeSong: lessonContentLabels.First(function (label) { return label.key == "InfantLesson_PlayWelcomeSong" }).value,
        PlayGoodbyeSong: lessonContentLabels.First(function (label) { return label.key == "InfantLesson_PlayGoodbyeSong" }).value,
        Complete: lessonContentLabels.First(function (label) { return label.key == "InfantLesson_Complete" }).value,
        CompleteButton: lessonContentLabels.First(function (label) { return label.key == "InfantLesson_CompleteButton" }).value,
        MPC_Disclaimer: lessonContentLabels.First(function (label) { return label.key == "InfantLesson_MPC_Disclaimer" }).value,
        ComingSoon: lessonContentLabels.First(function (label) { return label.key == "Infant_Comingsoon" }).value,
        PrevLessonClick: function (e) {
            GenerateInfantLessonDetails(currentBook, prevLesson.ThemeNumber, prevLesson.LessonNumber);
            InitializeTabs();
            removeScroll();
        },
        NextLessonClick: function (e) {
            InitializeTabs();
            removeScroll();
            GenerateInfantLessonDetails(currentBook, nextLesson.ThemeNumber, nextLesson.LessonNumber);
        },
        GoToLibrary: function (e) {
            $(".preloader-mf").show();
            setTimeout(ajaxPreloader, 100);
            function ajaxPreloader(){
               app.navigate(dashboardURL);
            }
        },
    });
    kendo.bind($("#lesson-details-infant"), LessonViewModel);
    
    if(currentLesson.HasVideo === true)
    {
      initializeJWPlayer("video_infant", currentLesson.VideoUrl);
      InfantFullScreen();
      currentVideoUrl = currentLesson.VideoUrl;
    }
}

function GenerateInfantGlossaryDetails(book) {
    var lastLesson = book.Themes.Last().Lessons.Last();
    var GlossaryViewModel = kendo.observable({
        BookTitle: book.Title,
        GlossaryContent: book.Glossary,
        LastLessonNumber: lastLesson.LessonNumber,
		Back: appLabels.First(function (label) { return label.key == "InfantGlossary_Back" }).value,
        GoToHomeLabel: appLabels.First(function (label) { return label.key == "GoToHomeLabel" }).value,
        TableOfContentsLabel: appLabels.First(function (label) { return label.key == "TableOfContentsLabel" }).value,
        GoToLibrary: function (e) {
            $(".preloader-mf").show();
            setTimeout(ajaxPreloader, 100);
            function ajaxPreloader(){
               app.navigate(dashboardURL);
            }
        },
        PrevLessonClick: function (e) {
            currentLessonNumber = lastLesson.LessonNumber;
            currentChapterNumber = lastLesson.ThemeNumber;
            //  window.location = "#views/mf-infantbookdetails.html";
           // $(".preloader-mf").show();
            app.navigate("#lesson-details-infant");
        },
    });
    kendo.bind($("#glossary-details-infant"), GlossaryViewModel);
}

//------FUNCTIONS FOR INFANT BOOK DETAILS END-----//    

//------COMMON FUNCTIONS START-----//
function GetChapterByNumber(chapters, chapterNumber) {
    var chapter = chapters.First(function (chapter) { return chapter.ChapterNumber == chapterNumber });
    return chapter;
}

function GetLessonByNumber(lessons, lessonNumber) {
    var lesson = lessons.First(function (lesson) { return lesson.LessonNumber == lessonNumber });
    return lesson;
}

function RenderLessonsTemplate(chapter) {
    return kendo.Template.compile($('#lessons-template').html())(chapter);
}

function EnableScrolling() {
    $("#scroller").data("kendoMobileScroller").enable();
}

function GetTeacherAppLabels(cultureName) {
    appLabels = GetReusableContent(cultureName);
}

function GetLessonlessonContentLabels(cultureName){
  lessonContentLabels = GetReusableContent(cultureName);
}

function GetReusableContent(cultureName){
  var reusableContent;
  $.ajax({
        type: "POST",
        url: domain + "Custom/Services/A8_MusicFactoryService.svc/GetTeacherAppLabels",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ cultureName: cultureName }),
        async: false,
        success: function (result) {
            reusableContent = result.d;
        },
        error: function (error) { alert(error); }
    }); 
   return reusableContent;
}

function initializeJWPlayer(playerID, videoUrl) {
     jwplayer(playerID).setup({
       file: videoUrl,
        height: 360,
        width: 400,
        modes:[{type:'html5'}]
    });
    
};

function InfantFullScreen(){
    jwplayer("video_infant").on('fullscreen', function(e) {
      if(jwplayer("video_infant").getFullscreen(true))
      {
        var screenheight = $(window).height();
        var screenheightTotal = screenheight - 100;
        $(".jwplayer.jw-flag-fullscreen").attr('style',  'height:' + screenheightTotal +'px !important');
        removeScroll();
      }
      else
      {
        $(".jwplayer").attr('style',  'height:' + 360 +'px !important;width:400px!important');
        removeScroll();
      }
    });
}

function ToggleLanguageClassByBook(bookCultureName){
  if (bookCultureName === "zh") {
      $("body").addClass("lang-zh-book");
  }
  else {
      $("body").removeClass("lang-zh-book");
  }
}

function ToggleLanguageClassByApp(appCultureName){
  if (appCultureName === "zh") {
      $("body").addClass("lang-zh");
  }
  else {
      $("body").removeClass("lang-zh");
  }
}