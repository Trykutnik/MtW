export const writeSectionName = (
	arrayType: 'film' | 'affiche' | 'tv-series' | undefined,
) => {
	switch (arrayType) {
		case 'film':
			return 'Все фильмы';
		case 'affiche':
			return 'Аффиша';
		case 'tv-series':
			return 'Все сериалы';
	}
};
