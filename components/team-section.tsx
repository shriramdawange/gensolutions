"use client";
const team=[
 {number:"01",name:"SHUDHANSHU YADAV",role:"FOUNDING MEMBER",initials:"SY",accent:"cyan"},
 {number:"02",name:"PALLAVI MADAVAN",role:"FOUNDING MEMBER · PAST",initials:"PM",accent:"green"}
];
export default function TeamSection(){
 return <section className="gs-team" id="team" aria-labelledby="gs-team-title">
  <div className="gs-team__top"><span className="gs-team__brand">{"< DAVAN_TECHNOLOGIES />"}</span><span className="gs-team__index">FOUNDING MEMBERS / 01—02</span></div>
  <header className="gs-team__heading"><span className="gs-team__number">02</span><h2 id="gs-team-title">FOUNDING <span>MEMBERS</span></h2><p>People who helped shape the journey.</p></header>
  <div className="gs-team__grid gs-team__grid--founders">{team.map(member=><article className={"gs-team__card gs-team__card--"+member.accent} key={member.number}>
   <div className="gs-team__portrait"><div className="gs-team__portrait-grid"/><span className="gs-team__cross" aria-hidden="true">+</span><span className="gs-team__portrait-index">DAVAN / {member.number}</span><span className="gs-team__founder-tag">FOUNDING MEMBER</span><div className="gs-team__initials" aria-label={"Initials for "+member.name}>{member.initials}</div><span className="gs-team__corner" aria-hidden="true">TECH / 01</span></div>
   <div className="gs-team__identity"><div><h3>{member.name}</h3><p>{member.role}</p></div></div><div className="gs-team__card-line"/>
  </article>)}</div>
  <footer className="gs-team__footer"><span>BUILT ON CURIOSITY.</span><span className="gs-team__footer-mark">✳</span><span>CONNECTED BY ENGINEERING.</span></footer>
 </section>;
}
