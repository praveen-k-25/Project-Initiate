import companyLogoDark from "../../assets/svgs/logo-dark.svg";
import companyLogo from "../../assets/svgs/logo.svg";
import dropdown from "../../assets/svgs/dropdown.svg";
import dropdown_dark from "../../assets/svgs/dropdown-dark.svg";
import { sidebarFooter, sidebarMain } from "../../lib/sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, type FC } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { cleanupMqtt } from "../../features/mqtt";

const Sidebar: FC = () => {
  const { theme, user } = useSelector((state: any) => state.auth);
  const logoutRef = useRef<HTMLLIElement | null>(null);
  const { pathname } = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string>("");
  const [historyDropdown, setHistoryDropdown] = useState<string>("");
  const [showLogout, setShowLogout] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        logoutRef.current &&
        !logoutRef.current.contains(event.target as Node)
      ) {
        setShowLogout(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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

  const logout = () => {
    navigate("/");
    cleanupMqtt();
    toast.success("Logged Out");
  };

  return (
    <div
      onMouseEnter={handleReEnterDropDown}
      onMouseLeave={() => {
        setOpenDropdown("");
        setShowLogout(false);
      }}
      className={`h-full flex flex-col transition-[width] w-[55px] hover:w-[230px] ease-in-out duration-300 p-2 bg-[var(--background)] relative border-r border-[var(--border)]`}
    >
      <div className="flex flex-col gap-3 h-full overflow-hidden">
        <header className="relative flex justify-center items-center gap-2 my-1 overflow-hidden">
          {theme === "light" ? (
            <img
              src={companyLogo}
              alt=""
              className={`w-[38px] p-1 sticky left-0 z-10 bg-[var(--background)]`}
            />
          ) : (
            <img
              src={companyLogoDark}
              alt=""
              className={`w-[38px]  p-1 sticky left-0 z-10 bg-[var(--background)]`}
            />
          )}
          <span className="font-semibold text-lg text-[var(--text)] z-0">
            Metron
          </span>
        </header>
        <ul className="flex flex-col justify-center overflow-hidden ml-1 bg-[var(--background)]">
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
                      : "hover:bg-[var(--button-sec)]"
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
        <ul className="relative flex-1 flex flex-col gap-2 justify-end ml-1 my-1 bg-[var(--background)]">
          {sidebarFooter.map((footer, index) => {
            if (footer.title === "logout") {
              return (
                <li
                  ref={logoutRef}
                  key={`sidebar-footer-${index}`}
                  className="relative rounded-md flex justify-start items-center gap-2 cursor-default"
                >
                  <div className="sticky left-0 min-w-[34px] min-h-[34px] rounded-full flex justify-center items-center border-none font-extrabold text-xl bg-green-500 text-[var(--text)] capitalize">
                    {user.username[0].toLowerCase()}
                  </div>
                  <div className="flex-1 flex flex-col justify-center gap-[2px]">
                    <span className="font-light text-sm text-[var(--text)] z-0">
                      {user.username}
                    </span>
                    <span className="font-xs text-xs text-[var(--sub-text)] z-0">
                      {user.email.split("@")[0]}
                    </span>
                  </div>
                  <img
                    onClick={handleShowLogout}
                    src={theme === "light" ? footer.icon : footer.darkIcon}
                    alt="logout"
                    className="w-9 p-[10px] rounded-md bg-[var(--button-sec)] hover:bg-[var(--button-primary)] "
                  />
                  <button
                    onClick={logout}
                    className={`absolute -top-[40px] right-[0px] px-3 py-1 w-[90px] text-sm text-[var(--text)] rounded-md hover:bg-[var(--button-primary)] bg-[var(--button-sec)] transition-all duration-300 ${showLogout ? "opacity-100 translate-0 z-10" : "opacity-0 -z-20 translate-y-2"} `}
                  >
                    Logout
                  </button>
                </li>
              );
            }
            return (
              <li
                key={`sidebar-footer-${index}`}
                className={`relative overflow-hidden rounded-md flex justify-start items-center gap-2 my-1 p-1 cursor-default transition-colors duration-150 ${
                  false
                    ? "bg-[var(--button-primary)]"
                    : "bg hover:bg-[var(--button-sec)]"
                }`}
              >
                <img
                  src={theme === "light" ? footer.icon : footer.darkIcon}
                  alt=""
                  className={`w-6 p-1 sticky left-0 z-10`}
                />
                <span className="font-normal capitalize text-sm text-[var(--text)] z-0">
                  {footer.title}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const MobileSidebar: FC = () => {
  const { theme } = useSelector((state: any) => state.auth);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const profile = useRef<HTMLDivElement | null>(null);
  const pageNav = useRef<HTMLDivElement | null>(null);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showPageNavOptions, setShowPageNavOptions] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (profile.current && !profile.current.contains(event.target as Node)) {
        setShowProfileOptions(false);
      }
    };
    const handleOutsideClick2 = (event: MouseEvent) => {
      if (pageNav.current && !pageNav.current.contains(event.target as Node)) {
        setShowPageNavOptions(false);
        setOpenDropdown("");
      }
    };
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("click", handleOutsideClick2);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("click", handleOutsideClick2);
    };
  }, []);

  const handleProfile = () => {
    setShowProfileOptions(!showProfileOptions);
    setShowPageNavOptions(false);
  };

  const handlePageNav = () => {
    setShowPageNavOptions(true);
    setShowProfileOptions(false);
  };

  const handleRoute = (path: string) => {
    navigate(path);
    setOpenDropdown("");
    setShowPageNavOptions(false);
  };

  const handleDropdown = (title: string) => {
    if (title === openDropdown) {
      setOpenDropdown("");
    } else {
      setOpenDropdown(title);
    }
  };

  const logout = () => {
    navigate("/");
    cleanupMqtt();
    toast.success("Logged Out");
  };

  return (
    <div className="w-full flex flex-row justify-between items-center bg-[var(--background)] px-2 py-1 border-b-2 border-[var(--border)]">
      <section className="relative flex justify-center items-center my-1 overflow-hidden">
        {theme === "light" ? (
          <img
            src={companyLogo}
            alt=""
            className={`w-[33px] p-1 sticky left-0 z-10 bg-[var(--background)]`}
          />
        ) : (
          <img
            src={companyLogoDark}
            alt=""
            className={`w-[33px]  p-1 sticky left-0 z-10 bg-[var(--background)]`}
          />
        )}
        <span className="font-semibold text-sm text-[var(--text)] z-0">
          Metron
        </span>
      </section>
      {sidebarFooter.map((footer, index) => {
        if (footer.title === "logout") {
          return (
            <section
              key={`mobile-profile-${index}`}
              className="relative rounded-md flex justify-start items-center gap-2 cursor-default p-1"
            >
              <div
                ref={pageNav}
                onClick={handlePageNav}
                className="relative w-[120px] border border-[var(--border)] rounded-lg flex justify-between p-2 capitalize text-xs text-[var(--text)] "
              >
                {pathname?.replace("/", "")}
                <span className="flex-grow-1 flex justify-end items-center">
                  <img
                    src={theme === "light" ? dropdown : dropdown_dark}
                    alt=""
                    className={`w-4`}
                  />
                </span>
                <ul
                  className={`absolute top-[44px] w-[170px] h-[188px] flex flex-col justify-start items-start overflow-y-auto right-0 overflow-hidden ml-1 p-1 rounded-md bg-[var(--primary-background)] transition-transform duration-300 ease-in-out ${showPageNavOptions ? "opacity-100 z-[9999] translate-0" : "opacity-0 -z-20 translate-y-2"}`}
                >
                  {sidebarMain.map((menu, index) => {
                    if (!menu.submenu) {
                      return (
                        <li
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRoute(menu.path);
                          }}
                          key={`menu-${index}`}
                          className={`w-full flex gap-2 rounded-md my-1 p-1 cursor-default transition-colors duration-150 ${
                            pathname === menu.path
                              ? "bg-[var(--button-primary)]"
                              : "bg hover:bg-[var(--button-sec)]"
                          }`}
                        >
                          <img
                            src={theme === "light" ? menu.icon : menu.darkIcon}
                            alt=""
                            className={`w-4 p-[1px]`}
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
                        className="flex flex-col w-full"
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
                            className={`w-4 p-[1px]`}
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
                                className={`p-1 pl-3 rounded-md my-1 cursor-default text-[var(--text)] text-sm font-normal capitalize transition-colors duration-150 ${
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
              </div>
              <div
                ref={profile}
                onClick={handleProfile}
                className="relative min-w-[32px] min-h-[32px] rounded-full flex justify-center items-center border-none text-sm bg-fuchsia-800 text-[#fff] capitalize"
              >
                {footer.title[0].toLowerCase()}
                <ul
                  className={`fixed top-[48px] right-[10px] transition-transform duration-300 ease-in-out ${showProfileOptions ? "opacity-100 translate-0 z-[9999] " : "opacity-0 -z-20 translate-y-2"} rounded-md bg-[var(--primary-background)] w-[120px] flex flex-col gap-1 p-1`}
                >
                  <li className="text-[var(--text)] text-center py-1 rounded-md hover:bg-[var(--button-primary)] bg-[var(--button-sec)] ">
                    Profile
                  </li>
                  <li
                    onClick={logout}
                    className="text-[var(--text)] text-center py-1 rounded-md hover:bg-[var(--button-primary)] bg-[var(--button-sec)]"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </section>
          );
        }
      })}
    </div>
  );
};

export { Sidebar, MobileSidebar };
