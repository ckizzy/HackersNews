import styled from 'styled-components';

export const StyledButton = styled.input`
  text-decoration: none;
  padding: 8px 28px;
  text-align: center;
  display: inline-block;
  border-radius: 18px;
  transition: all 0.2s;
  position: relative;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  margin: 0px 10px;
  border: none;
  cursor: ${props => (props.bg !== 'none' ? 'pointer' : 'not-allowed')};
  color: ${props => props.inputColor || '#a8a8a8'};
  outline: none;
  background-color: ${props => props.bg || '#451344'};

  &:hover {
    transform: ${props => props.bg !== 'none' && 'translateY(-3px)'};
    border: none;
    box-shadow: ${props =>
      props.bg !== 'none' && '0 10px 20px rgba(0, 0, 0, 0.2)'};
    &::after {
      transform: ${props => props.bg !== 'none' && 'scaleX(1.4) scaleY(1.6)'};
      opacity: 0;
    }
  }
`;

export const ButtonRefresh = styled.button`
  cursor: pointer;
  outline: none;
  img {
    animation: ${props =>
      props.refresh ? 'lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1)' : ''};
  }
  @keyframes lds-roller {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
