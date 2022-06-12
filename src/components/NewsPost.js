import PropTypes from 'prop-types';
import { StyledPost } from '../components/styles/NewsPost.styles';
export default function NewsPost({ title, url, score, time, author, num }) {
  const calculateTime = timestamp => {
    const today = new Date();

    // To calculate the time difference of two dates
    const diffInTime = today.getTime() - timestamp * 1000;

    // To calculate the no. of days between two dates
    const diffInDays = diffInTime / (1000 * 3600 * 24);

    return diffInDays;
  };
  const trimUrl = urlToTrim => {
    let trimedUrl = '';
    if (urlToTrim) {
      if (urlToTrim.split('/').length > 0) {
        trimedUrl = urlToTrim.split('/')[2];
      }
    }

    return trimedUrl;
  };
  return (
    <StyledPost>
      <h2>
        {num}. {title}
      </h2>
      <span>
        <a href={url} target="_blank" rel="noreferrer">
          {trimUrl(url)}
        </a>
      </span>
      <div>
        <strong>{score} points</strong> by
        <strong> {author} </strong>
        {Math.round(calculateTime(time)) === 0
          ? 'today'
          : `${Math.round(calculateTime(time))} days ago`}
      </div>
    </StyledPost>
  );
}

NewsPost.propTypes = {
  title: PropTypes.string.isRequired,
  num: PropTypes.number.isRequired,
  url: PropTypes.string,
  author: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  time: PropTypes.number
};
