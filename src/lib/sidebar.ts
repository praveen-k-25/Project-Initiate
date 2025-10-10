import dashboard from "../assets/svgs/dashboard.svg";
import dashboard_dark from "../assets/svgs/dashboard-dark.svg";
import analytics from "../assets/svgs/analytics.svg";
import analytics_dark from "../assets/svgs/analytics-dark.svg";
import reports from "../assets/svgs/reports.svg";
import reports_dark from "../assets/svgs/reports-dark.svg";
import settings from "../assets/svgs/settings.svg";
import settings_dark from "../assets/svgs/settings-dark.svg";
import tracking from "../assets/svgs/map.svg";
import tracking_dark from "../assets/svgs/map-dark.svg";

export const sidebar = [
  {
    title: "dashboard",
    path: "/dashboard",
    icon: dashboard,
    darkIcon: dashboard_dark,
    submenu: false,
    submenuList: [],
    activeList: ["dashboard"],
  },
  {
    title: "analytics",
    path: "/analytics",
    icon: analytics,
    darkIcon: analytics_dark,
    submenu: false,
    submenuList: [],
    activeList: ["/analytics"],
  },
  {
    title: "reports",
    path: "/reports",
    icon: reports,
    darkIcon: reports_dark,
    submenu: true,
    submenuList: [
      {
        title: "parking",
        path: "/parking",
        submenu: false,
        activeList: ["parking"],
      },
      {
        title: "playback",
        path: "/playback",
        submenu: false,
        activeList: ["playback"],
      },
      {
        title: "inactive",
        path: "/inactive",
        submenu: false,
        activeList: ["inactive"],
      },
    ],
    activeList: ["/parking", "/playback", "/inactive"],
  },
  {
    title: "tracking",
    path: "/tracking",
    icon: tracking,
    darkIcon: tracking_dark,
    submenu: false,
    submenuList: [],
    activeList: ["tracking"],
  },
  {
    title: "settings",
    path: "/settings",
    icon: settings,
    darkIcon: settings_dark,
    submenu: false,
    submenuList: [],
    activeList: ["settings"],
  },
];
