import React, { useState } from 'react';

interface Todo { text: string; done: boolean; }

interface Props {
  id: string;
  data: { items: Todo[] };
  onUpdate: (id: string, data: any) => void;
  onRemove: () => void;
}

const TodoWidget: React.FC<Props> = ({ id, data, onUpdate, onRemove }) => {
  const [input, setInput] = useState('');
  const items = data?.items || [];

  const add = () => {
    if (!input.trim()) return;
    onUpdate(id, { items: [...items, { text: input, done: false }] });
    setInput('');
  };

  const toggle = (i: number) => {
    const newItems = [...items];
    newItems[i].done = !newItems[i].done;
    onUpdate(id, { items: newItems });
  };

  const remove = (i: number) => {
    onUpdate(id, { items: items.filter((_, idx) => idx !== i) });
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 16, margin: 8, borderRadius: 8 }}>
      <h3>Todo List</h3>
      <div>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && add()} />
        <button onClick={add}>Add</button>
      </div>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            <input type="checkbox" checked={item.done} onChange={() => toggle(i)} />
            <span style={{ textDecoration: item.done ? 'line-through' : 'none' }}>{item.text}</span>
            <button onClick={() => remove(i)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={onRemove}>Remove Widget</button>
    </div>
  );
};

export default TodoWidget;