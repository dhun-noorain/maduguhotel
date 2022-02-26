let navBtn = document.getElementById('nav-btn');
let navlinks = document.getElementById('nav-links');
let navlink = document.querySelectorAll('.nav-link');

function init() {
	navBtn.addEventListener('click', toggleNav, false);
	navlinks.addEventListener('click', toggleNav, false);
}

function toggleNav() {
	if (navlinks.className == 'hide-nav') {
		navlinks.className = 'show-nav';
	} else {
		navlinks.className = 'hide-nav';
	}
}

document.addEventListener('DOMContentLoaded', init, false);
