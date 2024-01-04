# 08 Deadlocks

## Overview

- System Model

- Deadlock Characterization

- Methods for Handling Deadlocks

- Deadlock Prevention

- Deadlock Avoidance

- Deadlock Detection

- Recovery from Deadlock

## Chapter Objectives

- To develop a description of deadlocks, which prevent sets of concurrent processes from completing their tasks

- To present a number of different methods for preventing or avoiding deadlocks in a computer system

## System Model

- System consists of resources

- Resource types R1, R2, . . ., Rm

- Each resource type Ri has Wi instances.

- Each process utilizes a resource as follows:

  - request&#x20;

  - use&#x20;

  - release

## Deadlock Characterization

死锁特征

- Mutual exclusion: only one process at a time can use a resource
  互斥: 一次只有一个进程可以使用资源
- Hold and wait: a process holding at least one resource is waiting to acquire additional resources held by other processes
  保持和等待: 持有至少一个资源的进程正在等待获取其他进程持有的额外资源
- No preemption: a resource can be released only voluntarily by the process holding it, after that process has completed its task
  无抢占: 资源只能由持有它的进程在该进程完成其任务后自愿释放
- Circular wait: there exists a set {P0, P1, ..., Pn} of waiting processes such that P0 is waiting for a resource that is held by P1, P1 is waiting for a resource that is held by P2, ..., Pn–1 is waiting for a resource that is held by Pn, and Pn is waiting for a resource that is held by P0.
  循环等待: 存在一组 {P0，P1，...，Pn} 等待进程，使得 P0 等待由 P1 持有的资源，P1 等待由 P2 持有的资源，...，Pn-1 等待由 Pn 持有的资源，并且 Pn 正在等待由 p0 保持的资源。

### Deadlock with Mutex Locks

Deadlocks can occur via system calls, locking, etc.
死锁可以通过系统调用、锁定等发生。

### Basic Facts

If graph contains no cycles $\Rightarrow$ no deadlock

If graph contains a cycle $\Rightarrow$

- if only one instance per resource type, then deadlock
  如果每个资源类型只有一个实例，则死锁
- if several instances per resource type, possibility of deadlock
  如果每个资源类型有多个实例，则可能死锁

Methods for Handling Deadlocks

- Ensure that the system will never enter a deadlock state:
  - Deadlock prevention
    死锁预防
  - Deadlock avoidence
    避免死锁
- Allow the system to enter a deadlock state and then recover
  允许系统进入死锁状态，然后恢复
- Ignore the problem and pretend that deadlocks never occur in the system; used by most operating systems, including UNIX
  忽略问题并假装系统中从未发生死锁; 大多数操作系统都这么做，包括 UNIX

Deadlock Prevention

Restrain the ways request can be made

- Mutual Exclusion – not required for sharable resources (e.g., read-only files); must hold for non-sharable resources
  互斥-对于可共享资源 (例如，只读文件) 不需要; 对于不可共享资源必须保持
- Hold and Wait – must guarantee that whenever a process requests a resource, it does not hold any other resources
  保持和等待-必须保证每当进程请求资源时，它不持有任何其他资源
  - Require process to request and be allocated all its resources before it begins execution, or allow process to request resources only when the process has none allocated to it.
    要求进程在开始执行之前请求并分配其所有资源，或者仅当进程未分配任何资源时才允许进程请求资源。
  - Low resource utilization; starvation possible
    资源利用率低; 可能存在饥饿

Deadlock Avoidance

Requires that the system has some additional a priori information available
要求系统有一些额外的先验信息可用

- Simplest and most useful model requires that each process declare the maximum number of resources of each type that it may need
  最简单和最有用的模型要求每个进程声明它可能需要的每种类型的最大资源数
- The deadlock-avoidance algorithm dynamically examines the resource-allocation state to ensure that there can never be a circular-wait condition
  死锁避免算法动态检查资源分配状态，以确保永远不会出现循环等待条件
- Resource-allocation state is defined by the number of available and allocated resources, and the maximum demands of the processes
  资源分配状态由可用资源和已分配资源的数量以及进程的最大需求来定义

### Banker’s Algorithm

推荐阅读：

<https://zhuanlan.zhihu.com/p/384678500>

此处不再赘述。

- Deadlock Detection
- Recovery from Deadlock
