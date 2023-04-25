import { useEffect, useRef, useState, useMemo } from 'react';

import { IHierarchyProps, INestedObject } from '../interfaces';
import { useHierarchyData } from '../context/HierarchyContextProvider';

type TId = string | number;

export const useHierarchy = ({ data }: IHierarchyProps) => {
  const [hierarchy, setHierarchy] = useState<INestedObject>(data);
  const hierarchyRef = useRef<INestedObject>(data);
  const draggingItemRef = useRef<INestedObject>(null);
  const [index, setIndex] = useState<number>();

  const ctx = useHierarchyData();

  useEffect(() => {
    const treeIndex = ctx.addTree(data);
    setIndex(treeIndex);
  }, []);

  useEffect(() => {
    hierarchyRef.current = hierarchy;
  }, [hierarchy]);

  const editById = (
    id: string | number,
    data: Partial<INestedObject>,
    action?: 'replace' | 'add' | 'remove',
    nestedObject?: INestedObject
  ) => {
    if (!index) return;
    return ctx.editById(index, id, data, action, nestedObject);
  };

  const removeById = (
    id: TId,
    idsToRemove: TId[],
    nestedObject?: INestedObject
  ) => {
    if (!index) return;
    return ctx.removeById(index, id, idsToRemove, nestedObject);
  };

  const findParentByChildId = (id: TId, nestedObject?: INestedObject) => {
    if (!index) return;
    return ctx.findParentByChildId(index, id, nestedObject);
  };

  const findById = (id: TId, nestedObject?: INestedObject) => {
    if (!index) return;
    return ctx.findById(index, id, nestedObject);
  };

  const isChild = (parentId: TId, childId: TId) => {
    if (!index) return;
    return ctx.isChild(index, parentId, childId);
  };

  const isDirectChild = (parentId: TId, childId: TId) => {
    if (!index) return;
    return ctx.isDirectChild(index, parentId, childId);
  };

  const isParent = (parentId: TId, childId: TId) => {
    if (!index) return;
    return ctx.isParent(index, parentId, childId);
  };

  return useMemo(() => {
    return {
      draggingItemRef,
      hierarchyRef,
      hierarchy,
      setHierarchy,
      editById,
      removeById,
      findParentByChildId,
      findById,
      isChild,
      isDirectChild,
      isParent,
      // updateTree,
      // getTree,
    };
  }, [
    draggingItemRef,
    hierarchyRef,
    hierarchy,
    setHierarchy,
    editById,
    removeById,
    findParentByChildId,
    findById,
    isChild,
    isDirectChild,
    isParent,
    // updateTree,
    // getTree,
  ]);
};
