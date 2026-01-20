import { logout } from "../lib/firebase";
export default function SignOutButton() {
  return <button className="btn secondary" onClick={logout}>Sign out</button>;
}
