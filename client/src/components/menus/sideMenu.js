import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Responsive, Message } from 'semantic-ui-react';

import ourColors from '../../ColorScheme';
import DisplayTopRecipes from './displayTopRecipes.js';

class SideMenu extends React.Component {
  // side menu should be hidden when landing page is shown
  // Landing page is displayed when user is not loggedin and path is '/'
  state = { activeItem: window.location.pathname };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  componentDidMount() {
    // below setInterval is to detect URL changes and make sure the side menu focus is
    // on right menu.
    // without this, URL changes from create/delete recipe won't change the focus of side menu
    // so the focus would be in wrong menu
    // tried to use some kind of event listener but couldn't find right one

    setInterval(() => {
      if (this.state.activeItem !== window.location.pathname) {
        this.setState({ activeItem: window.location.pathname });
      }
    }, 700);
  }

  renderSideMenu = item => {
    if (
      window.location.pathname === '/' ||
      window.location.pathname === '/signin' ||
      window.location.pathname === '/signup'
    ) {
      return null;
    } else {
      return (
        <Responsive minWidth={771} style={{ position: 'fixed', zIndex: '10' }}>
          <Menu
            pointing
            vertical
            className='sideMenu'
            style={{ background: ourColors.menuColor }}
          >
            <Menu.Item
              as={NavLink}
              exact
              to='/recipes'
              name='/recipes'
              active={item === '/recipes'}
              onClick={this.handleItemClick}
            >
              Recipes List
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              to='/recipes/new'
              name='/recipes/new'
              active={item === '/recipes/new'}
              onClick={this.handleItemClick}
            >
              New Recipe
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              to='/recipes/import'
              name='/recipes/import'
              active={item === '/recipes/import'}
              onClick={this.handleItemClick}
            >
              Import Recipe
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              to='/billing'
              name='/billing'
              active={item === '/billing'}
              onClick={this.handleItemClick}
            >
              Billing
            </Menu.Item>
            <Menu.Item
              as={NavLink}
              to='/settings'
              name='/settings'
              active={item === '/settings'}
              onClick={this.handleItemClick}
            >
              Settings & Allergies
            </Menu.Item>
          </Menu>
          {!localStorage.getItem('uid') ? (
            <NavLink to='/signin'>
              <Message
                style={{ maxWidth: '240px', background: ourColors.formColor, fontFamily:'Roboto' }}
              >
                <Message.Header>Signup/Login for Full Features!</Message.Header>
              </Message>
            </NavLink>
          ) : null}
          {window.location.pathname === '/settings' &&
          localStorage.getItem('uid') ? (
            <Message
              style={{ maxWidth: '240px', background: ourColors.formColor }}
            >
              <Message.Header>Allergy Notifications</Message.Header>
              <Message.List>
                <Message.Item>Recipes will be bordered in maroon</Message.Item>
                <Message.Item>
                  Ingredients will be highlighted in maroon
                </Message.Item>
              </Message.List>
            </Message>
          ) : null}

          {/*  top rated recipes only shown when pathname includes recipes 
           such  as recipes list, new recipe, import recipe */}
          {window.location.pathname.slice(0, 8) === '/recipes' && (
            <DisplayTopRecipes />
          )}
        </Responsive>
      );
    }
  };

  render() {
    const { activeItem } = this.state;
    return this.renderSideMenu(activeItem);
  }
}
export default SideMenu;
