import React, { useState } from 'react'; // Importing necessary hooks from React
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faUndo, faTrash } from '@fortawesome/free-solid-svg-icons';

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
    <div className={`flex justify-between items-center p-4 border rounded-lg ${darkMode ? 'bg-white opacity-35 text-black' : 'bg-white opacity-50 text-black'}`}>
      {/* Container for the todo item with conditional styling based on darkMode prop */}

      {isEditing ? (
        // If the item is in editing mode, render an input field
        <input
          type="text"
          value={editText} // Controlled component tied to editText state
          className={`flex-grow p-2 ${darkMode ? 'bg-white opacity-35 text-black' : 'bg-white opacity-50 text-black'}`} // Conditional styling based on darkMode
          onChange={(e) => setEditText(e.target.value)} // Update editText state on change
          onBlur={handleEdit} // Save changes when the input loses focus
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleEdit(); // Save changes when Enter key is pressed
          }}
        />
      ) : (
        // If the item is not in editing mode, render the todo text
        <div className={`felx flex-row md:flex-col ${isCompleted ? 'line-through text-black' : ''}`} onDoubleClick={() => setIsEditing(true)}>
          {/* Apply line-through style if the item is completed */}
          <span>{text}</span> {/* Display the text of the todo item */}
          <span className="ml-6 text-sm">{dueDate}</span> {/* Display the due date */}
          <span className="ml-6 text-sm">Priority: {priority}</span> {/* Display the priority */}
        </div>
      )}

      <div className="flex-shrink-0 ml-4">
        {/* Container for the action buttons */}
        
        <button
          className={`mr-2 p-2 rounded text-2xl ${isCompleted ? 'text-yellow-500' : 'text-green-500'}`}
          onClick={onToggleComplete}>
          <FontAwesomeIcon icon={isCompleted ? faUndo : faCheck} className="mr-2" />
          {/* Button to toggle completion status */}
        </button>

        <button
          className="text-red-500 text-2xl p-2 rounded"
          onClick={onDelete}>
          <FontAwesomeIcon className="mr-2" icon={faTrash}/>
          {/* Button to delete the todo item */}
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
