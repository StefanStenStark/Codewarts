import { useState } from "react";

export default function Talent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [maxSelections, setMaxSelections] = useState(3);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const toggleSkill = (skillId: string) => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(selectedSkills.filter((skill) => skill !== skillId));
    } else if (selectedSkills.length < maxSelections) {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };

  const canSelectSkill = (skillId: string, prerequisiteSkillId?: string) => {
    if (!prerequisiteSkillId) return true;
    return selectedSkills.includes(prerequisiteSkillId);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-600 h-40 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 flex justify-center items-center"
      >
        Magic skills
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-slate-400 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Select Skills</h2>
            <h3>You have {maxSelections} skill points</h3>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                checked={selectedSkills.includes("heart1")}
                onChange={() => toggleSkill("heart1")}
                className="mr-2"
              />
              <label className="text-black">Heart 1</label>
            </div>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                disabled={false}
                checked={selectedSkills.includes("heart2")}
                onChange={() => toggleSkill("heart2")}
                className="mr-2"
              />
              <label
                className={`${
                  !canSelectSkill("heart2", "heart1")
                    ? "text-gray-500"
                    : "text-black"
                }`}
              >
                Heart 2
              </label>
            </div>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                disabled={!canSelectSkill("heart3", "heart2")}
                checked={selectedSkills.includes("heart3")}
                onChange={() => toggleSkill("heart3")}
                className="mr-2"
              />
              <label
                className={`${
                  !canSelectSkill("heart3", "heart2")
                    ? "text-gray-500"
                    : "text-black"
                }`}
              >
                Heart 3
              </label>
            </div>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                disabled={!canSelectSkill("heart4", "heart3")}
                checked={selectedSkills.includes("heart4")}
                onChange={() => toggleSkill("heart4")}
                className="mr-2"
              />
              <label
                className={`${
                  !canSelectSkill("heart4", "heart3")
                    ? "text-gray-500"
                    : "text-black"
                }`}
              >
                Heart 4
              </label>
            </div>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                disabled={!canSelectSkill("heart5", "heart4")}
                checked={selectedSkills.includes("heart5")}
                onChange={() => toggleSkill("heart5")}
                className="mr-2"
              />
              <label
                className={`${
                  !canSelectSkill("heart5", "heart4")
                    ? "text-gray-500"
                    : "text-black"
                }`}
              >
                Heart 5
              </label>
            </div>

            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
                onClick={() => {
                  setIsModalOpen(false);
                }}
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
