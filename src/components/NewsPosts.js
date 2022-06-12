import { useFetchData } from '../hooks/useFetchData';
import NewsPost from './NewsPost';
import Spinner from './Spinner';
import Button from './Button';

import { useEffect, useState } from 'react';
import Header from './Header';
import { POSTS_PER_PAGE, START_POST } from '../config';
import {
  ButtonContainer,
  Container,
  MainContainer
} from './styles/Container.styles';
import { Wrapper } from './styles/Wrapper.styles';

export default function NewsPosts() {
  const [page, setPage] = useState(1);
  const [fromPost, setFromPost] = useState(START_POST - 1);
  const [toPost, setToPost] = useState(POSTS_PER_PAGE);

  const { isPending, error, posts, totalPostsNumber, refreshData } =
    useFetchData(fromPost, toPost);

  const disablePrev = page <= 1;
  const disableNext = page * POSTS_PER_PAGE >= totalPostsNumber;

  useEffect(() => {
    setFromPost((page - 1) * POSTS_PER_PAGE);
    setToPost(page * POSTS_PER_PAGE);
  }, [page]);

  const handlePrevious = () => {
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
      <Header handleRefresh={handleRefresh} />
      <Container>
        <p>{error}</p>
        <MainContainer>
          {isPending ? (
            <Spinner />
          ) : (
            <>
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
            </>
          )}
        </MainContainer>
        <ButtonContainer>
          <Button
            bg={disablePrev && 'none'}
            type="button"
            label="<  Prev"
            onClick={handlePrevious}
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
      </Container>
    </Wrapper>
  );
}
