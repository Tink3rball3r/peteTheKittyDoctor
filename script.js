// nav
const openBtn = document.getElementById('open-btn');
const closeBtn = document.getElementById('close-btn');
const nav = document.querySelector('.nav');

openBtn.addEventListener('click', openMenu);

closeBtn.addEventListener('click', closeMenu);

function openMenu() {
	nav.classList.add('open');
}

function closeMenu() {
	nav.classList.remove('open');
}

// game

const cards = document.querySelectorAll('.content');
const cardBack = document.querySelectorAll('.back');
const deck = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;
	this.classList.add('flip');

	if (!hasFlippedCard) {
		// first card clicked
		hasFlippedCard = true;
		firstCard = this;

		return;
	}

	// second card clicked

	secondCard = this;
	checkForMatch();
}

function checkForMatch() {
	let isMatch = firstCard.dataset.match === secondCard.dataset.match;
	isMatch ? disableCards() : unFlipCards();
}

function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);

	resetBoard();
}

function unFlipCards() {
	lockBoard = true;
	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');
		resetBoard();
	}, 1500);
}

function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

(function shuffle() {
	deck.forEach((deck) => {
		let randomPos = Math.floor(Math.random() * 20);
		deck.style.order = randomPos;
	});
})();

cards.forEach((card) => card.addEventListener('click', flipCard));
