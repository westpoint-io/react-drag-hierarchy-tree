import React from 'react';
export declare function IndexContextProvider({ children, index, }: {
    children: React.ReactNode;
    index: number;
}): JSX.Element;
export declare const useIndex: () => {
    index: number;
};
