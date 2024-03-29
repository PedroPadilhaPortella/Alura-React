import { styled } from "styled-components";

const FigureStyled = styled.figure`
  background-image: ${props => `url(${props.$backgroundImage})`};
  flex-grow: 1;
  background-repeat: round;
  display: flex;
  align-items: center;
  min-height: 328px;
  margin: 0;
  border-radius: 20px;
  max-width: 100%;  
`;

const TitleStyled = styled.h1`
  font-weight: 400;
  font-size: 40px;
  line-height: 48px;
  color: #FFFFFF;
  max-width: 300px;
  padding: 0 64px;
`;

const Banner = ({text, backgroundImage}) => {
  return (
    <FigureStyled $backgroundImage={backgroundImage}>
      <TitleStyled>{text}</TitleStyled>
    </FigureStyled>
  );
}

export default Banner