import React, { forwardRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IRenderTrees } from '../interfaces';
import { OrgTreeComponent } from './OrgTree/OrgTree';
import { HierarchyTreesContextProvider } from '../context/HierarchyContextProvider';
import { IndexContextProvider } from '../context/IndexContextProvider';

export const RenderTrees = forwardRef<any, IRenderTrees>(
  (
    {
      data,
      onClick,
      collapsable = true,
      expandAll = true,
      horizontal = false,
      ...props
    },
    ref
  ) => (
    <DndProvider backend={HTML5Backend}>
      <HierarchyTreesContextProvider data={data} treeDataRef={ref}>
        {data.map((tree, i) => (
          <IndexContextProvider key={i} index={i}>
            <OrgTreeComponent
              data={tree}
              collapsable={collapsable}
              expandAll={expandAll}
              horizontal={horizontal}
              {...props}
            />
          </IndexContextProvider>
        ))}
      </HierarchyTreesContextProvider>
    </DndProvider>
  )
);
