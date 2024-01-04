# sched_c - scheduling primitives

```c
/* this is the scheduler proper: */
while (1) {
    c = -1;
    next = 0;
    i = NR_TASKS;
    p = & task[NR_TASKS];
    // 这段代码也是从任务数组的最后一个任务开始循环处理，并跳过不含任务的数组槽。比较
    // 每个就绪状态任务的counter(任务运行时间的递减滴答计数)值，哪一个值大，运行时间还
    // 不长，next就值向哪个的任务号。
    while (--i) {
        if (! * --p)
            continue;
        if (( * p) - > state == TASK_RUNNING && ( * p) - > counter > c)
            c = ( * p) - > counter, next = i;
    }
    // 如果比较得出有counter值不等于0的结果，或者系统中没有一个可运行的任务存在(此时c
    // 仍然为-1，next=0),则退出while(1)_的循环，执行switch任务切换操作。否则就根据每个
    // 任务的优先权值，更新每一个任务的counter值，然后回到while(1)循环。counter值的计算
    // 方式counter＝counter/2 + priority.注意：这里计算过程不考虑进程的状态。
    if (c) break;
    for (p = & LAST_TASK; p > & FIRST_TASK; --p)
        if ( * p)
            ( * p) - > counter = (( * p) - > counter >> 1) +
            ( * p) - > priority;
}

```
