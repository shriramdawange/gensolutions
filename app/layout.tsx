import type {Metadata,Viewport} from "next";
import "./globals.css";
import GsapReveal from "@/components/gsap-reveal";
import HiringPopup from "@/components/hiring-popup";

export const metadata:Metadata={
 metadataBase:new URL("https://gensolutions.in"),
 title:{default:"DAVAN Technologies — Build. Manage. Grow.",template:"%s | DAVAN Technologies"},
 description:"DAVAN Technologies is an engineering, AI, research and product-building company. We turn ambitious ideas into intelligent systems and useful digital products.",
 applicationName:"DAVAN Technologies",
 icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"},
 keywords:["DAVAN Technologies","AI engineering","R&D","AI agents","software engineering","ZeroBite","AIRLANCE","technology"],
 openGraph:{title:"DAVAN Technologies — Build. Manage. Grow.",description:"Engineering, AI, research and products built for real-world impact.",url:"https://gensolutions.in",siteName:"DAVAN Technologies",type:"website"},
 twitter:{card:"summary_large_image",title:"DAVAN Technologies",description:"Build. Manage. Grow."},
 robots:{index:true,follow:true}
};
export const viewport:Viewport={themeColor:"#080a0a",colorScheme:"dark"};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){
 return <html lang="en"><body>{children}<GsapReveal/><HiringPopup/></body></html>;
}
