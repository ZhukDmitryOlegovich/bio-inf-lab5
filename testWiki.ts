import { find, KlasterList } from "./lab5";

/**
 * Wiki Test https://en.wikipedia.org/wiki/UPGMA#Working_example
 */
const calc = (a: KlasterList, b: KlasterList): number => ((<Record<string, number>>{
	'aa': 0,
	'ab': 17,
	'ac': 21,
	'ad': 31,
	'ae': 23,
	'bb': 0,
	'bc': 30,
	'bd': 34,
	'be': 21,
	'cc': 0,
	'cd': 28,
	'ce': 39,
	'dd': 0,
	'de': 43,
	'ee': 0,
})[a.seq + b.seq]);

find('abcde'.split('').map((v, i) => new KlasterList(v, i, calc)));
