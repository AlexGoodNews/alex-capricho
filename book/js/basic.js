/*
 * Basic sample
*/

function addPage(page, book) {

	var id, pages = book.turn('pages');

	// Create a new element for this page
	var element = $('<div />', {});

	// Add the page to the flipbook
	if (book.turn('addPage', element, page)) {

		// Add the initial HTML
		// It will contain a loader indicator and a gradient
		element.html('<div class="gradient"></div><div class="loader"></div>');

		// Load the page
		loadPage(page, element);
	}

}

function loadPage(page, pageElement) {

	// Create an image element

	var img = $('<img />');

	img.mousedown(function(e) {
		e.preventDefault();
	});

	img.load(function() {
		
		// Set the size
		$(this).css({width: '100%', height: '100%'});

		// Add the image to the page after loaded

		$(this).appendTo(pageElement);

		// Remove the loader indicator
		
		pageElement.find('.loader').remove();
	});

	// Load the page

	img.attr('src', 'pages/' +  page + '.jpg');

}


function loadLargePage(page, pageElement) {
	
	var img = $('<img />');

	img.load(function() {

		var prevImg = pageElement.find('img');
		$(this).css({width: '100%', height: '100%'});
		$(this).appendTo(pageElement);
		prevImg.remove();
		
	});

	// Loadnew page
	
	img.attr('src', 'pages/' +  page + '-large.jpg');
}


function loadSmallPage(page, pageElement) {
	
	var img = pageElement.find('img');

	img.css({width: '100%', height: '100%'});

	img.unbind('load');
	// Loadnew page

	img.attr('src', 'pages/' +  page + '.jpg');
}



// http://code.google.com/p/chromium/issues/detail?id=128488
function isChrome() {

	return navigator.userAgent.indexOf('Chrome')!=-1;

}

/* ===============================
   FLIPBOOK
================================ */

function resizeBook() {

	const bookRatio = 922 / 600;

	let screenWidth = $(window).width();
	let screenHeight = $(window).height();

	let bookWidth = screenWidth;
	let bookHeight = screenWidth / bookRatio;

	if (bookHeight > screenHeight) {
		bookHeight = screenHeight;
		bookWidth = screenHeight * bookRatio;
	}

	$('.flipbook').turn('size', bookWidth, bookHeight);

	$('.flipbook').css({
		left: -(bookWidth / 2),
		top: -(bookHeight / 2)
	});
}

function loadApp() {

	$('.flipbook').turn({
		width: 922,
		height: 600,
		elevation: 50,
		gradients: true,
		autoCenter: true
	});
	$('.flipbook').turn('page', 2); //pagina 2
	resizeBook();
}

/* ===============================
   SWIPE
================================ */

function initSwipe() {

	let startX = 0;
	let startY = 0;

	$('.flipbook').on('touchstart', function (e) {
		const touch = e.originalEvent.touches[0];
		startX = touch.clientX;
		startY = touch.clientY;
	});

	$('.flipbook').on('touchend', function (e) {
		const touch = e.originalEvent.changedTouches[0];
		const deltaX = touch.clientX - startX;
		const deltaY = touch.clientY - startY;

		if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
			if (deltaX < 0) {
				$('.flipbook').turn('next');
			} else {
				$('.flipbook').turn('previous');
			}
		}
	});
}

/* ===============================
   INIT
================================ */

$(function () {
	loadApp();
	initSwipe();

	$(window).on('resize', resizeBook);
});