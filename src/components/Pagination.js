import Button from './Button';
import { ButtonContainer } from './styles/Container.styles';
import PropTypes from 'prop-types';

export default function Pagination({
  disablePrev,
  disableNext,
  handlePrev,
  handleNext
}) {
  return (
    <ButtonContainer>
      <Button
        bg={disablePrev ? 'none' : '#451344'}
        type="button"
        label="<  Prev"
        onClick={handlePrev}
        disabled={disablePrev}
      />
      <Button
        bg={disableNext ? 'none' : '#451344'}
        type="button"
        label="Next  >"
        onClick={handleNext}
        disabled={disableNext}
      />
    </ButtonContainer>
  );
}

Pagination.propTypes = {
  disablePrev: PropTypes.bool,
  disableNext: PropTypes.bool,
  handlePrev: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired
};

Pagination.defaultProps = {
  disablePrev: false,
  disableNext: false
};
