import { needlemanWunsch } from './lab1+';
import { find, KlasterList } from './lab5';
// @ts-ignore
import { readFileSync } from 'fs';

const calc = (a: KlasterList, b: KlasterList): number => needlemanWunsch(a.seq, b.seq);

find(
	readFileSync('./lab5/small.fasta')
	.toString()
	.split(/>S/m)
	.slice(1)
	.map(e => e.trim().split('\r\n'))
	.map(([i, v]) => new KlasterList(v, +i, calc))
);
