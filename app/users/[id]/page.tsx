import axios from "axios";
import Link from "next/link";

const getUsers = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);
  return res.data.data;
};

const UsersPage = async () => {
  const users = await getUsers();
  return (
    <section>
      <h1>All Users</h1>
    </section>
  );
};

export default UsersPage;
