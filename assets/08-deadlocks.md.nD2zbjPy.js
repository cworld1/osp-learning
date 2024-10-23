import{_ as d,D as n,o,c as l,k as e,a as s,I as t,w as a,R as c}from"./chunks/framework.GAJuE5ww.js";const C=JSON.parse('{"title":"08 Deadlocks","description":"","frontmatter":{},"headers":[],"relativePath":"08-deadlocks.md","filePath":"08-deadlocks.md","lastUpdated":1729693534000}'),h={name:"08-deadlocks.md"},p=c('<h1 id="_08-deadlocks" tabindex="-1">08 Deadlocks <a class="header-anchor" href="#_08-deadlocks" aria-label="Permalink to &quot;08 Deadlocks&quot;">​</a></h1><h2 id="overview" tabindex="-1">Overview <a class="header-anchor" href="#overview" aria-label="Permalink to &quot;Overview&quot;">​</a></h2><ul><li><p>System Model</p></li><li><p>Deadlock Characterization</p></li><li><p>Methods for Handling Deadlocks</p></li><li><p>Deadlock Prevention</p></li><li><p>Deadlock Avoidance</p></li><li><p>Deadlock Detection</p></li><li><p>Recovery from Deadlock</p></li></ul><h2 id="chapter-objectives" tabindex="-1">Chapter Objectives <a class="header-anchor" href="#chapter-objectives" aria-label="Permalink to &quot;Chapter Objectives&quot;">​</a></h2><ul><li><p>To develop a description of deadlocks, which prevent sets of concurrent processes from completing their tasks</p></li><li><p>To present a number of different methods for preventing or avoiding deadlocks in a computer system</p></li></ul><h2 id="system-model" tabindex="-1">System Model <a class="header-anchor" href="#system-model" aria-label="Permalink to &quot;System Model&quot;">​</a></h2><ul><li><p>System consists of resources</p></li><li><p>Resource types R1, R2, . . ., Rm</p></li><li><p>Each resource type Ri has Wi instances.</p></li><li><p>Each process utilizes a resource as follows:</p><ul><li><p>request </p></li><li><p>use </p></li><li><p>release</p></li></ul></li></ul><h2 id="deadlock-characterization" tabindex="-1">Deadlock Characterization <a class="header-anchor" href="#deadlock-characterization" aria-label="Permalink to &quot;Deadlock Characterization&quot;">​</a></h2><p>死锁特征</p><ul><li>Mutual exclusion: only one process at a time can use a resource 互斥: 一次只有一个进程可以使用资源</li><li>Hold and wait: a process holding at least one resource is waiting to acquire additional resources held by other processes 保持和等待: 持有至少一个资源的进程正在等待获取其他进程持有的额外资源</li><li>No preemption: a resource can be released only voluntarily by the process holding it, after that process has completed its task 无抢占: 资源只能由持有它的进程在该进程完成其任务后自愿释放</li><li>Circular wait: there exists a set {P0, P1, ..., Pn} of waiting processes such that P0 is waiting for a resource that is held by P1, P1 is waiting for a resource that is held by P2, ..., Pn–1 is waiting for a resource that is held by Pn, and Pn is waiting for a resource that is held by P0. 循环等待: 存在一组 {P0，P1，...，Pn} 等待进程，使得 P0 等待由 P1 持有的资源，P1 等待由 P2 持有的资源，...，Pn-1 等待由 Pn 持有的资源，并且 Pn 正在等待由 p0 保持的资源。</li></ul><h3 id="deadlock-with-mutex-locks" tabindex="-1">Deadlock with Mutex Locks <a class="header-anchor" href="#deadlock-with-mutex-locks" aria-label="Permalink to &quot;Deadlock with Mutex Locks&quot;">​</a></h3><p>Deadlocks can occur via system calls, locking, etc. 死锁可以通过系统调用、锁定等发生。</p><h3 id="basic-facts" tabindex="-1">Basic Facts <a class="header-anchor" href="#basic-facts" aria-label="Permalink to &quot;Basic Facts&quot;">​</a></h3>',13),u={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.054ex"},xmlns:"http://www.w3.org/2000/svg",width:"2.262ex",height:"1.242ex",role:"img",focusable:"false",viewBox:"0 -525 1000 549","aria-hidden":"true"},m=e("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[e("g",{"data-mml-node":"math"},[e("g",{"data-mml-node":"mo"},[e("path",{"data-c":"21D2",d:"M580 514Q580 525 596 525Q601 525 604 525T609 525T613 524T615 523T617 520T619 517T622 512Q659 438 720 381T831 300T927 263Q944 258 944 250T935 239T898 228T840 204Q696 134 622 -12Q618 -21 615 -22T600 -24Q580 -24 580 -17Q580 -13 585 0Q620 69 671 123L681 133H70Q56 140 56 153Q56 168 72 173H725L735 181Q774 211 852 250Q851 251 834 259T789 283T735 319L725 327H72Q56 332 56 347Q56 360 70 367H681L671 377Q638 412 609 458T580 514Z",style:{"stroke-width":"3"}})])])],-1),k=[m],f=e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("mo",{stretchy:"false"},"⇒")],-1),x={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.054ex"},xmlns:"http://www.w3.org/2000/svg",width:"2.262ex",height:"1.242ex",role:"img",focusable:"false",viewBox:"0 -525 1000 549","aria-hidden":"true"},_=e("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[e("g",{"data-mml-node":"math"},[e("g",{"data-mml-node":"mo"},[e("path",{"data-c":"21D2",d:"M580 514Q580 525 596 525Q601 525 604 525T609 525T613 524T615 523T617 520T619 517T622 512Q659 438 720 381T831 300T927 263Q944 258 944 250T935 239T898 228T840 204Q696 134 622 -12Q618 -21 615 -22T600 -24Q580 -24 580 -17Q580 -13 585 0Q620 69 671 123L681 133H70Q56 140 56 153Q56 168 72 173H725L735 181Q774 211 852 250Q851 251 834 259T789 283T735 319L725 327H72Q56 332 56 347Q56 360 70 367H681L671 377Q638 412 609 458T580 514Z",style:{"stroke-width":"3"}})])])],-1),b=[_],w=e("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[e("mo",{stretchy:"false"},"⇒")],-1),v=c('<ul><li>if only one instance per resource type, then deadlock 如果每个资源类型只有一个实例，则死锁</li><li>if several instances per resource type, possibility of deadlock 如果每个资源类型有多个实例，则可能死锁</li></ul><p>Methods for Handling Deadlocks</p><ul><li>Ensure that the system will never enter a deadlock state: <ul><li>Deadlock prevention 死锁预防</li><li>Deadlock avoidence 避免死锁</li></ul></li><li>Allow the system to enter a deadlock state and then recover 允许系统进入死锁状态，然后恢复</li><li>Ignore the problem and pretend that deadlocks never occur in the system; used by most operating systems, including UNIX 忽略问题并假装系统中从未发生死锁; 大多数操作系统都这么做，包括 UNIX</li></ul><p>Deadlock Prevention</p><p>Restrain the ways request can be made</p><ul><li>Mutual Exclusion – not required for sharable resources (e.g., read-only files); must hold for non-sharable resources 互斥-对于可共享资源 (例如，只读文件) 不需要; 对于不可共享资源必须保持</li><li>Hold and Wait – must guarantee that whenever a process requests a resource, it does not hold any other resources 保持和等待-必须保证每当进程请求资源时，它不持有任何其他资源 <ul><li>Require process to request and be allocated all its resources before it begins execution, or allow process to request resources only when the process has none allocated to it. 要求进程在开始执行之前请求并分配其所有资源，或者仅当进程未分配任何资源时才允许进程请求资源。</li><li>Low resource utilization; starvation possible 资源利用率低; 可能存在饥饿</li></ul></li></ul><p>Deadlock Avoidance</p><p>Requires that the system has some additional a priori information available 要求系统有一些额外的先验信息可用</p><ul><li>Simplest and most useful model requires that each process declare the maximum number of resources of each type that it may need 最简单和最有用的模型要求每个进程声明它可能需要的每种类型的最大资源数</li><li>The deadlock-avoidance algorithm dynamically examines the resource-allocation state to ensure that there can never be a circular-wait condition 死锁避免算法动态检查资源分配状态，以确保永远不会出现循环等待条件</li><li>Resource-allocation state is defined by the number of available and allocated resources, and the maximum demands of the processes 资源分配状态由可用资源和已分配资源的数量以及进程的最大需求来定义</li></ul><h3 id="banker-s-algorithm" tabindex="-1">Banker’s Algorithm <a class="header-anchor" href="#banker-s-algorithm" aria-label="Permalink to &quot;Banker’s Algorithm&quot;">​</a></h3><p>推荐阅读：</p><p><a href="https://zhuanlan.zhihu.com/p/384678500" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/384678500</a></p><p>此处不再赘述。</p><ul><li>Deadlock Detection</li><li>Recovery from Deadlock</li></ul>',14);function y(g,T,P,Q,D,q){const i=n("mjx-assistive-mml"),r=n("mjx-container");return o(),l("div",null,[p,e("p",null,[s("If graph contains no cycles "),t(r,{class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},{default:a(()=>[(o(),l("svg",u,k)),t(i,{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},{default:a(()=>[f]),_:1})]),_:1}),s(" no deadlock")]),e("p",null,[s("If graph contains a cycle "),t(r,{class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},{default:a(()=>[(o(),l("svg",x,b)),t(i,{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},{default:a(()=>[w]),_:1})]),_:1})]),v])}const S=d(h,[["render",y]]);export{C as __pageData,S as default};