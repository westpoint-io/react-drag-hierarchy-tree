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
  label: 'President',
  children: [
    {
      id: 36712963,
      label: 'dhskhdkashd',
      children: [],
    },
  ],
};

const App = () => {
  return (
    <div>
      <OrgTreeComponent
        data={[{ ...data1 }]}
        collapsable={false}
        renderCard={({ label, canDrop }) => (
          <div style={{ padding: 30, background: canDrop ? 'red' : 'beige' }}>
            {label}
          </div>
        )}
        // cardStyle={{ fontSize: 1 }}
        // strokeColor={'red'}
        // strokeWidth={'1px'}
        // buttonBackgroundColor={'red'}
        // buttonBorderColor={'red'}
        // renderButton={({ isCollapsed, onClick }) => (
        //   <button onClick={onClick}>
        //     {isCollapsed ? 'expand' : 'colapse'}
        //   </button>
        // )}
        // renderCard={({ isDragging, label, labelId, data, isPreviewCard }) => (
        //   <div style={{ backgroundColor: 'green' }}>
        //     <span id={labelId}>{label}</span>
        //     {!isPreviewCard && <p>{data.id}</p>}
        //     <button>click</button>
        //   </div>
        // )}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
