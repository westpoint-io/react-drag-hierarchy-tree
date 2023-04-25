import React, { useEffect } from 'react';

import { IOrgTreeNodeProps } from '../interfaces';
import { RenderNode } from './RenderNode';
import { useHierarchy } from '../hooks/useHierarchy';
import { useHierarchyData } from '../context/HierarchyContextProvider';

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
  const { data, index } = props;
  const { hierarchy, ...hierarchyProps } = useHierarchy({
    data,
  });

  const { addTree } = useHierarchyData();

  useEffect(() => {
    console.log('Hey!!!');
    addTree(index, data);
  }, []);

  return (
    <>
      <RenderNode
        index={index}
        data={hierarchy}
        hierarchyProps={hierarchyProps}
        prop={props}
        first
      />
      <RenderNode
        index={index}
        hierarchyProps={hierarchyProps}
        data={mock_data}
        prop={props}
        mock
      />
    </>
  );
};
