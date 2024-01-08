export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Factorio Server Panel",
  description: "Manage your factorio headless server easily.",
  navItems: [
    {
      id: "0",
      label: "服务器管理",
      href: "/server",
    },
    {
      id: "1",
      label: "端口映射管理",
      href: "/port-forwarding",
    },
    {
      id: "2",
      label: "存档管理",
      href: "/saves",
    },
    {
      id: "3",
      label: "Mod管理",
      href: "/mods",
    },
    {
      id: "4",
      label: "游戏设置",
      href: "/game-settings",
    },
    {
      id: "5",
      label: "服务器设置",
      href: "/server-settings",
    },
  ],
};
