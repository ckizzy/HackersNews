import { useFetchData } from '../hooks/useFetchData';
import NewsPost from './NewsPost';
import Spinner from './Spinner';

import { useEffect, useState } from 'react';
import Header from './Header';
import { POSTS_PER_PAGE, START_POST } from '../config';
import { Container, MainContainer } from './styles/Container.styles';
import { Wrapper } from './styles/Wrapper.styles';
import Pagination from './Pagination';
import toast from 'react-hot-toast';

export default function NewsPosts() {
  const [page, setPage] = useState(1);
  const [fromPost, setFromPost] = useState(START_POST - 1);
  const [toPost, setToPost] = useState(POSTS_PER_PAGE);

  const { isPending, error, posts, totalPostsNumber, refreshData } =
    useFetchData(fromPost, toPost);

  const disablePrev = page <= 1;
  const disableNext = page * POSTS_PER_PAGE >= totalPostsNumber;

  // show toast with error
  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  // change to and from if page changed
  useEffect(() => {
    setFromPost((page - 1) * POSTS_PER_PAGE);
    setToPost(page * POSTS_PER_PAGE);
  }, [page]);

  const handlePrev = () => {
    if (disablePrev) return;
    setPage(page - 1);
    window.scrollTo(0, 0);
  };

  const handleNext = () => {
    if (disableNext) return;
    setPage(page + 1);
    window.scrollTo(0, 0);
  };

  const handleRefresh = () => {
    refreshData();
  };

  return (
    <Wrapper>
      <Header handleRefresh={handleRefresh} isPending={isPending} />
      <MainContainer>
        {isPending ? (
          <Spinner />
        ) : (
          !!posts?.length && (
            <Container>
              {posts.map(post => (
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
              <Pagination
                handleNext={handleNext}
                handlePrev={handlePrev}
                disablePrev={disablePrev}
                disableNext={disableNext}
              />
            </Container>
          )
        )}
      </MainContainer>
    </Wrapper>
  );
}
