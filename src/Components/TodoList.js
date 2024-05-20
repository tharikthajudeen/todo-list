import React, { useState, useEffect } from 'react'; // Importing necessary hooks from React
import TodoItem from './TodoItem'; // Importing the TodoItem component for individual todo items
import { TransitionGroup, CSSTransition } from 'react-transition-group'; // Importing components for handling transitions and animations
import '../index'; // Importing base styles for the component
import '../animations.css'; // Importing CSS for animations
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

function TodoList() {
  // State for managing the list of todos, initialized from local storage if available, otherwise as an empty array
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos'); // Retrieve todos from local storage
    return storedTodos ? JSON.parse(storedTodos) : []; // Parse the stored todos or return an empty array if none exist
  });

  // State for managing the input value for new todo items
  const [input, setInput] = useState('');

  // State for managing the due date of new todo items
  const [dueDate, setDueDate] = useState('');

  // State for managing the priority of new todo items
  const [priority, setPriority] = useState('');

  // State for managing dark mode toggle
  const [darkMode, setDarkMode] = useState(false);

  // State for managing the filter criteria (all, active, completed)
  const [filter, setFilter] = useState('all');

  // State for managing the sort criteria (by due date, by priority)
  const [sortCriteria, setSortCriteria] = useState('');

  // Effect to save todos to local storage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos)); // Save todos to local storage as a JSON string
  }, [todos]); // Only run this effect when the `todos` state changes

  // Effect to toggle the dark mode class on the body element whenever darkMode state changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark'); // Add 'dark' class to body if darkMode is true
    } else {
      document.body.classList.remove('dark'); // Remove 'dark' class from body if darkMode is false
    }
  }, [darkMode]); // Only run this effect when the `darkMode` state changes

  // Function to add a new todo item to the list
  const addTodo = () => {
    if (input.trim() !== '') { // Check if the input is not just whitespace
      setTodos([...todos, { text: input, isCompleted: false, dueDate, priority }]); // Add the new todo item to the state
      setInput(''); // Clear the input field
      setDueDate(''); // Clear the due date field
      setPriority(''); // Clear the priority field
    }
  };

  // Function to delete a todo item from the list
  const deleteTodo = (index) => {
    const newTodos = [...todos]; // Create a copy of the current list of todos
    newTodos.splice(index, 1); // Remove the todo item at the specified index
    setTodos(newTodos); // Update the state with the new list
  };

  // Function to toggle the completion status of a todo item
  const toggleComplete = (index) => {
    const newTodos = [...todos]; // Create a copy of the current list of todos
    newTodos[index].isCompleted = !newTodos[index].isCompleted; // Toggle the completion status of the todo item at the specified index
    setTodos(newTodos); // Update the state with the new list
  };

  // Function to edit the text of a todo item
  const editTodo = (index, newText) => {
    const newTodos = [...todos]; // Create a copy of the current list of todos
    newTodos[index].text = newText; // Update the text of the todo item at the specified index
    setTodos(newTodos); // Update the state with the new list
  };

  // Function to toggle the dark mode state
  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Toggle the darkMode state between true and false
  };

  // Filter the todos based on the current filter state
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true; // Show all todos if filter is 'all'
    if (filter === 'active') return !todo.isCompleted; // Show only active (not completed) todos if filter is 'active'
    if (filter === 'completed') return todo.isCompleted; // Show only completed todos if filter is 'completed'
    return true; // Default case (shouldn't be reached)
  });

  // Sort the filtered todos based on the current sort criteria
  const sortedTodos = filteredTodos.sort((a, b) => {
    if (sortCriteria === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate); // Sort by due date (earliest first)
    }
    if (sortCriteria === 'priority') {
      return a.priority - b.priority; // Sort by priority (lowest number first)
    }
    return 0; // Default case (no sorting)
  });

  return (
    <div className={`max-w-2xl  mx-10 md:mx-auto  my-[20px] p-6 border rounded-lg shadow-lg ${darkMode ? 'bg-darkBrown opacity-95 text-white' : 'bg-lightBrown text-black'} transition-colors duration-300`}>
      {/* Container for the todo list, with dynamic classes for dark mode */}

      <div className='flex justify-between items-baseline mb-2'>
        <h2 className="text-center text-2xl font-bold mb-6">Todo List</h2>
        {/* Heading for the todo list */}

        <button className={`mb-2 p-3 text-2xl rounded ${darkMode ? ' text-white' : ' text-black'}`}
         onClick={toggleDarkMode}>
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="mr-2" />
        </button>
      </div>

      <input
        type="text"
        value={input}
        className={`w-full p-3 border rounded mb-4 ${darkMode ? 'bg-white opacity-35 text-black' : 'bg-white opacity-50 text-black'}`}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo..."
      />
      {/* Input field for entering new todo text */}

      <input
        type="date"
        value={dueDate}
        className={`w-full p-3 border rounded mb-4 ${darkMode ? 'bg-white opacity-35 text-black' : 'bg-white opacity-50 text-black'}`}
        onChange={(e) => setDueDate(e.target.value)}
        min={new Date().toISOString().split('T')[0]} // Set the min attribute to today's date
      />

      {/* Input field for entering due date */}

      <input
        type="number"
        value={priority}
        className={`w-full p-3 border rounded mb-4 ${darkMode ? 'bg-white opacity-35 text-black' : 'bg-white opacity-50 text-black'}`}
        onChange={(e) => {
          const value = e.target.value;
          if (value === '' || (Number(value) >= 1 && Number(value) <= 5)) {
            setPriority(value);
          }
        }}
        placeholder="Priority (1-5)"
        min="1"
        max="5"
      />
      {/* Input field for entering priority */}

      <button
        className={`w-full p-3 mb-6 ${darkMode ? 'bg-darkbg' : 'bg-lightbg'} text-white rounded hover:bg-white hover:opacity-50 hover:text-black`}
        onClick={addTodo}>
        Add Todo
      </button>
      {/* Button to add new todo item */}

      <div className="flex justify-around mb-6">
        {/* Filter buttons for showing all, active, or completed todos */}
        <button className={`p-3 ${filter === 'all' ? 'font-bold' : ''}`} onClick={() => setFilter('all')}>
          All
        </button>
        <button className={`p-3 ${filter === 'active' ? 'font-bold' : ''}`} onClick={() => setFilter('active')}>
          Active
        </button>
        <button className={`p-3 ${filter === 'completed' ? 'font-bold' : ''}`} onClick={() => setFilter('completed')}>
          Completed
        </button>
      </div>

      <div className="flex justify-around mb-6">
        {/* Sort buttons for sorting by due date or priority */}
        <button className={`p-3 ${sortCriteria === 'dueDate' ? 'font-bold' : ''}`} onClick={() => setSortCriteria('dueDate')}>
          Sort by Due Date
        </button>
        <button className={`p-3 ${sortCriteria === 'priority' ? 'font-bold' : ''}`} onClick={() => setSortCriteria('priority')}>
          Sort by Priority
        </button>
      </div>

      <TransitionGroup className="space-y-4">
        {/* Transition group to handle animations for the list of todos */}
        {sortedTodos.map((todo, index) => (
          <CSSTransition key={index} timeout={500} classNames="fade">
            {/* CSSTransition for animating individual todo items */}
            <TodoItem
              key={index}
              text={todo.text}
              isCompleted={todo.isCompleted}
              dueDate={todo.dueDate}
              priority={todo.priority}
              onDelete={() => deleteTodo(index)}
              onToggleComplete={() => toggleComplete(index)}
              onEdit={(newText) => editTodo(index, newText)}
              darkMode={darkMode} // Pass darkMode state to TodoItem
            />
            {/* TodoItem component with props for handling todo item actions and dark mode */}
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}

export default TodoList;
