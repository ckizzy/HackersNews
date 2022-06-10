import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchData = (startPost, endPost) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState(null);

  const transformPostsData = post => {
    const transformedPost = {
      id: post.id,
      title: post.title,
      by: post.by,
      score: post.score,
      time: post.time,
      url: post.url
    };

    return transformedPost;
  };

  useEffect(() => {
    const getData = async (startPost, endPost) => {
      setIsPending(true);
      try {
        const res = await axios.get(
          "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty"
        );
        console.log({ res });
        const slicedPosts = res.data.slice(startPost, endPost);
        let postsArray = [];

        const results = await Promise.all(
          slicedPosts.map(async post => {
            const { data } = await axios.get(
              `https://hacker-news.firebaseio.com/v0/item/${post}.json`
            );
            return data;
          })
        );

        results.forEach(post => {
          const transformedPost = transformPostsData(post);
          console.log({ transformedPost });

          postsArray.push(transformedPost);
        });

        setPosts(postsArray);
        setError(null);
        setIsPending(false);
      } catch (err) {
        setError(err.message || "Something went wrong.");
        setIsPending(false);
      }
    };

    getData(startPost, endPost);
  }, [startPost, endPost]);

  return {
    posts,
    isPending,
    error
  };
};
