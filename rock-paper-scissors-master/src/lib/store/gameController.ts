import { writable } from 'svelte/store';
import type { ItemType, Item } from './type';

type GamePlayType = 'normal' | 'advanced';
const gamePlayType = writable('normal');
let isNormalMode: boolean;
gamePlayType.subscribe((value) => {
	isNormalMode = value === 'normal';
});

function setGamePlayType(type: GamePlayType) {
	gamePlayType.set(type);
}

const ROCK: ItemType = 'rock';
const PAPER: ItemType = 'paper';
const SCISSORS: ItemType = 'scissors';
const LIZARD: ItemType = 'lizard';
const SPOCK: ItemType = 'spock';

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
	if (isNormalMode) {
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

/**
 * Wait for the computer to generate its input and then determine the winner
 * @param delay - The delay in milliseconds to wait for the computer to generate its input
 * @returns {Promise<Item>} - The computer input and the result of the game
 */
async function waitAndGenerateComputerInput(delay: number) {
	return new Promise<Item>((resolve) => {
		setTimeout(() => {
			const computerInput = generateComputerInput();
			resolve(computerInput);
		}, delay);
	});
}

const MIN_DELAY = 500;
const MAX_DELAY = 1500;
// Handle the player input and determine the winner
async function handlePlayerInput(playerInput: Item) {
	const randomDelay = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY;
	const computerInput = await waitAndGenerateComputerInput(randomDelay);
	const result = determineWinner(playerInput, computerInput);
	updateScore(result);
	return { computerInput, result };
}

export { playerScore, gamePlayType, setGamePlayType, handlePlayerInput, getItems };
