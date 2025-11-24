import React from 'react';

interface Props {
  id: string;
  data: { text: string };
  onUpdate: (id: string, data: any) => void;
  onRemove: () => void;
}

const NotesWidget: React.FC<Props> = ({ id, data, onUpdate, onRemove }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: 16, margin: 8, borderRadius: 8 }}>
      <h3>Notes</h3>
      <textarea
        rows={6}
        style={{ width: '100%' }}
        value={data?.text || ''}
        onChange={(e) => onUpdate(id, { text: e.target.value })}
      />
      <button onClick={onRemove}>Remove</button>
    </div>
  );
};

export default NotesWidget;