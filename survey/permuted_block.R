# permuted block randomization（置換ブロック法によるランダム化）を考える

# blockrand::blockrand() も要検討。
# ブロックサイズを変動させてより精度の高いランダム化が出来るよう

# 基礎ブロック: ブロックサイズ4の組み合わせ
base <- c(rep("A", 2), rep("B", 2))
# [1] "A" "A" "B" "B"

# 順列を用いて、考えられる組み合わせを全て抽出
library(gtools)
summary(
  factor(apply(permutations(4,4), 1, 
               function(x) paste(base[x], collapse="")
               )))

# AABB ABAB ABBA BAAB BABA BBAA 
#    4    4    4    4    4    4 

# 【別解】bootstrap的アプローチ
# ブロックサイズに対して十分大きな試行回数があれば、組み合わせを抽出する
# だけならば、gtools::permutations() なしで下記でも可
#
# summary(
#   factor(sapply(1:1000, 
#                 function(x) paste(base[sample(1:4,rep=F)], collapse="")
#                 )))
#
# AABB ABAB ABBA BAAB BABA BBAA 
#  162  176  181  161  153  167

# 上記6つの組み合わせを変数に格納
rand.block <- levels(factor(
  apply(permutations(4,4), 1, function(x) paste(base[x], collapse=" "))
  ))

# 上記6つのブロックをランダムに組み合わせて割付表とする
sapply(1:4,
       function(x) paste(rand.block[sample(1:6, rep=T)], collapse=" ")
)
# [1] "B A A B A B A B B B A A A B B A A B B A B A A B"
# [2] "B A B A B A B A A B A B B A B A A B B A A B A B"
# [3] "B B A A A B B A B B A A A A B B B B A A B A B A"
# [4] "A B A B A B B A A A B B A A B B B B A A B A A B"
