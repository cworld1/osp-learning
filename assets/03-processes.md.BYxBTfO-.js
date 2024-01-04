import{_ as s,o as e,c as i,R as a}from"./chunks/framework.XJWvSVd6.js";const t="/assets/image_SXHQTSJC4O.HW58HCe4.png",n="/assets/image_RDavLnehOj.DKlFEPTj.png",l="/assets/image_c-Lo4PHJea.bLU8Pbzw.png",o="/assets/image_jLVOJ49I9h.JvOs1a6i.png",r="/assets/image_oRY000MWcb.elVETgOj.png",p="/assets/image_BSBYBRD1t7.OmW6h7-Q.png",c="/assets/image_9Fjw_Km-Jn.Fx_sjUwI.png",b=JSON.parse('{"title":"03 Processes","description":"","frontmatter":{},"headers":[],"relativePath":"03-processes.md","filePath":"03-processes.md","lastUpdated":1704373151000}'),h={name:"03-processes.md"},d=a('<h1 id="_03-processes" tabindex="-1">03 Processes <a class="header-anchor" href="#_03-processes" aria-label="Permalink to &quot;03 Processes&quot;">​</a></h1><h2 id="contents" tabindex="-1">Contents <a class="header-anchor" href="#contents" aria-label="Permalink to &quot;Contents&quot;">​</a></h2><ul><li>Process Concept</li><li>Process Scheduling</li><li>Operations on Processes</li><li>Interposess Communication</li><li>Examples of IPC Systems</li><li>Communication in Client-Server Systems</li></ul><h3 id="objectives" tabindex="-1">Objectives <a class="header-anchor" href="#objectives" aria-label="Permalink to &quot;Objectives&quot;">​</a></h3><ul><li>To introduce the notion of a process -- a program in execution, which forms the basis of all computation.</li><li>To describe the various features of processes, including scheduling, creation and termination, and communication.</li><li>To explore interposes communication using shared memory and message passing.</li><li>To describe communication in client-server systems.</li></ul><h2 id="process-concept" tabindex="-1">Process Concept <a class="header-anchor" href="#process-concept" aria-label="Permalink to &quot;Process Concept&quot;">​</a></h2><blockquote><p>最简单的模型是基于这样一个事实上，进程要么正在执行，要么没有执行。这样，一个进程就有两种状态：运行（Running）和非运行（Not-running）。</p><p>尽管这个模型很简单，但已经显示出操作系统设计的一些复杂性了。每个进程必须以某种方式来标识，以便操作系统能够对其进行跟踪。也就是说，必须有一些与进程相关的信息，包括进程的当前状态以及进程实体在内存中的地址等。那些非运行状态的进程存放在一个排序队列中等待分派程序的调度运行。</p></blockquote><p>An operating system executes a variety of programs:</p><ul><li>Batch system 批处理系统 – jobs</li><li>Time-shared systems 分时系统 – user programs or tasks</li></ul><p>进程：执行中的程序；流程执行必须以顺序方式进行。</p><p>Program is passive entity stored on disk (executable file), process is active. 程序是存储在磁盘上的被动实体（可执行文件），进程是主动的。</p><p>Program becomes process when executable file loaded into memory. 当可执行文件加载到内存中时，程序就变成了进程。</p><p>Execution of program started via GUI mouse clicks, command line entry of its name, etc. 通过 GUI 鼠标点击、命令行输入其名称等启动程序执行。</p><p>One program can be several processes. Consider multiple users executing the same program. 一个程序可以是多个进程。考虑多个用户执行同一个程序。</p><p><img src="'+t+'" alt=""></p><h3 id="process-state" tabindex="-1">Process State <a class="header-anchor" href="#process-state" aria-label="Permalink to &quot;Process State&quot;">​</a></h3><blockquote><p>当正在执行的进程中断执行时，就被放入进程队列等待下一次运行。如果进程结束或运行失败，它就会被注销而退出系统。无论哪种情况出现，分派程序都会选择一个新的非运行状态进程投入运行。</p><p>但分派程序不能只是在进程队列中选择等待时间最长的进程，而是应该扫描整个进程队列寻找未被阻塞且等待时间最长的进程。因此自然而然是将非运行状态又分为两种状态：就绪（Ready）和阻塞（Blocked）。</p><p><img src="'+n+'" alt=""></p><p>这样，运行中的进程就具有了三种基本状态：运行、阻塞和就绪。这三种状态构成了最简单的进程生命周期模型。进程在其生命周期内处于这三种状态之一，其状态将随着自身的推进和外界环境的变化而发生改变，即由一种状态变迁到另一种状态。</p><ol><li>运行状态。进程获得了 CPU 和其他所需要的资源，目前正在 CPU 上运行。对单 CPU 系统而言，只能有一个进程处于运行状态。</li><li>阻塞状态。进程运行中发生了某种等待事件（如发生了等待 I/O 的操作）而暂时不能运行的状态。处于该状态的进程不能去竞争 CPU，因为此时即使把 CPU 分配给它也无法运行。处于阻塞状态的进程可以有多个。</li><li>就绪状态。进程获得了除 CPU 之外的所需资源，一旦得到 CPU 就可以立即投入运行。不能运行的原因还是因为 CPU 资源太少，只能等待分配 CPU 资源。在系统中处于就绪状态的进程可能有多个，通常是将它们组成一个进程就绪队列。</li></ol><p>此后，我们将用功能更加完善的进程调度程序取代分派程序， “超时”通常也用“时间片到”取代。对上图来说，进程状态变迁应注意以下 5 点。</p><ol><li>进程由就绪状态变迁到运行状态是由进程调度程序（分派程序）完成的。也就是说，一旦 CPU 空闲，进程调度程序就立即依据某种调度算法从进程就绪队列中选择一个进程占用 CPU 运行。</li><li>进程由运行状态变迁到阻塞状态，通常是由运行进程自身提出的。当运行进程申请某种资源得不到满足时（发生等待事件），就主动放弃 CPU 而进入阻塞状态并插入到进程阻塞队列中。这时，进程调度程序就立即将 CPU 分配给另一个就绪进程运行。</li><li>进程由阻塞状态变迁为就绪状态总是由外界事件引起的。因为处于阻塞状态的进程没有任何活动能力，所以也无法改变自身的状态。通常是当阻塞状态进程被阻塞的原因得到解除时（等待事件已完成），由当前正在运行的进程来响应这个外界事件的请求，唤醒相应的阻塞状态进程，将其转换为就绪状态并插入到进程就绪队列中，然后该运行进程继续完成自身的任务。</li><li>进程由运行状态变迁为就绪状态通常在分时操作系统中出现，即系统分配给运行进程所使用的 CPU 时间片用完，这时进程调度程序将 CPU 轮转给下一个就绪进程使用，由于被取消 CPU 使用权的进程仅仅是没有了 CPU，而其他所需资源并不缺少，即满足就绪状态的条件，因此转为就绪状态并插入到进程就绪队列中。</li><li>进程不能由阻塞状态直接变迁到运行状态。由于阻塞进程阻塞的原因被解除（即等待事件已完成）后就满足了就绪状态的条件，因此将该阻塞进程由进程阻塞队列移至进程就绪队列，并将其状态改为就绪。</li></ol><p>此外还要注意的是，虽然进程有三个基本状态，但对每个进程而言，其生命期内不一定都要经历这三个状态。对于一些计算性的简单进程，运行很短的时间就结束了，也就无须进入阻塞状态，所以个别进程可以不经历阻塞状态。</p></blockquote><p>As a process executes, it changes state.</p><ul><li><p>new: The process is being created.</p></li><li><p>running: Instructions are being executed.</p></li><li><p>waiting: The process is waiting for some event to occur. 当程序等待输入/输出时，cpu 没有给该进程分配核，此时程序处于阻塞状态。</p></li><li><p>ready: The process is waiting to be assigned to a processor.</p><p>当新创建进程的初始化工作完成后，系统将其状态转变为就绪状态，并将其插入到进程就绪队列中。</p></li><li><p>terminated: The process has finished execution. 当一个程序不再执行时，它会先仍然在内存中，等待父进程回收或其他程序处理。</p></li></ul><p><img src="'+l+'" alt=""></p><p><img src="'+o+'" alt="关系图" title="关系图"></p><p>dispatch 为分派程序。</p><p>在操作系统总，我们使用队列存储程序状态和对应调度接口。new 状态和 ready 状态的都是如此。</p><p>需要注意，这里实际上在排队的是 PCB。</p><h3 id="process-control-block-pcb" tabindex="-1">Process Control Block (PCB) <a class="header-anchor" href="#process-control-block-pcb" aria-label="Permalink to &quot;Process Control Block (PCB)&quot;">​</a></h3><p>PCB 就在 CPU 的芯片上。</p><p>Information associated with each process (also called task control block) 与每个进程相关的信息（也称为任务控制块）</p><ul><li>状态：Process state – running, waiting, etc.</li><li>程序计数器：Program counter – location of instruction to next execute.</li><li>CPU 寄存器：CPU registers – contents of all process-centric registers.</li><li>CPU 调度信息：CPU scheduling information – priorities, scheduling queue pointers.</li><li>内存管理信息：Memory-management information – memory allocated to the process.</li><li>会计信息：Accounting information – CPU used, clock time elapsed since start, time limits.</li><li>I/O 状态信息：I/O status information – I/O devices allocated to process, list of open files.</li></ul><h3 id="threads" tabindex="-1">Threads <a class="header-anchor" href="#threads" aria-label="Permalink to &quot;Threads&quot;">​</a></h3><p>到目前为止，进程只有一个执行线程。</p><p>考虑在每个进程中设置多个程序计数器：</p><ul><li>Multiple locations can execute at once.</li><li>Multiple threads of control -&gt; threads</li></ul><p>然后必须在 PCB 中存储线程详细信息和多个程序计数器。</p><blockquote><p>多核的最大作用就是采用多线程编程。</p></blockquote><p>Linux 下由内核文件 sched.h 完成。</p><h2 id="process-scheduling" tabindex="-1">Process Scheduling <a class="header-anchor" href="#process-scheduling" aria-label="Permalink to &quot;Process Scheduling&quot;">​</a></h2><p>Process Scheduling 即进程调度。</p><p>最大化 CPU 使用率，快速将进程切换到 CPU 以实现分时。进程调度程序从可用进程中选择下一个在 CPU 上执行的进程</p><p>Maintains scheduling queues of processes 维护进程的调度队列:</p><ul><li>Job queue – set of all processes in the system.</li><li>Ready queue – set of all processes residing in main memory, ready and waiting to execute.</li><li>Device queues – set of processes waiting for an I/O device.</li><li>Processes migrate among the various queues. 进程在各个队列之间迁移。</li></ul><p><img src="'+r+'" alt=""></p><h3 id="schedulers" tabindex="-1">Schedulers <a class="header-anchor" href="#schedulers" aria-label="Permalink to &quot;Schedulers&quot;">​</a></h3><ul><li>Short-term scheduler 短期调度程序 (or CPU scheduler) – selects which process should be executed next and allocates CPU. 选择下一个执行的进程并分配 CPU。</li><li>Long-term scheduler 长期调度程序 (or job scheduler) – selects which processes should be brought into the ready queue. 选择哪些进程应该被带入就绪队列。</li><li>同样的确存在中期调度程序。</li></ul><h3 id="multitasking-in-mobile-systems" tabindex="-1">Multitasking in Mobile Systems <a class="header-anchor" href="#multitasking-in-mobile-systems" aria-label="Permalink to &quot;Multitasking in Mobile Systems&quot;">​</a></h3><p>Some mobile systems (e.g., early version of iOS) allow only one process to run, others suspended.</p><p>Due to screen real estate, user interface limits iOS provides for:</p><ul><li>Single foreground process- controlled via user interface. 通过用户界面控制。</li><li>Multiple background processes– in memory, running, but not on the display, and with limits. 在内存中运行，但不在显示器上，并且有限制。</li></ul><h3 id="context-switch" tabindex="-1">Context Switch <a class="header-anchor" href="#context-switch" aria-label="Permalink to &quot;Context Switch&quot;">​</a></h3><p>When CPU switches to another process, the system must save the state of the old process and load the saved state for the new process via a context switch. 当 CPU 切换到另一个进程时，系统必须保存旧进程的状态，并通过上下文切换为新进程加载保存的状态。</p><h2 id="operations-on-processes" tabindex="-1">Operations on Processes <a class="header-anchor" href="#operations-on-processes" aria-label="Permalink to &quot;Operations on Processes&quot;">​</a></h2><p>System must provide mechanisms(机制) for:</p><ul><li>process creation 进程创建</li><li>process termination 进程终止</li><li>and so on...</li></ul><h3 id="process-creation" tabindex="-1">Process Creation <a class="header-anchor" href="#process-creation" aria-label="Permalink to &quot;Process Creation&quot;">​</a></h3><p>当需要创建一个新进程时，系统为该进程分配一个进程控制块（PCB），并为该进程分配内存空间，且装入该进程对应的程序和有关数据。这时，一个新进程就产生了。</p><p>当一个进程生成另一个进程时，生成进程称为父进程，而被生成进程称为子进程。通常情况下，这些相关进程需要相互通信并且相互协作。</p><p>新进程的创建最初发生在操作系统初始化时，即由系统初始化程序为系统创建第一个进程，然后由父进程通过进程创建的系统调用来创建其子进程。</p><ul><li>Parent process create children processes, which, in turn create other processes, forming a tree of processes. 父进程创建子进程，子进程又创建其他进程，形成一棵进程树。</li><li>Generally, process identified and managed via a process identifier (pid) 一般来说，进程通过进程标识符（pid）来识别和管理</li><li>Resource sharing options. <ul><li>Parent and children share all resources.</li><li>Children share subset of parent’s resources.</li><li>Parent and child share no resources.</li></ul></li><li>Execution options <ul><li>Parent and children execute concurrently.</li><li>Parent waits until children terminate.</li></ul></li></ul><p>Hint:</p><p>Address space</p><ul><li><p>Child duplicate of parent</p></li><li><p>Child has a program loaded into it</p></li></ul><p>UNIX examples</p><ul><li><code>fork()</code> system call creates new process.</li><li><code>exec()</code> system call used after a <code>fork()</code> to replace the process’ memory space with a new program.</li></ul><p><img src="'+p+`" alt=""></p><p>Code:</p><div class="language-c vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">c</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">##include </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">sys</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">types.h</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">##include </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">stdio.h</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">##include </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">unistd.h</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  pid t pid;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  /* fork a child process */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  pid </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fork</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (pid </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> /* error occurred */</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    fprintf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(stderr,</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Fork Failed&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  else</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (pid </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> /* child process */</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    execlp</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/bin/1s&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;1s&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> /* parent process */</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    /* parent will wait for the child to complete */</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    wait</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">NULL</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    printf</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Child Complete&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h3 id="process-termination" tabindex="-1">Process Termination <a class="header-anchor" href="#process-termination" aria-label="Permalink to &quot;Process Termination&quot;">​</a></h3><p>当一个进程执行到自然结束点，或出现不可克服的错误而不得不取消时，或被拥有特定权限的进程取消时，该进程被终止其状态转换为终止状态。处于终止状态的进程不能再被调度执行，与其相关的数据信息由操作系统临时保存。</p><p>终止一个进程时，系统需要逐步释放为其分配的系统资源，最后释放其 PCB。这时，系统将该进程的状态设为终止态，以方便进行相应的收尾工作。</p><p>Process executes last statement and then asks the operating system to delete it using the <code>exit()</code> system call.</p><ul><li>Returns status data from child to parent (via <code>wait()</code>)</li><li>Process&#39; resources are deallocated by operating system.</li></ul><p>Parent may terminate the execution of children processes using the <code>abort()</code> system call. Some reasons for doing so:</p><ul><li>Child has exceeded allocated resources.</li><li>Task assigned to child is no longer required.</li><li>The parent is exiting, and the operating systems does not allow a child to continue if its parent terminates.</li></ul><h2 id="interprocess-communication" tabindex="-1">Interprocess Communication <a class="header-anchor" href="#interprocess-communication" aria-label="Permalink to &quot;Interprocess Communication&quot;">​</a></h2><p>Processes within a system may be independent or cooperating 或独立或协作</p><p>Cooperating process can affect or be affected by other processes, including sharing data 协作进程可以影响其他进程或被其他进程影响，包括共享数据</p><p>Reasons for cooperating processes:</p><ul><li>Information sharing 信息共享</li><li>Computation speedup 计算速度提高</li><li>Modularity 模块性</li><li>Convenience 便利性</li></ul><p>Cooperating processes need interprocess communication (IPC)</p><p>Two models of IPC:</p><ul><li>Shared memory 内存共享模型</li><li>Message passing 信息传递模型</li></ul><p><img src="`+c+'" alt=""></p><h3 id="cooperating-processes" tabindex="-1">Cooperating Processes <a class="header-anchor" href="#cooperating-processes" aria-label="Permalink to &quot;Cooperating Processes&quot;">​</a></h3><ul><li>Independent process cannot affect or be affected by the execution of another process.</li><li>Cooperating process can affect or be affected by the execution of another process.</li></ul><p>Advantages of process cooperation:</p><ul><li><p>Information sharing </p></li><li><p>Computation speed-up</p></li><li><p>Modularity</p></li><li><p>Convenience（写过一遍了，不做赘述）</p></li></ul><h3 id="message-passing" tabindex="-1">Message Passing <a class="header-anchor" href="#message-passing" aria-label="Permalink to &quot;Message Passing&quot;">​</a></h3><p>Mechanism for processes to communicate and to synchronize their actions 进程通信和同步的机制</p><p>Message system – processes communicate with each other without resorting to shared variables 进程之间无需借助共享变量即可相互通信</p><p>IPC facility(设施) provides two operations:</p><ul><li><p>send(message)</p></li><li><p>receive(message)</p></li></ul><p>The message size is either fixed or variable 可变可固定</p>',91),k=[d];function u(g,m,E,y,P,f){return e(),i("div",null,k)}const x=s(h,[["render",u]]);export{b as __pageData,x as default};