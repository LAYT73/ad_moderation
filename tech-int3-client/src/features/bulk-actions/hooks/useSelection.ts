import { useCallback, useMemo, useState } from 'react';

export const useSelection = () => {
  const [ids, setIds] = useState<Set<number>>(new Set());

  const isSelected = useCallback((id: number) => ids.has(id), [ids]);

  const toggle = useCallback((id: number, next?: boolean) => {
    setIds((prev) => {
      const s = new Set(prev);
      const shouldSelect = typeof next === 'boolean' ? next : !s.has(id);
      if (shouldSelect) s.add(id);
      else s.delete(id);
      return s;
    });
  }, []);

  const selectAll = useCallback((items: number[]) => {
    setIds((_) => new Set(items));
  }, []);

  const clear = useCallback(() => setIds(new Set()), []);

  const count = useMemo(() => ids.size, [ids]);
  const selectedIds = useMemo(() => Array.from(ids), [ids]);

  return { isSelected, toggle, selectAll, clear, count, selectedIds };
};
