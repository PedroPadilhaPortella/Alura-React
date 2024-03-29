/* eslint-disable react/prop-types */
import { styled } from "styled-components"

const ListItemStyled = styled.li`
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 30px;
  cursor: pointer;
  color: ${props => props.$ativo ? '#7B78E5' : '#D9D9D9'};
  font-family: ${props => props.$ativo ? 'GandhiSansBold' : 'GandhiSansRegular'};
  display: flex;
  align-items: center;
  gap: 22px;
`;

const NavigationItem = ({ children, iconeAtivo, iconeInativo, ativo = false }) => {
  return (
    <ListItemStyled $ativo={ativo}>
      <img src={ativo ? iconeAtivo : iconeInativo} alt="" />
      {children}
    </ListItemStyled>
  );
}

export default NavigationItem;