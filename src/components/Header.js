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

  useEffect(() => {
    setWishCount(getWishes().length);
  }, [location.pathname]);

  const scrollToId = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleHashNav = (event, href) => {
    event.preventDefault();

    const id = href.slice(1);

    if (location.pathname === "/") {
      scrollToId(id);
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  const handleLogoClick = (event) => {
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

      </div>

    </header>
  );
}

export default Header;