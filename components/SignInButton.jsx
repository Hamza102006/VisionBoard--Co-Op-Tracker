import { googleSignIn } from "../lib/firebase";
export default function SignInButton() {
  return <button className="btn" onClick={googleSignIn}>Sign in with Google</button>;
}
