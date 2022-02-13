// NAVIGATION MENU ITEMS ACTIVE ON PAGE SCROLL
window.addEventListener('scroll', () => {
	const sections = document.querySelectorAll('section');
	const scrollY = window.pageYOffset;

	sections.forEach((current) => {
		let sectionHeight = current.offsetHeight;
		let sectionTop = current.offsetTop - 50;
		let id = current.getAttribute('id');

		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
			document
				.querySelector('.nav-items a[href*=' + id + ']')
				.classList.add('active');
			document
				.querySelector('.sidebar .nav-items a[href*=' + id + ']')
				.classList.add('active');
		} else {
			document
				.querySelector('.nav-items a[href*=' + id + ']')
				.classList.remove('active');
			document
				.querySelector('.sidebar .nav-items a[href*=' + id + ']')
				.classList.remove('active');
		}
	});
});

// DARK & LIGHT MODE
const themeBtn = document.querySelector('.theme-btn');

themeBtn.addEventListener('click', () => {
	document.body.classList.toggle('dark-theme');
	themeBtn.classList.toggle('sun');

	localStorage.setItem('saved-theme', getCurrentTheme());
	localStorage.setItem('saved-icon', getCurrentIcon());
});

const getCurrentTheme = () =>
	document.body.classList.contains('dark-theme') ? 'dark' : 'light';
const getCurrentIcon = () =>
	themeBtn.classList.contains('sun') ? 'sun' : 'moon';

const savedTheme = localStorage.getItem('saved-theme');
const savedIcon = localStorage.getItem('saved-icon');

if (savedTheme) {
	document.body.classList[savedTheme === 'dark' ? 'add' : 'remove'](
		'dark-theme'
	);
	themeBtn.classList[savedIcon === 'sun' ? 'add' : 'remove']('sun');
}

// HAMBURGER MENU
const menuBtn = document.querySelector('.menu-btn');
const sideBar = document.querySelector('.sidebar');
const navigation = document.querySelector('.navigation');
const navItems = document.querySelectorAll('.nav-items a');
let menuOpen = false;

menuBtn.addEventListener('click', () => {
	if (!menuOpen) {
		menuBtn.classList.add('open');
		menuOpen = true;
		sideBar.classList.add('active');
	} else {
		menuBtn.classList.remove('open');
		menuOpen = false;
		sideBar.classList.remove('active');
	}
});

navItems.forEach((navItem) => {
	navItem.addEventListener('click', () => {
		menuBtn.classList.remove('open');
		menuOpen = false;
		sideBar.classList.remove('active');
	});
});

// TYPE WRITER EFFECT
const TypeWriter = function (txtElement, words, wait = 3000) {
	this.txtElement = txtElement;
	this.words = words;
	this.txt = '';
	this.wordIndex = 0;
	this.wait = parseInt(wait, 10);
	this.type();
	this.isDeleting = false;
};

TypeWriter.prototype.type = function () {
	const current = this.wordIndex % this.words.length;
	const fullTxt = this.words[current];

	if (this.isDeleting) {
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.txtElement.innerHTML = `<span class="txt">${this.txt}<span>`;

	let typeSpeed = 100;

	if (this.isDeleting) {
		typeSpeed /= 2;
	}

	if (!this.isDeleting && this.txt === fullTxt) {
		typeSpeed = this.wait;
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		this.wordIndex++;
		typeSpeed = 100;
	}

	setTimeout(() => this.type(), typeSpeed);
};

function init() {
	const txtElement = document.querySelector('.txt-type');
	const words = JSON.parse(txtElement.getAttribute('data-words'));
	const wait = txtElement.getAttribute('data-wait');

	new TypeWriter(txtElement, words, wait);
}

document.addEventListener('DOMContentLoaded', () => {
	init();

	const el_autohide = document.querySelector('.autohide');

	if (el_autohide) {
		let last_scroll_top = 0;

		window.addEventListener('scroll', function () {
			let scroll_top = window.scrollY;
			if (scroll_top < last_scroll_top) {
				el_autohide.classList.remove('scrolled-down');
				el_autohide.classList.add('scrolled-up');
			} else {
				el_autohide.classList.remove('scrolled-up');
				el_autohide.classList.add('scrolled-down');
			}

			last_scroll_top = scroll_top;
		});
	}
});

// SCROLL TO TOP BUTTON
const scrollTopBtn = document.querySelector('.scrollToTop-btn');

window.addEventListener('scroll', () => {
	scrollTopBtn.classList.toggle('active', window.scrollY > 500);
});

scrollTopBtn.addEventListener('click', () => {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
});
