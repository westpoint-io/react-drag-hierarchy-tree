import React from 'react';
import { IRenderTrees } from '../interfaces';
import { OrgTreeComponent } from './OrgTree/OrgTree';
import { HierarchyTreesContextProvider } from '../context/HierarchyContextProvider';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const RenderTrees = ({
  data,
  onClick,
  collapsable = true,
  expandAll = true,
  horizontal = false,
  ...props
}: IRenderTrees) => (
  <HierarchyTreesContextProvider>
    <DndProvider backend={HTML5Backend}>
      {data.map((tree, i) => (
        <OrgTreeComponent
          key={i}
          index={i}
          data={tree}
          collapsable={collapsable}
          expandAll={expandAll}
          horizontal={horizontal}
          {...props}
        />
      ))}
    </DndProvider>
  </HierarchyTreesContextProvider>
);
