import styles from "./User.module.css";
interface UserProps {
  user: { email: string; number: string };
  loading: boolean;
  userNotFound: boolean;
}
function User({ user, loading, userNotFound }: UserProps) {
  return (
    <>
      {loading && <h1>Loading...</h1>}
      {userNotFound && <h1>User not found</h1>}
      <div className={styles.userWrapper}>
        <h1>{user?.email}</h1>
        <h2>{user?.number}</h2>
      </div>
    </>
  );
}

export default User;
