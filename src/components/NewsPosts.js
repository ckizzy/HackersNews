import { useFetchData } from '../hooks/useFetchData';
import NewsPost from './NewsPost';
import Spinner from './Spinner';
import Button from './Button';

import { useEffect, useState } from 'react';
import Header from './Header';
import { POSTS_PER_PAGE } from '../config';

export default function NewsPosts() {
  const [page, setPage] = useState(1);
  const [fromPost, setFromPost] = useState(null);
  const [toPost, setToPost] = useState(null);
  const { isPending, error, posts, totalPostsNumber } = useFetchData(
    fromPost,
    toPost
  );

  const disablePrev = page <= 1;
  const disableNext = page * POSTS_PER_PAGE >= totalPostsNumber;

  useEffect(() => {
    setFromPost((page - 1) * POSTS_PER_PAGE);
    setToPost(page * POSTS_PER_PAGE);
  }, [page]);

  const handlePrevious = () => {
    if (disablePrev) return;
    setPage(page - 1);
  };

  const handleNext = () => {
    if (disableNext) return;
    setPage(page + 1);
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      <p>{error}</p>
      <div style={{ minHeight: '80vh' }}>
        {isPending ? (
          <Spinner />
        ) : (
          <div>
            {!!posts?.length &&
              posts.map(post => (
                <NewsPost
                  url={post.url}
                  key={post.id}
                  num={post.num}
                  title={post.title}
                  author={post.author}
                  time={post.time}
                  score={post.score}
                />
              ))}
          </div>
        )}
      </div>
      <div>
        <Button
          type="button"
          label="Prev"
          onClick={handlePrevious}
          disabled={disablePrev}
          className={`btn`}
        />
        <Button
          type="button"
          label="Next"
          onClick={handleNext}
          disabled={disableNext}
        />
      </div>
    </div>
  );
}
