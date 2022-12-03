type K = Klaster | KlasterList;

export class KlasterList {
	constructor(
		public seq: string,
		public index: number,
		public calc: (a: KlasterList, b: KlasterList) => number
	) {}

	type = 'KlasterList' as const;

	static is(value: K): value is KlasterList {
		return value.type === 'KlasterList';
	}

	distance = (() => {
		const anses = new Map<K, number>();
		return (other: K): number => anses.get(other) ?? ((): number => {
			if (this === other) {
				return Infinity;
			}

			if (KlasterList.is(other) && other.index < this.index) {
				return other.distance(this);
			}

			const ans = KlasterList.is(other)
				? this.calc(this, other)
				: (this.distance(other.left) * other.left.countChild()
					+ this.distance(other.right) * other.right.countChild())
				/ (other.left.countChild() + other.right.countChild());
			anses.set(other, ans);
			return ans;
		})();
	})();

	countChild = () => 1;

	toString() {
		return this.index.toString();
	}
}


export class Klaster {
	constructor(
		public left: K,
		public right: K,
		public index: number,
	) {}

	type = 'Klaster' as const;

	static is(value: K): value is Klaster {
		return value.type === 'Klaster';
	}

	distance = (() => {
		const anses = new Map<K, number>();
		return (other: K): number => anses.get(other) ?? ((): number => {
			if (this === other) {
				return Infinity;
			}

			if (KlasterList.is(other) || other.index < this.index) {
				return other.distance(this);
			}

			const ans = (
				this.distance(other.left) * other.left.countChild()
				+ this.distance(other.right) * other.right.countChild()
			) / (other.left.countChild() + other.right.countChild());
			anses.set(other, ans);
			return ans;
		})();
	})();

	countChild = (() => {
		let ans: null | number = null;
		return (): number => {
			ans ??= this.left.countChild() + this.right.countChild();
			return ans;
		};
	})();

	toString() {
		return `(${this.left},${this.right}:${this.left.distance(this.right) / 2})`;
	}
}

export const find = (k: K[]) => {
	let gi = k.length + 10;

	while (k.length > 1) {
		let min = Infinity;
		let minI = -1;
		let minJ = -1;

		for (let i = 0; i < k.length; i++) {
			for (let j = i + 1; j < k.length; j++) {
				const d = k[i].distance(k[j]);
				if (d < min) {
					min = d;
					minI = i;
					minJ = j;
				}
			}
		}

		console.log(k.toString());
		console.log({min2: min / 2, min, minI, minJ}, k[minI].toString(), k[minJ].toString());

		const kk = new Klaster(k[minI], k[minJ], gi++);
		k[minI] = kk;
		k[minJ] = k[k.length - 1];
		k.pop();
	}

	console.log(k[0].toString());
	return k[0];
};
