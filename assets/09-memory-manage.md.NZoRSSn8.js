import{_ as e,o as i,c as a,R as t}from"./chunks/framework.GAJuE5ww.js";const o="/osp-learning/assets/image_GVQuUN2JXU.qBKIVzQL.png",y=JSON.parse('{"title":"09 Memory Management","description":"","frontmatter":{},"headers":[],"relativePath":"09-memory-manage.md","filePath":"09-memory-manage.md","lastUpdated":1729693534000}'),r={name:"09-memory-manage.md"},l=t('<h1 id="_09-memory-management" tabindex="-1">09 Memory Management <a class="header-anchor" href="#_09-memory-management" aria-label="Permalink to &quot;09 Memory Management&quot;">​</a></h1><h2 id="summary" tabindex="-1">Summary <a class="header-anchor" href="#summary" aria-label="Permalink to &quot;Summary&quot;">​</a></h2><ul><li>Background</li><li>Swapping</li><li>Contiguous Memory Allocation</li><li>Segmentation</li><li>Paging</li><li>Structure of the Page T able</li><li>Example: The Intel 32 and 64-bit Architectures</li><li>Example: ARM Architecture</li></ul><h3 id="objectives" tabindex="-1">Objectives <a class="header-anchor" href="#objectives" aria-label="Permalink to &quot;Objectives&quot;">​</a></h3><ul><li>To provide a detailed description of various ways of organizing memory hardware</li><li>To discuss various memory-management techniques, including paging and segmentation</li><li>To provide a detailed description of the Intel Pentium, which supports both pure segmentation and segmentation with paging</li></ul><h2 id="background" tabindex="-1">Background <a class="header-anchor" href="#background" aria-label="Permalink to &quot;Background&quot;">​</a></h2><ul><li>Program must be brought (from disk) into memory and placed within a process for it to be run</li><li>Main memory and registers are only storage CPU can access directly 主存储器和寄存器只有存储 CPU 可以直接访问</li><li>Memory unit only sees a stream of addresses + read requests, or address + data and write requests 内存单元只能看到地址读取请求或地址数据和写入请求的流</li><li>Register access in one CPU clock (or less) 在一个 CPU 时钟 (或更少) 的寄存器访问</li><li>Main memory can take many cycles, causing a stall</li><li>Cache sits between main memory and CPU registers 高速缓存位于主内存和 CPU 寄存器之间</li><li>Protection of memory required to ensure correct operation</li></ul><h3 id="base-and-limit-registers" tabindex="-1">Base and Limit Registers <a class="header-anchor" href="#base-and-limit-registers" aria-label="Permalink to &quot;Base and Limit Registers&quot;">​</a></h3><ul><li>A pair of base and limit registers(寄存器的基础位置和高位) define the logical address space</li><li>CPU must check every memory access generated in user mode to be sure it is between base and limit for that user</li></ul><h3 id="address-binding" tabindex="-1">Address Binding <a class="header-anchor" href="#address-binding" aria-label="Permalink to &quot;Address Binding&quot;">​</a></h3><ul><li>Programs on disk, ready to be brought into memory to execute form an input queue</li><li>Inconvenient to have first user process physical address always at 0000 使第一个用户进程物理地址始终处于 0000 时不方便</li><li>Further, addresses represented in different ways at different stages of a program’s life 此外，在程序生命的不同阶段以不同方式表示的地址</li></ul><h3 id="binding-of-instructions-and-data-to-memory" tabindex="-1">Binding of Instructions and Data to Memory <a class="header-anchor" href="#binding-of-instructions-and-data-to-memory" aria-label="Permalink to &quot;Binding of Instructions and Data to Memory&quot;">​</a></h3><p>Address binding of instructions and data to memory addresses can happen at three different stages 指令和数据到内存地址的地址绑定可以在三个不同的阶段发生</p><ul><li>Compile time: If memory location known a priori, absolute code can be generated; must recompile code if starting location changes 编译时间: 如果内存位置已知先验，则可以生成绝对代码; 如果起始位置更改，则必须重新编译代码</li><li>Load time: Must generate relocatable code if memory location is not known at compile time 加载时间: 如果在编译时不知道内存位置，则必须生成可重定位代码</li><li>Execution time: Binding delayed until run time if the process can be moved during its execution from one memory segment to another 执行时间: 如果进程在执行期间可以从一个内存段移动到另一个内存段，则绑定会延迟到运行时</li></ul><h3 id="logical-vs-physical-address-space" tabindex="-1">Logical vs. Physical Address Space <a class="header-anchor" href="#logical-vs-physical-address-space" aria-label="Permalink to &quot;Logical vs. Physical Address Space&quot;">​</a></h3><ul><li>The concept of a logical address space that is bound to a separate physical address space is central to proper memory management 绑定到单独的物理地址空间的逻辑地址空间的概念对于正确的内存管理至关重要 <ul><li>Logical address – generated by the CPU; also referred to as virtual address</li><li>Physical address – address seen by the memory unit</li></ul></li><li>Logical and physical addresses are the same in compile-time and load-time address-binding schemes; logical (virtual) and physical addresses differ in execution-time address-binding scheme 逻辑和物理地址在编译时和加载时地址绑定方案中是相同的; 逻辑 (虚拟) 和物理地址在实际执行时地址绑定方案中是不同的</li><li>Logical address space is the set of all logical addresses generated by a program</li><li>Physical address space is the set of all physical addresses generated by a program</li></ul><h3 id="memory-management-unit-mmu" tabindex="-1">Memory-Management Unit (MMU) <a class="header-anchor" href="#memory-management-unit-mmu" aria-label="Permalink to &quot;Memory-Management Unit (MMU)&quot;">​</a></h3><ul><li>Hardware device that at run time maps virtual to physical address 在运行时将虚拟地址映射到物理地址的硬件设备</li><li>Many methods possible, covered in the rest of this chapter</li><li>To start, consider simple scheme where the value in the relocation register is added to every address generated by a user process at the time it is sent to memory 首先，考虑简单的方案，其中重定位寄存器中的值被添加到用户进程在发送到内存时生成的每个地址 <ul><li>Base register now called relocation register 基址寄存器现在称为重定位寄存器</li><li>MS-DOS on Intel 80x86 used 4 relocation registers</li></ul></li><li>The user program deals with logical addresses; it never sees the real physical addresses <ul><li>Execution-time binding occurs when reference is made to location in memory 执行时绑定发生在引用内存中的位置时</li><li>Logical address bound to physical addresses</li></ul></li></ul><h3 id="dynamic-relocation-using-a-relocation-register" tabindex="-1">Dynamic relocation using a relocation register <a class="header-anchor" href="#dynamic-relocation-using-a-relocation-register" aria-label="Permalink to &quot;Dynamic relocation using a relocation register&quot;">​</a></h3><ul><li>Routine is not loaded until it is called 直到调用例程时才加载例程</li><li>Better memory-space utilization; unused routine is never loaded 更好的内存空间利用率; 未使用的例程永远不会加载</li><li>All routines kept on disk in relocatable load format</li><li>Useful when large amounts of code are needed to handle infrequently occurring cases 当需要大量代码来处理不经常发生的情况时很有用</li><li>No special support from the operating system is required</li></ul><p><img src="'+o+'" alt=""></p><h3 id="dynamic-linking" tabindex="-1">Dynamic Linking <a class="header-anchor" href="#dynamic-linking" aria-label="Permalink to &quot;Dynamic Linking&quot;">​</a></h3><ul><li>Static linking – system libraries and program code combined by the loader into the binary program image 静态链接-系统库和程序代码由加载器组合成二进制程序映像</li><li>Dynamic linking –linking postponed until execution time 动态链接-链接推迟到执行时间</li><li>Small piece of code, stub, used to locate the appropriate memory-resident library routine 一小段代码，存根，用于定位适当的内存驻留库例程</li><li>Stub replaces itself with the address of the routine, and executes the routine</li><li>Operating system checks if routine is in processes’ memory address</li><li>Dynamic linking is particularly useful for libraries 动态链接对库特别有用</li><li>System also known as shared libraries 系统也称为共享库</li><li>Consider applicability to patching system libraries 考虑修补系统库的适用性</li></ul><h2 id="swapping" tabindex="-1">Swapping <a class="header-anchor" href="#swapping" aria-label="Permalink to &quot;Swapping&quot;">​</a></h2><ul><li>A process can be swapped temporarily out of memory to a backing store, and then brought back into memory for continued execution 进程可以暂时从内存交换到后备存储，然后恢复到内存中继续执行</li><li>Backing store – fast disk large enough to accommodate copies of all memory images for all users; must provide direct access to these memory images 后备存储-足够大的磁盘以容纳所有用户的所有内存映像的副本; 必须提供对这些内存映像的直接访问</li><li>Roll out, roll in – swapping variant used for priority-based scheduling algorithms; lower-priority process is swapped out so higher-priority process can be loaded and executed Roll out，roll in-用于基于优先级的调度算法的交换变体; 较低优先级的进程被交换出去，因此可以加载和执行较高优先级的进程</li><li>Major part of swap time is transfer time; total transfer time is directly proportional to the amount of memory swapped 交换时间的主要部分是传输时间; 总传输时间与交换的内存量成正比</li><li>System maintains a ready queue of ready-to-run processes which have memory images on disk 系统维护一个准备运行的进程的就绪队列，这些进程在磁盘上具有内存映像</li></ul><h3 id="context-switch-time-including-swapping" tabindex="-1">Context Switch Time including Swapping <a class="header-anchor" href="#context-switch-time-including-swapping" aria-label="Permalink to &quot;Context Switch Time including Swapping&quot;">​</a></h3><ul><li>If next processes to be put on CPU is not in memory, need to swap out a process and swap in target process 如果要放在 CPU 上的下一个进程不在内存中，则需要换出一个进程并换入目标进程</li><li>Context switch time can then be very high 上下文切换时间可能会非常长</li><li>Can reduce if reduce size of memory swapped – by knowing how much memory really being used</li></ul><h2 id="contiguous-memory-allocation" tabindex="-1">Contiguous Memory Allocation <a class="header-anchor" href="#contiguous-memory-allocation" aria-label="Permalink to &quot;Contiguous Memory Allocation&quot;">​</a></h2><blockquote><p>连续内存分配</p></blockquote><ul><li>Main memory must support both OS and user processes 主内存必须同时支持操作系统和用户进程</li><li>Limited resource, must allocate efficiently(高效分配)</li><li>Contiguous allocation is one early method</li><li>Main memory usually into two partitions: <ul><li>Resident operating system, usually held in low memory with interrupt vector 常驻操作系统，通常以中断向量保存在低内存中</li><li>User processes then held in high memory</li><li>Each process contained in single contiguous section of memory 包含在内存的单个连续部分中的每个进程</li></ul></li><li>Relocation registers used to protect user processes from each other, and from changing operating-system code and data 重定位寄存器用于保护用户进程彼此之间以及操作系统代码和数据的更改 <ul><li>Base register contains value of smallest physical address 基址寄存器包含最小物理地址的值</li><li>Limit register contains range of logical addresses – each logical address must be less than the limit register 限制寄存器包含逻辑地址范围-每个逻辑地址必须小于限制寄存器</li><li>MMU maps logical address dynamically</li><li>Can then allow actions such as kernel code being transient and kernel changing size 然后可以允许诸如内核代码为瞬态和内核更改大小之类的操作</li></ul></li></ul><h3 id="multiple-partition-allocation" tabindex="-1">Multiple-partition allocation <a class="header-anchor" href="#multiple-partition-allocation" aria-label="Permalink to &quot;Multiple-partition allocation&quot;">​</a></h3><blockquote><p>多分区分配</p></blockquote><ul><li><p>Degree of multiprogramming limited by number of partitions 受分区数限制的多程序设计程度</p></li><li><p>Variable-partition sizes for efficiency (sized to a given process’ needs) 可变分区大小以提高效率 (根据给定进程的需要进行调整)</p></li><li><p>Hole – block of available memory; holes of various size are scattered throughout memory 可用内存的空穴块; 各种大小的孔分散在整个内存中</p></li><li><p>When a process arrives, it is allocated memory from a hole large enough to accommodate it 当一个进程到达时，它从一个足够大的孔分配内存来容纳它</p></li><li><p>Process exiting frees its partition, adjacent free partitions combined 进程退出释放其分区，相邻的自由分区合并</p></li><li><p>Operating system maintains information about: 操作系统维护有关以下内容的信息:</p><p>a) allocated partitions b) free partitions (hole)</p></li></ul><h3 id="dynamic-storage-allocation-problem" tabindex="-1">Dynamic Storage-Allocation Problem <a class="header-anchor" href="#dynamic-storage-allocation-problem" aria-label="Permalink to &quot;Dynamic Storage-Allocation Problem&quot;">​</a></h3><p>How to satisfy a request of size n from a list of free holes?</p><ul><li>First-fit: Allocate the first hole that is big enough</li><li>Best-fit: Allocate the smallest hole that is big enough; must search entire list, unless ordered by size</li></ul><p>&quot; Produces the smallest leftover hole ! Worst-fit: Allocate the largest hole; must also search entire list</p><p>&quot; Produces the largest leftover hole First-fit and best-fit better than worst-fit in terms of speed and storage</p><p>utilization</p><h2 id="segmentation" tabindex="-1">Segmentation <a class="header-anchor" href="#segmentation" aria-label="Permalink to &quot;Segmentation&quot;">​</a></h2><h2 id="paging" tabindex="-1">Paging <a class="header-anchor" href="#paging" aria-label="Permalink to &quot;Paging&quot;">​</a></h2><p>页表寄存器</p><p>断表寄存器</p><p>逻辑页号</p><p>内存页框</p><h2 id="structure-of-the-page-t-able" tabindex="-1">Structure of the Page T able <a class="header-anchor" href="#structure-of-the-page-t-able" aria-label="Permalink to &quot;Structure of the Page T able&quot;">​</a></h2><h2 id="example-the-intel-32-and-64-bit-architectures" tabindex="-1">Example: The Intel 32 and 64-bit Architectures <a class="header-anchor" href="#example-the-intel-32-and-64-bit-architectures" aria-label="Permalink to &quot;Example: The Intel 32 and 64-bit Architectures&quot;">​</a></h2><h2 id="example-arm-architecture" tabindex="-1">Example: ARM Architecture <a class="header-anchor" href="#example-arm-architecture" aria-label="Permalink to &quot;Example: ARM Architecture&quot;">​</a></h2>',48),s=[l];function n(c,d,m,u,h,p){return i(),a("div",null,s)}const b=e(r,[["render",n]]);export{y as __pageData,b as default};
