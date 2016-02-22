// XORShiftによる擬似乱数発生器　/ MORI Kazutaka / 2016-02-20 update
//  JavaScriptのMath.random()は乱数のseedが設定できない
//  同じ乱数表を再現できるよう、seedが設定できて実装が簡単なXORShiftで作成

//  Marsaglia G. Journal of Statistical Software 8: 2003.
//    https://www.jstatsoft.org/article/view/v008i14
//  ライセンスについては、原著に記載なし。JSSは論文がCC、コードがGPL2+となっているが、
//  本文中に短いコードがあるのみでGPLが適用できるような長いコードではないことから、本文の
//  Creative Commons Attribution 3.0 Unported License とみなされているらしい

"use strict";

/**
 *  128bit XORShift による擬似乱数発生器
 *  @constructor
 *  @param {number} [seed] - 4番目の乱数シードを変更する場合に指定
 */
var XORShift = function (seed) {
    var x, y, z, w;
	
	/**
	 *  seedsの初期化
	 *  @param {number} [seed] - 4番目のシードを変更する場合に指定
	 */
	this.setSeed = function (seed) {
		this.x = 123456789;
		this.y = 362436069;
		this.z = 521288629;
		/**
		 *  seedが指定された場合は4つ目のseedをその値にする
		 */
		this.w = seed ? seed : 88675123;
	};
	
	this.setSeed(seed);
};

/**
 *  乱数のシャッフル
 *  @param {number} [n = 20] - 乱数列を進める回数
 */
XORShift.prototype.shuffle = function (n) {
	/**
	 *  回数を指定されていなければ20回分進める
	 */
	var i;
	for (i = 0; i < (n ? n : 20); i++) { this.rnd(); }
};

/**
 *  乱数列を初期化（seed設定＋シャッフル）
 *  @param {number} [seed] - 4番目のseedの初期値
 *  @param {number} [n] - 乱数列を進める回数
 */
XORShift.prototype.init = function (seed, n) {
	this.setSeed(seed);
	this.shuffle(n);
};

/**
 *  128bit XORShiftの処理
 *  @return {number} 32bit符号なし整数の乱数（おまけ機能）
 */
XORShift.prototype.xos128 = function () {
	var t  = this.x ^ (this.x << 11);
	this.x = this.y;
	this.y = this.z;
	this.z = this.w;
	this.w = (this.w ^ (this.w >>> 17)) ^ (t ^ (t >>> 13));
	
	return (this.w >>> 0);
};

/**
 *  乱数をひとつ生成する（Math.random()互換）
 *  @return {number} [0, 1) の範囲の数値
 */
XORShift.prototype.rnd = function () {
	/**
	 *  初期状態のままならば、乱数列を進める
	 *  最初に1回処理してから shuffle() を呼ばないと無限ループになる
	 */
	if (this.x === 123456789) {
		this.xos128();
		this.shuffle(40);
	}

	/**
	 *  >>>0 でunsignedに変換してから、[0, 1) の範囲にして返す
	 */
	this.xos128();
	return ((this.w >>> 0) % 0xffffffff) / 0xffffffff;
};
