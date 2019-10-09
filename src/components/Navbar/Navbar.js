import React from 'react';
import { Navbar, Collapse, Nav, NavItem, NavLink} from 'reactstrap';

import { Link } from 'react-router-dom';

export default props => {
  return (
    <Navbar color="light" light className="navbar shadow-sm p-3 mb-5 bg-white rounded" expand="md">
      <Collapse>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to={'/login'}>
              Login                            
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={'/signup'}>
              Sign Up                                        
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
}
