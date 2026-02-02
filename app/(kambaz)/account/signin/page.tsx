import Link from "next/link";
export default function Signin() {
 return (
   <div>
    <h3>Sign in</h3>
      <input className="wd-username" placeholder="username"  defaultValue="amyhoyt"/> <br />
      <input className="wd-password" placeholder="password" defaultValue="Pass123" type="password" /> <br />
      <Link id="wd-signin-btn" href="/dashboard"> Sign in </Link> <br />
      <Link id="wd-signup-link" href="signup"> Sign up </Link>
   </div>
);}
