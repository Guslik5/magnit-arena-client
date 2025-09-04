import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import statisticBG from '../assets/statisticBG.jpg';

const StyledSection = styled.div`
  background-image: url(${statisticBG});
  background-size: cover;
  background-position: center;
  color: white;
  padding: 70px 0;
  font-size: 1.1rem;

  h2 {
    font-size: 3.5em;
    margin-bottom: 60px;
  }

  p {
    font-size: 1.4em;
    margin-bottom: 40px;
  }

  @media (max-width: 768px) {
    padding: 50px 0;

    h2 {
      font-size: 2.5em;
    }

    p {
      font-size: 1.2em;
    }
  }
`;

const Stat = styled.div`
    text-align: center;
    margin-bottom: 60px;
    overflow-wrap: break-word;

    h3 {
      font-size: 5em;
      color: #ff4d4d;
      margin-bottom: 15px;
    }

    p {
      font-size: 1.6em;
    }

    @media (max-width: 768px) {
        h3 {
            font-size: 3em;
        }
    
        p {
            font-size: 1.2em;
        }
    }
`;

const StyledButton = styled(Button)`
  background-color: #ff4d4d;
  border: none;
  font-size: 1.5em;
  border-radius: 5px;
  transition: background-color 0.3s ease;
    margin-left: 12vw;
    padding: 0.5em 2em ;
    max-width: 290px;

  &:hover {
    background-color: #cc0000;
  }
`;

const StatisticsBlock = () => {

    const bookingUrl = 'https://go2sport.ru/clubs/magnit-arena/?i=1';
    const openBookingPage = () => {
        window.open(bookingUrl, '_blank');
    };
    return (
        <StyledSection>
            <Container>
                <Row>
                    <Col lg={6} xs={12}>
                        <h2>Ледовая арена в <br/> цифрах</h2>
                        <p>
                            На протяжении многих лет мы помогаем тысячам людей раскрыть свой потенциал на льду. Эти цифры -
                            это не просто статистика, это истории успеха наших клиентов.
                        </p>

                    </Col>
                    <Col lg={6} xs={12}>
                        <Row>
                            <Col sm={6}>
                                <Stat>
                                    <h3>5K+</h3>
                                    <p>Довольных клиентов</p>
                                </Stat>
                            </Col>
                            <Col sm={6}>
                                <Stat>
                                    <h3>100+</h3>
                                    <p>Тренировок в неделю</p>
                                </Stat>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Stat>
                                    <h3>10+</h3>
                                    <p>Лет опыта</p>
                                </Stat>
                            </Col>
                            <Col sm={6}>
                                <Stat>
                                    <h3>20+</h3>
                                    <p>Профессиональных тренеров</p>
                                </Stat>
                            </Col>
                        </Row>
                    </Col >
                </Row>
            </Container>
            <StyledButton onClick={openBookingPage}>Онлайн бронирование</StyledButton>
        </StyledSection>
    );
};

export default StatisticsBlock;