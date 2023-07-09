export interface MovieProps {
	id: number;
	name: string;
	poster: {
		url: string;
		previewUrl: string;
	};
	description?: string;
	shortDescription?: string;
	rating: {
		kp: number;
		imdb?: number;
		filmCritics?: number;
		russianFilmCritics?: number;
		await?: number;
	};
	year: number;
}
