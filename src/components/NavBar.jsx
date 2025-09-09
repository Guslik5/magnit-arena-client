
import React, { useRef, useEffect, useState } from 'react';
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
    border-color: #CC2727;
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
        padding-top: 15px;
    
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

    const bookingUrl = 'https://go2sport.ru/clubs/magnit-arena/?i=1';
    const openBookingPage = () => {
        window.open(bookingUrl, '_blank');
    };

    const toggleButtonRef = useRef(null);
    const navBarRef = useRef(null);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 992);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 992);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const closeOffcanvas = () => {
        if (toggleButtonRef.current) {
            toggleButtonRef.current.click();
            if (navBarRef.current) {
                navBarRef.current.focus();
            }
        }
    };

    const scrollToSection = (targetId) => (e) => {
        e.preventDefault();

        const scrollToNews = (sectionId) => {
            const newsSection = document.getElementById(sectionId);

            if (newsSection) {
                const rect = newsSection.getBoundingClientRect();
                const absoluteTop = rect.top + window.pageYOffset;
                const scrollTarget = absoluteTop - 100;

                window.scrollTo({
                    top: scrollTarget,
                    behavior: 'smooth',
                });
            } else {
                console.warn("News section not found!");
            }
        };

        if (isSmallScreen) {
            closeOffcanvas();
            //  Небольшая задержка, чтобы дать offcanvas закрыться перед скроллом
            setTimeout(() => scrollToNews(targetId), 300); // Задержка 300ms
        } else {
            scrollToNews(targetId);
        }
    };


    return (
        <NavBarWithFooterContainer>
            <Navbar
                key={'lg'}
                expand={'lg'}
                className="px-5 py-3"
                style={{ backgroundColor: '#006699' }}
                ref={navBarRef}
                tabIndex="-1"
            >
                <Container fluid>
                    <Navbar.Brand href="#" className="text-white">LOGO</Navbar.Brand>
                    <Navbar.Toggle aria-controls={offcanvasNavbar} ref={toggleButtonRef} />
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
                                <StyledNavLink onClick={scrollToSection('news-section')}>Новости</StyledNavLink>
                                <StyledNavLink  onClick={scrollToSection('services-section')}>Доп услуги</StyledNavLink>
                                <StyledNavLink onClick={scrollToSection('contact-section')}>Контакты</StyledNavLink>
                            </Nav>

                            <StyledButton onClick={openBookingPage}>Онлайн бронирование</StyledButton>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
            <FooterContainer>
                <div style={{ marginRight: "35vw" }}><FontAwesomeIcon icon={faMapMarkerAlt} /> Магнитогорская ул., 51В</div>
                <a href="tel:+71234567890" className="text-decoration-none text-white"><FontAwesomeIcon icon={faPhone} /> +7 (123) 456-78-90</a>
                <div><FontAwesomeIcon icon={faClock} /> Пн-Вс: 6:00-01:00</div>
            </FooterContainer>
        </NavBarWithFooterContainer>
    );
}

export default NavBar;
