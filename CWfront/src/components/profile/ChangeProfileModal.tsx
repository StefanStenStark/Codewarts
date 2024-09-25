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
      <div className="flex justify-center items-center">
        <button onClick={openModal} className="text-white rounded">
          <img
            src={`./avatar${currentProfile}.webp`}
            alt="Profile"
            className="w-[150px] h-[150px] border-2 border-yellow-500 rounded-b-[45%] object-cover shadow-[0_0_15px_5px_rgba(255,215,0,0.6)]"
          />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-slate-400 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Update profile
            </h2>
            <input
              type="text"
              value={newName}
              onChange={handleNameChange}
              className="border border-gray-300 p-2 rounded-lg w-full bg-white text-black"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {[1, 2, 3, 4, 5, 6, 7].map((index) => (
                <div
                  key={index}
                  className="relative cursor-pointer"
                  onClick={() => handleAvatarSelect(index)}
                >
                  <img
                    src={`./avatar${index}.webp`}
                    className={`w-[150px] h-[150px] border-4 border-yellow-500 rounded-b-[45%] object-cover ${
                      avatar === index ? "border-blue-500" : ""
                    }`}
                    alt={`Profile ${index}`}
                  />
                  {avatar === index && (
                    <div
                      className="absolute inset-0 border-4 border-yellow-500 rounded-b-[45%] pointer-events-none"
                      style={{
                        boxShadow: "0 0 15px 5px rgba(255, 215, 0, 0.7)", // Golden glow effect
                      }}
                    ></div>
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
