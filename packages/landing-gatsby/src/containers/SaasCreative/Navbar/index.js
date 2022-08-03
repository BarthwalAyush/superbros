import React, { useContext } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import NavbarWrapper from 'common/components/Navbar';
import Drawer from 'common/components/Drawer';
import Button from 'common/components/Button';
import Logo from 'common/components/UIElements/Logo';
import Box from 'common/components/Box';
import HamburgMenu from 'common/components/HamburgMenu';
import Container from 'common/components/UI/Container';
import { DrawerContext } from 'common/contexts/DrawerContext';

import ScrollSpyMenu from 'common/components/ScrollSpyMenu';

import logoDark from 'common/assets/image/saasCreative/logo.png';
import logoWhite from 'common/assets/image/saasCreative/logo-white.png';

const Navbar = ({ navbarStyle, logoStyle, button, row, menuWrapper }) => {
  const { state, dispatch } = useContext(DrawerContext);

  // Toggle drawer
  const toggleHandler = () => {
    dispatch({
      type: 'TOGGLE',
    });
  };

  const data = useStaticQuery(graphql`
    query {
      saasCreativeJson {
        navItems {
          label
          path
          offset
        }
      }
    }
  `);

  return (
    <NavbarWrapper {...navbarStyle}>
      <Container>
        <Box {...row}>
          <Logo
            href="#"
            logoSrc={logoWhite}
            title="SaaS Creative"
            logoStyle={logoStyle}
            className="main-logo"
          />
          <Logo
            href="#"
            logoSrc={logoDark}
            title="SaaS Creative"
            logoStyle={logoStyle}
            className="sticky-logo"
          />
          <Box {...menuWrapper} className="mainMenuWrapper">
            <ScrollSpyMenu
              className="main_menu"
              menuItems={data.saasCreativeJson.navItems}
              offset={-70}
            />
            <Link to="#" className="navbar_button navbar_button_one">
              <Button {...button} title="Login Now" />
            </Link>
            <Link to="#" className="navbar_button navbar_button_two">
              <Button {...button} title="Join Free" />
            </Link>
            <Drawer
              width="420px"
              placement="right"
              drawerHandler={<HamburgMenu barColor="#108AFF" />}
              open={state.isOpen}
              toggleHandler={toggleHandler}
            >
              <ScrollSpyMenu
                className="mobile_menu"
                menuItems={data.saasCreativeJson.navItems}
                drawerClose={true}
                offset={-100}
              />
            </Drawer>
          </Box>
        </Box>
      </Container>
    </NavbarWrapper>
  );
};

Navbar.propTypes = {
  navbarStyle: PropTypes.object,
  logoStyle: PropTypes.object,
  button: PropTypes.object,
  row: PropTypes.object,
  menuWrapper: PropTypes.object,
};

Navbar.defaultProps = {
  navbarStyle: {
    className: 'sass_creative_navbar',
    minHeight: '70px',
    display: 'block',
  },
  row: {
    flexBox: true,
    alignItems: 'center',
    width: '100%',
  },
  logoStyle: {
    maxWidth: ['126px', '126px'],
    WebkitBackfaceVisibility: 'hidden',
    transform: 'translateZ(0)',
  },
  button: {},
  menuWrapper: {
    flexBox: true,
    alignItems: 'center',
  },
};

export default Navbar;
