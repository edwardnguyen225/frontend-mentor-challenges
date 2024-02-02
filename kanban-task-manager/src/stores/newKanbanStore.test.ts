import { act, renderHook } from '@testing-library/react';

import { useKanbanStore } from './newKanbanStore';

describe('useKanbanStore', () => {
  const board1 = {
    name: 'Test Board 1',
    columns: ['Todo', 'Done'],
  };
  const board2 = {
    name: 'Test Board 2',
    columns: ['Todo', 'Doing', 'Done'],
  };

  afterEach(() => {
    const { result } = renderHook(() => useKanbanStore());
    act(() => {
      result.current.resetStore?.();
    });
  });

  it('should add a new board and its columns', () => {
    const { result } = renderHook(() => useKanbanStore());

    act(() => {
      result.current.addBoard(board1.name, board1.columns);
    });

    const boardIds = Object.keys(result.current.boards);
    expect(boardIds.length).toBe(1);

    const board = result.current.boards[boardIds[0] as string];
    // #1: Check that the board was added
    expect(board?.name).toBe(board1.name);
    expect(board?.columnIds.length).toBe(board1.columns.length);

    // #2: Check that the columns were added
    const columnIds = board?.columnIds;
    columnIds?.forEach((columnId) => {
      const column = result.current.columns[columnId];
      expect(column).toBeDefined();
    });
  });

  it('should remove a board and its related data', () => {
    const { result } = renderHook(() => useKanbanStore());
    const boardName = 'Test Board';
    const columns = ['Column 1', 'Column 2'];

    act(() => {
      result.current.addBoard(boardName, columns);
    });

    const boardIds = Object.keys(result.current.boards);
    expect(boardIds.length).toBe(1);

    act(() => {
      result.current.removeBoard(boardIds[0] as string);
    });

    expect(Object.keys(result.current.boards).length).toBe(0);
  });

  it('should open a board', () => {
    const { result } = renderHook(() => useKanbanStore());
    act(() => {
      result.current.addBoard(board1.name, board1.columns);
      result.current.addBoard(board2.name, board2.columns);
    });

    const boardIds = Object.keys(result.current.boards);
    expect(boardIds.length).toBe(2);

    act(() => {
      result.current.openBoard(boardIds[0] as string);
    });

    expect(result.current.currentBoardId).toBe(boardIds[0]);

    act(() => {
      result.current.openBoard(boardIds[1] as string);
    });

    expect(result.current.currentBoardId).toBe(boardIds[1]);
  });

  it('should return the current columns', () => {
    const { result } = renderHook(() => useKanbanStore());
    act(() => {
      result.current.addBoard(board1.name, board1.columns);
    });

    const boardIds = Object.keys(result.current.boards);
    expect(boardIds.length).toBe(1);

    const boardId = boardIds[0] as string;
    const board = result.current.boards[boardId];
    expect(board?.columnIds.length).toBe(board1.columns.length);

    act(() => {
      const currentColumns = result.current.getCurrentColumns();
      expect(currentColumns.length).toBe(board1.columns.length);
    });
  });

  it('should add new columns', () => {
    const { result } = renderHook(() => useKanbanStore());
    act(() => {
      result.current.addBoard(board1.name, board1.columns);
    });

    const boardIds = Object.keys(result.current.boards);
    expect(boardIds.length).toBe(1);

    const boardId = boardIds[0] as string;
    const board = result.current.boards[boardId];
    expect(board?.columnIds.length).toBe(board1.columns.length);

    act(() => {
      const currentColumns = result.current.getCurrentColumns();
      result.current.updateCurrentColumns([
        ...currentColumns,
        { name: 'new column' },
      ]);
    });

    const updatedBoard = result.current.boards[boardId];
    expect(updatedBoard?.columnIds.length).toBe(board1.columns.length + 1);
  });

  it('should remove columns', () => {
    const { result } = renderHook(() => useKanbanStore());
    act(() => {
      result.current.addBoard(board1.name, board1.columns);
    });

    const boardIds = Object.keys(result.current.boards);
    expect(boardIds.length).toBe(1);

    const boardId = boardIds[0] as string;
    const board = result.current.boards[boardId];
    expect(board?.columnIds.length).toBe(board1.columns.length);

    act(() => {
      const currentColumns = result.current.getCurrentColumns();
      result.current.updateCurrentColumns(currentColumns.slice(0, 1));
    });

    const updatedBoard = result.current.boards[boardId];
    expect(updatedBoard?.columnIds.length).toBe(1);
  });

  it('should update the name of a column', () => {
    const { result } = renderHook(() => useKanbanStore());
    act(() => {
      result.current.addBoard(board1.name, board1.columns);
    });

    const boardIds = Object.keys(result.current.boards);
    expect(boardIds.length).toBe(1);

    const boardId = boardIds[0] as string;
    const board = result.current.boards[boardId];
    expect(board?.columnIds.length).toBe(board1.columns.length);

    act(() => {
      const currentColumns = result.current.getCurrentColumns();
      const updatedColumns = currentColumns.map((column, index) => {
        if (index === 0) {
          return { ...column, name: 'Updated Column Name' };
        }
        return column;
      });
      result.current.updateCurrentColumns(updatedColumns);
    });

    const updatedBoard = result.current.boards[boardId];
    const updatedColumn =
      result.current.columns[updatedBoard?.columnIds[0] as string];
    expect(updatedColumn?.name).toBe('Updated Column Name');
  });

  it('should add a new task', () => {
    const { result } = renderHook(() => useKanbanStore());
    act(() => {
      result.current.addBoard(board1.name, board1.columns);
    });

    const boardIds = Object.keys(result.current.boards);
    expect(boardIds.length).toBe(1);

    const boardId = boardIds[0] as string;
    const board = result.current.boards[boardId];
    expect(board?.columnIds.length).toBe(board1.columns.length);

    const currentColumns = result.current.getCurrentColumns();
    const firstColumn = currentColumns[0];
    const columnId = firstColumn?.id as string;
    const task = {
      title: 'New Task',
      description: 'New Task Description',
      status: firstColumn?.name as string,
      subtasks: [],
    };

    act(() => {
      result.current.addTask(columnId, task);
    });

    const tasks = result.current.getTasksByColumnId(columnId);
    expect(tasks.length).toBe(1);

    // Check that the task was added to the column
    const column = result.current.columns[columnId];
    expect(column?.taskIds.length).toBe(1);
  });
});
