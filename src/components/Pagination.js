import Button from './Button';
import { ButtonContainer } from './styles/Container.styles';

export default function Pagination({
  disablePrev,
  disableNext,
  handlePrev,
  handleNext
}) {
  return (
    <ButtonContainer>
      <Button
        bg={disablePrev && 'none'}
        type="button"
        label="<  Prev"
        onClick={handlePrev}
        disabled={disablePrev}
      />
      <Button
        bg={disableNext && 'none'}
        type="button"
        label="Next  >"
        onClick={handleNext}
        disabled={disableNext}
      />
    </ButtonContainer>
  );
}
