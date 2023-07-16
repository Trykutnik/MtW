export const writeSectionName = (
	arrayType: 'films' | 'affiche' | 'tv-series' | undefined,
) => {
	switch (arrayType) {
		case 'films':
			return 'Все фильмы';
		case 'affiche':
			return 'Аффиша';
		case 'tv-series':
			return 'Все сериалы';
	}
};
