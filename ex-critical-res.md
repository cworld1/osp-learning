# 什么是临界资源，临界区？

<https://www.zhihu.com/question/379849079>

## 什么是临界区？

每个进程中访问临界资源的那段程序称为临界区（临界资源是一次仅允许一个进程使用的共享资源）。每次只准许一个进程进入临界区，进入后不允许其他进程进入。

## 进程进入临界区的调度原则

1.  如果有若干进程要求进入空闲的临界区，一次仅允许一个进程进入。
2.  任何时候，处于临界区内的进程不可多于一个。如已有进程进入自己的临界区，则其它所有试图进入临界区的进程必须等待。
3.  进入临界区的进程要在有限时间内退出，以便其它进程能及时进入自己的临界区。
4.  如果进程不能进入自己的临界区，则应让出 CPU，避免进程出现“忙等”现象。

互斥对象是一种最简单的内核对象，用它可以方便的实现对某一资源的互斥访问。因为它是内核对象，因此可以产生信号，实际上，程序中就是利用这一点实现互斥的。如果没记错的话，临界区并不是内核对象，而是系统提供的一种数据结构，程序中可以声明一个该类型变量，之后用它来实现对资源的互斥访问。当欲访问某一临界资源时，先将该临界区加锁（如果临界区不空闲，等待），用完该资源后，将临界区释放。一般，将他们用于线程间的同步，而且通常可以互换使用。如果要实现复杂互斥，应使用其它方法，如信号量内核对象等。临界区对象不能跨越进程，是线程间共享数据区的同步对象；互斥对象可以作为进程间共享数据区的同步对象。

下面着重讲解进程管理（实现临界区互斥的方法）。

## 访问临界资源

对临界资源的访问分为四个部分：

1.  进入区：检查是否可以进入临界区,若可以则设置正在访问临界区的标志(加锁),以阻止其他进程同时进入临界区
2.  临界区：进程中访问临界资源的那段代码
3.  退出区：解除正在访问临界资源的标志(解锁)
4.  剩余区：处理代码的其余部分
    ```c
    do {
      enter section;    //进入区
      critical section;  //临界区
      exit section;    //退出区
      remainder section;  //剩余区
    } while true;
    ```

## 实现临界区互斥的方法

_同步机制应当遵循的准则:_

1.  空闲让进：临界区空闲时，可以允许一个请求进入临界区的进程立即进入临界区
2.  忙则等待：当已经有进程进入临界区时，其他试图进入临界区的进程必须等待
3.  有限等待：对请求访问临界区的进程，应保证其在有限的时间内进入临界区
4.  [让权等待](https://www.zhihu.com/search?q=让权等待&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType":"answer","sourceId":2761131448} "让权等待")：当进程不能进入临界区时，应立即释放处理机

#### 1. 通过软件实现

软件方法相对复杂且容易出错,因而现在系统较少采用,目前常用的方法是通过硬件方法实现同步互斥操作

#### (1)单标志法

特征:(设置标志 turn)

1.  设置 turn 来标志当前允许运行的[进程编号](https://www.zhihu.com/search?q=进程编号&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType":"answer","sourceId":2761131448} "进程编号")
2.  每个进程访问完临界区后把临界区的使用权转交给另一个进程
3.  若[turn](https://www.zhihu.com/search?q=turn&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType":"answer","sourceId":2761131448} "turn")的初始值为 0,则运行进程始终按照 p0->p1->p0->p1->…的顺序进行,如果其中的某个进程不再进入临界区则另一个进程也将无法进入临界区. 违背了"[空闲让进](https://www.zhihu.com/search?q=空闲让进&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType":"answer","sourceId":2761131448} "空闲让进")"的原则

    turn=0;

    /\*\*

    P0 进程

    \*\*/

    while(turn!=0); //进入区

    critical section; //临界区

    turn = 1; //退出区

    remainder section; //剩余区

    /\*\*

    P1 进程

    \*\*/

    while(turn!=1);

    //turn 初始值为 0,若先进去的是 p1 进程则,

    //while 循环条件成立,处理机一直进行空循环,

    //直到分配给进程的的时间片结束

    critical section;

    turn = 0;

    remainder section;

#### (2)[双标志法](https://www.zhihu.com/search?q=双标志法&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType":"answer","sourceId":2761131448} "双标志法")先检查

特征:(设置 flag\[]标志对方和自己)

1.  设置标志 flag\[i]来标志各个进程进入临界区的意愿
2.  刚开始时先把 flag\[i]中各个元素的值设置成 false
3.  如果 flag\[i]的值为 FALSE 则表示 pi 进程未进入临界区,如果值为 TRUE,表示 Pi 进程进入临界区
4.  优点:不用按照一定顺序交替进入临界区,可以连续使用
5.  缺点:由于操作系统的并发性,如果 pi 和 pj 进程同时进入临界区,则可能按照 ①②③③ 的顺序执行,则导致两个进程同时进入了临界区,违背了"忙则等待"的原则

    /\*\*

    pi 进程:

    当 pi 进程想要访问临界资源时,首先判断 flag\[j]是否为 TRUE:

    1.  如果为 TRUE,说明 pj 进程处于临界区(在访问临界资源),则 pi 进程进行空循环,
        直到处理机分配给 pi 的时间片结束发生进程切换,使得 pi 进程退出处理机
    1.  如果为 FALSE,则说明 pj 进程不在临界区中(没有在访问临界资源),则将 flag\[i]
        设置成 TRUE,以阻止其他进程来访问临界区(上锁),由此进入区完成

    \*\*/

    while(flag\[j]); ① //进入区

    flag\[i] = TRUE; ③ //进入区

    critical section; //临界区

    flag\[i] = false; //退出区

    remainder section; //剩余区

    /\*\*

    pj 进程:

    \*\*/

    while(flag\[i]); ②

    flag\[j] = TRUE; ③

    critical section;

    flag\[j] = false;

    remainder section;

_由上可以看出软件方法都会导致进程等待进入临界区时由于空循环造成的浪费处理机时间的现象，违背了“让权等待”_

#### (3)双标志法后检查

特征:

1.  设置 flag\[]来标志各个进程访问临界区的意愿
2.  先将自己的 flag\[]标志设置成 TRUE,再检查对方进程的标志,若对方标志为 TRUE,则进程等待,否则进入临界
3.  若 pi 和 pj 进程几乎同时进入临界区时,由于并发性,可能将自己的 flag 都设置成 TRUE,导致两个进程都只能处于等待状态,从而导致"饥饿"现象,违背了有限等待的原则

    /\*\*

    pi 进程:

    \*\*/

    flag\[i] = TRUE; //进入区

    while(flag\[j]); //进入区

    critical section; //临界区

    flag\[i] = false; //退出区

    remainder section; //剩余区

    /\*\*

    pj 进程:

    \*\*/

    flag\[j] = TRUE;

    while(flag\[i]);

    critical section;

    flag\[j] = false;

    remainder section;

#### (4)Peterson’s Algorithm

特点:(三标志,除了 flag\[]标志意愿之外还有[turn 标志](https://www.zhihu.com/search?q=turn标志&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType":"answer","sourceId":2761131448} "turn标志"))

1.  为了防止进程为进入临界区而出现的无限等待的情况,在双标志法后检查的基础上增添了 turn 标志表示意愿把进入临界区的权限让给另外一个进程

    /\*\*

    pi 进程:

    首先将自己的 flag 标志设置成 True(加锁,加锁后如果 pj 想进入临界区则会进入空循环中),

    将不允许进入的程序标志 turn 设置成 j,如果出现了两个进程几乎同时想要访问临界区的情况时,

    在 pi 和 pj 将自己的意愿都设置成 true 之后,由于 turn 的值唯一,所以优先让一个进程进入了临界区,

    另一个进程则处于空循环等待前一个进程退出临界区，解决了"无限等待"的问题

    \*\*/

    flag\[i] = TRUE; //进入区

    turn = j; //进入区

    while(flag\[j] && turn ==j); //进入区

    critical section; //临界区

    flag\[i] = false; //退出区

    remainder section; //剩余区

    /\*\*

    pj 进程:

    \*\*/

    flag\[j] = TRUE;

    turn = i;

    while(flag\[i] && turn ==i);

    critical section;

    flag\[j] = false;

    remainder section;

#### 2. 硬件实现方法

也称低级方法或原方法

#### (1)中断屏蔽方法

1.  由于 CPU 只在发生中断时引起进程切换,因此屏蔽中断可保证当前进程让[临界区代码](https://www.zhihu.com/search?q=临界区代码&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType":"answer","sourceId":2761131448} "临界区代码")顺利执行完
2.  缺点:限制了处理机交替执行程序的能力,因此执行效率会明显降低,同时将[关中断](https://www.zhihu.com/search?q=关中断&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType":"answer","sourceId":2761131448} "关中断")的权利交给用户是十分危险的,如果一个进程关中断之后不再打开则会导致系统终止

典型模式:

/\*\*

关中断

临界区

开中断

\*\*/

#### (2)硬件指令方法

#### i.TestAndSet 指令

1.  这是一条[原子操作](https://www.zhihu.com/search?q=原子操作&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType":"answer","sourceId":2761131448} "原子操作")（执行改代码时不允许被中断）
2.  读出指定标志之后把该标志设置成真

    /\*\*

    TestAndSet:

    lock 用于表示临界资源的两种状态：true 表示正被占用，初值为 false

    \*\*/

    boolean TestAndSet(boolean \*lock){

    boolean old;

    old = \*lock; //用 old 记录指定标志

    \*lock = true; //读出指定标志之后把标志 lock 设置成真

    return old;

    }

    /\*\*

    实现进程访问临界区的代码：

    在进入临界区之前先用 TestAndSet 来检查 lock 和修改 lock；若 lock 为 false

    说明临界资源没有被占用，则可以进入临界区，并把临界资源的占用情况设置成 true（给临界资源上锁）。

    如果 lock 为 true 则说明临界资源正被占用，则进程只能进行空循环直到处理机分配的时间片结束，进程退出。

    \*\*/

    while TestAndSet(\&lock); //进入区

    进程的其他代码段 //临界区

    lock = false; //退出区

    进程的其他代码; //剩余区

#### ii.Swap 指令

1.  Swap 指令用于交换两个字节的内容

    /\*\*

    Swap 指令：

    \*\*/

    Swap(boolean \*a,boolean \*b){

    boolean temp;

    temp = \*a;

    \*a = \*b;

    \*b = temp;&#x20;

    }

    /\*\*

    进程访问临界区处理：

    lock 用于表示临界资源是否被占用，true 表示被占用

    设置 key 用于与 lock 交换信息。在进入临界区之前先用 key 交换信息，如果交换后 key 仍为 true，

    说明临界资源已被占用，则接下来持续进行检查 key 和交换的过程，直到时间片结束

    \*\*/

    key = true; //进入区

    while(key!= false)

    Swap(\&lock，\&key); //进入区

    进程的临界区代码段； //临界区

    lock =false; //退出区

    进程的其他代码; //剩余区

2.  硬件方法的优点：适用于任意数目的进程，不管是单处理机还是多处理机。同时也支持进程中有多个临界区，只要为每个临界区都设置一个 boolean 变量就行。
3.  缺点：进程在等待进入临界区的时候，处理机只能处于一个空循环的状态，这样的状态浪费处理机资源，违背了“让权等待”，从进程中随机选择一个进程进入临界区，有的进程就可能一直都选不上，导致饥饿现象，违背”有限等待“。
