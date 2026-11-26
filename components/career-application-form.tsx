"use client";
import {useMemo,useState,type FormEvent} from "react";
import type {CareerOpening} from "@/lib/careers";
import {careerApplicationConfig} from "@/lib/careers";

declare global {
 interface Window {
  pdfjsLib?:{
   GlobalWorkerOptions:{workerSrc:string};
   getDocument:(input:{data:ArrayBuffer})=>{promise:Promise<{numPages:number;getPage:(n:number)=>Promise<{getTextContent:()=>Promise<{items:Array<{str?:string}>}>}>}>};
  };
 }
}
const knownSkills=["JavaScript","TypeScript","React","Next.js","Node.js","Express","HTML","CSS","Tailwind CSS","Python","Java","Dart","Flutter","Firebase","Supabase","PostgreSQL","MySQL","MongoDB","REST APIs","GraphQL","Git","GitHub","Docker","AWS","Vercel","Figma","UI/UX","State Management","Riverpod","Provider","Project Coordination","Communication","Documentation","Task Management","Reporting","Leadership","Excel","Google Sheets","Agile","Scrum","Jira","Trello","Notion"];

function loadPdfJs():Promise<NonNullable<Window["pdfjsLib"]>>{
 if(window.pdfjsLib)return Promise.resolve(window.pdfjsLib);
 return new Promise((resolve,reject)=>{
  const old=document.querySelector<HTMLScriptElement>('script[data-pdfjs="true"]');
  const finish=()=>window.pdfjsLib?resolve(window.pdfjsLib):reject(new Error("PDF reader could not be loaded."));
  if(old){old.addEventListener("load",finish,{once:true});old.addEventListener("error",()=>reject(new Error("PDF reader could not be loaded.")),{once:true});return;}
  const script=document.createElement("script");script.src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";script.async=true;script.dataset.pdfjs="true";script.onload=finish;script.onerror=()=>reject(new Error("PDF reader could not be loaded."));document.head.appendChild(script);
 });
}
async function extractSkills(file:File):Promise<string[]>{
 const pdfjs=await loadPdfJs();pdfjs.GlobalWorkerOptions.workerSrc="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
 const pdf=await pdfjs.getDocument({data:await file.arrayBuffer()}).promise;const pages:string[]=[];
 for(let n=1;n<=pdf.numPages;n++){const page=await pdf.getPage(n);const text=await page.getTextContent();pages.push(text.items.map(x=>x.str||"").join(" "));}
 const resumeText=pages.join(" ").toLowerCase();return knownSkills.filter(skill=>resumeText.includes(skill.toLowerCase()));
}
type Props={opening:CareerOpening};
export default function CareerApplicationForm({opening}:Props){
 const [name,setName]=useState("");const [email,setEmail]=useState("");const [education,setEducation]=useState("");const [city,setCity]=useState("");
 const [working,setWorking]=useState("no");const [workplace,setWorkplace]=useState("");const [achievements,setAchievements]=useState("");
 const [resume,setResume]=useState<File|null>(null);const [skills,setSkills]=useState<string[]>([]);const [customSkill,setCustomSkill]=useState("");
 const [parsing,setParsing]=useState(false);const [parseMessage,setParseMessage]=useState("");const [submitting,setSubmitting]=useState(false);
 const [status,setStatus]=useState<{kind:"success"|"error";message:string}|null>(null);
 const orderedSkills=useMemo(()=>skills.slice().sort((a,b)=>a.localeCompare(b)),[skills]);

 async function onResume(file:File|null){
  setResume(file);setSkills([]);setParseMessage("");if(!file)return;
  if(file.type!=="application/pdf"&&!file.name.toLowerCase().endsWith(".pdf")){setResume(null);setParseMessage("Please upload a PDF resume.");return;}
  if(file.size>5*1024*1024){setResume(null);setParseMessage("The PDF must be 5 MB or smaller.");return;}
  setParsing(true);try{const found=await extractSkills(file);setSkills(found);setParseMessage(found.length?"Found "+found.length+" possible skills in your resume. Review and edit them below.":"No matching skills were detected. Add your skills manually.");}
  catch{setParseMessage("We could not read the PDF text. You can still add your skills manually.");}finally{setParsing(false);}
 }
 function toggleSkill(skill:string){setSkills(current=>current.includes(skill)?current.filter(x=>x!==skill):[...current,skill]);}
 function addSkill(){const value=customSkill.trim().slice(0,50);if(value&&!skills.some(x=>x.toLowerCase()===value.toLowerCase()))setSkills(current=>[...current,value]);setCustomSkill("");}

 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();setStatus(null);
  if(!resume){setStatus({kind:"error",message:"Please upload your resume as a PDF."});return;}
  if(!skills.length){setStatus({kind:"error",message:"Please add at least one relevant skill."});return;}
  setSubmitting(true);const id=crypto.randomUUID();const fileName=resume.name.replace(/[^a-zA-Z0-9._-]/g,"-").slice(-100);
  const path=id+"/"+Date.now()+"-"+fileName;const base=careerApplicationConfig.supabaseUrl;const key=careerApplicationConfig.publishableKey;
  const headers={apikey:key,Authorization:"Bearer "+key};
  try{
   const upload=await fetch(base+"/storage/v1/object/"+careerApplicationConfig.bucket+"/"+path.split("/").map(encodeURIComponent).join("/"),{
    method:"POST",headers:{...headers,"Content-Type":"application/pdf","x-upsert":"false"},body:resume
   });
   if(!upload.ok)throw new Error("Resume upload failed. Please retry.");
   const saved=await fetch(base+"/rest/v1/career_applications",{
    method:"POST",headers:{...headers,"Content-Type":"application/json",Prefer:"return=minimal"},
    body:JSON.stringify({
     id,opening_id:opening.id,name:name.trim(),email:email.trim(),education:education.trim(),city:city.trim(),
     currently_working:working==="yes",current_workplace:working==="yes"?workplace.trim():null,
     internship_domain:opening.slug,resume_path:path,resume_filename:resume.name,
     special_achievements:achievements.trim()||null,skills
    })
   });
   if(!saved.ok)throw new Error("The resume uploaded, but the application could not be saved. Please retry.");
   setStatus({kind:"success",message:"Application received. Thank you for applying to DAVAN Technologies."});
   setName("");setEmail("");setEducation("");setCity("");setWorking("no");setWorkplace("");setAchievements("");setResume(null);setSkills([]);
   const input=document.getElementById("career-resume") as HTMLInputElement|null;if(input)input.value="";
  }catch(error){setStatus({kind:"error",message:error instanceof Error?error.message:"Something went wrong. Please try again."});}
  finally{setSubmitting(false);}
 }

 return <div className="career-application-card">
  <div className="career-form-intro"><span className="section-kicker">APPLICATION / {opening.slug.toUpperCase()}</span><h2>Tell us about<br/><span className="gradient-text">your work.</span></h2>
   <p>Fill in your details and share a resume that shows the work you have done. Required fields are marked *.</p>
   <div className="career-form-meta"><span>PDF · MAX 5 MB</span><span>4 HOURS / DAY</span><span>STARTS 05 DEC 2026</span></div>
  </div>
  <form className="career-application-form" onSubmit={submit}>
   <div className="career-field-grid">
    <label className="career-field"><span>Full name *</span><input required minLength={2} maxLength={100} autoComplete="name" placeholder="Your full name" value={name} onChange={e=>setName(e.target.value)}/></label>
    <label className="career-field"><span>Email address *</span><input required type="email" maxLength={254} autoComplete="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)}/></label>
    <label className="career-field"><span>Education *</span><input required minLength={2} maxLength={180} placeholder="Degree, course or qualification" value={education} onChange={e=>setEducation(e.target.value)}/></label>
    <label className="career-field"><span>City *</span><input required minLength={2} maxLength={100} autoComplete="address-level2" placeholder="Your city" value={city} onChange={e=>setCity(e.target.value)}/></label>
   </div>
   <fieldset className="career-fieldset"><legend>Are you currently working? *</legend>
    <div className="career-choice-row">
     <label><input type="radio" name="working" value="yes" checked={working==="yes"} onChange={()=>setWorking("yes")}/> Yes</label>
     <label><input type="radio" name="working" value="no" checked={working==="no"} onChange={()=>setWorking("no")}/> No</label>
    </div>
    {working==="yes"&&<label className="career-field workplace-field"><span>Current company / role</span><input maxLength={180} placeholder="Where do you currently work?" value={workplace} onChange={e=>setWorkplace(e.target.value)}/></label>}
   </fieldset>
   <div className="career-domain-field"><span className="career-field-label">Internship domain *</span><div className="career-domain-value">{opening.title}</div><small>This form is for the selected role.</small></div>
   <label className="career-field career-upload-field" htmlFor="career-resume"><span>Resume (PDF) *</span>
    <span className="career-upload-box"><strong>{resume?resume.name:"Choose your resume"}</strong><small>{resume?(resume.size/1024/1024).toFixed(2)+" MB":"PDF only · Up to 5 MB"}</small></span>
    <input id="career-resume" required type="file" accept=".pdf,application/pdf" onChange={e=>void onResume(e.target.files?.[0]||null)}/>
   </label>
   {parsing&&<p className="career-parsing-status">Reading the PDF and finding skill keywords…</p>}
   {parseMessage&&<p className="career-parsing-status" role="status">{parseMessage}</p>}
   <div className="career-skills-panel">
    <div><span className="career-field-label">Skills from your resume *</span><p>Suggested automatically from PDF text. Select, remove or add skills so this list is accurate.</p></div>
    <div className="career-skill-options">{knownSkills.map(skill=><label className={skills.includes(skill)?"selected":""} key={skill}><input type="checkbox" checked={skills.includes(skill)} onChange={()=>toggleSkill(skill)}/>{skill}</label>)}</div>
    {orderedSkills.filter(skill=>!knownSkills.includes(skill)).length>0&&<div className="career-skill-options career-custom-skills">{orderedSkills.filter(skill=>!knownSkills.includes(skill)).map(skill=><label className="selected" key={skill}><input type="checkbox" checked onChange={()=>toggleSkill(skill)}/>{skill}</label>)}</div>}
    <div className="career-add-skill"><input value={customSkill} maxLength={50} placeholder="Add another skill" onChange={e=>setCustomSkill(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();addSkill();}}}/><button type="button" onClick={addSkill}>Add skill +</button></div>
   </div>
   <label className="career-field"><span>Special achievements / projects</span><textarea rows={4} maxLength={1500} placeholder="Awards, notable projects, certifications or measurable outcomes (optional)" value={achievements} onChange={e=>setAchievements(e.target.value)}/></label>
   {status&&<p className={"career-form-status "+status.kind} role="status" aria-live="polite">{status.message}</p>}
   <button className="button button-primary career-submit" type="submit" disabled={submitting||parsing}>{submitting?"Submitting application…":"Submit application"} <span>↗</span></button>
   <p className="career-privacy-note">Application details are used for recruitment review. Resumes are kept in private storage and are not published publicly.</p>
  </form>
 </div>;
}
