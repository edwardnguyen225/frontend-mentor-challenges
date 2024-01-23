import { useTranslations } from 'next-intl';

import Typography from '@/components/Typography';
import { useKanbanStore } from '@/stores/newKanbanStore';

import TaskCard from './TaskCard';

interface ColumnProps {
  columnId: string;
  name: string;
  className?: string;
}

const Column: React.FC<ColumnProps> = ({ columnId, name, className }) => {
  const t = useTranslations('Board');
  const { getTasksByColumnId } = useKanbanStore();
  const tasks = getTasksByColumnId(columnId);
  const numTasks = tasks.length;

  return (
    <div className={className}>
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
        {numTasks === 0 && (
          <Typography variant="body-lg" className="text-medium-grey">
            {t('no_tasks')}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default Column;
