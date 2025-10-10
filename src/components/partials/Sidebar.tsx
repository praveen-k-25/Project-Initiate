import useTheme from "../../hooks/useTheme";
import companyLogoDark from "../../assets/svgs/logo-dark.svg";
import companyLogo from "../../assets/svgs/logo.svg";
import dropdown from "../../assets/svgs/dropdown.svg";
import dropdown_dark from "../../assets/svgs/dropdown-dark.svg";
import { sidebar } from "../../lib/sidebar";
import { Navigate } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [theme, setTheme] = useTheme();
  const [pathname] = useState(window.location.pathname);
  const [openDropdown, setOpenDropdown] = useState<string>("");
  console.log(pathname);

  const handleRoute = (path: string) => <Navigate to={path} />;
  const handleDropdown = (title: string) => {
    title === openDropdown ? setOpenDropdown("") : setOpenDropdown(title);
  };

  return (
    <div
      onMouseLeave={() => setOpenDropdown("")}
      className={`h-full flex flex-col transition-[width] w-[55px] hover:w-[220px] ease-in-out duration-300 p-2 bg-[var(--primary-background)] relative border-r border-[var(--button)] `}
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
          {sidebar.map((menu, index) => {
            if (!menu.submenu) {
              return (
                <li
                  onClick={() => handleRoute(menu.path)}
                  key={`menu-${index}`}
                  className={`relative overflow-hidden rounded-md flex justify-start items-center gap-2 my-1 p-1 cursor-default ${
                    window.location.pathname === menu.path
                      ? "bg-[var(--button)]"
                      : "bg hover:bg-[var(--button-primary)]"
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
                  className={`relative overflow-hidden rounded-md flex justify-start items-center gap-2 my-1 p-1 cursor-default ${
                    window.location.pathname === menu.path
                      ? "bg-[var(--button)]"
                      : "bg hover:bg-[var(--button-primary)]"
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
                        onClick={() => handleRoute(submenu.path)}
                        className={`p-2 rounded-md my-1 cursor-default text-[var(--text)] text-sm font-normal capitalize ${
                          window.location.pathname === menu.path
                            ? "bg-[var(--button)]"
                            : "bg hover:bg-[var(--button-primary)]"
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
        <footer className="relative flex justify-center items-center gap-2 my-1"></footer>
      </div>
    </div>
  );
};

export default Sidebar;
