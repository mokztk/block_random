# permuted block randomization（置換ブロック法によるランダム化）を考える
# ブロックサイズを変動させるパターン

# blockrand::blockrand() も要検討。
# ブロックサイズを変動させてより精度の高いランダム化が出来るよう
# -> 「最低症例数」しか指定できないので、数が揃わない

# 基礎ブロック: ブロックサイズ4と6の組み合わせ
base.4 <- c(rep("A", 2), rep("B", 2))
# [1] "A" "A" "B" "B"
base.6 <- c(rep("A", 3), rep("B", 3))
# [1] "A" "A" "A" "B" "B" "B"

# 順列を用いて、考えられる組み合わせを全て抽出
library(gtools)
summary(
  factor(apply(permutations(4,4), 1, 
               function(x) paste(base.4[x], collapse="")
               )))
# AABB ABAB ABBA BAAB BABA BBAA 
#    4    4    4    4    4    4 

summary(
  factor(apply(permutations(6,6), 1, 
               function(x) paste(base.6[x], collapse="")
  )))
# AAABBB AABABB AABBAB AABBBA ABAABB ABABAB ABABBA ABBAAB ABBABA ABBBAA 
#     36     36     36     36     36     36     36     36     36     36 
# BAAABB BAABAB BAABBA BABAAB BABABA BABBAA BBAAAB BBAABA BBABAA BBBAAA 
#     36     36     36     36     36     36     36     36     36     36

# 上記の組み合わせを変数に格納
rand.block.4 <- levels(factor(
  apply(permutations(4,4), 1, function(x) paste(base.4[x], collapse=" "))
  ))
rand.block.6 <- levels(factor(
  apply(permutations(6,6), 1, function(x) paste(base.6[x], collapse=" "))
))

# 上記のブロックをランダムに組み合わせて割付表とする
# 30例の割付表を、n個作る関数
getAllocationTable <- function(n = 1){
  # 必ず1つは割付表を返す
  n <- ifelse(n > 1, n, 1)
  sapply(1:n,
         function(x){
           # 4, 6のブロックを3つずつ（1～6の乱数の奇数偶数で分ける）
           # それぞれ、上で作った表から1つを取り出して結合
           paste(ifelse(odd(sample(1:6, rep=F)),
                        rand.block.4[sample(1:6,  size=1)],
                        rand.block.6[sample(1:20, size=1)]),
                 collapse = " ")
         })
}

getAllocationTable(4)
# [1] "A B A B B A A B B A A B A B B A A B A B B A A B B A A B B A"
# [2] "B A B A A A A B B B A A A B B B A A A B B B B A B A B A B A"
# [3] "B B A A B A A B A B B B A A B A A B A B B B A A B A A B A B"
# [4] "B B B A A A A B B A A B B A A B B A B B B A A A B B B A A A"
