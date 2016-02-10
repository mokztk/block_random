// Xorshift32の実装
//  JavaScriptのMath.random()は乱数のseedが設定できない
//  同じ割付表を再現できるよう、seedが設定できて実装が簡単なXorshiftを自分で実装

var XORShift = (function(){
    // seedsの初期値
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
            this.w = seed ? seed : 88675123;
        },

        // 乱数の取得
        rnd : function(){
            // 初期化がまだされていなければ初期化を行う
            if(!this.x){
                this.setSeed(Date.now());
                this.shuffle(20);
            }

            // 32bit  XORShift
            var t  = this.x ^ (this.x << 11);
            this.x = this.y;
            this.y = this.z;
            this.z = this.w;
            this.w = (this.w ^ (this.w >>> 17)) ^ (t ^ (t >>> 13));

            // 負の数にならないよう先頭ビットを0にして、0～1で返す
            return (this.w & 0x7fffffff) / 0x7fffffff;
        }
    }
})()
