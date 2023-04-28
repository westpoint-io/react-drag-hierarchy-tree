/// <reference types="react" />
import { IHierarchyProps, INestedObject } from '../interfaces';
export declare const useHierarchy: ({ index }: IHierarchyProps) => {
    draggingItemRef: import("react").RefObject<INestedObject>;
    hierarchyRef: import("react").MutableRefObject<INestedObject>;
    hierarchy: INestedObject;
    setHierarchy: import("react").Dispatch<import("react").SetStateAction<INestedObject>>;
};
