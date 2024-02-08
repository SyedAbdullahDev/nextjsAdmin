// ColorTable.tsx

import React from 'react';
import './cars.scss';

interface Color {
  id: string;
  name: string;
}

interface ColorTableProps {
  colors: Color[];
}

const ColorTable: React.FC<ColorTableProps> = ({ colors }) => {
  return (
    <table className="color-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {colors.map((color) => (
          <tr key={color.id}>
            <td>{color.id}</td>
            <td>{color.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ColorTable;
