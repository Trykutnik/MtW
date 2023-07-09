// export const blendColors = (colorA: string, colorB: string, amount: number) => {
// 	const [rA, gA, bA] = colorA.match(/\w\w/g).map(c => parseInt(c, 16));
// 	const [rB, gB, bB] = colorB.match(/\w\w/g).map(c => parseInt(c, 16));
// 	const r = Math.round(rA + (rB - rA) * amount)
// 		.toString(16)
// 		.padStart(2, '0');
// 	const g = Math.round(gA + (gB - gA) * amount)
// 		.toString(16)
// 		.padStart(2, '0');
// 	const b = Math.round(bA + (bB - bA) * amount)
// 		.toString(16)
// 		.padStart(2, '0');
// 	return '#' + r + g + b;
// };
// export function hexToRgb(h: string) {
// 	return [
// 		('0x' + h[1] + h[2]) | 0,
// 		('0x' + h[3] + h[4]) | 0,
// 		('0x' + h[5] + h[6]) | 0,
// 	];
// }
// function rgbToHex(r, g, b) {
// 	return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
// }

export const x = () => {
	return null;
};
