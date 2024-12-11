import { cookies } from "next/headers";
import { DataRow } from "src/components/Table";
import Layout2 from "../layout2";
import { fetchTask } from "./apiCall";
import TaskView from "./taskView";

export interface ITask {
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date;
  assignedTo: string;
  project: string;
  createdAt: Date;
  updatedAt: Date;
}

export default async function TaskPage() {
  const cookieStore = cookies();
  const role = cookieStore.get("role")?.value;
  const taskList: DataRow[] = await fetchTask(role);


  return (
    <>
      <Layout2>
        <TaskView taskList={taskList}/>
      </Layout2>
    </>
  );
}
