import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import LinkIcon from "../images/link.svg"
import Star from "../images/rating/star.svg"
import Star1 from "../images/rating/star1.svg"
import Star2 from "../images/rating/star2.svg"
import Star3 from "../images/rating/star3.svg"
import Star4 from "../images/rating/star4.svg"
import Star5 from "../images/rating/star5.svg"

const Container = styled.span`
  position: relative;
  display: inline-block;
  width: ${props => (props.size === "md" ? "194px" : "auto")};
  height: ${props => (props.size === "md" ? "174px" : "auto")};
  margin-top: 6px;
  
  .star {
    position: absolute;
    top: 4px;
    right: 4px;
    width: ${(props) => props.bigStar? "48px":"32px"};
  }

  @media only screen and (max-width: 768px) {
    width: ${props => (props.size === "md" ? "180px" : "auto")};
    height: ${props => (props.size === "md" ? "150px" : "auto")};
  }
`

const Info = styled.div`
  position: absolute;
  padding: 4px;
  padding-bottom: 2px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #c0c0c092;
  border-radius: 0 0 12px 12px;

  & > h3 {
    font-size: ${(props) => props.bigFont? "24px":"18px"};
    margin: 0;
    grid-column: 1 / 5;
  }

  & > span {
    font-size: ${(props) => props.bigFont? "18px":"14px"};
    font-weight: 400;
    margin: 0 4px;
  }

  & > a {
    position: absolute;
    bottom: 0;
    right: 5px;
  }
`

const Img = styled.img`
    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 100%
    max-width: 100%;
    max-height: 100%;
    disblay: block;
    border-radius: 12px;
`

const getStar = rating =>
  rating === 5 ? (
    <Star5 className="star" />
  ) : rating === 4 ? (
    <Star4 className="star" />
  ) : rating === 3 ? (
    <Star3 className="star" />
  ) : rating === 2 ? (
    <Star2 className="star" />
  ) : rating === 1 ? (
    <Star1 className="star" />
  ) : (
    <Star className="star" />
  )

const Drink = props => {
  return (
    <Container {...props}>
      <Img src={props.imageUrl} alt={props.name} />
      {getStar(parseInt(props.rating))}
      <Info bigFont={props.bigFont}>
        <h3>
          {props.name.replace(
            new RegExp(
              `(.${props.maxChar ? `{${props.maxChar}}` : `{16}`})..+`
            ),
            "$1…"
          )}
        </h3>
        <span>{props.calories + "kcal"}</span>
        <span>{props.prep}</span>
        <a href={props.url}>
          <LinkIcon />
        </a>
      </Info>
    </Container>
  )
}

Drink.propTypes = {
  name: PropTypes.string.isRequired,
  calories: PropTypes.string.isRequired,
  prep: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  maxChar: PropTypes.string,
  bigFont: PropTypes.bool,
  bigStar: PropTypes.bool,
  className: PropTypes.string
}

export default Drink
