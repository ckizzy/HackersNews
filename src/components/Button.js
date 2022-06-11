import PropTypes from "prop-types";

export default function Button(props) {
  return <input {...props} value={props.label} />;
}

Button.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  type: "submit"
};
