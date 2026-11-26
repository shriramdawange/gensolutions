(() => {
  "use strict";
  const SUPABASE_URL = "https://svsweslezorghidounxd.supabase.co";
  const SUPABASE_KEY = "sb_publishable_Hnrt2deZ9830ixBT3Y59yQ_Zg8s1vzN";
  const BUCKET = "davan-resumes";
  const PDF_JS = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
  const PDF_WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  const fallback = [
    {id:"5d8881f9-ec28-4745-971d-33d82c4ec106",slug:"full-stack-developer",title:"Full-Stack Developer Intern",summary:"Build user-facing experiences and the backend systems that power them.",description:"Work across the application stack on real product features, collaborate with designers and engineers, and ship reliable, maintainable code.",responsibilities:["Develop responsive frontend interfaces and reusable components","Build and integrate APIs and backend services","Work with databases, authentication and third-party integrations","Write readable code, test features and document technical decisions"],requirements:["Hands-on experience building and shipping web applications","Comfortable with JavaScript or TypeScript and modern frontend development","Working knowledge of backend APIs, databases and Git","A portfolio, GitHub repository or meaningful project experience"],skills:["React","Next.js","TypeScript","Node.js","REST APIs","PostgreSQL","Git"],vacancies:2,hours_per_day:4,start_date:"2026-12-05"},
    {id:"72a48623-61cf-4746-8ff0-0b4efef1895e",slug:"flutter-developer",title:"Flutter Developer Intern",summary:"Create polished cross-platform mobile experiences.",description:"Contribute to Flutter applications, connect mobile interfaces to backend services, and help improve performance, quality and usability.",responsibilities:["Build and maintain Flutter screens and app flows","Integrate REST APIs and backend services","Implement state management and reusable widgets","Test on Android devices and resolve UI or runtime issues"],requirements:["Hands-on Flutter and Dart project experience","Understanding of responsive layouts and app navigation","Experience consuming APIs and managing application state","A portfolio, GitHub repository or published app is a plus"],skills:["Flutter","Dart","REST APIs","State Management","Firebase","Supabase","Git"],vacancies:2,hours_per_day:4,start_date:"2026-12-05"},
    {id:"d2b2d16a-a097-4b3a-adf9-26d3452e7e6d",slug:"management-intern",title:"Management Intern",summary:"Coordinate people, projects and execution across teams.",description:"Support day-to-day project coordination, team communication, task follow-through and operational reporting across active product initiatives.",responsibilities:["Coordinate tasks, milestones and follow-ups across project teams","Maintain project trackers, meeting notes and documentation","Support communication between technical and management teams","Prepare concise progress updates and flag blockers early"],requirements:["Previous internship, project coordination or team leadership experience","Strong written and verbal communication","Organised approach to planning, follow-up and documentation","Comfortable working with spreadsheets and project management tools"],skills:["Project Coordination","Communication","Documentation","Task Management","Reporting","Team Collaboration"],vacancies:1,hours_per_day:4,start_date:"2026-12-05"}
  ];
  const knownSkills = ["JavaScript","TypeScript","React","Next.js","Node.js","Express","HTML","CSS","Tailwind CSS","Python","Java","Dart","Flutter","Firebase","Supabase","PostgreSQL","MySQL","MongoDB","REST APIs","GraphQL","Git","GitHub","Docker","AWS","Vercel","Figma","UI/UX","State Management","Riverpod","Provider","Project Coordination","Communication","Documentation","Task Management","Reporting","Leadership","Excel","Google Sheets","Agile","Scrum","Jira","Trello","Notion"];
  const headers = {apikey:SUPABASE_KEY,Authorization:"Bearer "+SUPABASE_KEY};
  let activeOpening=null;
  let selectedSkills=[];
  let uploadedResume=null;

  function escapeHtml(value){
    return String(value==null?"":value).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  }
  async function getOpenings(){
    try{
      const response=await fetch(SUPABASE_URL+"/rest/v1/career_openings?select=id,slug,title,summary,description,responsibilities,requirements,skills,vacancies,hours_per_day,start_date&published=eq.true&order=created_at.asc",{headers:headers,cache:"no-store"});
      if(!response.ok)throw new Error("Could not load roles");
      const data=await response.json();
      return Array.isArray(data)?data:fallback;
    }catch(error){console.warn("Using saved careers data:",error);return fallback;}
  }
  function formatDate(value){
    return new Date(value+"T00:00:00").toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"});
  }
  function renderListings(openings){
    const host=document.getElementById("career-openings");
    if(!host)return;
    const totalCount=openings.reduce((total,role)=>total+Number(role.vacancies||0),0);
    const total=document.getElementById("career-total");
    const types=document.getElementById("career-role-count");
    if(total)total.textContent=String(totalCount).padStart(2,"0");
    if(types)types.textContent=String(openings.length).padStart(2,"0");
    if(!openings.length){host.innerHTML='<p class="career-loading">There are no published openings right now. Please check again later.</p>';return;}
    host.innerHTML=openings.map((role,index)=>'<article class="career-opening-card">'+
      '<div class="career-opening-number">0'+(index+1)+'</div>'+
      '<div class="career-opening-copy"><span class="career-role-label">INTERNSHIP · '+escapeHtml(role.vacancies)+' '+(Number(role.vacancies)===1?"VACANCY":"VACANCIES")+'</span>'+
      '<h3>'+escapeHtml(role.title)+'</h3><p>'+escapeHtml(role.summary)+'</p>'+
      '<div class="career-tags">'+(role.skills||[]).slice(0,5).map(skill=>'<span>'+escapeHtml(skill)+'</span>').join("")+'</div></div>'+
      '<div class="career-opening-meta"><span>'+escapeHtml(role.hours_per_day)+' HOURS / DAY</span><span>STARTS '+escapeHtml(formatDate(role.start_date))+'</span><a href="'+(["full-stack-developer","flutter-developer","management-intern"].includes(role.slug)?"./"+encodeURIComponent(role.slug)+"/":"./role.html?slug="+encodeURIComponent(role.slug))+'">View role <b>↗</b></a></div></article>'
    ).join("");
  }
  async function initListings(){
    if(!document.getElementById("career-openings"))return;
    renderListings(await getOpenings());
  }
  function setList(id,values){
    const element=document.getElementById(id);
    if(element)element.innerHTML=(values||[]).map(item=>"<li>"+escapeHtml(item)+"</li>").join("");
  }
  async function initRole(){
    const slug=document.body.dataset.role || new URLSearchParams(window.location.search).get("slug");
    if(!slug)return;
    const openings=await getOpenings();
    activeOpening=openings.find(role=>role.slug===slug)||null;
    if(!activeOpening){
      const title=document.getElementById("role-title");
      const desc=document.getElementById("role-description");
      const form=document.getElementById("career-application-form");
      if(title)title.textContent="This role is no longer available";
      if(desc)desc.textContent="This opening may have closed or been unpublished. Return to the careers page to view current positions.";
      if(form)form.hidden=true;
      return;
    }
    const putText=(id,value)=>{const element=document.getElementById(id);if(element)element.textContent=value;};
    putText("role-title",activeOpening.title);
    document.title=activeOpening.title+" — DAVAN Technologies";
    putText("role-summary",activeOpening.summary);
    putText("role-description",activeOpening.description);
    putText("role-vacancies",activeOpening.vacancies+" "+(Number(activeOpening.vacancies)===1?"VACANCY":"VACANCIES"));
    putText("role-hours",activeOpening.hours_per_day+" HOURS / DAY");
    putText("role-start","START DATE · "+formatDate(activeOpening.start_date).toUpperCase());
    putText("form-role-title",activeOpening.title);
    setList("role-responsibilities",activeOpening.responsibilities);
    setList("role-requirements",activeOpening.requirements);
    const skillHost=document.getElementById("role-skills");
    if(skillHost)skillHost.innerHTML=(activeOpening.skills||[]).map(skill=>"<span>"+escapeHtml(skill)+"</span>").join("");
    const poster=document.querySelector(".career-management-poster");
    if(poster&&slug==="management-intern")poster.closest(".career-poster-wrap").hidden=false;
    initApplicationForm();
  }
  function renderSkillOptions(){
    const host=document.getElementById("career-skill-options");
    if(!host)return;
    const options=Array.from(new Set(knownSkills.concat(selectedSkills.filter(skill=>!knownSkills.includes(skill)))));
    host.innerHTML=options.map(skill=>'<label class="'+(selectedSkills.includes(skill)?"selected":"")+'"><input type="checkbox" value="'+escapeHtml(skill)+'" '+(selectedSkills.includes(skill)?"checked":"")+'> '+escapeHtml(skill)+'</label>').join("");
    host.querySelectorAll('input[type="checkbox"]').forEach(input=>input.addEventListener("change",()=>{
      if(input.checked){if(!selectedSkills.includes(input.value))selectedSkills.push(input.value);}
      else selectedSkills=selectedSkills.filter(item=>item!==input.value);
      renderSkillOptions();
    }));
  }
  function loadPdfLibrary(){
    if(window.pdfjsLib)return Promise.resolve(window.pdfjsLib);
    return new Promise((resolve,reject)=>{
      const existing=document.querySelector('script[data-pdfjs="true"]');
      const finish=()=>window.pdfjsLib?resolve(window.pdfjsLib):reject(new Error("PDF reader could not be loaded."));
      if(existing){existing.addEventListener("load",finish,{once:true});existing.addEventListener("error",()=>reject(new Error("PDF reader could not be loaded.")),{once:true});return;}
      const script=document.createElement("script");
      script.src=PDF_JS;script.async=true;script.dataset.pdfjs="true";script.onload=finish;script.onerror=()=>reject(new Error("PDF reader could not be loaded."));
      document.head.appendChild(script);
    });
  }
  async function extractSkills(file){
    const pdfjs=await loadPdfLibrary();
    pdfjs.GlobalWorkerOptions.workerSrc=PDF_WORKER;
    const pdf=await pdfjs.getDocument({data:await file.arrayBuffer()}).promise;
    const pages=[];
    for(let number=1;number<=pdf.numPages;number++){
      const page=await pdf.getPage(number);
      const text=await page.getTextContent();
      pages.push(text.items.map(item=>item.str||"").join(" "));
    }
    const source=pages.join(" ").toLowerCase();
    return knownSkills.filter(skill=>source.includes(skill.toLowerCase()));
  }
  function initApplicationForm(){
    const form=document.getElementById("career-application-form");
    if(!form||form.dataset.ready==="true")return;
    form.dataset.ready="true";
    const resumeInput=document.getElementById("career-resume");
    const resumeName=document.getElementById("resume-name");
    const parseStatus=document.getElementById("resume-skill-status");
    const workplaceField=document.getElementById("workplace-field");
    const submit=form.querySelector('button[type="submit"]');
    const formStatus=document.getElementById("career-form-status");

    form.querySelectorAll('input[name="working"]').forEach(input=>input.addEventListener("change",()=>{
      const yes=form.querySelector('input[name="working"]:checked').value==="yes";
      workplaceField.hidden=!yes;
      form.elements.current_workplace.required=yes;
    }));
    resumeInput.addEventListener("change",async()=>{
      uploadedResume=resumeInput.files&&resumeInput.files[0]||null;
      selectedSkills=[];
      renderSkillOptions();
      parseStatus.textContent="";
      if(!uploadedResume){resumeName.textContent="Choose your resume";return;}
      if(uploadedResume.type!=="application/pdf"&&!uploadedResume.name.toLowerCase().endsWith(".pdf")){
        uploadedResume=null;resumeInput.value="";resumeName.textContent="Choose your resume";parseStatus.textContent="Please upload your resume as a PDF.";return;
      }
      if(uploadedResume.size>5*1024*1024){
        uploadedResume=null;resumeInput.value="";resumeName.textContent="Choose your resume";parseStatus.textContent="The PDF must be 5 MB or smaller.";return;
      }
      resumeName.textContent=uploadedResume.name;
      parseStatus.textContent="Reading PDF and suggesting skills…";
      try{
        selectedSkills=await extractSkills(uploadedResume);
        renderSkillOptions();
        parseStatus.textContent=selectedSkills.length?"Found "+selectedSkills.length+" possible skills. Review and edit them below.":"No matching skills detected. Add your skills manually.";
      }catch(error){parseStatus.textContent="Could not read PDF text. You can still select or add skills manually.";}
    });
    document.getElementById("add-skill").addEventListener("click",()=>{
      const input=document.getElementById("custom-skill");
      const value=input.value.trim().slice(0,50);
      if(value&&!selectedSkills.some(skill=>skill.toLowerCase()===value.toLowerCase()))selectedSkills.push(value);
      input.value="";
      renderSkillOptions();
    });
    document.getElementById("custom-skill").addEventListener("keydown",event=>{
      if(event.key==="Enter"){event.preventDefault();document.getElementById("add-skill").click();}
    });
    form.addEventListener("submit",async event=>{
      event.preventDefault();
      formStatus.className="career-form-status";
      formStatus.textContent="";
      if(!activeOpening){formStatus.classList.add("error");formStatus.textContent="This role is not accepting applications right now.";return;}
      if(!uploadedResume){formStatus.classList.add("error");formStatus.textContent="Please upload your resume as a PDF.";return;}
      if(!selectedSkills.length){formStatus.classList.add("error");formStatus.textContent="Please select or add at least one relevant skill.";return;}
      submit.disabled=true;
      submit.textContent="Submitting application…";
      const values=new FormData(form);
      const applicationId=window.crypto.randomUUID();
      const safeFileName=uploadedResume.name.replace(/[^a-zA-Z0-9._-]/g,"-").slice(-100);
      const objectPath=applicationId+"/"+Date.now()+"-"+safeFileName;
      try{
        const upload=await fetch(SUPABASE_URL+"/storage/v1/object/"+BUCKET+"/"+objectPath.split("/").map(encodeURIComponent).join("/"),{
          method:"POST",headers:Object.assign({},headers,{"Content-Type":"application/pdf","x-upsert":"false"}),body:uploadedResume
        });
        if(!upload.ok)throw new Error("Resume upload failed. Please check the PDF and try again.");
        const result=await fetch(SUPABASE_URL+"/rest/v1/career_applications",{
          method:"POST",headers:Object.assign({},headers,{"Content-Type":"application/json","Prefer":"return=minimal"}),
          body:JSON.stringify({
            id:applicationId,opening_id:activeOpening.id,name:String(values.get("name")).trim(),email:String(values.get("email")).trim(),
            education:String(values.get("education")).trim(),city:String(values.get("city")).trim(),
            currently_working:values.get("working")==="yes",
            current_workplace:values.get("working")==="yes"?String(values.get("current_workplace")||"").trim():null,
            internship_domain:activeOpening.slug,resume_path:objectPath,resume_filename:uploadedResume.name,
            special_achievements:String(values.get("achievements")||"").trim()||null,skills:selectedSkills
          })
        });
        if(!result.ok)throw new Error("Your resume uploaded, but the application could not be saved. Please retry or contact the hiring team.");
        form.reset();uploadedResume=null;selectedSkills=[];renderSkillOptions();resumeName.textContent="Choose your resume";parseStatus.textContent="";workplaceField.hidden=true;form.elements.current_workplace.required=false;
        formStatus.classList.add("success");formStatus.textContent="Application received. Thank you for applying to DAVAN Technologies.";
      }catch(error){
        formStatus.classList.add("error");formStatus.textContent=error&&error.message?error.message:"Something went wrong. Please try again.";
      }finally{
        submit.disabled=false;
        submit.innerHTML='Submit application <span>↗</span>';
      }
    });
    renderSkillOptions();
  }
  function initHiringPopup(){
    if(document.body.dataset.page!=="home")return;
    try{if(sessionStorage.getItem("davan-hiring-popup-seen"))return;}catch(error){}
    window.setTimeout(async()=>{
      try{if(sessionStorage.getItem("davan-hiring-popup-seen"))return;}catch(error){}
      const openings=await getOpenings();
      const overlay=document.createElement("div");
      overlay.className="hiring-modal-backdrop";
      overlay.innerHTML='<section class="hiring-modal" role="dialog" aria-modal="true" aria-labelledby="hiring-modal-title"><button class="hiring-modal-close" type="button" aria-label="Close hiring announcement">×</button><div class="eyebrow"><span class="eyebrow-line"></span> DAVAN TECHNOLOGIES / CAREERS 2026</div><h2 id="hiring-modal-title">We’re <span>hiring.</span></h2><p>Join our next chapter. Explore current internship openings and find where your skills fit.</p><div class="hiring-modal-roles">'+openings.map(role=>'<a href="careers/'+encodeURIComponent(role.slug)+'/"><span>'+escapeHtml(role.title)+'</span><small>'+escapeHtml(role.vacancies)+' '+(Number(role.vacancies)===1?"vacancy":"vacancies")+'</small><b>↗</b></a>').join("")+'</div><a class="button button-primary hiring-modal-all" href="careers/">View all openings ↗</a><button class="hiring-modal-later" type="button">Maybe later</button></section>';
      document.body.appendChild(overlay);
      function close(){overlay.remove();try{sessionStorage.setItem("davan-hiring-popup-seen","1");}catch(error){}}
      overlay.querySelector(".hiring-modal-close").addEventListener("click",close);
      overlay.querySelector(".hiring-modal-later").addEventListener("click",close);
      overlay.addEventListener("click",event=>{if(event.target===overlay)close();});
      document.addEventListener("keydown",function onKey(event){if(event.key==="Escape"){close();document.removeEventListener("keydown",onKey);}});
    },2600);
  }
  document.addEventListener("DOMContentLoaded",()=>{
    initListings();
    initRole();
    initHiringPopup();
  });
})();