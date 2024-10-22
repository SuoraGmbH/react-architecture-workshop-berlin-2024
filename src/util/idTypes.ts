const taskIdSymbol: unique symbol = Symbol("task ID");
export type TaskId = string & { [taskIdSymbol]: void };

export const taskId = (id: string) => id as TaskId;

const myTaskId = taskId('ad63316a-3f82-4bc4-95be-a0c1b43118d9');

const projectIdSymbol: unique symbol = Symbol("project ID");
export type ProjectId = string & { [projectIdSymbol]: void };
export const projectId = (id: string) => id as ProjectId;

const task = {id: taskId('test')};

const loadProject = (id: ProjectId)=> {}

const project = loadProject(task.id);

/*
 * TS2345: Argument of type TaskId is not assignable to
 * parameter of type ProjectId
 *   Property [projectIdSymbol] is missing in type
 *   String & { [taskIdSymbol]: void; }
 *   but required in type
 *   { [projectIdSymbol]: void; }
 */
