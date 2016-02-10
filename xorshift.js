// Xorshift32による乱数発生器
//  JavaScriptのMath.random()は乱数のseedが設定できない
//  同じ乱数表を再現できるよう、seedが設定できて実装が簡単なXorshiftで作成
//  [参考] http://d.hatena.ne.jp/nakamura001/touch/20110521/1305997364

var XORShift = (function(){
    // seedsの格納用
    var x, y, z, w;

    // 公開メソッド
    return {
        // debug用
        show : function(){
            console.log("seed x = ", this.x);
            console.log("seed y = ", this.y);
            console.log("seed z = ", this.z);
            console.log("seed w = ", this.w);
        },

        // 乱数のシャッフル
        shuffle : function(n){
            // 回数を指定されていなければ10回分進める
            for(var i = 0; i < (n ? n : 10); i++) this.rnd()
        },

        // seedsの初期化
        setSeed : function(seed){
            this.x = 123456789;
            this.y = 362436069;
            this.z = 521288629;
            // seedが指定された場合は4つ目のseedをその値にする
            this.w = seed ? seed : 88675123;
        },

        // 初期化（seed設定＋シャッフル）
        init : function(seed, n){
            this.setSeed(seed);
            this.shuffle(n);
        },

        // 乱数の取得
        rnd : function(){
            // 初期化がまだされていなければ初期化を行う
            if(!this.x){
                this.setSeed(Date.now());
                this.shuffle(20);
            }

            // 32bit XORShift
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
