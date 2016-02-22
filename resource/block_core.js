// Permuted block randomization のコア処理 | MORI Kazutaka | 2016-02-20

"use strict";


/**
 *  指定されたサイズの基本ブロックを保持して、乱数に基づいて一つのブロックを返す関数
 *  @constructor
 *  @param {number} [bsize = 4] - ブロックサイズ（省略時は4）
 */
var PermBlock = function (bsize) {
	/**
	 *  bsize 省略時は 4とする
	 */
	if (!bsize) { bsize = 4; }
	
	/**
	 *  途中処理で使う変数の宣言と初期化
	 */
	var i, a = [], ans = [], temp = "";
	
	/**
	 *  基本ブロックを作るための材料として、A/Bを同数並べた長さbsizeの配列を作る
	 *  bsizeが奇数のときは、実質+1になる
	 */
	for (i = 0; i < bsize / 2; i++) {
		a.push("A");
		a.push("B");
	}
	
	/**
	 *  Bootstrap法で基礎配列を作り、配列 ans に追加する
	 *      Bootstrap試行回数は10000回とする
	 *      一通り作成したら、整列しておく
	 */
	for (i = 0; i < 10000; i++) {
		/**
		 *  配列 a をシャッフルし、結合した文字列を生成する
		 *    Array.sort() は破壊的メソッドなので本来は取り扱い注意
		 */
		temp = a.sort(function () {
			return Math.random() - 0.5;
		}).join("");
		
		/**
		 *  得られた temp が既出でなければ ans に加える
		 */
		if (ans.indexOf(temp) < 0) { ans.push(temp); }
	}
	
	/**
	 *  ans は外から使えるようにしておく
	 */
	this.ans = ans.sort();
};

/**
 *  与えられた乱数を元に、一つの基礎配列を返す
 *  @param {number} rand - 取り出すためのキー。[0,1) の範囲で
 *  @return {string} 長さ bsize のランダム化された配列（e.g. ABBAAB）
 */
PermBlock.prototype.getBlock = function (rand) {
	return this.ans[Math.floor(rand * this.ans.length)];
};

/**
 *  基礎配列の一覧を返す
 *  @return {array} 基礎配列の一覧 ans
 */
PermBlock.prototype.showBlocks = function () {
	return this.ans;
};
 