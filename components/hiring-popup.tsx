"use client";
import { useEffect, useState } from "react";

const roles=[
  {title:"Full-Stack Developer",count:"2 vacancies",href:"/careers/full-stack-developer"},
  {title:"Flutter Developer",count:"2 vacancies",href:"/careers/flutter-developer"},
  {title:"Management Intern",count:"1 vacancy",href:"/careers/management-intern"}
];

export default function HiringPopup(){
  const [open,setOpen]=useState(false);
  useEffect(()=>{
    if(window.location.pathname!=="/" || window.sessionStorage.getItem("davan-hiring-popup-seen")) return;
    const timer=window.setTimeout(()=>setOpen(true),2600);
    return ()=>window.clearTimeout(timer);
  },[]);
  function close(){window.sessionStorage.setItem("davan-hiring-popup-seen","1");setOpen(false);}
  if(!open) return null;
  return <div className="hiring-modal-backdrop" role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget) close();}}>
    <section className="hiring-modal" role="dialog" aria-modal="true" aria-labelledby="hiring-modal-title">
      <button className="hiring-modal-close" type="button" onClick={close} aria-label="Close hiring announcement">×</button>
      <span className="career-kicker"><span /> DAVAN TECHNOLOGIES · CAREERS 2026</span>
      <h2 id="hiring-modal-title">We’re <span className="gradient-text">hiring.</span></h2>
      <p>Experienced interns wanted. Three roles, five openings, four hours per day. Joining starts 05 December 2026.</p>
      <div className="hiring-modal-roles">{roles.map(role=><a key={role.href} href={role.href}><span>{role.title}</span><small>{role.count}</small><b>↗</b></a>)}</div>
      <a className="button button-primary hiring-modal-all" href="/careers">View all openings <span>↗</span></a>
      <button className="hiring-modal-later" type="button" onClick={close}>Maybe later</button>
    </section>
  </div>;
}
