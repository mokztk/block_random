// JavaScript で 組み合わせを考える
//   Bootstrap的に、ランダム抽出で出現した組み合わせを集計
//   要 Array.indexOf（IE <9では、Polyfillなどで追加しておく必要あり）


// "IE<9 indexOf polyfill" from revolunet/indexof-min.js
//  (https://gist.github.com/revolunet/1908355)
// ここから

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;
    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
}

// ここまで

// 準備（block size = 6用）
var a = [];
var ans = [];
var temp = "";

a = ["A","A","A","B","B","B"];
// for (i = 0; i < 3; i++) {a.push("A"); a.push("B")}

// Bootstrap試行回数は10000回
for(var i = 0; i < 10000; i++){
	// 配列 a をシャッフルし、結合した文字列を作成する
	// cf. http://raining.bear-life.com/javascript/javascript%E3%81%A7%E9%85%8D%E5%88%97%E3%81%AE%E4%B8%AD%E8%BA%AB%E3%82%92%E3%83%A9%E3%83%B3%E3%83%80%E3%83%A0%E3%81%AB%E4%B8%A6%E3%81%B3%E6%9B%BF%E3%81%88%E3%82%8B
	// Array.sort() は破壊的メソッドなので取り扱い注意
	// 欲張るなら、Fisher-Yatesアルゴリズムでシャッフルするか？
	temp = a.sort(function() {
		return Math.random() - 0.5;
	}).join("");
	// 得られた文字列が既出でなければ、配列 ans に追加する
	if (ans.indexOf(temp) < 0) ans.push(temp)
}

// 得られた組み合わせの数
console.log("得られた組み合わせの数");
console.log(ans.length);

// 組み合わせのパターン（アルファベット順にする）
console.log("組み合わせのパターン");
console.log(ans.sort());

// 6 x 4 = 24例分の割付表
temp = "";
for (i = 0; i < 4; i++) { temp = temp + ans[Math.floor(Math.random() * ans.length)] }

console.log("割付表：");
console.log(temp);

// 実運用では、事前にパターンを作っておくほうが良い？
