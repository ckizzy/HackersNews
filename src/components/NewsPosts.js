import { useFetchData } from "../hooks/useFetchData";
import NewsPost from "./NewsPost";
import Spinner from "./Spinner";

export default function NewsPosts() {
  const { isPending, error, posts } = useFetchData(0, 20);
  return (
    <div>
      <p>{error}</p>
      {isPending && <Spinner />}
      {posts?.length &&
        posts.map(post => <NewsPost key={post.id} title={post.title} />)}
    </div>
  );
}
