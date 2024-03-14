import Image from "next/image";
import Container from 'react-bootstrap/Container';
import {
  Nav, NavLink,
  Navbar, NavbarBrand, NavbarToggle, NavbarCollapse,
  NavDropdown, DropdownItem, DropdownDivider
} from 'react-bootstrap';



function BasicExample() {

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <NavbarBrand href="#home">
          <Image src="/bbc.png"
            alt="bbc"
            width={100}
            height={24}
            style={{ height: "12vh", width: "auto" }} />
        </NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#link">Services</NavLink>
            <NavDropdown title="Category" id="basic-nav-dropdown">
              <DropdownItem href="#action/3.1">Main course</DropdownItem>
              <DropdownItem href="#action/3.2">Starter</DropdownItem>
              <DropdownItem href="#action/3.3">Drinks</DropdownItem>
              <DropdownDivider />
              <DropdownItem href="#action/3.4">Meals</DropdownItem>
            </NavDropdown>
          </Nav>
        </NavbarCollapse>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search Items"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
