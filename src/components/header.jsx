import * as Icons from "@icons-pack/react-simple-icons";
import { GatsbyImage } from "gatsby-plugin-image";
import * as React from "react";
import { getUrl } from "./image";
import { Navbar } from "./navbar";

const Icon = ({ icon, ...props }) => {
  const Component = Icons[`Si${icon}`];

  return <Component {...props} />;
};

export const Header = ({
  menuItems,
  title,
  subtitle,
  logoImage,
  bannerImage,
  menuOpenWording,
}) => {
  const [openMenu, setOpenMenu] = React.useState(false);
  return (
    <>
      <header
        id="top"
        className="flex h-[calc(100vh-4em)] flex-col justify-end bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: `url(${getUrl({
            image: bannerImage,
          })})`,
        }}
      >
        <div className="justify-left jus container mx-auto flex max-w-5xl items-center pb-12 pl-12 md:pb-24">
          <GatsbyImage
            className="inline-block flex-none rounded-full drop-shadow-lg"
            image={logoImage}
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
          contentAnchor="content"
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
                <Icon
                  className="inline-block"
                  icon={menuItem.icon}
                  size={18}
                  title={menuItem.title}
                ></Icon>
              )) ||
                menuItem.title}
            </a>
          ))}
        </Navbar>
      </section>
    </>
  );
};
