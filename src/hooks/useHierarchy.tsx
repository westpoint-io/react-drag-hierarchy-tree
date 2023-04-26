import { useEffect, useRef, useState, useMemo } from 'react';

import { IHierarchyProps, INestedObject } from '../interfaces';
import { useHierarchyData } from '../context/HierarchyContextProvider';

export const useHierarchy = ({ index }: IHierarchyProps) => {
  const { treesData } = useHierarchyData();
  const [hierarchy, setHierarchy] = useState<INestedObject>(treesData[index]);
  const hierarchyRef = useRef<INestedObject>(hierarchy);
  const draggingItemRef = useRef<INestedObject>(null);

  useEffect(() => {
    const newData = treesData[index];
    setHierarchy(newData);
    hierarchyRef.current = newData;
  }, [treesData]);

  return useMemo(() => {
    return {
      draggingItemRef,
      hierarchyRef,
      hierarchy,
      setHierarchy,
    };
  }, [draggingItemRef, hierarchyRef, hierarchy, setHierarchy]);
};
