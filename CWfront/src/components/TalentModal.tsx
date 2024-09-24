import { useState } from "react";
import { updateUser } from "../data/Api";
import { User } from "../data/types";
import "../styles/customCheckbox.css";

export default function TalentModal({
  user,
  onSave,
}: {
  user: User;
  onSave: (updatedUser: User) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const maxSelections = 3;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleSkill = (skillId: string) => {
    if (selectedSkills.includes(skillId)) {
      setSelectedSkills(selectedSkills.filter((skill) => skill !== skillId));
    } else if (selectedSkills.length < maxSelections) {
      setSelectedSkills([...selectedSkills, skillId]);
    }
  };

  const canSelectSkill = (prerequisiteSkillId?: string) => {
    if (!prerequisiteSkillId) return true;
    return selectedSkills.includes(prerequisiteSkillId);
  };

  const saveSkills = async () => {
    const hearts = selectedSkills.length;

    const updatedUser = {
      ...user,
      maximumHearts: hearts,
    };

    const success = await updateUser(user.id, updatedUser);
    if (success) {
      onSave(updatedUser);
      console.log("User skills updated successfully.");
    } else {
      console.error("Failed to update user skills.");
    }
    closeModal();
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <button
          onClick={openModal}
          className="bg-[rgba(255,255,255,0.11)] hover:bg-[rgb(90,114,118)] h-16 text-white font-bold py-2 px-8 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 flex justify-center items-center border border-white space-x-2 rounded-b-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
            />
          </svg>
          {maxSelections - selectedSkills.length}
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-slate-400 p-6 rounded-lg shadow-lg">
            <hr className="styled-hr" />
            <svg
              className="curly-border"
              viewBox="0 0 200 50"
              width="100%"
              height="50"
            >
              <path
                d="M 0 30 
        Q 0 -20, 20 30 
        Q 10 5, 40 30 
        Q 100 60, 160 30 
        Q 190 5, 170 30 
        Q 200 -20, 200 30"
                fill="none"
                stroke="white"
                strokeWidth="3"
              />
            </svg>
            <h2 className="text-xl font-semibold mb-4">Select Skills</h2>
            <h3>
              You have {maxSelections - selectedSkills.length} skill points
              remaining
            </h3>

            <div className="flex flex-row items-start">
              <div className="checkbox-background">
                <div className="flex flex-col items-start">
                  {["heart1", "heart2", "heart3", "heart4", "heart5"].map(
                    (heart, index) => (
                      <div className="checkbox-contatiner" key={heart}>
                        <input
                          type="checkbox"
                          className="round-checkbox"
                          checked={selectedSkills.includes(heart)}
                          disabled={
                            index > 0 && !canSelectSkill(`heart${index}`)
                          }
                          onChange={() => toggleSkill(heart)}
                        />
                        <img
                          src="./Heart.png"
                          className="img-heart"
                          alt="Heart"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="checkbox-background">
                <div className="flex flex-col items-start">
                  {[
                    "currage1",
                    "currage2",
                    "currage3",
                    "currage4",
                    "currage5",
                  ].map((currage, index) => (
                    <div className="checkbox-contatiner" key={currage}>
                      <input
                        type="checkbox"
                        className="round-checkbox"
                        checked={selectedSkills.includes(currage)}
                        disabled={
                          index > 0 && !canSelectSkill(`currage${index}`)
                        }
                        onChange={() => toggleSkill(currage)}
                      />
                      <img
                        src="./Heart.png"
                        className="img-heart"
                        alt="Heart"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="checkbox-background">
                <div className="flex flex-col items-start">
                  {["skill1", "skill2", "skill3", "skill4", "skill5"].map(
                    (skill, index) => (
                      <div className="checkbox-contatiner" key={skill}>
                        <input
                          type="checkbox"
                          className="round-checkbox"
                          checked={selectedSkills.includes(skill)}
                          disabled={
                            index > 0 && !canSelectSkill(`skill${index}`)
                          }
                          onChange={() => toggleSkill(skill)}
                        />
                        <img
                          src="./Heart.png"
                          className="img-heart"
                          alt="Heart"
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
                onClick={saveSkills}
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
