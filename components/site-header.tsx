"use client";
import {useState} from "react";
import {Rocket} from "lucide-react";

const links=[
  ["Capabilities","/capabilities"],["Our work","/work"],["About","/about"],["Team","/team"],["Careers","/careers"],["Contact","/contact"]
];

export default function SiteHeader(){
 const [open,setOpen]=useState(false);
 return <header className="site-header"><div className="header-inner">
  <a href="/" className="brand" aria-label="DAVAN Technologies home" onClick={()=>setOpen(false)}>
   <span className="brand-mark">D<span>.</span></span><span className="brand-text">DAVAN<small>TECHNOLOGIES</small></span>
  </a>
  <nav className={"main-nav "+(open?"nav-open":"")} aria-label="Main navigation">
   {links.map(([label,href])=><a key={href} href={href} onClick={()=>setOpen(false)}>{label}</a>)}
   <a className="nav-mobile-cta" href="/careers" onClick={()=>setOpen(false)}>Explore careers ↗</a>
  </nav>
  <a className="header-cta" href="/careers">Apply now <span>↗</span></a>
  <button className={"menu-toggle "+(open?"open":"")} aria-label={open?"Close menu":"Open menu"} aria-expanded={open} onClick={()=>setOpen(!open)}><Rocket size={18} strokeWidth={1.8}/></button>
 </div></header>;
}
