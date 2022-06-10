import PropTypes from "prop-types";

export default function NewsPost({ title }) {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
}

NewsPost.propTypes = {
  title: PropTypes.string.isRequired
};
