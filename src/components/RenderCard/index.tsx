import React, { useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { isLastNode } from '..';
import { useDebounce } from '../../hooks/useDebounce';
import { INestedObject } from '../../interfaces';
import { IRenderCard } from '../interfaces';
import { RenderBtn } from '../RenderBtn';
import { CardArea, RenderLabel, StyledLabel, RenderCustomCard } from './styles';
import { useIndex } from '../../context/IndexContextProvider';
import { useHierarchyData } from '../../context/HierarchyContextProvider';

export const RenderCard = ({
  data,
  setExpand,
  expand,
  mock,
  root,
  prop: { renderCard, ...prop },
  hierarchyProps,
}: IRenderCard) => {
  const { hierarchyRef, draggingItemRef } = hierarchyProps;
  const {
    editById,
    isDirectChild,
    isParent,
    findParentByChildId,
    findById,
    updateTree,
  } = useHierarchyData();
  const { index } = useIndex();

  const node = prop.node;
  const label = data[node.label];
  const clx = ['org-tree-node-label-inner'];

  if (mock) {
    clx.push('mock_card');
  }

  const onAppendMock = (id: number | string, label: string) => {
    // add renderNode if has already children inside
    const componentChildren = document.getElementById(`children_${id}`);
    if (componentChildren) {
      const elementMockLabel = document.getElementById(`label_text_mock`);
      const elementMockNode = document.getElementById(`node-tree-mock`);

      if (!elementMockLabel) return;
      if (!elementMockNode) return;

      elementMockLabel.innerText = label;

      elementMockNode.style.display = 'table-cell';
      elementMockNode.id = `node-tree-mock-clone`;
      const elementMockNodeClone = elementMockNode?.cloneNode(true);
      elementMockNode.style.display = 'none';
      elementMockNode.id = `node-tree-mock`;

      const elementMockNodeLastChild = elementMockNodeClone.lastChild;
      elementMockNodeLastChild &&
        elementMockNodeClone.removeChild(elementMockNodeLastChild);

      componentChildren.appendChild(elementMockNodeClone);
      return;
    }

    // add renderChildrenNode if does not have children inside
    const componentNode = document.getElementById(`node-tree-${id}`);
    if (componentNode) {
      const elementMockLabel = document.getElementById(`label_text_child_mock`);
      const componentMockChildren = document.getElementById(`children_mock`);

      if (!elementMockLabel) return;
      if (!componentMockChildren) return;

      elementMockLabel.innerText = label;

      const oldMockId = componentMockChildren.id;
      componentMockChildren.id = `node-tree-mock-clone`;
      const componentMockChildrenClone = componentMockChildren?.cloneNode(true);
      componentMockChildren.id = oldMockId;

      componentNode.appendChild(componentMockChildrenClone);
    }
  };

  const onRemoveMock = () => {
    const componentCloneMock = document.getElementById(`node-tree-mock-clone`);
    componentCloneMock && componentCloneMock.remove();
  };

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'box',
      item: { ...data, treeIndex: index },
      options: {
        dropEffect: 'copy',
      },
      canDrag: () => !root,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  );

  useEffect(() => {
    const labelDoc = document.getElementById(`node-tree-${data.id}`);
    if (!labelDoc) return;

    // labelDoc.style.opacity = isDragging ? '0.5' : '1';

    const LabelClassName = labelDoc.className;

    labelDoc.className = isDragging
      ? labelDoc.className + ' RdtCant-drop'
      : LabelClassName.replace(' RdtCant-drop', '');

    draggingItemRef.current = data;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  const onDragEnter = (dropId: string | number) => {
    let dragLabel = 'Place here';
    if (draggingItemRef.current) {
      const {
        id: dragItemId,
        treeIndex: dragItemIndex,
      } = draggingItemRef.current;
      const canDrop =
        index !== dragItemIndex ||
        (dragItemId !== data.id &&
          !isDirectChild(index, data.id, dragItemId, hierarchyRef.current) &&
          !isParent(index, dragItemId, data.id, hierarchyRef.current));
      dragLabel = draggingItemRef.current.label;
      if (!canDrop) return;
    }
    onAppendMock(dropId, dragLabel);
  };

  const onDragLeave = () => {
    onRemoveMock();
  };

  const onDrop = (drag: INestedObject) => {
    const dragIndex = drag.treeIndex;

    const dragItem = findById(dragIndex, drag.id);
    const dropItem = data;

    const isSameTree = dragIndex === index;

    const result = findParentByChildId(dragIndex, drag.id);
    const { parent: parentDragItem } = result;

    if (parentDragItem && dragItem) {
      const newParent = {
        ...parentDragItem,
        children: [...parentDragItem.children.filter((i) => i.id !== drag.id)],
      };

      const removedDragItemHierarchy = editById(
        dragIndex,
        parentDragItem.id,
        newParent,
        'replace'
      );

      const addedDragItemHierarchy = editById(
        index,
        dropItem.id,
        {
          children: [dragItem],
        },
        'add',
        isSameTree ? removedDragItemHierarchy : undefined
      );

      if (!isSameTree) updateTree(dragIndex, removedDragItemHierarchy);

      updateTree(index, addedDragItemHierarchy);

      const oldRelationship = { parent: parentDragItem.id, child: dragItem.id };
      const newRelationship = { parent: dropItem.id, child: dragItem.id };
      prop.onChange &&
        prop.onChange(addedDragItemHierarchy, {
          oldRelationship,
          newRelationship,
        });
    }
  };

  const { onDebounce } = useDebounce(onDragEnter, 300);

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: 'box',
      canDrop: (item: INestedObject) =>
        index !== item.treeIndex ||
        (data.id !== item.id &&
          !isDirectChild(index, data.id, item.id, hierarchyRef.current) &&
          !isParent(index, item.id, data.id, hierarchyRef.current)),
      drop: (drag: INestedObject) => onDrop(drag),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    []
  );

  useEffect(() => {
    if (isOver) onDebounce(data.id);
    else onDragLeave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOver]);

  return (
    <CardArea
      id={`label_${data.id}`}
      key={`label_${data.id}`}
      horizontal={!!prop.horizontal}
      className={'org-tree-node-label'}
      ref={drop}
      onClick={(e) =>
        typeof prop.onClick === 'function' && prop.onClick(e, data)
      }
    >
      {renderCard ? (
        <RenderCustomCard key={`label_inner_${data.id}`} ref={drag}>
          {renderCard({
            isDragging,
            label,
            labelId: `label_text_${data.id}`,
            data,
            isPreviewCard: !!mock,
            isOver,
            canDrop,
          })}
          {prop.collapsable && !isLastNode(data, prop) && (
            <RenderBtn
              setExpand={setExpand}
              expand={expand}
              data={data}
              prop={prop}
            />
          )}
        </RenderCustomCard>
      ) : (
        <RenderLabel
          key={`label_inner_${data.id}`}
          ref={drag}
          isDragging={isDragging}
          className={clx.join(' ')}
          style={{ ...prop.cardStyle, ...data.style }}
        >
          <StyledLabel id={`label_text_${data.id}`}>{label}</StyledLabel>
          {prop.collapsable && !isLastNode(data, prop) && (
            <RenderBtn
              setExpand={setExpand}
              expand={expand}
              data={data}
              prop={prop}
            />
          )}
        </RenderLabel>
      )}
    </CardArea>
  );
};
