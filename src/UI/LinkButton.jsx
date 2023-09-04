import { Link, useNavigate } from "react-router-dom";

function LinkButton({ children, to }) {
  const navigate = useNavigate();

  const className =
    "text-font-link hover:text-h-font-link text-sm hover:underline";

  if (to === -1)
    return (
      <button className={className} onClick={() => navigate(to)}>
        {children}
      </button>
    );

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
