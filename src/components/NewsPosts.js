import { useFetchData } from "../hooks/useFetchData";
import NewsPost from "./NewsPost";
import Spinner from "./Spinner";
import Button from "./Button";

import { useEffect, useState } from "react";
import Header from "./Header";

export default function NewsPosts() {
  const numberOfPosts = 20;

  const [page, setPage] = useState(1);
  const [fromPost, setFromPost] = useState(null);
  const [toPost, setToPost] = useState(null);
  const { isPending, error, posts, totalPostsNumber } = useFetchData(
    fromPost,
    toPost
  );

  const disablePrev = page <= 1;
  const disableNext = page * numberOfPosts >= totalPostsNumber;

  useEffect(() => {
    setFromPost((page - 1) * numberOfPosts);
    setToPost(page * numberOfPosts);
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
    <div>
      <Header />
      <p>{error}</p>
      {isPending ? (
        <Spinner />
      ) : (
        <div>
          {!!posts?.length &&
            posts.map(post => <NewsPost key={post.id} title={post.title} />)}
        </div>
      )}
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
