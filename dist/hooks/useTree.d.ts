import { RefObject } from "react";
import { ITreeRefProps } from "../interfaces";
interface ITreeProps {
    treeRef: RefObject<ITreeRefProps>;
}
export declare const useTree: () => ITreeProps;
export {};
