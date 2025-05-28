import React, { useState, useEffect } from 'react';
import { Edit2, Check, X, Plus, Moon, Sun, Filter } from 'lucide-react';

const EnhancedTodoApp = () => {
  // State management
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React hooks', completed: false },
    { id: 2, text: 'Build a todo app', completed: true },
    { id: 3, text: 'Practice coding daily', completed: false }
  ]);
  const [newTask, setNewTask] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [filter, setFilter] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Note: In a real app, you'd use localStorage here
  // localStorage is not available in Claude artifacts
  useEffect(() => {
    // In a real implementation, you'd check localStorage:
    // const savedTheme = localStorage.getItem('theme');
    // if (savedTheme) setIsDarkMode(savedTheme === 'dark');
  }, []);

  // Add new task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask.trim(),
        completed: false
      }]);
      setNewTask('');
    }
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Toggle completion
  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Start editing
  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  // Save edit
  const saveEdit = () => {
    if (editText.trim()) {
      setTasks(tasks.map(task =>
        task.id === editingId ? { ...task, text: editText.trim() } : task
      ));
    }
    setEditingId(null);
    setEditText('');
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true; // 'all'
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    // In a real app: localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  // Handle Enter key
  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800'
    }`}>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Enhanced To-Do List
          </h1>
          <button
            onClick={toggleDarkMode}
            className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
              isDarkMode 
                ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400' 
                : 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
            }`}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Add Task Section */}
        <div className={`p-6 rounded-2xl shadow-lg mb-8 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex gap-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, addTask)}
              placeholder="Add a new task..."
              className={`flex-1 px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border-gray-200 text-gray-800 placeholder-gray-500'
              }`}
            />
            <button
              onClick={addTask}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
            >
              <Plus size={20} />
              Add
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className={`p-4 rounded-2xl shadow-lg mb-6 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <Filter size={18} className="text-blue-500" />
            <span className="font-semibold">Filter Tasks:</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {[
              { key: 'all', label: 'All', count: tasks.length },
              { key: 'pending', label: 'Pending', count: tasks.filter(t => !t.completed).length },
              { key: 'completed', label: 'Completed', count: tasks.filter(t => t.completed).length }
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  filter === key
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : isDarkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>
        </div>

        {/* Tasks List */}
        <div className={`rounded-2xl shadow-lg overflow-hidden ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          {filteredTasks.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">📝</div>
              <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {filter === 'all' ? 'No tasks yet. Add one above!' :
                 filter === 'completed' ? 'No completed tasks.' :
                 'No pending tasks. Great job!'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTasks.map((task, index) => (
                <div
                  key={task.id}
                  className={`p-4 transition-all duration-300 hover:scale-[1.02] ${
                    isDarkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Completion Checkbox */}
                    <button
                      onClick={() => toggleComplete(task.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                        task.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : isDarkMode
                            ? 'border-gray-500 hover:border-green-400'
                            : 'border-gray-300 hover:border-green-500'
                      }`}
                    >
                      {task.completed && <Check size={14} />}
                    </button>

                    {/* Task Content */}
                    <div className="flex-1">
                      {editingId === task.id ? (
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyPress={(e) => handleKeyPress(e, saveEdit)}
                          onBlur={saveEdit}
                          className={`w-full px-3 py-2 rounded border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            isDarkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-800'
                          }`}
                          autoFocus
                        />
                      ) : (
                        <span
                          className={`text-lg transition-all duration-300 ${
                            task.completed
                              ? 'line-through text-gray-500'
                              : isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}
                        >
                          {task.text}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {editingId === task.id ? (
                        <>
                          <button
                            onClick={saveEdit}
                            className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900 rounded-lg transition-colors"
                            title="Save"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                            title="Cancel"
                          >
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(task.id, task.text)}
                            className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <X size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats Footer */}
        {tasks.length > 0 && (
          <div className={`mt-6 p-4 rounded-2xl shadow-lg text-center ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="flex justify-around text-sm">
              <div>
                <span className="font-semibold text-blue-500">{tasks.length}</span>
                <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Total</div>
              </div>
              <div>
                <span className="font-semibold text-green-500">
                  {tasks.filter(t => t.completed).length}
                </span>
                <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Completed</div>
              </div>
              <div>
                <span className="font-semibold text-orange-500">
                  {tasks.filter(t => !t.completed).length}
                </span>
                <div className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Pending</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedTodoApp;