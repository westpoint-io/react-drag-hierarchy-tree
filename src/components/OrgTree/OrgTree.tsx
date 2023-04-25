import React, { useCallback, useState } from 'react';

import { TreeNode } from '..';
import { INodeTree, IOrgTreeProps } from '../../interfaces';
import { OrgTree, OrgTreeContainer } from './OrgTree.styles';

const initialState = {
  node: {
    label: 'label',
    expand: 'expand',
    children: 'children',
  },
};

export const OrgTreeComponent = ({
  data,
  onClick,
  collapsable = true,
  expandAll = true,
  horizontal = false,
  ...props
}: IOrgTreeProps) => {
  const [expandAllNodes, setExpandAllNodes] = useState<boolean>(expandAll);
  const node = initialState.node as INodeTree;

  const onExpandNodes = useCallback(() => {
    const labelDoc = document.getElementById(`children_${data.id}`);
    if (labelDoc) setExpandAllNodes((expandAllNodes) => !expandAllNodes);
    else setExpandAllNodes(true);
  }, [data.id]);

  return (
    <OrgTreeContainer horizontal={horizontal}>
      <OrgTree horizontal={horizontal}>
        <TreeNode
          data={data}
          horizontal={horizontal}
          node={node}
          onExpandNodes={onExpandNodes}
          collapsable={collapsable}
          expandAll={expandAllNodes}
          onClick={(e, nodeData) => onClick && onClick(e, nodeData)}
          {...props}
        />
      </OrgTree>
    </OrgTreeContainer>
  );
};
