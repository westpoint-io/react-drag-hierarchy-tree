import React from 'react';

import { IRenderChildren } from '../interfaces';
import { RenderNode } from '../RenderNode';
import { ChildrenComponent } from './styles';

export const RenderChildren = ({
  list,
  data,
  prop,
  mock,
  hierarchyProps,
}: IRenderChildren) => {
  if (Array.isArray(list) && list.length) {
    return (
      <ChildrenComponent
        id={`children_${data.id}`}
        className={'org-tree-node-children'}
        horizontal={!!prop.horizontal}
        reverse={prop.reverse}
        strokeColor={prop.strokeColor}
        strokeWidth={prop.strokeWidth}
      >
        {list.map((item) => {
          return (
            <RenderNode
              mock={mock}
              key={item.id}
              data={item}
              prop={prop}
              hierarchyProps={hierarchyProps}
            />
          );
        })}
      </ChildrenComponent>
    );
  }
  return null;
};
