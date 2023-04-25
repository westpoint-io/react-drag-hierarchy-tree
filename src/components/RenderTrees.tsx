import React from 'react';
import { IRenderTrees } from '../interfaces';
import { OrgTreeComponent } from './OrgTree/OrgTree';
import { HierarchyTreesContextProvider } from '../context/HierarchyContextProvider';

export const RenderTrees = ({
  data,
  onClick,
  collapsable = true,
  expandAll = true,
  horizontal = false,
  ...props
}: IRenderTrees) => (
  <HierarchyTreesContextProvider>
    {data.map((tree, i) => (
      <OrgTreeComponent
        key={i}
        data={tree}
        collapsable={true}
        expandAll={true}
        horizontal={true}
        {...props}
      />
    ))}
  </HierarchyTreesContextProvider>
);
