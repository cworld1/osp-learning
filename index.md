---
## https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "操作系统原理"
  text: "相关课程笔记"
  tagline: Created by CWorld
  actions:
    - theme: brand
      text: Start Learning
      link: /00-os-principle-intro
    - theme: alt
      text: Project Intro
      link: /README
  image:
    src: /television_cabinet.png
    alt: computer

features:
  - icon: ✒️
    title: 单纯只是想要记录
    details: “好记性不如烂笔头”，记不住，就用用手记下来以后慢慢翻看，这是我做笔记的初衷。 不过现在分享出来，又何尝不是一种物尽其用呢？
  - icon: 🎓
    title: 一起学习进步
    details: 因为真的不是一个人在努力；是一群人一起学习，一起进步。 每个参与建设或查阅网站的人，都在认真学习。
  - icon: 👨‍💻
    title: 动手或许真的很重要
    details: “只有真正走过，才知道这条路有多艰辛。”万事开头难，请从一段实机操作开始！
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #5760ad 30%, #a8b1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #5760ad8a 50%, #a8b1ff7d 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
