import { v4 as uuidv4 } from 'uuid';

import type { Board, Column, Task } from '@/types/kanban';

const generateDummyColumn = (props: Partial<Column>): Column => ({
  id: props.id ?? uuidv4(),
  name: props.name ?? 'Column',
  taskIds: props.taskIds ?? [],
});

const DUMMY_COLUMN_01: Column = generateDummyColumn({
  name: 'To Do',
});
const DUMMY_COLUMN_02: Column = generateDummyColumn({
  name: 'In Progress',
});
const DUMMY_COLUMN_03: Column = generateDummyColumn({
  name: 'Done',
});

const generateDummyTask = (props: Partial<Task>): Task => ({
  id: props.id ?? uuidv4(),
  title: props.title ?? 'Task',
  description: props.description ?? '',
  columnId: props.columnId ?? DUMMY_COLUMN_01.id,
  subtasks: props.subtasks ?? [],
});

const DUMMY_TASK_01: Task = generateDummyTask({
  title: 'First Task',
  columnId: DUMMY_COLUMN_01.id,
});
const DUMMY_TASK_02: Task = generateDummyTask({
  title: 'Second Task',
  columnId: DUMMY_COLUMN_01.id,
});
const DUMMY_TASK_03: Task = generateDummyTask({
  title: 'Third Task',
  columnId: DUMMY_COLUMN_02.id,
});
const DUMMY_TASK_04: Task = generateDummyTask({
  title: 'Fourth Task',
  columnId: DUMMY_COLUMN_03.id,
});

const DUMMY_BOARD_01: Board = {
  id: uuidv4(),
  name: 'Platform Launch',
  columnIds: [DUMMY_COLUMN_01.id, DUMMY_COLUMN_02.id, DUMMY_COLUMN_03.id],
};
const DUMMY_BOARD_02: Board = {
  id: uuidv4(),
  name: 'Empty Board',
  columnIds: [],
};

const DUMMY_BOARD: { [key: string]: Board } = {
  [DUMMY_BOARD_01.id]: DUMMY_BOARD_01,
  [DUMMY_BOARD_02.id]: DUMMY_BOARD_02,
};

const DUMMY_TASKS: { [key: string]: Task } = {
  [DUMMY_TASK_01.id]: DUMMY_TASK_01,
  [DUMMY_TASK_02.id]: DUMMY_TASK_02,
  [DUMMY_TASK_03.id]: DUMMY_TASK_03,
  [DUMMY_TASK_04.id]: DUMMY_TASK_04,
};

const getTaskIdsForColumnId = (columnId: string) => {
  return Object.values(DUMMY_TASKS)
    .filter((task) => task.columnId === columnId)
    .map((task) => task.id);
};

const DUMMY_COLUMNS: { [key: string]: Column } = {
  [DUMMY_COLUMN_01.id]: {
    ...DUMMY_COLUMN_01,
    taskIds: getTaskIdsForColumnId(DUMMY_COLUMN_01.id),
  },
  [DUMMY_COLUMN_02.id]: {
    ...DUMMY_COLUMN_02,
    taskIds: getTaskIdsForColumnId(DUMMY_COLUMN_02.id),
  },
  [DUMMY_COLUMN_03.id]: {
    ...DUMMY_COLUMN_03,
    taskIds: getTaskIdsForColumnId(DUMMY_COLUMN_03.id),
  },
};

export { DUMMY_BOARD, DUMMY_COLUMNS, DUMMY_TASKS };
