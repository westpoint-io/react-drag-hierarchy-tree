import React from 'react';

import { IOrgTreeNodeProps } from '../interfaces';
import { RenderNode } from './RenderNode';
import { useHierarchy } from '../hooks/useHierarchy';
import { useIndex } from '../context/IndexContextProvider';

export const isLastNode = (data: any, prop: IOrgTreeNodeProps) => {
  const node = prop.node;
  return !(
    Array.isArray(data[node.children]) && data[node.children].length > 0
  );
};

const mock_data = {
  id: 'mock',
  label: 'Label',
  children: [{ id: 'child_mock', label: 'Label', children: [] }],
};

export const TreeNode = (props: IOrgTreeNodeProps) => {
  const { index } = useIndex();
  const { hierarchy, ...hierarchyProps } = useHierarchy({ index });

  return (
    <>
      <RenderNode
        data={hierarchy}
        hierarchyProps={hierarchyProps}
        prop={props}
        first
      />
      <RenderNode
        hierarchyProps={hierarchyProps}
        data={mock_data}
        prop={props}
        mock
      />
    </>
  );
};
