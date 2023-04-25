import React from 'react';

import { IRenderChildren } from '../interfaces';
import { RenderNode } from '../RenderNode';
import { ChildrenComponent } from './styles';

export const RenderChildren = ({
  list,
  data,
  prop,
  mock,
  index,
  hierarchyProps,
}: IRenderChildren) => {
  if (Array.isArray(list) && list.length) {
    return (
      <ChildrenComponent
        id={`children_${data.id}`}
        className={'org-tree-node-children'}
        horizontal={!!prop.horizontal}
        strokeColor={prop.strokeColor}
        strokeWidth={prop.strokeWidth}
      >
        {list.map((item) => {
          return (
            <RenderNode
              index={index}
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
