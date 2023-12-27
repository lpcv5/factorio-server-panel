export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Factorio Server Panel",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "服务器状态",
      href: "/server",
    },
    {
      label: "端口映射管理",
      href: "/port-forwarding",
    },
    {
      label: "存档管理",
      href: "/saves",
    },
    {
      label: "Mod管理",
      href: "/mods",
    },
    {
      label: "游戏设置",
      href: "/game-settings",
    },
    {
      label: "服务器设置",
      href: "/server-settings",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
