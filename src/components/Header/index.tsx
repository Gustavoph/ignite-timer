import { NavLink } from 'react-router-dom'
import { Timer, Scroll } from 'phosphor-react'

import * as S from './styles'
import Logo from '../../assets/Logo.svg'

export function Header() {
  return (
    <S.HeaderContainer>
      <span>
        <img src={Logo} alt="" />
      </span>

      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </S.HeaderContainer>
  )
}
