import { StyledHeader } from '../components/styles/Header.styles';
import { HeaderContainer } from './styles/Container.styles';
import { ButtonRefresh } from './styles/Button.styles';
import Refresh from '../assets/icons/refresh.png';
import PropTypes from 'prop-types';

export default function Header({ handleRefresh, isPending }) {
  return (
    <StyledHeader>
      <HeaderContainer>
        <h3>Hackers News</h3>
        <ButtonRefresh refresh={isPending} onClick={handleRefresh}>
          <img src={Refresh} alt="Refesh icon" />
        </ButtonRefresh>
      </HeaderContainer>
    </StyledHeader>
  );
}

Header.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
  isPending: PropTypes.bool
};

Header.defaultProps = {
  isPending: false
};
