import * as React from 'react';
import * as ReactDOM from 'react-dom';

import OrgTreeComponent, { useTree } from '../src';
import { data } from './utils/data';

const data1 = {
  id: 1,
  label: 'President',
  children: [
    {
      id: 2,
      label: 'Administrative',
      children: [
        {
          id: 4,
          label: 'Manager',
          children: [
            {
              id: 5,
              label: 'Office 1',
              children: [],
            },
          ],
        },
        {
          id: 6,
          label: 'Financial',
          children: [
            {
              id: 7,
              label: 'Accountant',
              children: [
                {
                  id: 10,
                  label: 'Office 4',
                  children: [],
                },
              ],
            },
            {
              id: 11,
              label: 'Office 5',
              children: [],
            },
            {
              id: 12,
              label: 'Office 6',
              children: [],
            },
          ],
        },
      ],
    },
  ],
};

const data2 = {
  id: 1,
  label: 'Parent',
  children: [
    {
      id: 36712963,
      label: 'Child',
      children: [
        {
          id: 4341,
          label: 'GrandChild',
          children: [
            {
              id: 36714234232963,
              label: 'GrandGrandChild',
              children: [],
            },
          ],
        },
      ],
    },
  ],
};

const App = () => {
  const { treeRef } = useTree();

  return (
    <div>
      <OrgTreeComponent
        ref={treeRef}
        data={[{ ...data1 }, { ...data2 }]}
        collapsable={false}
        renderCard={({ label, canDrop }) => (
          <div style={{ padding: 30, background: canDrop ? 'red' : 'beige' }}>
            {label}
          </div>
        )}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
