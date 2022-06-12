import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../config';

export const useFetchData = (startPost, endPost) => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState(null);
  const [postIds, setPostIds] = useState([]);
  // if component is unomount before fetch data is done
  const [isCancelled, setIsCancelled] = useState(false);

  // helper: transform api data to post
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

  // helper: get post ids from api
  const getPostIds = async () => {
    const { data } = await axios.get(`${API_URL}v0/beststories.json`);
    return data;
  };

  // helper: get post data by id from api
  const getPostDataById = async postId => {
    const { data } = await axios.get(`${API_URL}v0/item/${postId}.json`);
    return data;
  };

  // trigger fetch data
  const refreshData = () => setPostIds([]);

  useEffect(() => {
    // for dev mode -> because of react strict mode
    setIsCancelled(false);

    const getData = async (startPost, endPost) => {
      // start loading
      setIsPending(true);

      try {
        // fetch post ids only if needed
        if (postIds.length === 0) {
          const ids = await getPostIds();
          if (!ids) throw new Error();
          // set state only if not cancelled (unmount)
          if (!isCancelled) {
            setPostIds(ids);
          }
        }

        // use only posts needed for one page
        const slicedPosts = postIds.slice(startPost, endPost);

        const postsArray = [];

        // get posts data by id
        const results = await Promise.all(
          slicedPosts.map(async postId => {
            const post = await getPostDataById(postId);
            if (!post) throw new Error();
            return post;
          })
        );

        // set num for order
        let num = startPost + 1;

        // set order in posts array as on api
        results.forEach(post => {
          const transformedPost = transformPostsData({ ...post, num });
          num++;

          postsArray.push(transformedPost);
        });

        // set state if not cancelled (unmount)
        if (!isCancelled) {
          setPosts(postsArray);
          setError(null);
          setIsPending(false);
        }
      } catch (err) {
        // set state if not cancelled (unmount)
        if (!isCancelled) {
          setError('Problem with fetching data.');
          setIsPending(false);
        }
      }
    };
    getData(startPost, endPost);

    // cancel on unmount
    return () => setIsCancelled(true);
  }, [startPost, endPost, postIds, isCancelled]);

  return {
    totalPostsNumber: postIds.length,
    posts,
    isPending,
    error,
    refreshData
  };
};
