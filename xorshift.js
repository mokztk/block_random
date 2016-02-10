// Xorshift32の実装
//  JavaScriptのMath.random()は乱数のseedが設定できない
//  同じ割付表を再現できるよう、seedが設定できて実装が簡単なXorshiftを自分で実装

var XORShift = function(seed){
    var x, y, z, w;     // seeds

    // seedsの初期化
    this.setSeed = function(seed){
        this.x = 123456789;
        this.y = 362436069;
        this.z = 521288629;
        this.w = seed ? seed : 88675123;
    }

    // 乱数を取得
    this.rnd = function(){
        var t  = this.x ^ (this.x << 11);
        this.x = this.y;
        this.y = this.z;
        this.z = this.w;
        this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8));
        // 負の数にならないよう先頭ビットを0にして、0～1で返す
        return (this.w & 0x7fffffff) / 0x7fffffff;
    }

    // seedsの初期化
    this.setSeed(seed);
    // 10回分乱数を進めてseedsをシャッフル
    for(var i = 0; i < 10; i++) this.rnd();
}
