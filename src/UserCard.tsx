import { forwardRef } from "react";
type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};
type UserCardProps = {
  user: User;
};
const UserCard = forwardRef<HTMLLIElement, UserCardProps>(({ user }, ref) => {
  return (
    <li ref={ref} className={"flex border-t-2 border-b-2 h-44"}>
      <img
        className={"p-4 content-center rounded-full w-40 h-40"}
        src={`${user["avatar"]}`}
      ></img>
      <p className={"p-4 content-center"}>
        {user["first_name"]} {user["last_name"]}
      </p>
    </li>
  );
});

export default UserCard;
