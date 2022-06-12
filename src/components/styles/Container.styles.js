import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 40px 20px;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonContainer = styled(FlexContainer)`
  margin-top: 30px;
`;

export const MainContainer = styled(FlexContainer)`
  margin: 0px auto;
  width: 900px;
  max-width: 100%;
  min-height: 100vh;
  flex-direction: column;
`;
export const HeaderContainer = styled(FlexContainer)`
  width: 900px;
  max-width: 100%;
  margin: 0 auto;
  justify-content: space-between;
  padding: 0px 20px;
`;
