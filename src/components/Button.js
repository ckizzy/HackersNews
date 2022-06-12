import PropTypes from 'prop-types';
import { StyledButton } from './styles/Button.styles';

export default function Button(props) {
  return <StyledButton {...props} value={props.label} bg={props.bg} />;
}

Button.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  type: 'submit'
};
