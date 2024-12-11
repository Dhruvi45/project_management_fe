//src/app/project/page.tsx
import { cookies } from "next/headers";
import { DataRow } from "src/components/Table";
import Layout2 from "../layout2";
import ProjectView from "./projectView";
import { fetchProjects } from "./apiCall";

export interface IProject {
  title: string;
  description?: string;
  owner: string;
  members: string[];
  // tasks: string[]; // Array of Task IDs
}


export default async function ProjectPage() {
  const cookieStore = cookies();
  const role = cookieStore.get("role")?.value;
  const projectList: DataRow[] = await fetchProjects(role);
  return (
    <>
      <Layout2>
        <ProjectView projects={projectList} />
      </Layout2>
    </>
  );
}
