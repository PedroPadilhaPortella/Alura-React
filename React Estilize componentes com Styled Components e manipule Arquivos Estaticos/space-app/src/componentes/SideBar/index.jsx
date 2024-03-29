import { styled } from "styled-components"
import NavigationItem from "./NavigationItem"

const ListStyled = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 212px;
`;

const SideBar = () => {
  return (
    <aside>
      <nav>
        <ListStyled>
          <NavigationItem
            iconeAtivo="/icons/home-ativo.png"
            iconeInativo="/icons/home-inativo.png"
            ativo={true}
          >Início</NavigationItem>

          <NavigationItem
            iconeAtivo="/icons/mais-vistas-ativo.png"
            iconeInativo="/icons/mais-vistas-inativo.png"
          >Mais vistas</NavigationItem>

          <NavigationItem
            iconeAtivo="/icons/mais-curtidas-ativo.png"
            iconeInativo="/icons/mais-curtidas-inativo.png"
          >Mais curtidas</NavigationItem>

          <NavigationItem
            iconeAtivo="/icons/novas-ativo.png"
            iconeInativo="/icons/novas-inativo.png"
          >Novas</NavigationItem>

          <NavigationItem
            iconeAtivo="/icons/surpreenda-me-ativo.png"
            iconeInativo="/icons/surpreenda-me-inativo.png"
          >Surpreenda-me</NavigationItem>
        </ListStyled>
      </nav>
    </aside>
  );
}

export default SideBar;