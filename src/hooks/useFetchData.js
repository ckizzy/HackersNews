import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../config';

export const useFetchData = (startPost, endPost) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState(null);
  const [totalPostsNumber, setTotalPostsNumber] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const transformPostsData = post => {
    const transformedPost = {
      num: post.num,
      id: post.id,
      title: post.title,
      author: post.by,
      score: post.score,
      time: post.time,
      url: post.url
    };

    return transformedPost;
  };

  const getPostIds = async () => {
    const { data } = await axios.get(
      `${API_URL}v0/beststories.json?print=pretty`
    );
    return data;
  };

  const getPostDataById = async postId => {
    const { data } = await axios.get(`${API_URL}v0/item/${postId}.json`);
    return data;
  };

  const refreshData = () => setRefresh(!refresh);

  useEffect(() => {
    const getData = async (startPost, endPost) => {
      setIsPending(true);

      try {
        const postIds = await getPostIds();

        if (!postIds) throw new Error('Problem with fetching posts.');

        setTotalPostsNumber(postIds.length);

        const slicedPosts = postIds.slice(startPost, endPost);

        let postsArray = [];

        const results = await Promise.all(
          slicedPosts.map(async postId => {
            const post = await getPostDataById(postId);
            if (!post) throw new Error('Problem with fetching post.');
            return post;
          })
        );

        let num = startPost + 1;

        results.forEach(post => {
          const transformedPost = transformPostsData({ ...post, num });
          num++;

          postsArray.push(transformedPost);
        });

        setPosts(postsArray);
        setError(null);
        setIsPending(false);
      } catch (err) {
        setError(err.message || 'Something went wrong.');
        setIsPending(false);
      }
    };
    getData(startPost, endPost);
  }, [startPost, endPost, refresh]);

  return {
    totalPostsNumber,
    posts,
    isPending,
    error,
    refreshData
  };
};
