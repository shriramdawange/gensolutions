export type CareerOpening = {
  id: string; slug: string; title: string; summary: string; description: string;
  responsibilities: string[]; requirements: string[]; skills: string[];
  vacancies: number; hours_per_day: number; start_date: string; published: boolean;
};

export const careerApplicationConfig = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://svsweslezorghidounxd.supabase.co",
  publishableKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_Hnrt2deZ9830ixBT3Y59yQ_Zg8s1vzN",
  bucket: "davan-resumes"
};

const fallback: CareerOpening[] = [
  { id:"5d8881f9-ec28-4745-971d-33d82c4ec106", slug:"full-stack-developer", title:"Full-Stack Developer Intern", summary:"Build user-facing experiences and the backend systems that power them.", description:"Work across the application stack on real product features, collaborate with designers and engineers, and ship reliable, maintainable code.", responsibilities:["Develop responsive frontend interfaces and reusable components","Build and integrate APIs and backend services","Work with databases, authentication and third-party integrations","Write readable code, test features and document technical decisions"], requirements:["Hands-on experience building and shipping web applications","Comfortable with JavaScript or TypeScript and modern frontend development","Working knowledge of backend APIs, databases and Git","A portfolio, GitHub repository or meaningful project experience"], skills:["React","Next.js","TypeScript","Node.js","REST APIs","PostgreSQL","Git"], vacancies:2, hours_per_day:4, start_date:"2026-12-05", published:true },
  { id:"72a48623-61cf-4746-8ff0-0b4efef1895e", slug:"flutter-developer", title:"Flutter Developer Intern", summary:"Create polished cross-platform mobile experiences.", description:"Contribute to Flutter applications, connect mobile interfaces to backend services, and help improve performance, quality and usability.", responsibilities:["Build and maintain Flutter screens and app flows","Integrate REST APIs and backend services","Implement state management and reusable widgets","Test on Android devices and resolve UI or runtime issues"], requirements:["Hands-on Flutter and Dart project experience","Understanding of responsive layouts and app navigation","Experience consuming APIs and managing application state","A portfolio, GitHub repository or published app is a plus"], skills:["Flutter","Dart","REST APIs","State Management","Firebase","Supabase","Git"], vacancies:2, hours_per_day:4, start_date:"2026-12-05", published:true },
  { id:"d2b2d16a-a097-4b3a-adf9-26d3452e7e6d", slug:"management-intern", title:"Management Intern", summary:"Coordinate people, projects and execution across teams.", description:"Support day-to-day project coordination, team communication, task follow-through and operational reporting across active product initiatives.", responsibilities:["Coordinate tasks, milestones and follow-ups across project teams","Maintain project trackers, meeting notes and documentation","Support communication between technical and management teams","Prepare concise progress updates and flag blockers early"], requirements:["Previous internship, project coordination or team leadership experience","Strong written and verbal communication","Organised approach to planning, follow-up and documentation","Comfortable working with spreadsheets and project management tools"], skills:["Project Coordination","Communication","Documentation","Task Management","Reporting","Team Collaboration"], vacancies:1, hours_per_day:4, start_date:"2026-12-05", published:true }
];

export async function getCareerOpenings(): Promise<CareerOpening[]> {
  try {
    const url = careerApplicationConfig.supabaseUrl;
    const key = careerApplicationConfig.publishableKey;
    const response = await fetch(url + "/rest/v1/career_openings?select=*&published=eq.true&order=created_at.asc", {
      headers: { apikey:key, Authorization:"Bearer " + key }, cache:"no-store"
    });
    if (!response.ok) return fallback;
    const data = (await response.json()) as CareerOpening[];
    return Array.isArray(data) && data.length ? data : fallback;
  } catch { return fallback; }
}

export async function getCareerOpening(slug: string): Promise<CareerOpening | null> {
  const openings = await getCareerOpenings();
  return openings.find((opening) => opening.slug === slug) ?? null;
}
