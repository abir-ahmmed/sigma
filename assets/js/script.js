(function ($) {
    'use strict';

    $(document).ready(function($){
      const $window = $(window);
      let didScroll,
        lastScrollTop = 0,
        delta = 5,
        $mainNav = $('#sticky'),
        $mainNavHeight = $mainNav.outerHeight(),
        scrollTop;

      $window.on('scroll', function () {
        didScroll = true;
        scrollTop = $(this).scrollTop();
      });

      setInterval(function () {
        if (didScroll) {
          hasScrolled();
          didScroll = false;
        }
      }, 200);

      function hasScrolled() {
        if (Math.abs(lastScrollTop - scrollTop) <= delta) {
          return;
        }
        if (scrollTop > lastScrollTop && scrollTop > $mainNavHeight) {
          $mainNav.css('top', -$mainNavHeight);
        } else {
          if (scrollTop + $(window).height() < $(document).height()) {
            $mainNav.css('top', 0);
          }
        }
        lastScrollTop = scrollTop;
      }

      //sticky header
      function navbarFixed() {
        if ($('#sticky').length) {
          $(window).scroll(function () {
            var scroll = $(window).scrollTop();
            if (scroll) {
              $('#sticky').addClass('navbar_fixed');
            } else {
              $('#sticky').removeClass('navbar_fixed');
            }
          });
        }
      }
      navbarFixed();

      $('.navbar-nav > li .mobile_dropdown_icon').on('click', function (e) {
        $(this).parent().find('ul').first().toggle(300);
        $(this).parent().siblings().find('ul').hide(300);
      });

      if ($('.submenu').length) {
        $('.submenu > .dropdown-toggle').on('click', function () {
          let location = $(this).attr('href');
          window.location.href = location;
          return false;
        });
      }

      // initialize wow.js
      new WOW().init();

      // initialize nice-select
      $('.nice-select-common').niceSelect();

      // Counter Up

      // SkillBar Animation
      if ($('.about-skillbar-wrapper').length) {
        let offsetTop = $('.about-skillbar-wrapper').offset().top;
        $(window).scroll(function() {
          let height = $(window).height();
          if($(window).scrollTop()+height > offsetTop) {
            $('.about-skillbar').each(skillAnimatedBar);
          }
        });

        function skillAnimatedBar() {
          $(this).find('.about-skillbar-bar').animate({
            width:$(this).attr('data-percent')
          },2000);
        }

        $('#aboutTab .nav-link').click(skillAnimatedBar);
      }

      // Awards Silder
      if ($('.awardSlider').length) {
        const awardSlider = new Swiper('.awardSlider', {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          breakpoints: {
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 4,
            },
          },
        });
      }

      // Portfioli Slider

      // Review Silder
      const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        loop:true,
        spaceBetween: 10,
        //  centeredSlides: true,
         autoplay:{
           delay:2500,
           disableOnInteraction:false,
         },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 31,
          },
        },

      });
      // Review Silder
      const reviewSwiper = new Swiper('.review-swiper', {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        loop:true,
        spaceBetween: 10,
        //  centeredSlides: true,
         autoplay:{
           delay:2500,
           disableOnInteraction:false,
         },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 31,
          },
        },

      });

      // blog Slider
      const presentations = new Swiper('.presentations', {
        slidesPerView: 1,
        spaceBetween: 10,
         navigation: {
           nextEl: ".swiper-button-next-2",
           prevEl: ".swiper-button-prev-2",
         },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          // renderBullet: function (index, className) {
          //   return '<span class="' + className + '">' + (index + 1) + "</span>";
          // },
        },
        loop:true,
        spaceBetween: 10,
        breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 1,
            spaceBetween: 31,
          },
        },

      });
      
    });
    

})(jQuery);

// Counter Up
$('.counting').each(function() {
  var $this = $(this),
      countTo = $this.attr('data-count');
  
  $({ countNum: $this.text()}).animate({
    countNum: countTo
  },

  {

    duration: 3000,
    easing:'linear',
    step: function() {
      $this.text(Math.floor(this.countNum));
    },
    complete: function() {
      $this.text(this.countNum);
      //alert('finished');
    }

  });  
  

});

document.addEventListener("DOMContentLoaded", function () {
  const pages = document.querySelectorAll(".swiper-slide");
  const pageNumbers = document.querySelectorAll(".page-number");
  const prevButton = document.getElementById("prevPage");
  const nextButton = document.getElementById("nextPage");
  let currentPage = 0;

  function showPage(pageNumber) {
      pages.forEach((page, index) => {
          if (index === pageNumber) {
              page.style.display = "block";
          } else {
              page.style.display = "none";
          }
      });
  }

  function updateButtons() {
      prevButton.disabled = currentPage === 0;
      nextButton.disabled = currentPage === pages.length - 1;
  }

  function setActive() {
      pageNumbers.forEach((page, index) => {
          if(currentPage === index) {
              page.classList.add("active");
          } else {
              page.classList.remove("active");
          }
      });
  }

  pageNumbers.forEach((page, index) => {
      page.addEventListener("click", function () {
          showPage(index);
          currentPage = index;
          updateButtons();
          setActive();
      });
  });

  prevButton.addEventListener("click", function () {
      if (currentPage > 0) {
          currentPage--;
          showPage(currentPage);
          updateButtons();
          setActive();
      }
  });

  nextButton.addEventListener("click", function () {
      if (currentPage < pages.length - 1) {
          currentPage++;
          showPage(currentPage);
          updateButtons();
          setActive();
      }
  });

  showPage(currentPage);
  updateButtons();
});






