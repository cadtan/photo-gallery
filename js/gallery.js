
var $overlay = $("<div id='overlay'></div>");
var $image =  $("<img>");
var $slidesContainer =  $("<div id='slidesContainer' class='clearfix'></div>");
var $caption = $("<div id='caption'></div>");
var $next = $('<button id="next" class="btn" type="button"> > </button>');
var $previous = $('<button id="previous" class="btn" type="button"> < </button>');
var $iframe = $("<iframe></iframe>");
var $videoContainer = $("<div class='videoContainer'></div");

var imageCount = $('#imageGallery li').length;
var currentIndex = 0;

$slidesContainer.append($image);
$videoContainer.append($iframe);
$slidesContainer.append($videoContainer);
$slidesContainer.append($caption);
$overlay.append($next);
$overlay.append($previous);
$overlay.append($slidesContainer);
$("body").append($overlay);

//Extracts caption title and text from image attributes
function getCaption( index ) {
	var currentLink = $('#imageGallery li').eq(index);
	var captionText = currentLink.find('img').attr('title');
	var captionTitle = currentLink.find('img').attr('alt').substring(8);
	// build caption html
	var captionHTML = '<h2>' + captionTitle + '</h2>';	
		captionHTML += '<span>' + captionText + '</span>';	
	return captionHTML;
}

// Show slides
function displaySlide(imageLocation, caption) {
	$overlay.show();
	// if the link is video or image, show image/video
	if( imageLocation.substring(0, 5) === "image") {
		$videoContainer.hide();
		$iframe.hide();
		$image.show();
		$image.attr("src", imageLocation);
	} else {
		$image.hide();
		$videoContainer.show();
		$iframe.show();
		$iframe.attr("src", imageLocation);
	}
	// print caption
	$caption.html(caption);		
}

//Capture the click event on a link to an image
$("#imageGallery a").click( function(event) {
	event.preventDefault();
	// update overlay with the image linked in the link
	var imageLocation = $(this).attr('href');
	// update current image index
	currentIndex = $(this).parent().index();
	// get caption
	var caption = getCaption( currentIndex );
	// show the overlay.
	$overlay.fadeIn(250);
	// call function to display slides
	displaySlide( imageLocation, caption );
});

// Close lighbox 
$overlay.on('click', function(event) { 
	// prevent closing lightbox when clicking on next/prev button
  if( !$(event.target).closest('button').length ) {
    $("#overlay").hide();
  }
});

// Next button
$next.click( function(){ 
	// if current slide is last image, stop at last else increment currentIndex
	if ( currentIndex === imageCount - 1  ) {
		currentIndex = imageCount - 1;
	} else {
		currentIndex++;
	}	
	// update current image location and caption
	var nextImageList = $('#imageGallery li').eq(currentIndex );	
	var nextImageLocation = nextImageList.find('a').attr("href");
	var caption = getCaption( currentIndex );
	// display next slide
	displaySlide( nextImageLocation, caption );		
});

// Previous button
$previous.click( function(){	
	// if current slide is first image, stop at first else decrement currentIndex 
	if ( currentIndex === 0  ) {
		currentIndex = 0;
	} else {
		currentIndex--;
	}
 	// update current image location and caption
	var prevImageList = $('#imageGallery li').eq(currentIndex);	
	var prevImageLocation = prevImageList.find('a').attr("href");
	var caption = getCaption( currentIndex );
	// display previous slide
	displaySlide( prevImageLocation, caption );			
});

// Search box filters photos based on the captions
$("#search").keyup(function(){
   // retrieve the input field text 
  var filter = $(this).val();
  // loop through each list
  $("#imageGallery li img").each(function(){
      // if the list item does not contain the text, fade it out
      if ( $(this).attr("title").search(new RegExp(filter, "i") ) < 0 ) {
        $(this).fadeOut();      
      } else {
       // show the list item 
        $(this).show();         
      }
	});
});
 
// Keyboard navigation for browsing photos
$("body").keydown(function(e) {
  if(e.keyCode == 37) { // left
  	$previous.click();
  }
  else if(e.keyCode == 39) { // right
    $next.click();
  }
});