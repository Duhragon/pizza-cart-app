import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userName = useSelector((state) => state.user.userName);

  function handleSubmit(e) {
    e.preventDefault();

    if (!username) return;
    dispatch(updateName(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="text mb-4 text-sm text-light-font sm:text-base md:text-lg">
        Welcome!{" "}
        {userName ? (
          <span className="text-base font-bold text-highlight-font sm:text-lg md:text-xl">
            {userName.toUpperCase()}
          </span>
        ) : (
          `Please start by telling us your name:`
        )}
      </p>

      {userName ? (
        <Link
          to="/menu"
          className="button-style mt-4 sm:px-4 sm:py-4 sm:text-xl md:text-xl"
        >
          Continue ordering &rarr;
        </Link>
      ) : (
        <input
          type="text"
          placeholder="Your full name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          // className="w-72 p-1 text-sm md:text-base"
          className="input-ring mb-8 w-72 md:text-lg"
        />
      )}

      {username !== "" && (
        <div>
          <button className="button-style sm:px-4 sm:py-4 sm:text-xl md:text-xl">
            Start ordering
          </button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
