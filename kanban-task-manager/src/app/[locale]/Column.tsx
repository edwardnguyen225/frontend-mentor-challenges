import cx from 'classix';
import { useTranslations } from 'next-intl';

import Typography from '@/components/Typography';
import { useKanbanStore } from '@/stores/newKanbanStore';
import { getTasksByColumnId } from '@/stores/selector';

import TaskCard from './TaskCard';

const colorDict = ['bg-[#49C4E5]', 'bg-[#8471F2]', 'bg-[#67E2AE]'];

interface ColumnProps {
  index: number;
  columnId: string;
  name: string;
  className?: string;
}

const Column: React.FC<ColumnProps> = ({
  index,
  columnId,
  name,
  className,
}) => {
  const t = useTranslations('Board');
  const tasks = useKanbanStore((state) => getTasksByColumnId(state, columnId));
  const numTasks = tasks.length;

  return (
    <div className={className}>
      <div className="mb-6 flex text-lg font-bold">
        <div
          className={cx(
            'mr-3 h-[15px] w-[15px] rounded-full',
            colorDict[index % colorDict.length],
          )}
        />
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
