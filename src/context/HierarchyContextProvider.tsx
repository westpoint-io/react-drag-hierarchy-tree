import clone from 'clone';
import React, { createContext, useContext, useState } from 'react';

import { IHierarchyTreesContext, INestedObject } from '../interfaces';

const HierarchyContext = createContext({} as IHierarchyTreesContext);

export function HierarchyTreesContextProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [treesData, setTreesData] = useState<INestedObject[]>([]);

  const addTree = (index: number, tree: INestedObject) => {
    setTreesData((current) => {
      current[index] = tree;
      return [...current, tree];
    });
  };

  const updateTree = (index: number, tree: INestedObject) => {
    setTreesData((current) => {
      current[index] = tree;
      return [...current];
    });
  };

  const editById = (
    index: number,
    id: number | string,
    data: Partial<INestedObject>,
    action: 'replace' | 'add' | 'remove' = 'add',
    nestedObject?: INestedObject
  ) => {
    const targetTree = treesData[index];
    let nestedObjectClone = nestedObject
      ? { ...nestedObject }
      : { ...targetTree };
    nestedObjectClone = clone(nestedObjectClone);

    if (nestedObjectClone.id === id) {
      if (!action || action === 'replace')
        return { ...nestedObjectClone, ...data };
      if (!action || action === 'add')
        return {
          ...nestedObjectClone,
          ...data,
          children: [
            ...nestedObjectClone.children,
            ...(data.children ? data.children : []),
          ],
        };
      if (!action || action === 'remove')
        return {
          ...nestedObjectClone,
          ...data,
          children: [
            ...nestedObjectClone.children.filter((child) =>
              data.children
                ? !data.children.map((i) => i.id).includes(child.id)
                : child
            ),
          ],
        };
    }

    if (!nestedObjectClone.children) return nestedObjectClone as INestedObject;

    const newChildren: INestedObject[] = nestedObjectClone.children.map(
      (child) => {
        return editById(index, id, data, action, child);
      }
    );

    return {
      ...nestedObjectClone,
      children: newChildren || [],
    } as INestedObject;
  };

  const addChildrenById = (
    index: number,
    id: number | string,
    data: INestedObject[],
    nestedObject?: INestedObject
  ) => {
    const targetTree = treesData[index];
    let nestedObjectClone = nestedObject
      ? { ...nestedObject }
      : { ...targetTree };
    nestedObjectClone = clone(nestedObjectClone);

    if (nestedObjectClone.id === id) {
      return {
        ...nestedObjectClone,
        children: [...nestedObjectClone.children, ...(data ? data : [])],
      };
    }

    if (!nestedObjectClone.children) return nestedObjectClone as INestedObject;

    const newChildren: INestedObject[] = nestedObjectClone.children.map(
      (child) => {
        return addChildrenById(index, id, data, child);
      }
    );

    return {
      ...nestedObjectClone,
      children: newChildren || [],
    } as INestedObject;
  };

  // const updateTree = useCallback((newNestedObject: INestedObject) => {
  //   setHierarchy(newNestedObject);
  //   hierarchyRef.current = newNestedObject;
  // }, []);

  // const getTree = () => hierarchy;

  const removeById = (
    index: number,
    id: number | string,
    dataToRemove: Array<number | string>,
    nestedObject?: INestedObject
  ) => {
    const targetTree = treesData[index];
    let nestedObjectClone = nestedObject
      ? { ...nestedObject }
      : { ...targetTree };
    nestedObjectClone = clone(nestedObjectClone);

    if (nestedObjectClone.id === id) {
      return {
        ...nestedObjectClone,
        ...dataToRemove,
        children: [
          ...nestedObjectClone.children.filter((child) =>
            dataToRemove
              ? !dataToRemove.map((i) => i).includes(child.id)
              : !child
          ),
        ],
      };
    }

    if (!nestedObjectClone.children) return nestedObjectClone as INestedObject;

    const newChildren: INestedObject[] = nestedObjectClone.children.map(
      (child) => {
        return removeById(index, id, dataToRemove, child);
      }
    );

    return {
      ...nestedObjectClone,
      children: newChildren || [],
    } as INestedObject;
  };

  const findParentByChildId = (
    index: number,
    id: number | string,
    nestsObject?: INestedObject
  ) => {
    const targetTree = treesData[index];
    let nestedObject = nestsObject ? { ...nestsObject } : { ...targetTree };
    nestedObject = clone(nestedObject);

    const loop = (
      childObject: INestedObject,
      parentObject: INestedObject | null,
      arrayParentIdPaths = [] as Array<number | string>
    ) => {
      const array: Array<number | string> = [...arrayParentIdPaths];

      if (parentObject?.id) array.push(parentObject.id);

      if (childObject.id === id) {
        return { parent: parentObject, path: array };
      }

      if (!childObject?.children) return { parent: null, path: [] };

      let parent: {
        parent: INestedObject | null;
        path: Array<number | string>;
      } = { parent: null, path: [] };

      childObject.children.map((child) => {
        const loopParent = loop(child, childObject, array);
        if (loopParent.parent !== null) {
          parent = loopParent;
        }
      });

      return parent;
    };

    const parentData = loop(nestedObject, null);

    return parentData;
  };

  const findById = (
    // nestedObject: INestedObject,
    index: number,
    id: number | string,
    nestsObject?: INestedObject
  ) => {
    const targetTree = treesData[index];
    let nestedObject = nestsObject ? { ...nestsObject } : { ...targetTree };
    nestedObject = clone(nestedObject);

    const loop = (nestedObject: INestedObject, itemId: number | string) => {
      if (nestedObject.id === id) {
        return nestedObject;
      }
      if (!nestedObject?.children) return null;

      let item: INestedObject | null = null;

      nestedObject.children.map((child) => {
        const loopItem = loop(child, itemId);
        if (loopItem !== null) item = loopItem;
        return;
      });

      return item;
    };

    const Item = loop(nestedObject, id);

    return Item;
  };

  const isChild = (
    index: number,
    parentId: number | string,
    childId: number | string
  ) => {
    const { path } = findParentByChildId(index, childId);
    return path.includes(parentId);
  };

  const isParent = (
    index: number,
    parentId: number | string,
    childId: number | string
  ) => {
    const parent = findById(index, parentId);
    if (!parent) return false;
    const children = getAllChildrenIds(parent);
    if (children.includes(childId)) return true;
    return false;
  };

  const isDirectChild = (
    index: number,
    parentId: number | string,
    childId: number | string
  ) => {
    const { parent } = findParentByChildId(index, childId);
    const id = parent?.id;
    return id === parentId;
  };

  const getAllChildrenIds = (obj: INestedObject) => {
    let childrenIds: (string | number)[] = [];

    if (!obj.children.length) {
      return childrenIds;
    }

    for (let child of obj.children) {
      const childIds = getAllChildrenIds(child);
      childrenIds = childrenIds.concat(childIds);
    }

    childrenIds = childrenIds.concat(obj.children.map((child) => child.id));

    return childrenIds;
  };

  return (
    <HierarchyContext.Provider
      value={{
        treesData,
        addTree,
        editById,
        removeById,
        findParentByChildId,
        findById,
        isDirectChild,
        isChild,
        isParent,
        updateTree,
      }}
    >
      {children}
    </HierarchyContext.Provider>
  );
}

export const useHierarchyData = () => useContext(HierarchyContext);
