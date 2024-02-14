import { writable } from 'svelte/store';

type GamePlayType = 'normal' | 'advanced';
let gamePlayType: GamePlayType = 'normal';

function setGamePlayType(type: GamePlayType) {
	gamePlayType = type;
}

function getGameTitle() {
	if (gamePlayType === 'normal') {
		return 'Rock Paper Scissors';
	} else {
		return 'Rock Paper Scissors Lizard Spock';
	}
}

type ItemType = 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock';
const ROCK: ItemType = 'rock';
const PAPER: ItemType = 'paper';
const SCISSORS: ItemType = 'scissors';
const LIZARD: ItemType = 'lizard';
const SPOCK: ItemType = 'spock';

type Item = {
	name: ItemType;
	image: string;
	beats: string[];
	color: string;
	boxShadow: string;
	colorLayer0?: string;
	colorLayer1?: string;
};

export const items: Record<ItemType, Item> = {
	[ROCK]: {
		name: ROCK,
		image: 'images/icon-rock.svg',
		beats: ['scissors', 'lizard'],
		color: '--rock',
		boxShadow: '--rock-box-shadow',
		colorLayer0: '#9D1634',
		colorLayer1: '#DB2E4D'
	},
	[PAPER]: {
		name: PAPER,
		image: 'images/icon-paper.svg',
		beats: ['rock', 'spock'],
		color: '--paper',
		boxShadow: '--paper-box-shadow',
		colorLayer0: '#2A45C2',
		colorLayer1: '#4664F4'
	},
	[SCISSORS]: {
		name: SCISSORS,
		image: 'images/icon-scissors.svg',
		beats: ['paper', 'lizard'],
		color: '--scissors',
		boxShadow: '--scissors-box-shadow',
		colorLayer0: '#C76C1B',
		colorLayer1: '#EB9F0E'
	},
	[LIZARD]: {
		name: LIZARD,
		image: 'images/icon-lizard.svg',
		beats: ['spock', 'paper'],
		color: '--lizard',
		boxShadow: '--lizard-box-shadow',
		colorLayer0: '#5F37A8',
		colorLayer1: '#834EE3'
	},
	[SPOCK]: {
		name: SPOCK,
		image: 'images/icon-spock.svg',
		beats: ['scissors', 'rock'],
		color: '--spock',
		boxShadow: '--spock-box-shadow',
		colorLayer0: '#2D8DAB',
		colorLayer1: '#3FB7CD'
	}
};

const getItems = () => {
	let gameItems: Item[] = [];
	if (gamePlayType === 'normal') {
		gameItems = [items[ROCK], items[PAPER], items[SCISSORS]];
	} else {
		gameItems = [items[ROCK], items[PAPER], items[SCISSORS], items[LIZARD], items[SPOCK]];
	}
	return gameItems;
};

/**
 * Generate a random item for the computer
 * @returns {Item} - The randomly generated item for the computer, the scope of this item is limited regarding the game type
 */
function generateComputerInput(): Item {
	const scope = getItems().length;
	const randomIndex = Math.floor(Math.random() * scope);
	const randomItem = getItems()[randomIndex];
	return randomItem;
}

function determineWinner(playerInput: Item, computerInput: Item) {
	if (playerInput === computerInput) {
		return 'draw';
	}

	if (playerInput.beats.includes(computerInput.name)) {
		return 'win';
	}

	return 'lose';
}

const playerScore = writable(0);
function updateScore(result: 'win' | 'lose' | 'draw') {
	if (result === 'win') {
		playerScore.update((score) => score + 1);
	}
}

function handlePlayerInput(playerInput: Item) {
	const computerInput = generateComputerInput();
	const result = determineWinner(playerInput, computerInput);
	console.table({ playerInput, computerInput, result });
	updateScore(result);
}

export { playerScore, gamePlayType, setGamePlayType, getGameTitle, handlePlayerInput, getItems };
