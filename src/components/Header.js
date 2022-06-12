import { StyledHeader } from '../components/styles/Header.styles';
import { HeaderContainer } from './styles/Container.styles';
import { ButtonRefresh } from './styles/Button.styles';
import Refresh from '../assets/icons/refresh.png';
import { useState, useEffect, useRef } from 'react';

export default function Header({ handleRefresh }) {
  const [refresh, setRefresh] = useState(false);
  const timeout = useRef(null);

  const handleClick = () => {
    // start animation
    setRefresh(true);

    timeout.current = setTimeout(() => {
      // stop animation
      setRefresh(false);
    }, 1200);

    // refresh data
    handleRefresh();
  };

  useEffect(() => {
    return () => clearTimeout(timeout.current);
  }, []);

  return (
    <StyledHeader>
      <HeaderContainer>
        <h3>Hackers News</h3>
        <ButtonRefresh refresh={refresh} onClick={handleClick}>
          <img src={Refresh} alt="Refesh icon" />
        </ButtonRefresh>
      </HeaderContainer>
    </StyledHeader>
  );
}
