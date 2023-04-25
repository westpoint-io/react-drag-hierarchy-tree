import { useRef, useState, useMemo } from 'react';

import { IHierarchyProps, INestedObject } from '../interfaces';

export const useHierarchy = ({ data }: IHierarchyProps) => {
  const [hierarchy, setHierarchy] = useState<INestedObject>(data);
  const hierarchyRef = useRef<INestedObject>(data);
  const draggingItemRef = useRef<INestedObject>(null);

  return useMemo(() => {
    return {
      draggingItemRef,
      hierarchyRef,
      hierarchy,
      setHierarchy,
    };
  }, [draggingItemRef, hierarchyRef, hierarchy, setHierarchy]);
};
