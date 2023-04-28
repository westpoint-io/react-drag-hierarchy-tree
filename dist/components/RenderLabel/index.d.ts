import { ReactElement } from 'react';
interface ActiveLinkProps {
    children: ReactElement;
    activeClassName: string;
}
export declare function RenderLabel({ children, activeClassName, ...rest }: ActiveLinkProps): JSX.Element;
export {};
