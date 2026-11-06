import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
export const metadata = {
  title: "The Farhan World — Technology, AI & Science",
  description: "Technology news, AI, science, tutorials and useful digital resources."
};
export default function RootLayout({ children }) {
  return <html lang="en"><body><SiteHeader />{children}<footer className="footer"><div className="wrap footer-inner"><b>THE FARHAN WORLD</b><span>Technology · AI · Science · Innovation</span><span>© {new Date().getFullYear()} The Farhan World</span></div></footer></body></html>;
}
