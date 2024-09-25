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

  const houseNames = ["Ice wind", "Silver mane", "Satya"];

  return (
    <>
      <div className="flex justify-center items-center">
        <button onClick={openModal}>
          <img
            src={`./${currenHouse}.jpg`}
            alt="House emblem"
            className="w-[150px] h-[150px] border-2 border-yellow-500 rounded-b-[45%] object-cover shadow-[0_0_15px_5px_rgba(255,215,0,0.6)]"
          />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-slate-400 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Select House
            </h2>

            <div className="flex space-x-4 mt-4 flex-wrap">
              {houseNames.map((houseName) => (
                <div
                  key={houseName}
                  className="relative cursor-pointer"
                  onClick={() => handleHouseSelect(houseName)}
                >
                  <img
                    src={`./${houseName}.jpg`}
                    className={`w-[150px] h-[150px] border-4 border-yellow-500 rounded-b-[45%] object-cover ${
                      house === houseName ? "border-blue-500" : ""
                    }`}
                    alt={houseName}
                  />
                  {house === houseName && (
                    <div
                      className="absolute inset-0 border-4 border-yellow-500 rounded-b-[45%] pointer-events-none"
                      style={{
                        boxShadow: "0 0 15px 5px rgba(255, 215, 0, 0.7)",
                      }}
                    ></div>
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
