export type Ans = number;

export type Options = { match?: number, mismatch?: number, gap?: number; type?: 'max' | 'min' };
export const getOptions = (o: Options): Required<Options> => ({
	match: 0,
	mismatch: 1,
	gap: 2,
	type: 'min',
	...o,
});

export const needlemanWunsch = (s1: string, s2: string, options: Options = {}): Ans => {
	const { match, mismatch, gap, type } = getOptions(options);

	const m = Array.from(
		{ length: s1.length + 1 },
		() => Array.from(
			{ length: s2.length + 1 },
			() => 0,
		),
	);

	for (let i = 1; i < s1.length + 1; i++) {
		m[i][0] = m[i - 1][0] + gap;
	}

	for (let j = 1; j < s2.length + 1; j++) {
		m[0][j] = m[0][j - 1] + gap;
	}

	for (let i = 1; i < s1.length + 1; i++) {
		for (let j = 1; j < s2.length + 1; j++) {
			m[i][j] = Math[type](
				m[i - 1][j] + gap,
				m[i][j - 1] + gap,
				m[i - 1][j - 1] + (s1[i - 1] == s2[j - 1] ? match : mismatch),
			);
		}
	}

	return m[s1.length][s2.length];
};
