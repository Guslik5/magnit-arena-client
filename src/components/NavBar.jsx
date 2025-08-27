import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';

const StyledNavLink = styled(Nav.Link)`
  margin: 0 2.8vw;
  color: white;
  transition: transform 0.3s ease;

  @media (max-width: 992px) {
    margin: 0;
  }

  &:hover {
    cursor: pointer;
    transform: translateY(-3px);
  }

  &:focus, &:active {
    outline: none;
    color: white;
    background-color: transparent;
  }
`;

const StyledButton = styled(Button)`
  background-color: #CC3333;
  border-color: #CC3333;
  color: white;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background-color: #9C2727;
    border-color: #9C2727;
  }

  &:active {
    background-color: #9C2727 !important;
  }
`;

const FooterContainer = styled.div`
    border-top: 1px solid white ;
    background-color: #006699;
    color: white;
    padding: 15px 0;
    text-align: center;
    font-size: 0.9rem;
    @media (max-width: 992px) {
        text-align: left;
        padding-left: 15px;
        padding-right: 15px;
        & > div,a {
            padding: 5px 0;
        }
    }

    @media (min-width: 992px) {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 15px;: ;
    
        & > div {
        margin: 0 20px;
        }
    }
`;

const NavBarWithFooterContainer = styled.div`
  @media (min-width: 992px) {
    display: flex;
    flex-direction: column; 
  }
`;

function NavBar() {
    const offcanvasNavbar = 'offcanvasNavbar';
    const offcanvasNavbarLabel = 'offcanvasNavbarLabel';
    const offcanvasNavbarExpand = 'offcanvasNavbarExpand';

    return (
        <NavBarWithFooterContainer>
            <Navbar key={'lg'} expand={'lg'} className="px-5 py-3" style={{ backgroundColor: '#006699' }}>
                <Container fluid>
                    <Navbar.Brand href="#" className="text-white">LOGO</Navbar.Brand>
                    <Navbar.Toggle aria-controls={offcanvasNavbar} />
                    <Navbar.Offcanvas
                        id={offcanvasNavbarExpand}
                        aria-labelledby={offcanvasNavbarLabel}
                        placement="end"
                        style={{ backgroundColor: '#006699' }}
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title className="text-white" style={{ borderBottom: '1px solid white' }}>
                                Магнит арена
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-1 fs-4">
                                <StyledNavLink href="#action1">Новости</StyledNavLink>
                                <StyledNavLink href="#action2">Доп услуги</StyledNavLink>
                                <StyledNavLink href="#action3">Контакты</StyledNavLink>
                            </Nav>

                            <StyledButton>Онлайн бронирование</StyledButton>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

            <FooterContainer>
                <div style={{marginRight: "35vw"}}><FontAwesomeIcon icon={faMapMarkerAlt} /> Магнитогорская ул., 51Б</div>
                <a href="tel:+71234567890" className="text-decoration-none text-white"><FontAwesomeIcon icon={faPhone} /> +7 (123) 456-78-90</a>
                <div><FontAwesomeIcon icon={faClock} /> Пн-Вс: 6:00-01:00</div>
            </FooterContainer>
        </NavBarWithFooterContainer>
    );
}

export default NavBar;