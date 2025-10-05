import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import whatsAppIcon from '../assets/iconWhatsApp-blue.png'
import tgIcon from '../assets/iconTg-blue.png'
import vkIcon from '../assets/iconVk-blue.png'
import {Col} from "react-bootstrap";

const CustomContainer = styled(Container)`
    display: flex;
    flex-direction: row;
    max-width: 1200px;
    margin: 0 auto;
    gap: 40px;
    font-family: 'Segoe UI', Arial, sans-serif;
    background: #fff;
    padding: 40px 0;
    @media (max-width: 992px) {
        display: flex;
        flex-direction: column;
    }
`;

const Main = styled(Container)`
    flex: 2;
    
`;

const Title = styled.h2`
    font-size: 1.29em;
    font-weight: 500;
    margin-bottom: 4px;
    margin-top: 0;
`;

const DateContainer = styled.div`
    font-size: 0.97em;
    color: #9b9b9b;
    margin-bottom: 12px;
`;

const ImageWrapper = styled.div`
    margin-bottom: 22px;
`;

const NewsImage = styled.img`
    width: 100%;
    max-width: 520px;
    border-radius: 8px;
    box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
    display: block;
`;

const DescriptionBlock = styled.div`
    margin-bottom: 34px;

    strong {
        display: block;
        font-size: 1.07em;
        margin-bottom: 8px;
        font-weight: 500;
    }

    p {
        color: #222;
        font-size: 1.06em;
        line-height: 1.58;
        margin-bottom: 16px;
        margin-top: 0;
    }
`;

const BackLink = styled.div`

    margin-top: 16px;

    a {
        color: #2796e7;
        font-size: 1.13em;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: color 0.17s;

        &:hover {
            color: #1973b8;
            text-decoration: underline;
        }
    }

    svg {
        margin-right: 4px;
        font-size: 1.2em;
        vertical-align: middle;
    }
`;

const Aside = styled(Container)`
    flex: 1;
`;

const AsideCard = styled.div`
    background: #F0F0F0;
    border-radius: 17px;
    padding: 30px 19px;
    box-shadow: 0 3px 14px rgba(0, 0, 0, 0.13);
    font-size: 1.09em;
`;

const AsideTitle = styled.strong`
    display: block;
    margin-bottom: 14px;
`;

const AsideText = styled.p`
    font-size: 1em;
    color: #232323;
    margin-bottom: 12px;
    margin-top: 0;
`;

const SocialRow = styled.div`
    display: flex;
    gap: 16px;
    margin-top: 18px;
`;

const SocialLink = styled.a`
    display: inline-block;
    width: 35px;
    height: 35px;
    background: none;
    transition: opacity 0.16s;

    &:hover {
        opacity: 0.65;
    }

    img, svg {
        width: 30px;
        height: 30px;
    }
`;

const StyledCol = styled(Col)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 15px;

    a {
        display: inline-block;
        margin: 10px;
        
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

const News = () => {
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {id} = useParams();

    const dataIcons = [
        {
            href: "#",
            alt: "Вотс апп",
            imgUrl: whatsAppIcon
        },
        {
            href: "#",
            alt: "Телеграм",
            imgUrl: tgIcon
        },
        {
            href: "#",
            alt: "Вк",
            imgUrl: vkIcon
        }
    ]

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(`http://localhost:4200/api/news/${id}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setNews(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        window.scrollTo({
            top: 0,
        });
        fetchNews();
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <CustomContainer className="bg-body-tertiary">
            <Main>
                <Title>{news.title}</Title>
                <DateContainer>{formatDate(news.updateAt)}</DateContainer>
                <ImageWrapper>
                    <NewsImage src={news.imgUrl} alt={news.title}/>
                </ImageWrapper>
                <DescriptionBlock>
                    {news.description.split('\n').map((line, idx) => line.trim() ? <p key={idx}>{line}</p> : null)}
                </DescriptionBlock>
                <BackLink>
                    <a href="/">
                        <svg width="16" height="16" viewBox="0 0 16 16">
                            <path fill="#2796e7"
                                  d="M7.1 3.6c-.2-.2-.5-.2-.7 0l-3.7 3.7c-.2.2-.2.5 0 .7l3.7 3.7c.2.2.5.2.7 0s.2-.5 0-.7L4.2 8.1H13c.3 0 .5-.2.5-.5s-.2-.5-.5-.5H4.2l2.9-2.9c.2-.1.2-.4 0-.6z"/>
                        </svg>
                        Вернуться на главную
                    </a>
                </BackLink>
            </Main>
            <Aside>
                <AsideCard>
                    <AsideTitle className="text-center fs-4">Не пропустите ничего <br/> важного!</AsideTitle>
                    <AsideText>
                        Подписывайтесь на наши социальные сети и узнавайте о&nbsp;новостях ледовой арены первыми,
                        получайте эксклюзивные предложения и участвуйте в розыгрышах!
                    </AsideText>
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
                </AsideCard>
            </Aside>
        </CustomContainer>
    );
};

export default News;

