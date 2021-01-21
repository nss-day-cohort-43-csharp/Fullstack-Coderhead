import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Input, Jumbotron } from "reactstrap";
import PostReactions from "../components/PostReactions";
import formatDate from "../utils/dateFormatter";
import "./PostDetails.css";
import { CommentForm } from "../components/Comments/CommentForm";
import { CommentList } from "../components/Comments/CommentList";
import { UserProfileContext } from "../providers/UserProfileProvider";

const PostDetails = () => {
  const { getCurrentUser, logout, isAdmin } = useContext(UserProfileContext);
  const user = getCurrentUser();
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [tagId, setTagId] = useState("");
  const [reactionCounts, setReactionCounts] = useState([]);
  const [comments, setComments] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const { getToken } = useContext(UserProfileContext);
  const history = useHistory();

  const getTags = (_) => {
    getToken()
      .then((token) =>
        fetch(`/api/tag`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      )
      .then((res) => res.json())
      .then((tags) => {
        setTagsList(tags);
      });
  };

  const checkUser = (_) => {
    if (getCurrentUser().id == post.id) {
      return true;
    }
    return false;
  };

  const handleChange = (e) => {
    setTagId(e.target.value);
  };

  const SaveTagToPost = (e) => {
    const token = getToken();
    return fetch(`/api/posttag`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tagId: tagId, postId: postId }),
    }).then((_) => {
      history.push("/");
      history.push(`/post/${postId}`);
    });
  };

  const PostTags = (_) => {
    const tagsOnPost = tags.map((tag) => tag.tag);
    return tagsList.filter((tag) => {
      return !tagsOnPost.find((t) => t.id === tag.id);
    });
  };

  const GetPost = (_) => {
    return fetch(`/api/post/${postId}`).then((res) => {
      if (res.status === 404) {
        toast.error("This isn't the post you're looking for");
        return;
      }
      return res.json();
    });
  };
  useEffect(() => {
    GetPost()
      .then((data) => {
        setTags(data.post.postTags);
        setPost(data.post);
        setReactionCounts(data.reactionCounts);
        console.log(data.comments);
        setComments(data.comments);
      })
      .then(getTags);
  }, [postId]);

  if (!post) return null;

  return (
    <div>
      <Jumbotron
        className="post-details__jumbo"
        style={{ backgroundImage: `url('${post.imageLocation}')` }}
      ></Jumbotron>
      <div className="container">
        <h1>{post.title}</h1>
        <h5 className="text-danger">{post.category.name}</h5>
        <div className="row">
          <div className="col">
            <img
              src={post.userProfile.imageLocation}
              alt={post.userProfile.displayName}
              className="post-details__avatar rounded-circle"
            />
            <p className="d-inline-block">{post.userProfile.displayName}</p>
          </div>
          <div className="col">
            <p>{formatDate(post.publishDateTime)}</p>
          </div>
        </div>
        <div className="text-justify post-details__content">{post.content}</div>
        {checkUser() || isAdmin() ? (
          <>
            <Input type="select" onChange={(e) => handleChange(e)}>
              <option value="0">Please select a tag to add.</option>
              {PostTags().map((tag) => (
                <option value={tag.id} key={tag.id}>
                  {" "}
                  {tag.name}{" "}
                </option>
              ))}
            </Input>
            <Button onClick={(e) => SaveTagToPost()}>Save Tag</Button>{" "}
          </>
        ) : (
          ""
        )}

        <div>
          Tags:{" "}
          {tags.map((tag) => {
            return `${tag.tag.name} `;
          })}
        </div>
        <div className="my-4">
          <PostReactions postReactions={reactionCounts} />
        </div>
        <div className="col float-left my-4 text-left">
          <CommentList postComments={comments} />
          <CommentForm />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
