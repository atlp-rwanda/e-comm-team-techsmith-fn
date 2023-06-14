import React, { useState } from 'react';

const DeleteConfirmation = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = () => {
    
    setShowConfirmation(false);
  };

  return (
    <div>
      <button onClick={() => {return setShowConfirmation(true)}}>Delete Item</button>

      {showConfirmation && (
        <div className="confirmation-popup">
          <p>Are you sure you want to delete this item?</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => {return setShowConfirmation(false)}}>No</button>
        </div>
      )}
    </div>
  );
}

export default DeleteConfirmation;
