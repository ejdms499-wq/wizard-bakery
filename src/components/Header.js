import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../css/Header.css";
import brandData from "../db/brand.json";
import { getWishes } from "../utils/wishes";

function Header() {
  const brand = brandData.brand;
  const nav = brandData.nav;

  const navigate = useNavigate();
  const location = useLocation();

  const [wishCount, setWishCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setWishCount(getWishes().length);
  }, [location.pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const scrollToId = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleHashNav = (event, href) => {
    event.preventDefault();

    const id = href.slice(1);

    setMenuOpen(false);

    if (location.pathname === "/") {
      scrollToId(id);
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  const handleLogoClick = (event) => {
    setMenuOpen(false);

    if (location.pathname === "/") {
      event.preventDefault();
      scrollToId("top");
    }
  };

  return (
    <header className="site-header">

      <div className="header-inner">

        <Link
          to="/"
          className="header-brand"
          onClick={handleLogoClick}
        >

          <span className="header-brand-en">
            {brand.name}
          </span>

          <span className="header-brand-ko">
            {brand.nameKo}
          </span>

        </Link>


        <nav className="header-nav">

          {nav.map((menu) =>
            menu.href.startsWith("#") ? (
              <a
                key={menu.id}
                href={menu.href}
                className="header-nav-link"
                onClick={(event) =>
                  handleHashNav(event, menu.href)
                }
              >
                {menu.name}
              </a>
            ) : (
              <Link
                key={menu.id}
                to={menu.href}
                className="header-nav-link"
              >
                {menu.name}
              </Link>
            )
          )}

          <Link to="/wishes" className="header-nav-link header-nav-wish">
            새겨둔 소원
            {wishCount > 0 && (
              <span className="header-nav-wish-count">
                {wishCount}
              </span>
            )}
          </Link>

        </nav>


        <button
          type="button"
          className={`header-menu-toggle ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>


      <div
        className={`header-mobile-overlay ${menuOpen ? "is-open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      <nav className={`header-mobile-nav ${menuOpen ? "is-open" : ""}`}>

        {nav.map((menu) =>
          menu.href.startsWith("#") ? (
            <a
              key={menu.id}
              href={menu.href}
              className="header-mobile-link"
              onClick={(event) =>
                handleHashNav(event, menu.href)
              }
            >
              {menu.name}
            </a>
          ) : (
            <Link
              key={menu.id}
              to={menu.href}
              className="header-mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {menu.name}
            </Link>
          )
        )}

        <Link
          to="/wishes"
          className="header-mobile-link header-mobile-wish"
          onClick={() => setMenuOpen(false)}
        >
          새겨둔 소원
          {wishCount > 0 && (
            <span className="header-nav-wish-count">
              {wishCount}
            </span>
          )}
        </Link>

      </nav>

    </header>
  );
}

export default Header;