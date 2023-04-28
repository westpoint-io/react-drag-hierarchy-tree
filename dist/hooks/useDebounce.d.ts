interface IDebounce {
    onDebounce: (...args: any[]) => void;
    onClearDebounce: () => void;
}
export declare const useDebounce: (fn: (...args: any[]) => void, delay: number, continueUnmounted?: boolean | undefined) => IDebounce;
export {};
