import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Edit2, Check, X } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo.trim(), completed: false }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (editText.trim() && editingId) {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editText.trim() } : todo
      ));
      setEditingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4 ">
      <div className="max-w-lg mx-auto  my-auto bg-white border  border-gray-200 rounded shadow-sm">
        <div className="border-b border-gray-200 bg-gray-900 px-6 py-4">
          <h1 className="text-2xl font-semibold text-white">Todo List</h1>
        </div>
        
        <div className="p-6 bg-stone-200">
          <form onSubmit={addTodo} className="flex gap-3 mb-8">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded text-gray-800 placeholder-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2 transition-colors"
            >
              <PlusCircle size={20} />
              <span>Add</span>
            </button>
          </form>

          <div className="space-y-2">
            {todos.map(todo => (
              <div
                key={todo.id}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  className="w-5 h-5 border-gray-300 rounded text-black-600 focus:ring-black-500"
                />
                
                {editingId === todo.id ? (
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:border-black-500 focus:ring-1 focus:ring-black-500"
                    />
                    <button
                      onClick={saveEdit}
                      className="p-1 text-green-600 hover:text-green-700"
                      title="Save"
                    >
                      <Check size={20} />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="p-1 text-red-600 hover:text-red-700"
                      title="Cancel"
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <>
                    <span className={`flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                      {todo.text}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => startEdit(todo)}
                        className="p-1 text-gray-500 hover:text-black-600"
                        title="Edit"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="p-1 text-gray-500 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          
          {todos.length === 0 && (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded border border-dashed border-gray-300">
              Your todo list is empty. Add a new task above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;