import { DefaultTheme, defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "操作系统原理",
  description: "操作系统原理课程笔记",
  lang: "zh-CN",
  markdown: {
    math: true,
  },
  lastUpdated: true,
  cleanUrls: true,
  base: '/osp-learning/',

  head: [
    ["link", { rel: "icon", type: "image/ico", href: "/favicon.ico" }],
    ["meta", { name: "theme-color", content: "#a8b1ff" }],
    ["meta", { name: "og:type", content: "website" }],
    ["meta", { name: "og:locale", content: "cn" }],
    ["meta", { name: "og:site_name", content: "CWorld Project" }],
    [
      "meta",
      { name: "og:image", content: "https://osp.cworld.top/computer_desk.png" },
    ],
    [
      "script",
      {},
      `
      setTimeout(function() {
        var script = document.createElement('script');
        script.src = 'https://busuanzi.icodeq.com/busuanzi.pure.mini.js';
        document.head.appendChild(script);
      }, 2000);
    `,
    ],
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { src: "/favicon.ico", width: 24, height: 24 },

    outline: [2, 3],

    search: { provider: "local" },

    nav: [
      { text: "Home", link: "/" },
      { text: "Intro", link: "/README" },
    ],

    sidebar: sidebarGuide(),

    socialLinks: [
      {
        icon: {
          svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M29.303 32h-26.6A2.686 2.686 0 0 1 0 29.303v-26.6A2.686 2.686 0 0 1 2.697 0h26.704C30.802 0 32 1.197 32 2.697v26.605c0 1.5-1.197 2.697-2.697 2.697zM16 5.303h-4A6.7 6.7 0 0 0 5.303 12v8A6.7 6.7 0 0 0 12 26.697h8A6.7 6.7 0 0 0 26.697 20v-5.303c0-.796-.599-1.395-1.4-1.395H24c-.697 0-1.303-.605-1.303-1.303A6.7 6.7 0 0 0 16 5.296zm4.099 16H12c-.697 0-1.303-.605-1.303-1.303s.605-1.303 1.303-1.303h8.099c.704 0 1.303.6 1.303 1.303s-.599 1.303-1.303 1.303m-3.402-10.606c.704 0 1.303.605 1.303 1.303s-.599 1.303-1.303 1.303h-4.796c-.704 0-1.303-.605-1.303-1.303s.599-1.303 1.303-1.303z"/></svg>',
        },
        link: "https://cworld.top",
        ariaLabel: "Blog",
      },
      { icon: "github", link: "https://github.com/cworld1/osp-learning" },
    ],

    footer: {
      message:
        'Released under the GPL-3 License. (<span id="busuanzi_value_site_pv">???</span> views totally)',
      copyright: "Copyright © 2023-present CWorld",
    },

    editLink: {
      pattern: "https://github.com/cworld1/osp-learning/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
  },
});

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Intro",
      items: [
        { text: "Project Intro", link: "/README" },
        { text: "00 OS Principles Course Intro", link: "/00-os-principle-intro", },
      ],
    },
    {
      text: "Main",
      items: [
        { text: "01 How Computer Work", link: "/01-how-computer-work" },
        { text: "02 Operating-System Structures", link: "/02-os-structures" },
        { text: "03 Processes", link: "/03-processes" },
        { text: "04 Threads & Concurrency", link: "/04-threads-and-concurrency" },
        { text: "05 CPU Scheduling", link: "/05-cpu-scheduling" },
        { text: "06 Synchronization Tools", link: "/06-sync-tools" },
        { text: "07 Synchronization Examples (合并到 ch6)", link: "/07-sync-examples" },
        { text: "08 Deadlocks", link: "/08-deadlocks" },
        { text: "09 Memory Management", link: "/09-memory-manage" },
        { text: "10 Virtual Memory", link: "/10-v-memory" },
        { text: "11 Mass-Storage Systems", link: "/11-mass-storage-sys" },
        { text: "12 I/O System", link: "/12-io-sys" },
        { text: "14 File System Implementation", link: "/14-file-sys-implement" },
      ],
    },
    {
      text: "Extra",
      items: [
        { text: "sched_c - scheduling primitives", link: "/ex-critical-res" },
        { text: "什么是临界资源，临界区？", link: "/ex-mid-exam" },
        { text: "Mid Exam", link: "/ex-sched" },
      ],
    },
  ];
}
