import useTheme from "../../hooks/useTheme";
import companyLogoDark from "../../assets/svgs/logo-dark.svg";
import companyLogo from "../../assets/svgs/logo.svg";
import dropdown from "../../assets/svgs/dropdown.svg";
import dropdown_dark from "../../assets/svgs/dropdown-dark.svg";
import { sidebarFooter, sidebarMain } from "../../lib/sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const [theme, setTheme] = useTheme();
  const [pathname, setPathname] = useState<string>(window.location.pathname);
  const [openDropdown, setOpenDropdown] = useState<string>("");
  const [historyDropdown, setHistoryDropdown] = useState<string>("");
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setPathname(window.location.pathname);
  }, [window.location.pathname]);
  const handleRoute = (path: string) => {
    navigate(path);
  };
  const handleDropdown = (title: string) => {
    if (title === openDropdown) {
      setOpenDropdown("");
    } else {
      setOpenDropdown(title);
    }
  };

  const handleReEnterDropDown = () => {
    setOpenDropdown(historyDropdown);
  };

  const handleShowLogout = () => {
    setShowLogout(!showLogout);
  };

  return (
    <div
      onMouseEnter={handleReEnterDropDown}
      onMouseLeave={() => setOpenDropdown("")}
      className={`h-full flex flex-col transition-[width] w-[55px] hover:w-[230px] ease-in-out duration-300 p-2 bg-[var(--primary-background)] relative border-r border-[var(--border)] `}
    >
      <div className="overflow-hidden flex flex-col gap-3 h-full">
        <header className="relative flex justify-center items-center gap-2 my-1">
          {theme === "light" ? (
            <img
              onClick={() => setTheme("dark")}
              src={companyLogo}
              alt=""
              className={`w-[38px] p-1 sticky left-0 z-10 bg-[var(--primary-background)]`}
            />
          ) : (
            <img
              onClick={() => setTheme("light")}
              src={companyLogoDark}
              alt=""
              className={`w-[38px]  p-1 sticky left-0 z-10 bg-[var(--primary-background)]`}
            />
          )}
          <span className="font-semibold text-lg text-[var(--text)] z-0">
            Metron
          </span>
        </header>
        <ul className="flex flex-col justify-center overflow-hidden ml-1 bg-[var(--primary-background)]">
          {sidebarMain.map((menu, index) => {
            if (!menu.submenu) {
              return (
                <li
                  onClick={() => {
                    setOpenDropdown("");
                    setHistoryDropdown("");
                    handleRoute(menu.path);
                  }}
                  key={`menu-${index}`}
                  className={`relative overflow-hidden rounded-md flex justify-start items-center gap-2 my-1 p-1 cursor-default transition-colors duration-150 ${
                    pathname === menu.path
                      ? "bg-[var(--button-primary)]"
                      : "bg hover:bg-[var(--button-sec)]"
                  }`}
                >
                  <img
                    src={theme === "light" ? menu.icon : menu.darkIcon}
                    alt=""
                    className={`w-6 p-1 sticky left-0 z-10`}
                  />
                  <span className="font-normal capitalize text-sm text-[var(--text)] z-0">
                    {menu.title}
                  </span>
                </li>
              );
            }
            return (
              <li
                onClick={() => handleDropdown(menu.title)}
                key={`menu-${index}`}
                className="flex flex-col"
              >
                <section
                  className={`relative overflow-hidden rounded-md flex justify-start items-center gap-2 my-1 p-1 cursor-default transition-colors duration-150 ${
                    menu.activeList.includes(pathname)
                      ? "bg-[var(--button-primary)]"
                      : "bg hover:bg-[var(--button-sec)]"
                  }`}
                >
                  <img
                    src={theme === "light" ? menu.icon : menu.darkIcon}
                    alt=""
                    className={`w-6 p-1 sticky left-0 z-10`}
                  />
                  <span className="font-normal capitalize text-sm text-[var(--text)] z-0">
                    {menu.title}
                  </span>
                  <span className="flex-grow-1 flex justify-end items-center">
                    <img
                      src={theme === "light" ? dropdown : dropdown_dark}
                      alt=""
                      className={`w-4 mr-1 transistion-transform duration-200 delay-200 ${openDropdown === menu.title ? "" : "-rotate-90"}`}
                    />
                  </span>
                </section>
                <ul
                  onClick={(e) => e.stopPropagation()}
                  className={`grid ${openDropdown === menu.title ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} transition-all ease-in-out duration-500 pl-4`}
                >
                  <div className="overflow-hidden border-l border-[var(--border)] pl-3 flex flex-col">
                    {menu.submenuList.map((submenu, index) => (
                      <li
                        key={`submenu-${index}`}
                        onClick={() => {
                          setHistoryDropdown(menu.title);
                          handleRoute(submenu.path);
                        }}
                        className={`p-2 pl-3 rounded-md my-1 cursor-default text-[var(--text)] text-sm font-normal capitalize transition-colors duration-150 ${
                          pathname === submenu.path
                            ? "bg-[var(--button-primary)]"
                            : "bg hover:bg-[var(--button-sec)]"
                        }`}
                      >
                        {submenu.title}{" "}
                      </li>
                    ))}
                  </div>
                </ul>
              </li>
            );
          })}
        </ul>
        <footer className="relative flex-1 flex justify-center items-end gap-2 my-1">
          {sidebarFooter.map((footer, index) => {
            if (footer.title === "logout") {
              /* 
              return <div className=""></div>;
            } */
              return (
                  <section
                    key={`sidebar-footer-${index}`}
                    className="relative overflow-hidden rounded-md flex justify-start items-center gap-2 cursor-default p-1"
                  >
                    <div className="sticky left-0 min-w-[34px] min-h-[34px] rounded-full flex justify-center items-center border-none font-extrabold text-xl bg-green-500 text-[var(--text)] capitalize">
                      {footer.title[0].toLowerCase()}
                    </div>
                    <div className=" flex flex-col justify-center gap-[2px]">
                      <span className="font-light text-sm text-[var(--text)] z-0">
                        praveen
                      </span>
                      <span className="font-xs text-xs text-[var(--sub-text)] z-0 ">
                        testdemo@gmail.com
                      </span>
                    </div>
                    <img
                      onClick={handleShowLogout}
                      src={theme === "light" ? footer.icon : footer.darkIcon}
                      alt=""
                      className=" w-9 p-[10px] rounded-md bg-[var(--button-sec)] hover:bg-[var(--button-primary)] "
                    />
                  </section>
              );
            }
          })}
        </footer>
      </div>
    </div>
  );
};

export default Sidebar;
