import { useEffect, useRef, useState, useMemo } from 'react';

import { IHierarchyProps, INestedObject } from '../interfaces';
import { useHierarchyData } from '../context/HierarchyContextProvider';

export const useHierarchy = ({ index }: IHierarchyProps) => {
  const { treesData } = useHierarchyData();
  const [hierarchy, setHierarchy] = useState<INestedObject>(treesData[index]);
  const hierarchyRef = useRef<INestedObject>(hierarchy);
  const draggingItemRef = useRef<INestedObject>(null);

  useEffect(() => {
    setHierarchy(treesData[index]);
  }, [treesData]);

  useEffect(() => {
    console.log('Updating Hierarchy Ref!');
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
