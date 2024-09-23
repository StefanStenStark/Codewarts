import { useState } from "react";

export default function Talent() {
  const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]); // Track selected skills
  const maxSelections = 3; // Define maximum number of skills that can be selected

  // Open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal and save state
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Toggle skill selection in the array
  const toggleSkill = (skillId: string) => {
    if (selectedSkills.includes(skillId)) {
      // Deselect skill if already selected
      setSelectedSkills(selectedSkills.filter((skill) => skill !== skillId));
    } else if (selectedSkills.length < maxSelections) {
      // Add skill if not already selected and within limit
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };

  // Check if a skill can be selected based on prerequisites
  const canSelectSkill = (prerequisiteSkillId?: string) => {
    if (!prerequisiteSkillId) return true; // No prerequisite, can select
    return selectedSkills.includes(prerequisiteSkillId); // Ensure prerequisite is selected
  };

  return (
    <>
      {/* Button to open the modal */}
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-600 h-40 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 flex justify-center items-center"
      >
        Magic skills
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-slate-400 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Select Skills</h2>
            <h3>
              You have {maxSelections - selectedSkills.length} skill points
              remaining
            </h3>

            {/* Skill checkboxes */}
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
                disabled={!canSelectSkill("heart1")}
                checked={selectedSkills.includes("heart2")}
                onChange={() => toggleSkill("heart2")}
                className="mr-2"
              />
              <label
                className={`${
                  !canSelectSkill("heart1") ? "text-gray-500" : "text-black"
                }`}
              >
                Heart 2
              </label>
            </div>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                disabled={!canSelectSkill("heart2")}
                checked={selectedSkills.includes("heart3")}
                onChange={() => toggleSkill("heart3")}
                className="mr-2"
              />
              <label
                className={`${
                  !canSelectSkill("heart2") ? "text-gray-500" : "text-black"
                }`}
              >
                Heart 3
              </label>
            </div>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                disabled={!canSelectSkill("heart3")}
                checked={selectedSkills.includes("heart4")}
                onChange={() => toggleSkill("heart4")}
                className="mr-2"
              />
              <label
                className={`${
                  !canSelectSkill("heart3") ? "text-gray-500" : "text-black"
                }`}
              >
                Heart 4
              </label>
            </div>

            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                disabled={!canSelectSkill("heart4")}
                checked={selectedSkills.includes("heart5")}
                onChange={() => toggleSkill("heart5")}
                className="mr-2"
              />
              <label
                className={`${
                  !canSelectSkill("heart4") ? "text-gray-500" : "text-black"
                }`}
              >
                Heart 5
              </label>
            </div>

            {/* Modal action buttons */}
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
                onClick={closeModal}
              >
                Save
              </button>
              <button
                className="bg-gray-300 py-2 px-4 rounded-lg"
                onClick={closeModal}
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
