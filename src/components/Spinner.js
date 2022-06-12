import { StyledSpinner } from './styles/Spinner.styles';
export default function Spinner() {
  return (
    <StyledSpinner className="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </StyledSpinner>
  );
}
