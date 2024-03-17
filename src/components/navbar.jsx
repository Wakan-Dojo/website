import { ArrowDownIcon } from "@heroicons/react/20/solid";
import cn from "classnames";
import * as React from "react";

export const Navbar = ({
  children,
  title,
  menuOpenWording,
  topAnchor,
  contentAnchor,
  open,
  setOpen,
}) => {
  const ref = React.useRef(null);
  const [top, setTop] = React.useState(true);
  React.useEffect(() => {
    const handleScroll = () => {
      setTop(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        id="burger"
        data-open="false"
        className="relative flex mx-auto sm:max-w-xl sm:hidden"
      >
        <button
          className="absolute w-10 h-12 text-gray-500 top-2 focus:outline-none"
          ref={ref}
          onClick={() => {
            setOpen(!open);
            if (!open && top) {
              ref.current.scrollIntoView();
            }
          }}
        >
          <span className="sr-only">{menuOpenWording}</span>
          <div className="absolute block w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
            <span
              aria-hidden="true"
              className={cn(
                "burger-line",
                "block",
                "absolute",
                "h-0.5",
                "w-5",
                "bg-current",
                "transform",
                "transition",
                "duration-500",
                "ease-in-out",
                { "-translate-y-1.5": !open },
                { "rotate-45": open }
              )}
            ></span>
            <span
              aria-hidden="true"
              className={cn(
                "burger-line",
                "block",
                "absolute",
                "h-0.5",
                "w-5",
                "bg-current",
                "transform",
                "transition",
                "duration-500",
                "ease-in-out",
                { "opacity-0": open }
              )}
            ></span>
            <span
              aria-hidden="true"
              className={cn(
                "burger-line",
                "block",
                "absolute",
                "h-0.5",
                "w-5",
                "bg-current",
                "transform",
                "transition",
                "duration-500",
                "ease-in-out",
                { "translate-y-1.5": !open },
                { "-rotate-45": open }
              )}
            ></span>
          </div>
        </button>
        <a
          className="flex-1 px-1 py-5 font-bold tracking-widest text-center uppercase sm:text-sm md:text-base lg:px-5 lg:text-lg hover:bg-gray-500/20"
          href={"#" + topAnchor}
          onClick={() => {
            setOpen(false);
          }}
        >
          {title}
        </a>
      </div>

      <nav
        className={cn("container", "mx-auto", "sm:block", "max-w-5xl", {
          hidden: !open,
        })}
      >
        <div className="flex items-center justify-evenly content-center">
          <div className="flex flex-wrap items-center justify-evenly flex-col sm:flex-row w-full sm:w-auto text-center">
            {children}
          </div>
          <a
            className="p-2 sm:p-5 font-semibold transition-colors duration-300 hover:text-slate-500 invisible hidden sm:inline-block sm:visible"
            href={`#${top ? topAnchor : contentAnchor}`}
            aria-label="Scroll"
          >
            <ArrowDownIcon
              className={cn(
                "h-5",
                "w-5",
                "transition-transform",
                "duration-300",
                { "rotate-180": top }
              )}
            />
          </a>
        </div>
      </nav>
    </>
  );
};
