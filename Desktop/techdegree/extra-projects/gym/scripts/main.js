
/* ================================= 
  Parallax Scrolling
==================================== */

window.addEventListener("DOMContentLoaded", scrollLoop, false);

	var yScrollPosition;
	var speed = 0.3;	
	var parallaxElement = $(".parallax");

function scrollLoop(e) {
  	// scroll img opposite direction
  	yScrollPosition = -($(window).scrollTop());

	parallaxElement.each( function() {
		$(this).css('background-position', 'center ' + (yScrollPosition*speed) + 'px');		
	});

	requestAnimationFrame(scrollLoop);
}


/* ================================= 
  Navigation
==================================== */

var $mobileMenu = $("#mobile-menu");
var $navBar = $("#nav-bar");


// Mobile Menu toggle class
$mobileMenu.on('click', function() {
	$(this).toggleClass("change");
	$navBar.slideToggle("slow");
});


$('#nav-bar li a').on('click', function() {
	var target = '#' + $(this).attr('data-target');
	$('html, body').animate({
		scrollTop: $(target).offset().top
	}, 1000);
	
});


/* ================================= 
  Tabs for Instuctors Section
==================================== */

$('.tab').on('click', function() {
	var tab_id = $(this).attr('data-tab');
	// Remove all current class
	$('.tab').removeClass('current');
	$('.tab-content').removeClass('current');
	// Add cureent to selected tab
	$(this).addClass('current');
	$('#'+tab_id).addClass('current');
});


/* ================================= 
  Slider
==================================== */

var interval;
var ul = $(".slider ul");
var $slideContainer = $('.slider');
var slideCount = $('.slider ul li').length;
var slideIndex = 0;
var firstSlide = ul.find("li:first-child");
var lastSlide = ul.find("li:last-child");

// // Clone the last slide and add as first li element
lastSlide.clone().prependTo(ul);

// // Clone the first slide and add as last li element
firstSlide.clone().appendTo(ul);


ul.css("margin-left", "-100%");


$('.slide-bullet').on('click', function() {
	var bulletIndex = $(this).index();
	slide(bulletIndex);	
});

$('.next').on('click', function() {	
	moveLeft();
});

$('.previous').on('click', function() {
	moveRight();
});

function moveRight() {
	ul.animate({ "margin-left": '+=100%'}, 400, function() {
	  	slideIndex--;
	 	if(slideIndex === -1) {
	   		ul.css("margin-left", (slideCount) * (-100) + "%");
		    slideIndex = slideCount - 1; 
  		}
 	});
}

function moveLeft() {
   ul.animate({ "margin-left": '-=100%'}, 400, function() {
       slideIndex ++;
       if(slideIndex === slideCount){
         ul.css("margin-left", "-100%");
         slideIndex = 0; 
       }
   });
}

function startSlider() {
     interval = setInterval(function () {
        moveLeft();
      }, 3000);
 }

 function pauseSlider() {
 	clearInterval(interval);
 }

 $slideContainer
    .on('mouseenter', pauseSlider)
    .on('mouseleave', startSlider);

startSlider();


















// var slides = [ 
	
// 	{ image: "slide1" },

// 	{ image: "slide2" },

// 	{ image: "slide3" }

// ]

// var html = '';


// function print(html) {
// 	// $('.main-banner').html(div);
// 	var outputDiv = document.getElementById('top');
// 	outputDiv.innerHTML = html;
// }

// for (var i=0; i<slides.length; i++) {

// 	html += "<div class=" + slides[i].image + " >";
// 	html += "</div>";
	
// }

// print(html)




