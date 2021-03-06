import React, { useEffect, useState, useContext } from "react";
import PostList from "../components/PostList";
import PostSearch from "../components/PostSearch";
import { UserProfileContext } from "../providers/UserProfileProvider";


const Explore = () => {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);
  const { getToken } = useContext(UserProfileContext);

  useEffect(() => {
    fetch("/api/post")
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, []);


  useEffect(() => {
    getTags();
  }, []);

  const getTags = () => {
    getToken()
      .then((token) =>
        fetch(`/api/tag`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
      .then(res => res.json())
      .then(tagsList => {
        setTags(tagsList);
      });
  };

  return (
    <div className="column">
      <div><PostSearch setPosts={setPosts} tags={tags} /></div>
      <div className="row">
        <div className="col-lg-10 col-xs-12">
          <PostList posts={posts} />
        </div>
      </div>
    </div >
  );
};

export default Explore;
