import { MouseEvent } from 'react';

import {
  CSSProperties,
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  ForwardedRef,
} from 'react';

export interface INestedObject extends Record<string, any> {
  id: string | number;
  label: string;
  children: INestedObject[];
  expand?: boolean;
  style?: CSSProperties;
}

interface IRenderButton {
  onClick: (event: MouseEvent<any>) => void;
  isCollapsed: boolean | undefined;
}

interface IRenderCard {
  isDragging: boolean;
  label: string;
  labelId: string;
  data: INestedObject;
  isPreviewCard: boolean;
  isOver: boolean;
  canDrop: boolean;
}

export interface INodeTree {
  label: 'label';
  expand: 'expand';
  children: 'children';
}

export interface IRenderTrees {
  data: INestedObject[];
  horizontal?: boolean;
  collapsable?: boolean;
  expandAll?: boolean;
  strokeColor?: string;
  buttonBackgroundColor?: string;
  buttonBorderColor?: string;
  strokeWidth?: '1px' | '2px' | '3px' | '4px' | '5px';
  onClick?: (...data: any) => any;
  onChange?: (data?: INestedObject, relationships?: IRelationships) => any;
  renderButton?: ({ onClick, isCollapsed }: IRenderButton) => JSX.Element;
  renderCard?: ({ isDragging, label, data, isPreviewCard }: IRenderCard) => any;
  cardStyle?: CSSProperties;
}

export interface IOrgTreeProps extends Omit<IRenderTrees, 'data'> {
  data: INestedObject;
}

export interface IHierarchyContextProps {
  children: React.ReactNode;
  data: INestedObject[];
  treeDataRef: ForwardedRef<any>;
}

interface IRelationship {
  parent: string | number;
  child: string | number;
}

interface IRelationships {
  oldRelationship: IRelationship;
  newRelationship: IRelationship;
}

export interface IOrgTreeNodeProps extends IOrgTreeProps {
  node: INodeTree;
  expandAll: boolean;
  onExpandNodes: () => void;
  onExpand?: (e: any, nodeData: any) => any;
  onClick?: (e: any, nodeData: any) => any;
  onChange?: (data?: INestedObject, relationships?: IRelationships) => any;
}

export interface IOptionalNestedObject
  extends Omit<Partial<INestedObject>, 'children'> {
  children: Partial<INestedObject>[];
}

export interface IParsedArray {
  id: string | number;
  label: string;
  parentId: string | number | null;
}

export interface IHierarchyTreesContext {
  treesData: INestedObject[];
  updateTree: (index: number, tree: INestedObject) => void;
  getTree: (index: number) => INestedObject;
  editById: (
    index: number,
    id: number | string,
    data: Partial<INestedObject>,
    action?: 'replace' | 'add' | 'remove',
    nestedObject?: INestedObject
  ) => INestedObject;
  removeById: (
    index: number,
    id: number | string,
    idsToRemove: Array<number | string>,
    nestedObject?: INestedObject
  ) => INestedObject;
  findParentByChildId: (
    index: number,
    id: number | string,
    nestedObject?: INestedObject
  ) => { parent: INestedObject | null; path: Array<number | string> };
  findById: (
    index: number,
    // nestedObject: INestedObject,
    id: number | string,
    nestedObject?: INestedObject
  ) => INestedObject | null;
  isChild: (
    index: number,
    parentId: number | string,
    childId: number | string,
    nestedObject?: INestedObject
  ) => boolean;
  isDirectChild: (
    index: number,
    parentId: number | string,
    childId: number | string,
    nestedObject?: INestedObject
  ) => boolean;
  isParent: (
    index: number,
    parentId: number | string,
    childId: number | string,
    nestedObject?: INestedObject
  ) => boolean;
  addChildrenById: (
    index: number,
    id: number | string,
    data: INestedObject[],
    nestedObject?: INestedObject
  ) => INestedObject;
}

export interface IHierarchyContextData {
  hierarchyRef: MutableRefObject<INestedObject>;
  draggingItemRef: MutableRefObject<INestedObject | null>;
  hierarchy: INestedObject;
  setHierarchy: Dispatch<SetStateAction<INestedObject>>;
  nestedObjectToArray: (data: INestedObject) => IParsedArray[];
  arrayToNestedObject: (data: IParsedArray[]) => INestedObject;
  editById: (
    id: number | string,
    data: Partial<INestedObject>,
    action?: 'replace' | 'add' | 'remove',
    nestedObject?: INestedObject
  ) => INestedObject;
  removeById: (
    id: number | string,
    idsToRemove: Array<number | string>,
    nestedObject?: INestedObject
  ) => INestedObject;
  findParentByChildId: (
    id: number | string,
    nestedObject?: INestedObject
  ) => { parent: INestedObject | null; path: Array<number | string> };
  findById: (
    // nestedObject: INestedObject,
    id: number | string,
    nestedObject?: INestedObject
  ) => INestedObject | null;
  isChild: (parentId: number | string, childId: number | string) => boolean;
  isDirectChild: (
    parentId: number | string,
    childId: number | string
  ) => boolean;
  isParent: (parentId: number | string, childId: number | string) => boolean;
  updateTree: (nestedObject: INestedObject) => void;
  getTree: () => INestedObject;
}

export interface IHierarchyHook {
  hierarchyRef: MutableRefObject<INestedObject>;
  draggingItemRef: MutableRefObject<INestedObject | null>;
  hierarchy: INestedObject;
  setHierarchy: Dispatch<SetStateAction<INestedObject>>;
}

export interface ISidebarDrawerProps {
  data: any;
  onExpandNodes: () => void;
  children: ReactNode;
  treeRef: ForwardedRef<any>;
}

export interface IHierarchyProps {
  index: number;
}

export type IExpandNodes = () => void | undefined;

export type IFindById = (
  id: number | string,
  nestsObject?: INestedObject | undefined
) => INestedObject | null;

export type IFindParentByChildId = (
  id: string | number,
  nestedObject?: INestedObject | undefined
) => {
  parent: INestedObject | null;
  path: (string | number)[];
};

export type IRemoveById = (
  id: number | string,
  dataToRemove: Array<number | string>,
  nestedObject?: INestedObject | undefined
) => INestedObject;

export type IEditById = (
  id: number | string,
  data: Partial<INestedObject>,
  action?: 'replace' | 'add' | 'remove',
  nestedObject?: INestedObject | undefined
) => INestedObject;

export type IAddChildrenById = (
  id: number | string,
  data: INestedObject[],
  nestedObject?: INestedObject | undefined
) => INestedObject;

export type IUpdateTree = (nestedObject: INestedObject) => void;

export interface ITreeRefProps {
  updateTree: (index: number, tree: INestedObject) => void;
  getTree: (index: number) => INestedObject;
  editById: (
    index: number,
    id: number | string,
    data: Partial<INestedObject>,
    action?: 'replace' | 'add' | 'remove',
    nestedObject?: INestedObject
  ) => INestedObject;
  removeById: (
    index: number,
    id: number | string,
    idsToRemove: Array<number | string>,
    nestedObject?: INestedObject
  ) => INestedObject;
  findParentByChildId: (
    index: number,
    id: number | string,
    nestedObject?: INestedObject
  ) => { parent: INestedObject | null; path: Array<number | string> };
  findById: (
    index: number,
    // nestedObject: INestedObject,
    id: number | string,
    nestedObject?: INestedObject
  ) => INestedObject | null;
  isChild: (
    index: number,
    parentId: number | string,
    childId: number | string,
    nestedObject?: INestedObject
  ) => boolean;
  isDirectChild: (
    index: number,
    parentId: number | string,
    childId: number | string,
    nestedObject?: INestedObject
  ) => boolean;
  isParent: (
    index: number,
    parentId: number | string,
    childId: number | string,
    nestedObject?: INestedObject
  ) => boolean;
  addChildrenById: (
    index: number,
    id: number | string,
    data: INestedObject[],
    nestedObject?: INestedObject
  ) => INestedObject;
}
