"use client";
import { useState } from "react";
export default function LoginForm() {
  const [password,setPassword]=useState(""); const [error,setError]=useState(""); const [busy,setBusy]=useState(false);
  async function submit(e){e.preventDefault();setBusy(true);setError("");const r=await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password})});const j=await r.json();if(r.ok)location.href="/world-studio-gate";else setError(j.error||"Could not sign in.");setBusy(false);}
  return <form onSubmit={submit} className="form-stack"><label>Admin password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="current-password" placeholder="Enter your admin password"/></label>{error&&<p className="form-error">{error}</p>}<button className="button button-primary full" disabled={busy}>{busy?"Signing in…":"Sign in"}</button></form>;
}
