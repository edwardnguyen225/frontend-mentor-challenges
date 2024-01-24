import cx from 'classix';
import { useTranslations } from 'next-intl';

import Typography from '@/components/Typography';
import { useModalStore } from '@/stores/newKanbanStore';
import type { Task } from '@/types/kanban';

interface TaskProps {
  task: Task;
}

const TaskCard: React.FC<TaskProps> = ({ task }) => {
  const { openViewTaskModal } = useModalStore();
  const t = useTranslations('Board');
  const totalSubtasks = task.subtasks.length;
  const numDoneSubtasks = task.subtasks.filter(
    (subtask) => subtask.isCompleted,
  ).length;

  const handleOpenViewTaskModal = () => {
    openViewTaskModal(task.id);
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
      className={cx(
        'w-[280px] rounded-lg bg-white p-4 py-6 shadow-md hover:cursor-pointer hover:bg-slate-100 hover:shadow-lg',
        'dark:bg-dark-grey dark:hover:bg-dark-grey/50',
      )}
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
