import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

const Show = () => {
  // console.log(useParams());
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const { user, token } = useContext(AppContext);

  async function getPost() {
    const res = await fetch(`/api/posts/${id}`);
    const data = await res.json();

    if (res.ok) {
      setPost(data.data);
    }
    console.log(data);
  }

  async function handleDelete(e) {
    e.preventDefault();

    if (user && user.id === post.user_id) {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if(res.ok){
        navigate("/");
      }
      console.log(data);
    }
  }

  useEffect(() => {
    getPost();
  }, [id]);
  return (
    <>
      {post ? (
        <div
          key={post.id}
          className="mt-4 p-4 border rounded-md border-dashed border-slate-400"
        >
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h2 className="font-bold text-2xl">{post.title}</h2>
              <small className="text-xs text-slate-600">
                Create by {post.user.name} on{" "}
                {new Date(post.created_at).toLocaleTimeString()}
              </small>
            </div>
          </div>
          <p>{post.body}</p>
          <div>
            {user && user.id === post.user_id && (
              <div className="flex items-center justify-end gap-4">
                <Link
                  to={`/posts/update/${post.id}`}
                  className="bg-green-500 text-white text-sm rounded-lg px-3 py-1"
                >
                  Update
                </Link>
                {/* <Link to={`/posts/posts/${post.id}`} className='bg-red-500 text-white text-sm rounded-lg px-3 py-1'>
                   Update
                </Link> */}
                <form action="" onSubmit={handleDelete}>
                  <button className="bg-red-500 text-white text-sm rounded-lg px-3 py-1">
                    Delete
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Post not found !Here</p>
      )}
    </>
  );
};

export default Show;
