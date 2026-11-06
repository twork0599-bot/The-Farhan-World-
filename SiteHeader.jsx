import Link from "next/link";
import { Globe2, Search, Menu } from "lucide-react";
export function SiteHeader() {
  return <header className="topbar"><div className="wrap nav">
    <Link href="/" className="brand"><span className="brand-icon"><Globe2 size={22}/></span><span>THE FARHAN <em>WORLD</em><small>Ideas beyond the ordinary.</small></span></Link>
    <nav><Link href="/">Home</Link><Link href="/category/ai">Artificial Intelligence</Link><Link href="/category/technology">Technology</Link><Link href="/category/science">Science</Link><Link href="/category/tutorials">Guides</Link></nav>
    <Link className="search-link" href="/?search=1" aria-label="Search"><Search size={19}/></Link>
  </div></header>;
}
