$(function () {
  /*menu 기본형*/
  /*var $firstMenu = $("nav>ul>li");
  var $header = $("#header_wrap");

  $firstMenu
    .mouseover(function () {
      $header.stop().animate({ height: "300px" }, 300);
    })
    .mouseout(function () {
      $header.stop().animate({ height: "70px" }, 300);
    });*/

  /*서브메뉴의 높이대로 height가 달라지는 메뉴바*/
  /*-----네비------*/
  var $firstMenu = $("nav>ul>li");
  var $header = $("#header_wrap");
  var $headerHeight = $header.outerHeight();

  $firstMenu
    .mouseover(function () {
      var subHeight = $(this).find(".sub").outerHeight();
      $header.stop().animate({ height: $headerHeight + subHeight + "px" }, 500);
      //setTimenout (할일, 시간)
      $(this).find(".sub").show();
    })
    .mouseout(function () {
      $header.stop().animate({ height: $headerHeight + "px" }, 500);
      $(this).find(".sub").hide();
    });

  /*-----상단고정------ */

  var $header = $("#header_wrap");
  var $section1 = $(".section1");
  var executed = false;

  $(window).scroll(function () {
    var $currentSct = $(this).scrollTop();
    var $offset = 500;

    if ($currentSct > 0) {
      $header.addClass("sticky");
    } else {
      $header.removeClass("sticky");
    }

    /*------section1 나타나기------*/
    var $serviceThreshold = $section1.offset().top - $offset;
    var $serviceExecuted = false; // == 실행안됨

    if (!$serviceExecuted) {
      if ($currentSct > $serviceThreshold) {
        $section1.addClass("active");
        $serviceExecuted = true; //다시금 혹여나 스크롤이 생겨서 다시 실행하려해도 값이 true 바껴있기떄문에 다시 실행하지못한다
      }
    }

    /*---animated section */

    var threshold = $(".animated_section").offset().top - $offset;
    //console.log(threshold);

    if (!executed) {
      //if(executed == false)
      if ($currentSct >= threshold) {
        var progressRate = $(".animate").attr("data-number");
        var progressRate2 = $(".animate02").attr("data-number");
        var progressRate3 = $(".animate03").attr("data-number");
        //animate progress 사용자속성 값 precent-> 60% (숫자가 바뀌는)
        /* 
        animate 문법
        $(".box").animate({속성:값, 속성:값,},1500,easeOutQuint,function(){..다른할일})
  
        ==
  
        $(".box").animate({속성:값, 속성:값,},
          {
            duration:1500,
            easing: 'easeOutQuint',
            complete: function(){..다른할일}
            progress: funciion(){..바뀌는 과정마다(진행중) 할일}
          })
        */
        $({ number: 0 }).animate(
          { number: progressRate },
          {
            duration: 1500,
            progress: function () {
              var now = this.number;
              $(".animate").text(Math.ceil(now)).css({
                color: "white",
                fontSize: "3rem",
                position: "relative",
                top: "150px",
                left: "37%",
              });
            },
          }
        );
        $({ number: 0 }).animate(
          { number: progressRate2 },
          {
            duration: 1500,
            progress: function () {
              var now = this.number;
              $(".animate02").text(Math.ceil(now)).css({
                color: "white",
                fontSize: "50px",
                position: "relative",
                top: "86px",
                left: "48%",
              });
            },
          }
        );
        $({ number: 0 }).animate(
          { number: progressRate3 },
          {
            duration: 1500,
            progress: function () {
              var now = this.number;
              $(".animate03").text(Math.ceil(now)).css({
                color: "white",
                fontSize: "50px",
                position: "relative",
                top: "18px",
                left: "58%",
              });
            },
          }
        );
        executed = true;
      } //if 조건문
    } //executed if 조건문
  }); //scroll end

  /*-----슬라이드------*/

  //변수지정
  var slides = $(".slideshow img"),
    slideCount = slides.length,
    currentIndex = 0;

  slides.eq(currentIndex).fadeIn(); //열자마자 나타난다

  var timer = undefined; //타이머의 값을 undefined(지정되어 있지 않다)라고 지정합니다.

  if (timer == undefined) {
    //타이머의 값이 undefined이면 showNextslide를 3.5s 마다 실행하라고 합니다.
    timer = setInterval(showNextSlide, 3500);
  }

  function showNextSlide() {
    //slideCount에는 4로 저장되어있다.
    var nextIndex = (currentIndex + 1) % slideCount;
    slides.eq(currentIndex).fadeOut();
    slides.eq(nextIndex).fadeIn();

    currentIndex = nextIndex;
  } //showNextSlide

  function timerOn() {
    if (!timer) {
      timer = setInterval(showNextSlide, 3500);
    }
  }
  function timerOut() {
    if (timer) {
      clearInterval(timer);
      timer = undefined;
    }
  }

  slides
    .mouseover(function () {
      timerOut();
    })
    .mouseout(function () {
      timerOn();
    });

  //해당시간이 지나면 한번만 할일
  //var timer = setTimeout(할일,1000)
  //clearTimeOut(timer) =멈추기

  //일정시간 마다 할일
  //var timer = setInterval(할일,시간)
  //clearInterval(timer)

  //jquery에서 $로 변수를 만들면 집합개체(object) 중 특정번째 요소를 선택하는건 .eq

  /*----무한루프 작은 슬라이드 ------*/
  var slideWrapper = $(".slide_wrapper"),
    slideUl = slideWrapper.find(".slides"),
    slide = slideUl.find("li"),
    currentIdx = 0,
    slideCount = slide.length,
    slideWidth = 24,
    slideMargin = 1.05,
    moveAmt = slideWidth + slideMargin,
    maxSlides = 4,
    responsiveMargin = 10,
    newSlides,
    newSlideWidth,
    prevBtn = slideWrapper.find(".prev"),
    nextBtn = slideWrapper.find(".next");

  newSlideWidth = slideWidth;

  //복사본 생성하기 뒤에 5개 추가

  slideUl.append(slide.clone().addClass("clone"));

  //복사본 생성하기 앞에 5개 추가

  slideUl.prepend(slide.clone().addClass("clone"));

  //가로배열하기
  function slideLayout(sw, sm) {
    newSlides = $(".slide_wrapper li");
    moveAmt = sw + sm;

    newSlides.each(function (idx) {
      $(this).css({ left: moveAmt * idx + "%", width: sw + "%" });
    });
  }
  slideLayout(slideWidth, slideMargin);

  //중앙배치하기
  function setSlidePos() {
    var ulMoveAmt = -moveAmt * slideCount + "%";
    slideUl.css({ transform: "translateX(" + ulMoveAmt + ")" });
  }
  setSlidePos();

  //좌우 버튼 슬라이드 작성하기
  nextBtn.click(function () {
    moveSlide(currentIdx + 1);
  });
  prevBtn.click(function () {
    moveSlide(currentIdx - 1);
  });

  //슬라이드 이동 함수
  function moveSlide(num) {
    currentIdx = num;
    console.log(currentIdx, slideCount);
    /*num의 숫자를 이용해서 slides left값이 변경, animate 매서드 0.5초*/
    slideUl.stop().animate({ left: moveAmt * -num + "%" }, 300, function () {
      if (currentIdx == slideCount || currentIdx == -slideCount) {
        slideUl.css({ left: "0%" });
        currentIdx = 0;
      }
    });
  }

  //자동슬라이드

  var timer = undefined;

  function autoSlide() {
    if (timer == undefined) {
      unlimited = setInterval(function () {
        moveSlide(currentIdx + 1);
      }, 3000);
    }
  }
  autoSlide(); //브라우저 열자마자 실행

  function stopSlide() {
    clearInterval(unlimited);
    timer = undefined;
  }

  slideWrapper.mouseenter(function () {
    stopSlide();
  });
  slideWrapper.mouseleave(function () {
    autoSlide();
  });

  /*tab menu*/

  var tabAnchor = $(".tabs_nav li");
  var tabPanel = $(".tabs-panel");

  //링크를 클릭하면 할일
  tabAnchor.click(function (e) {
    e.preventDefault();
    $(this).find("a").addClass("active");
    $(this).siblings().find("a").removeClass("active");

    tabPanel.hide();

    var $targetIdx = $(this).index();
    tabPanel.eq($targetIdx).show();
  });

  //trigger 열자마자 방아쇠를 당기다
  tabAnchor.eq(0).trigger("click"); //열자마자 첫번째에 click이 되어있다

  /*go_top 버튼*/

  $(window).scroll(function () {
    if ($(this).scrollTop() >= 1500) {
      $(".go_top").fadeIn();
    } else {
      $(".go_top").fadeOut();
    }
  });

  $(".go_top").click(function (e) {
    e.preventDefault();
    $("html,body").stop().animate({ scrollTop: 0 }, 500);
  });

  /*햄버거 버튼*/
  $(".hamburger_btn").click(function (e) {
    e.preventDefault();
    $(this).toggleClass("active");

    /*모바일 전체메뉴 */
    $(".overlay").toggleClass("visible");
  });

  /*모바일 서브메뉴*/
  $(".overlay nav > ul > li").mouseover(function () {
    $(this).find(".mobile_sub").stop().slideDown(1500);
  });
  $(".overlay nav > ul > li").mouseout(function () {
    $(this).find(".mobile_sub").stop().slideUp();
  });
}); //end
