// XORShiftによる擬似乱数発生器　/ MORI Kazutaka / 2016-02-18 update
//  JavaScriptのMath.random()は乱数のseedが設定できない
//  同じ乱数表を再現できるよう、seedが設定できて実装が簡単なXORShiftで作成

//  Marsaglia G. Journal of Statistical Software 8: 2003.
//    https://www.jstatsoft.org/article/view/v008i14
//  ライセンスについては、原著に記載なし。JSSは論文がCC、コードがGPL2+となっているが、
//  本文中に短いコードがあるのみでGPLが適用できるような長いコードではないことから、本文の
//  Creative Commons Attribution 3.0 Unported License とみなされているらしい

var XORShift = (function(){
    // seedsの格納用
    var x, y, z, w;

    // 公開メソッド
    return {
        // seedsの初期化
        setSeed : function(seed){
            this.x = 123456789;
            this.y = 362436069;
            this.z = 521288629;
            // seedが指定された場合は4つ目のseedをその値にする
            this.w = seed ? seed : 88675123;
        },

        // 乱数のシャッフル
        shuffle : function(n){
            // 回数を指定されていなければ20回分進める
            for(var i = 0; i < (n ? n : 20); i++) this.rnd()
        },

        // 初期化（seed設定＋シャッフル）
        init : function(seed, n){
            this.setSeed(seed);
            this.shuffle(n);
        },

        // 乱数の取得
        rnd : function(){
            // 初期化がまだされていなければ初期化を行う
            if(!this.x) this.init(Date.now(), 40);

            // 128bit XORShift
            var t  = this.x ^ (this.x << 11);
            this.x = this.y;
            this.y = this.z;
            this.z = this.w;
            this.w = (this.w ^ (this.w >>> 17)) ^ (t ^ (t >>> 13));

            // >>>0 でunsignedに変換してから、[0, 1) の範囲にして返す
            return ((this.w >>> 0) % 0xffffffff) / 0xffffffff;
        }
    }
})();
