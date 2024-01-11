import { act, renderHook } from '@testing-library/react';

import { useKanbanStore } from './newKanbanStore';

describe('useKanbanStore', () => {
  afterEach(() => {
    const { result } = renderHook(() => useKanbanStore());
    act(() => {
      result.current.resetStore?.();
    });
  });

  it('should add a new board and its columns', () => {
    const { result } = renderHook(() => useKanbanStore());
    const boardName = 'Test Board';
    const columns = ['Column 1', 'Column 2'];

    act(() => {
      result.current.addBoard(boardName, columns);
    });

    const boardIds = Object.keys(result.current.boards);
    expect(boardIds.length).toBe(1);

    const board = result.current.boards[boardIds[0] as string];
    // #1: Check that the board was added
    expect(board?.name).toBe(boardName);
    expect(board?.columnIds.length).toBe(columns.length);

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
});
