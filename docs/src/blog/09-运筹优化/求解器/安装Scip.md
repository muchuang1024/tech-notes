## 下载

Scip是集成在SCIP Optimization Suite下的，通过页面 https://scipopt.org/index.php#download 下载对应系统的安装包

https://scipopt.org/download.php?fname=scipoptsuite-8.0.3.tgz

## 编译安装

### 1. 安装依赖

```
brew install gcc
brew install cmake 
brew install bison
brew install IPOPT
brew install tbb
```

### 2. 设置scip安装目录

```
export SCIPOPTDIR=/usr/local/scip
export PATH=$PATH:$SCIPOPTDIR/bin
export DYLD_LIBRARY_PATH=$SCIPOPTDIR/lib/libscip.8.0.dylib
source .bash_profile
```

### 3. 解压 scipoptsuite-8.0.0.tgz 

```
tar zxvf scipoptsuite-8.0.3.tgz
```

### 4. install soplex and scip

```
mkdir /usr/local/scip
cd scipoptsuite-8.0.3
mkdir build
cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$SCIPOPTDIR
make -C ./build -j 16
sudo make -C ./build install
```

Notice：安装过程中如果遇到错误，删除build安装提示缺失的依赖后重新执行

### 5. python支持

```
pip install pyscipopt
```



## 求解示例

### 1. scip命令求解

新建一个文件，example.lp 

```
Maximize
obj: 3 x+2 y
Subject to
c1: 2 x + y <= 18
c2: 2 x + 3 y <= 42
c3: 3 x + y <= 24
c4: x >= 0
c5: y >= 0
```

scip 进入命令行，执行read\optimize和输出解的命令

![](https://fastly.jsdelivr.net/gh/caijinlin/imgcdn/image-20230724161034555.png)

### 2. python求解

import pyscipopt 出错解决方案：

https://github.com/scipopt/PySCIPOpt/issues/372

```
#打印出共享库 scip.cpython-311-darwin.so 依赖的其他共享库

otool -L /usr/local/lib/python3.11/site-packages/pyscipopt/scip.cpython-311-darwin.so 

#使用 install_name_tool 工具,修改共享库 scip.cpython-311-darwin.so 中依赖 libscip.8.0.dylib 的路径,原来可能指向 /usr/local/lib/libscip.8.0.dylib ,修改为 /usr/local/scip/lib/libscip.8.0.dylib 

sudo install_name_tool -change libscip.8.0.dylib /usr/local/scip/lib/libscip.8.0.dylib /usr/local/lib/python3.11/site-packages/pyscipopt/scip.cpython-311-darwin.so
```

求解代码：

```
from pyscipopt import Model, quicksum

def solve_linear_program():
    # Create a SCIP model
    model = Model("LinearProgram")

    # Create variables
    x = model.addVar(vtype="C", name="x")
    y = model.addVar(vtype="C", name="y")

    # Set objective function (maximize 3x + 2y)
    model.setObjective(3 * x + 2 * y, "maximize")

    # Add constraints
    model.addCons(2 * x + y <= 18, "c1")
    model.addCons(2 * x + 3 * y <= 42, "c2")
    model.addCons(3 * x + y <= 24, "c3")
    model.addCons(x >= 0, "c4")
    model.addCons(y >= 0, "c5")

    # Solve the linear program
    model.optimize()

    # Check if the problem is solved to optimality
    if model.getStatus() == "optimal":
        print("Optimal solution found.")
        print("Objective value:", model.getObjVal())

        # Get the variable values
        print("x =", model.getVal(x))
        print("y =", model.getVal(y))
    else:
        print("No optimal solution found.")


if __name__ == "__main__":
    # Solve the linear program and print the results
    solve_linear_program()
```

输出如下：

```
feasible solution found by trivial heuristic after 0.0 seconds, objective value 0.000000e+00
presolving:
(round 1, fast)       0 del vars, 2 del conss, 0 add conss, 4 chg bounds, 0 chg sides, 0 chg coeffs, 0 upgd conss, 0 impls, 0 clqs
   (0.0s) running MILP presolver
   (0.0s) MILP presolver found nothing
   (0.0s) symmetry computation started: requiring (bin +, int +, cont +), (fixed: bin -, int -, cont -)
   (0.0s) no symmetry present
presolving (2 rounds: 2 fast, 1 medium, 1 exhaustive):
 0 deleted vars, 2 deleted constraints, 0 added constraints, 4 tightened bounds, 0 added holes, 0 changed sides, 0 changed coefficients
 0 implications, 0 cliques
presolved problem has 2 variables (0 bin, 0 int, 0 impl, 2 cont) and 3 constraints
      3 constraints of type <linear>
Presolving Time: 0.02
transformed 1/1 original solutions to the transformed problem space

 time | node  | left  |LP iter|LP it/n|mem/heur|mdpt |vars |cons |rows |cuts |sepa|confs|strbr|  dualbound   | primalbound  |  gap   | compl. 

* 0.0s|     1 |     0 |     2 |     - |    LP  |   0 |   2 |   3 |   3 |   0 |  0 |   0 |   0 | 3.300000e+01 | 3.300000e+01 |   0.00%| unknown
  0.0s|     1 |     0 |     2 |     - |   584k |   0 |   2 |   3 |   3 |   0 |  0 |   0 |   0 | 3.300000e+01 | 3.300000e+01 |   0.00%| unknown

SCIP Status        : problem is solved [optimal solution found]
Solving Time (sec) : 0.03
Solving Nodes      : 1
Primal Bound       : +3.30000000000000e+01 (2 solutions)
Dual Bound         : +3.30000000000000e+01
Gap                : 0.00 %
Optimal solution found.
Objective value: 33.0
x = 2.9999999999999996
y = 12.0
```

