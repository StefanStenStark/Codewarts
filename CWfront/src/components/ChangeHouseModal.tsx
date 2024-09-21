import { useState } from "react";

export default function ChangeHouseModal({
  currenHouse,
  onSave,
}: {
  currenHouse: string;
  onSave: (newHouse: string) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [house, setHouse] = useState(currenHouse);

  const openModal = () => {
    setHouse(currenHouse);
    setIsModalOpen(true);
  };

  const saveHouse = () => {
    onSave(house);
    setIsModalOpen(false);
  };

  const handleHouseSelect = (selectedHouse: string) => {
    setHouse(selectedHouse);
  };

  const houseNames = ["GreenSalamanders", "House1", "House2"];

  return (
    <>
      <button onClick={openModal}>Edit</button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-slate-400 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Select House</h2>

            <div className="flex space-x-4 mt-4">
              {houseNames.map((houseName) => (
                <div
                  key={houseName}
                  className={`relative cursor-pointer ${
                    house === houseName ? "border-4 border-blue-500" : ""
                  }`}
                  onClick={() => handleHouseSelect(houseName)}
                >
                  <img
                    src={`./${houseName}.png`}
                    className="w-[150px] h-[150px] border border-gray-300"
                    alt={houseName}
                  />
                  {house === houseName && (
                    <div className="absolute inset-0 flex items-center justify-center bg-blue-500 bg-opacity-30 rounded-lg text-white text-xl font-bold">
                      Selected
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={saveHouse}
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
