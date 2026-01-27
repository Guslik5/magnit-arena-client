import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';
import {Col, Row} from "react-bootstrap";
import "../App.css"
import whatsAppIcon from '../assets/iconWhatsApp.svg'
import tgIcon from '../assets/iconTg.svg'
import vkIcon from '../assets/iconVk.svg'
import React from "react";

const StyledA = styled.a`
    text-decoration: none;
    color: white;
    font-weight: bold;
    transition: filter 0.2s ease;
    &:hover {
        filter: brightness(0.7); 

    }
`

const StyledCol = styled(Col)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 15px;

    a {
        display: inline-block;
        margin: 5px;
        
        img {
          width: 45px;
          height: 45px;
          transition: filter 0.3s ease; 
            
            &:hover {
                filter: brightness(0.7); 
          }
        }
      }
    `;

const StyledDiv = styled.div`
    font-size: 4vw;
    @media (max-width: 1100px) {
        font-size: 43px;
    }
`


const StyledButton = styled(Button)`
  background-color: #CC3333;
  border-color: #CC3333;
  color: white;
  transition: background-color 0.2s ease, border-color 0.2s ease;
    width: 75%;
    font-size: 1.5em;

  &:hover {
    background-color: #9C2727;
    border-color: #9C2727;
  }

  &:active {
    background-color: #9C2727 !important;
  }
`;



function Footer() {

    const encodedStyles = encodeURIComponent(JSON.stringify([
        {
            "featureType": "all",
            "stylers": [
                {
                    "saturation": -100
                }
            ]
        }
    ]));

    const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127580.70623316868!2d30.21864936928637!3d60.02421724408047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469631fbf334d39d%3A0x5c19e969f946dd34!2z0KTQuNC30LrRg9C70YzRgtGD0YDQvdC-LdGB0L_QvtGA0YLQuNCy0L3QvtC1INC-0LHRidC10YHRgtCy0L4gItCi0YDRg9C00L7QstGL0LUg0YDQtdC30LXRgNCy0Ysi!5e0!3m2!1sru!2sru!4v1757328948969!5m2!1sru!2sru&style=${encodedStyles}`;

    const dataIcons = [
        {
            href: "#",
            alt: "Вотс апп",
            imgUrl: whatsAppIcon
        },
        {
            href: "https://t.me/+eXIIOvtJ5SQ2Mzhi",
            alt: "Телеграм",
            imgUrl: tgIcon
        },
        {
            href: "#",
            alt: "Вк",
            imgUrl: vkIcon
        }
    ]

    const handleClick = (href) => {
        window.open(href, '_blank');
    }


    return (
        <Container id='contact-section' fluid className="p-4 bg-dark-custom text-white">
            <Row>
                <Col lg={6}>
                    <iframe
                        src={mapUrl}
                        width="100%"
                        height="100%"
                        style={{border: 0}}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </Col>
                <Col lg={6} className="d-flex flex-column align-items-center">
                    <Row className="d-flex flex-column align-items-center border-bottom">
                        <StyledDiv>
                            Есть вопросы?
                        </StyledDiv>
                        <StyledDiv>
                            Свяжитесь с нами!
                        </StyledDiv>
                        <div className="d-flex flex-column align-items-center> fs-5">
                            <StyledA href="tel:+79214195555"> +7 (921) 419-55-55</StyledA>
                            <StyledA href="mailto:magnit-arena@mail.ru">magnit-arena@mail.ru</StyledA>
                            <div><FontAwesomeIcon icon={faMapMarkerAlt}/> Магнитогорская ул., 51В</div>
                        </div>
                        <StyledCol className="d-flex justify-content-center align-items-center">
                            {dataIcons.map((item, index) => {
                                return (
                                    <>
                                        <a
                                            key={index}
                                            href={item.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => handleClick(item.href)}
                                        >
                                            <img
                                                src={item.imgUrl}
                                                alt={item.alt}
                                            />
                                        </a>
                                    </>
                                )
                            })}

                        </StyledCol>
                    </Row>
                    <Row className="fs-3  align-items-center p-5">
                        Цените свое время?<br/> Забронируйте услугу онлайн <br/> всего за несколько кликов! <br/> Это
                        быстро, удобно и доступно 24/7.
                    </Row>

                    <StyledButton onClick={() => handleClick("https://go2sport.ru/clubs/magnit-arena/?i=1")}>Онлайн
                        бронирование</StyledButton>

                </Col>
            </Row>
            <Row className="text-center mt-5">
                <div>Магнит арена.</div>
                <div>Официальный сайт.</div>
                <div>© 2025.</div>
            </Row>
        </Container>
    );
}

export default Footer;