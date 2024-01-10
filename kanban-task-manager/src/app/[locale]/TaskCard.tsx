import { useTranslations } from 'next-intl';

import Typography from '@/components/Typography';
import { useBoardStore } from '@/stores/KanbanStore';
import type { Task } from '@/types/kanban';

interface TaskProps {
  task: Task;
}

const TaskCard: React.FC<TaskProps> = ({ task }) => {
  const {
    taskModal: { openViewTaskModal },
  } = useBoardStore();
  const t = useTranslations('Board');
  const totalSubtasks = task.subtasks.length;
  const numDoneSubtasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted,
  ).length;

  const handleOpenViewTaskModal = () => {
    openViewTaskModal(task);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleOpenViewTaskModal}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleOpenViewTaskModal();
        }
      }}
      className="w-[280px] rounded-lg bg-white p-4 py-6 shadow-md hover:cursor-pointer hover:bg-slate-100 hover:shadow-lg"
    >
      <Typography variant="heading-md">{task.title}</Typography>
      {totalSubtasks > 0 && (
        <Typography className="mt-2 text-medium-grey" variant="body-md">
          {t('count_done_subtasks', {
            count: numDoneSubtasks,
            total: totalSubtasks,
          })}
        </Typography>
      )}
    </div>
  );
};

export default TaskCard;
