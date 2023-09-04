import { useSelector } from "react-redux";

function UserName() {
  const userName = useSelector((state) => state.user.userName);

  if (!userName) return null;

  return (
    <div className="hidden text-lg font-semibold uppercase tracking-wide md:block">
      {userName}
    </div>
  );
}

export default UserName;
