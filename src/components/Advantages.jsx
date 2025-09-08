import React from "react";
import calendarIcon from "../assets/calendarIcon.png"
import timeIcon from "../assets/timeIcon.png"
import qualityIcon from "../assets/qualityIcon.png"
import mapIcon from "../assets/mapIcon.png"
import Container from "react-bootstrap/Container";
import {Card, CardBody, CardImg} from "react-bootstrap";
import styled from "styled-components";

const StyledContainer = styled(Container)`
    display: flex;         
    flex-wrap: wrap;
    justify-content: center; 
    margin-top: 2em;
    margin-bottom: 2em;


`;

// Стилизованная Card
const StyledCard = styled(Card)`
    width: 300px;          
    margin: 10px;          
        border: none;
        align-items: center;
        background-color: #1F1F1F;
`;


const StyledCardImg = styled(CardImg)`
    width: 190px;          
    height: 200px;         
    object-fit: cover;
    @media (max-width: 992px) {
        width: 100px;
        height: 110px;
    }
`;

const StyledCardBody = styled(CardBody)`
    font-size: 1.5em;
    text-align: center;
`


function Advantages() {

    const data = [
        {
            img: calendarIcon,
            title: "Гибкое расписание",
        },
        {
            img: timeIcon,
            title: "Круглосуточный доступ к бронированию",
        },
        {
            img: qualityIcon,
            title: "Качество льда",
        },
        {
            img: mapIcon,
            title: "Удобное расположение",
        },
    ]

    return (
        <StyledContainer fluid={true} >
            {data.map((item, index) => (
                <StyledCard key={index} className="bg-body-tertiary">
                    <StyledCardImg src={item.img} alt={item.title} />
                    <StyledCardBody>{item.title}</StyledCardBody>
                </StyledCard>
            ))}
        </StyledContainer>
    )
}
export default Advantages;