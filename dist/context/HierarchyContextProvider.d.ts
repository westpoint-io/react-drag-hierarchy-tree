/// <reference types="react" />
import { IHierarchyContextProps, IHierarchyTreesContext } from '../interfaces';
export declare function HierarchyTreesContextProvider({ children, data, treeDataRef, }: IHierarchyContextProps): JSX.Element;
export declare const useHierarchyData: () => IHierarchyTreesContext;
