import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
export function ArticleCard({ article, featured=false }) {
  return <article className={`article-card ${featured ? "featured" : ""}`}>
    <Link href={`/post/${article.slug}`} className="card-image">
      {article.cover_url ? <img src={article.cover_url} alt={article.title}/> : <div className="image-placeholder"><span>THE FARHAN WORLD</span><b>{article.category || "TECH"}</b></div>}
      <span className="category-pill">{article.category || "Technology"}</span>
    </Link>
    <div className="card-body"><div className="meta">{new Date(article.created_at || Date.now()).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})} <span>·</span> <Clock3 size={13}/> {article.read_time || "4 min read"}</div>
      <Link href={`/post/${article.slug}`}><h2>{article.title}</h2></Link>
      <p>{article.excerpt || ""}</p><Link className="read-more" href={`/post/${article.slug}`}>Read article <ArrowUpRight size={15}/></Link>
    </div>
  </article>;
}
