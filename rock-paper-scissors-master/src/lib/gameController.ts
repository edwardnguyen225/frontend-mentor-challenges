type GamePlayType = 'normal' | 'advanced';
let gamePlayType: GamePlayType = 'advanced';

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
};

export const items: Record<ItemType, Item> = {
	[ROCK]: {
		name: ROCK,
		image: 'images/icon-rock.svg',
		beats: ['scissors', 'lizard']
	},
	[PAPER]: {
		name: PAPER,
		image: 'images/icon-paper.svg',
		beats: ['rock', 'spock']
	},
	[SCISSORS]: {
		name: SCISSORS,
		image: 'images/icon-scissors.svg',
		beats: ['paper', 'lizard']
	},
	[LIZARD]: {
		name: LIZARD,
		image: 'images/icon-lizard.svg',
		beats: ['spock', 'paper']
	},
	[SPOCK]: {
		name: SPOCK,
		image: 'images/icon-spock.svg',
		beats: ['scissors', 'rock']
	}
};

/**
 * Retrieve the items for the current game type
 */
const getItems = () => {
	if (gamePlayType === 'normal') {
		return [ROCK, PAPER, SCISSORS];
	} else {
		return [ROCK, PAPER, SCISSORS, LIZARD, SPOCK];
	}
};

/**
 * Generate a random item for the computer
 * @returns {Item} - The randomly generated item for the computer, the scope of this item is limited regarding the game type
 */
function generateComputerInput(): Item {
	const scope = getItems().length;
	const randomIndex = Math.floor(Math.random() * scope);
	const randomItem = getItems()[randomIndex];
	return items[randomItem];
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

let playerScore = 0;
function updateScore(result: 'win' | 'lose' | 'draw') {
	if (result === 'win') {
		playerScore += 1;
	}
}

function handlePlayerInput(playerInput: Item) {
	const computerInput = generateComputerInput();
	const result = determineWinner(playerInput, computerInput);
	updateScore(result);
}

export { playerScore, gamePlayType, setGamePlayType, getGameTitle, handlePlayerInput };
