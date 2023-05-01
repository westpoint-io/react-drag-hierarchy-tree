import { Dispatch, SetStateAction } from 'react';
import { IHierarchyHook, INestedObject, IOrgTreeNodeProps } from '../../interfaces';
export interface ITreeOptions {
    horizontal?: boolean;
    strokeColor?: string;
    strokeWidth?: string;
    expanded?: boolean;
    reverse?: boolean;
}
export interface IRenderChildren {
    list: INestedObject[];
    data: INestedObject;
    prop: IOrgTreeNodeProps;
    mock?: boolean;
    hierarchyProps: Omit<IHierarchyHook, 'hierarchy'>;
}
export interface IRender {
    data: INestedObject;
    prop: IOrgTreeNodeProps;
    first?: boolean;
    mock?: boolean;
    hierarchyProps: Omit<IHierarchyHook, 'hierarchy'>;
}
export interface IRenderCard {
    data: INestedObject;
    prop: IOrgTreeNodeProps;
    expand?: boolean;
    setExpand: Dispatch<SetStateAction<boolean>>;
    mock?: boolean;
    hierarchyProps: Omit<IHierarchyHook, 'hierarchy'>;
    root?: boolean;
}
