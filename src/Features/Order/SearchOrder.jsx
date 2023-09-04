import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="search order. . ."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input-ring w-28 text-xs transition-all duration-100 sm:w-64 sm:text-base sm:focus:w-72 md:w-72"
      />
    </form>
  );
}

export default SearchOrder;
