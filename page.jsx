import Link from "next/link";
import { publicDb } from "@/lib/supabase";
import { ArticleCard } from "@/components/ArticleCard";
import { ArrowRight, Sparkles, Facebook, Instagram, Youtube, AtSign, Music2, Twitter } from "lucide-react";
import { socialLinks } from "@/lib/site-config";

async function getPosts() {
  const db = publicDb();
  if (!db) return [];
  const { data } = await db.from("posts").select("*").eq("status","published").order("created_at",{ascending:false}).limit(12);
  return data || [];
}
export default async function Home({ searchParams }) {
  const posts = await getPosts();
  const query = (searchParams?.q || "").toLowerCase();
  const shown = query ? posts.filter(p => `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(query)) : posts;
  return <main>
    <section className="hero"><div className="wrap hero-grid"><div><div className="eyebrow"><Sparkles size={14}/> INDEPENDENT TECH MEDIA</div><h1>Understand the tech<br/><span>shaping tomorrow.</span></h1><p>Clear stories on AI, science, gadgets and the digital world — made for curious minds.</p><div className="hero-actions"><Link href="#latest" className="button button-primary">Explore stories <ArrowRight size={17}/></Link><Link href="/category/ai" className="button button-ghost">Explore AI</Link></div><div className="hero-stats"><span><b>AI</b> & emerging tech</span><span><b>Science</b> & discovery</span><span><b>Guides</b> & explainers</span></div></div><div className="hero-art"><div className="orbit orbit-one"></div><div className="orbit orbit-two"></div><div className="hero-core"><span>FT</span><small>THE FARHAN WORLD</small></div><div className="float-chip chip-one">AI / 01</div><div className="float-chip chip-two">FUTURE / NOW</div><div className="float-chip chip-three">SCIENCE</div></div></div></section>
    <section className="wrap topic-strip"><span>EXPLORE TOPICS</span>{["AI","Technology","Science","Tutorials","Apps & Tools"].map(x=><Link key={x} href={`/category/${x.toLowerCase().replaceAll(" ","-")}`}>{x} ↗</Link>)}</section>
    <section className="wrap latest" id="latest"><div className="section-heading"><div><div className="eyebrow">THE LATEST</div><h2>Fresh from the world of tech.</h2></div><span className="muted">{shown.length} stories</span></div>
      {query && <p>Search results for “{query}”</p>}
      {shown.length ? <div className="article-grid">{shown.map((p,i)=><ArticleCard key={p.id} article={p} featured={i===0}/>)}</div> : <div className="empty-state"><div className="empty-symbol">FT</div><h3>{query ? "No matching stories yet" : "Your first story starts here."}</h3><p>{query ? "Try another search term." : "New stories and ideas will appear here as they are published."}</p></div>}
    </section>
    <section className="newsletter" id="contact"><div className="wrap"><div className="newsletter-inner"><div><div className="eyebrow">STAY CURIOUS</div><h2>Technology moves fast.<br/>Stay in the know.</h2><p>Bookmark The Farhan World and check back for new stories and practical guides.</p></div><a href="#social-contact" className="button button-primary">Get in touch <ArrowRight size={17}/></a></div><div className="social-contact" id="social-contact"><div className="eyebrow">FIND / CONNECT</div><div className="social-links">{socialLinks.map((item)=>{const Icon=({Facebook,Instagram,Youtube,Email:AtSign,TikTok:Music2,X:Twitter})[item.name] || AtSign;return <a key={item.name} href={item.href || "#social-contact"} aria-label={item.name} title={item.href ? item.name : item.handle} className={!item.href ? "social-placeholder" : ""} target={item.href ? "_blank" : undefined} rel={item.href ? "noreferrer" : undefined}><Icon size={17}/><small>{item.name}</small></a>;})}</div><p className="social-hint">Add your own profile links in <code>lib/site-config.js</code> whenever you are ready.</p></div></div></section>
  </main>;
}
