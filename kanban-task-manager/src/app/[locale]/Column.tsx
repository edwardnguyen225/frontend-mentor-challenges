import Typography from '@/components/Typography';
import type { Task } from '@/types/kanban';

import TaskCard from './TaskCard';

interface ColumnProps {
  name: string;
  tasks: Task[];
}
const Column: React.FC<ColumnProps> = ({ name, tasks }) => {
  const numTasks = tasks.length;
  return (
    <div className="mb-2 rounded-lg">
      <div className="mb-6 flex text-lg font-bold">
        <div className="mr-3 h-[15px] w-[15px] rounded-full bg-blue-500" />
        <Typography className="uppercase" variant="heading-sm">
          {name} ({numTasks.toString()})
        </Typography>
      </div>
      <div className="flex flex-col gap-5">
        {tasks.map((task) => (
          <TaskCard key={`task-${task.title}`} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;
