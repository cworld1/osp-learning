# 10 Virtual Memory

## Contents

- Background

- Demand Paging

- Copy-on-Write

- Page Replacement

- Allocation of Frames&#x20;

- Thrashing

- Memory-Mapped Files

- Allocating Kernel Memory

- Other Considerations

- Operating-System Examples

### Objectives

- To describe the benefits of a virtual memory system

- To explain the concepts of demand paging, page-replacement algorithms, and allocation of page frames

- To discuss the principle of the working-set model

- To examine the relationship between shared memory and memory-mapped files

- To explore how kernel memory is managed

## Background

逻辑地址 -(分段)→ 线性地址 -(分页)→ 物理地址

例题：

> \[2020 统考真题]某 32 位系统采用装干二级页表的请求分页存储管理方式，按字节便址， 页目录项和页表项长度均为 4 字节，虚拟地址结构如下所示。
>
> 页目录号（10 位）、页号（10 位）、页内偏移量（12 位）
>
> 某 C 程序中款组 a\[1024]\[1024]的起始虚权地址为 1080 0000H、数组元素占 4 字节，该程序运行时，其进程的页目录起始物理地址为 0020 1000H，请回答下列问题。
>
> 1\)数组元素 a\[1]\[2]的虚拟地址是什么？对应的页目录号和页号分別是什么？对应的页目录项的物理地址是什么？若该目源项中存放的页框号为 00301H，则 a\[1]\[2]所在页对应的页表项的物理地址是什么？
