import React, { useState } from 'react'; // Importing necessary hooks from React

function TodoItem({ text, onDelete, onToggleComplete, onEdit, isCompleted, darkMode, dueDate, priority }) {
  // State to track if the item is being edited
  const [isEditing, setIsEditing] = useState(false);

  // State to track the text being edited
  const [editText, setEditText] = useState(text);

  // Function to handle editing the text of the todo item
  const handleEdit = () => {
    onEdit(editText); // Call the onEdit function passed as a prop with the new text
    setIsEditing(false); // Exit editing mode
  };

  return (
    <div className={`flex justify-between items-center p-4 border rounded-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
      {/* Container for the todo item with conditional styling based on darkMode prop */}

      {isEditing ? (
        // If the item is in editing mode, render an input field
        <input
          type="text"
          value={editText} // Controlled component tied to editText state
          className={`flex-grow p-2 ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`} // Conditional styling based on darkMode
          onChange={(e) => setEditText(e.target.value)} // Update editText state on change
          onBlur={handleEdit} // Save changes when the input loses focus
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleEdit(); // Save changes when Enter key is pressed
          }}
        />
      ) : (
        // If the item is not in editing mode, render the todo text
        <div className={`flex-grow ${isCompleted ? 'line-through text-gray-500' : ''}`} onDoubleClick={() => setIsEditing(true)}>
          {/* Apply line-through style if the item is completed */}
          <span>{text}</span> {/* Display the text of the todo item */}
          <span className="ml-2 text-sm">{dueDate}</span> {/* Display the due date */}
          <span className="ml-2 text-sm">Priority: {priority}</span> {/* Display the priority */}
        </div>
      )}

      <div className="flex-shrink-0 ml-4">
        {/* Container for the action buttons */}
        
        <button
          className={`mr-2 p-2 rounded ${isCompleted ? 'bg-yellow-500' : 'bg-green-500'} text-white hover:bg-green-600`}
          onClick={onToggleComplete}>
          {/* Button to toggle completion status */}
          {isCompleted ? 'Undo' : 'Complete'} {/* Display 'Undo' if completed, otherwise 'Complete' */}
        </button>

        <button
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
          onClick={onDelete}>
          {/* Button to delete the todo item */}
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
