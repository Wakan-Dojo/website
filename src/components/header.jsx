import * as React from "react";
import { Navbar } from "./navbar";

const Header = ({ menuItems, title, subtitle, menuOpenWording }) => {
  const [openMenu, setOpenMenu] = React.useState(false);
  return (
    <>
      <header
        id="top"
        className="flex h-[calc(100vh-4em)] flex-col justify-end bg-[url('/armure.jpg')] bg-fixed bg-cover bg-center"
      >
        <div className="justify-left jus container mx-auto flex max-w-5xl items-center pb-12 pl-12 md:pb-24">
          <img
            className="inline-block h-20 w-20 flex-none rounded-full drop-shadow-lg"
            src="logo.jpg"
            alt=""
          />
          <div className="ml-8 flex flex-col">
            <h1 className="text-2xl font-extrabold uppercase tracking-wider text-white drop-shadow-lg md:text-4xl">
              {title}
            </h1>
            <h2 className="text-white font-semibold drop-shadow-sm">
              {subtitle}
            </h2>
          </div>
        </div>
      </header>

      <section className="sticky top-0 z-[1500] bg-white">
        <Navbar
          title={title}
          menuOpenWording={menuOpenWording}
          topAnchor="top"
          open={openMenu}
          setOpen={setOpenMenu}
        >
          {menuItems.map((menuItem) => (
            <a
              key={menuItem.anchor || menuItem.icon}
              className="p-2 sm:p-5 text-sm font-semibold transition-colors duration-300 hover:text-slate-500 w-full sm:w-auto hover:bg-gray-500/20"
              href={menuItem.href || "#" + menuItem.anchor}
              onClick={() => setOpenMenu(false)}
            >
              {(menuItem.icon && (
                <img
                  className="inline-block"
                  src={menuItem.icon}
                  alt={menuItem.title}
                />
              )) ||
                menuItem.title}
            </a>
          ))}
        </Navbar>
      </section>
    </>
  );
};

export default Header;
