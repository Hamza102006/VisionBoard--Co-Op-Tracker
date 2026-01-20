import SignOutButton from "./SignOutButton.jsx";
import SignInButton from "./SignInButton.jsx";

export default function TopNav({ user }) {
  return (
    <div className="nav">
      <div className="brand">Co-op Tracker Hub</div>
      <div className="nav-actions">
        {user ? <span className="helper">Signed in as <b>{user.email}</b></span> : null}
        {user ? <SignOutButton /> : <SignInButton />}
      </div>
    </div>
  );
}
