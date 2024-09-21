import React, { useState } from "react";

export default function ChangeProfileModal({
  currentName,
  currentProfile,
  onSave,
}: {
  currentName: string;
  currentProfile: number;
  onSave: (newName: string, newAvatar: number) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState(currentName);
  const [avatar, setAvatar] = useState(currentProfile);

  const openModal = () => {
    setNewName(currentName);
    setAvatar(currentProfile);
    setIsModalOpen(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  const saveName = () => {
    onSave(newName, avatar);
    setIsModalOpen(false);
  };

  const handleAvatarSelect = (index: number) => {
    setAvatar(index);
  };

  return (
    <>
      <button onClick={openModal}>Edit</button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-slate-400 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Name</h2>
            <input
              type="text"
              value={newName}
              onChange={handleNameChange}
              className="border border-gray-300 p-2 rounded-lg w-full bg-white text-black"
            />
            <div className="flex space-x-4 mt-4">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer ${
                    avatar === index ? "border-4 border-blue-500" : ""
                  }`}
                  onClick={() => handleAvatarSelect(index)}
                >
                  <img
                    src={`./Avatar${index}.png`}
                    className="w-[150px] h-[150px] border border-gray-300"
                    alt={`Profile ${index}`}
                  />
                  {avatar === index && (
                    <div className="absolute inset-0 flex items-center justify-center bg-blue-500 bg-opacity-30 rounded-lg text-white text-xl font-bold">
                      Selected
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={saveName}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 py-2 px-4 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
