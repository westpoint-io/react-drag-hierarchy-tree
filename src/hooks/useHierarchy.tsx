import { useEffect, useRef, useState, useMemo } from 'react';

import { IHierarchyProps, INestedObject } from '../interfaces';

export const useHierarchy = ({ data }: IHierarchyProps) => {
  const [hierarchy, setHierarchy] = useState<INestedObject>(data);
  const hierarchyRef = useRef<INestedObject>(data);
  const draggingItemRef = useRef<INestedObject>(null);

  useEffect(() => {
    hierarchyRef.current = hierarchy;
  }, [hierarchy]);

  return useMemo(() => {
    return {
      draggingItemRef,
      hierarchyRef,
      hierarchy,
      setHierarchy,
      // updateTree,
      // getTree,
    };
  }, [
    draggingItemRef,
    hierarchyRef,
    hierarchy,
    setHierarchy,
    // updateTree,
    // getTree,
  ]);
};
