export type ItemType = 'rock' | 'paper' | 'scissors' | 'lizard' | 'spock';
export type Item = {
	name: ItemType;
	image: string;
	beats: string[];
	color: string;
	boxShadow: string;
	colorLayer0?: string;
	colorLayer1?: string;
};
