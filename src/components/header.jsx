import * as React from "react";

const Header = ({ menuItems, title, subtitle, menuOpenWording }) => {
  return (
    <header>
      <section
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
      </section>

      <section className="sticky top-0 z-[1500] bg-white">
        <div
          id="burger"
          data-open="false"
          className="relative flex mx-auto sm:max-w-xl sm:hidden"
        >
          <button className="absolute w-10 h-12 text-gray-500 top-2 focus:outline-none">
            <span className="sr-only">{menuOpenWording}</span>
            <div className="absolute block w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
              <span
                aria-hidden="true"
                className="burger-line block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
              ></span>
              <span
                aria-hidden="true"
                className="burger-line block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
              ></span>
              <span
                aria-hidden="true"
                className="burger-line block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
              ></span>
            </div>
          </button>
          <a
            className="flex-1 px-1 py-5 font-bold tracking-widest text-center uppercase sm:text-sm md:text-base lg:px-5 lg:text-lg hover:bg-gray-500/20"
            href="#wakan-dojo"
          >
            {title}
          </a>
        </div>

        <nav className="container mx-auto menu sm:block max-w-5xl">
          <div className="flex items-center justify-evenly">
            <div className="flex flex-wrap items-center justify-evenly flex-col sm:flex-row">
              {menuItems.map((menuItem) => (
                <a
                  key={menuItem.anchor}
                  className="p-2 sm:p-5 text-sm font-semibold transition-colors duration-300 hover:text-slate-500"
                  href={menuItem.href || "#" + menuItem.anchor}
                >
                  {(menuItem.icon && (
                    <img src={menuItem.icon} alt={menuItem.title} />
                  )) ||
                    menuItem.title}
                </a>
              ))}
            </div>

            <a
              className="p-2 sm:p-5 font-semibold transition-colors duration-300 hover:text-slate-500 hidden sm:visible"
              href="#wakan-dojo"
            >
              <img src="icons/arrow-down.svg" alt="" />
            </a>
          </div>
        </nav>
      </section>
    </header>
  );
};

export default Header;
