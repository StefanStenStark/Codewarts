import { useState } from "react";
import { updateUser } from "../../data/Api";
import { User } from "../../data/types";
import "../../styles/customCheckbox.css";

export default function TalentModal({
  user,
  onSave,
}: {
  user: User;
  onSave: (updatedUser: User) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const maxSelections = user.level;
  const svgPath =
    "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z";

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
      maximumHearts: hearts + 2,
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
          <div className="flex flex-col justify-between items-stretch p-6 bg-green-900 bg-center">
            <div className="  text-white font-bold px-8 flex justify-center items-center space-x-2 ">
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
            </div>

            <div className="flex flex-row items-start justify-between">
              <div>
                <div className="checkbox-background">
                  <div className="flex flex-col items-start">
                    <img
                      src={`./Ice wind.jpg`}
                      alt="House emblem"
                      className="w-[30px] h-[30px] mb-5 border-2 border-yellow-500 rounded-b-[45%] ml-1"
                    />
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
                          <svg
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <defs>
                              <linearGradient
                                id="gradient1"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                              >
                                <stop
                                  offset="0%"
                                  style={{ stopColor: "red", stopOpacity: 1 }}
                                />
                                <stop
                                  offset="100%"
                                  style={{
                                    stopColor: "orange",
                                    stopOpacity: 1,
                                  }}
                                />
                              </linearGradient>
                            </defs>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d={svgPath}
                              fill="url(#gradient1)"
                            />
                          </svg>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
              <div className="checkbox-background">
                <div className="flex flex-col items-start">
                  <img
                    src={`./Silver mane.jpg`}
                    alt="House emblem"
                    className="w-[30px] h-[30px] mb-5 border-2 border-yellow-500 rounded-b-[45%] ml-1"
                  />
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                        />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>

              <div className="checkbox-background">
                <div className="flex flex-col items-start">
                  <img
                    src={`./Satya.jpg`}
                    alt="House emblem"
                    className="w-[30px] h-[30px] mb-5 border-2 border-yellow-500 rounded-b-[45%] ml-1"
                  />
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
                        <svg
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <defs>
                            <linearGradient
                              id="gradient1"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="100%"
                            >
                              <stop
                                offset="0%"
                                style={{ stopColor: "red", stopOpacity: 1 }}
                              />
                              <stop
                                offset="100%"
                                style={{ stopColor: "orange", stopOpacity: 1 }}
                              />
                            </linearGradient>
                          </defs>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={svgPath}
                            fill="url(#gradient1)"
                          />
                        </svg>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-4">
              <button
                className="bg-[rgba(255,255,255,0.11)] hover:bg-[rgb(90,114,118)] h-12 text-white font-bold py-2 px-4 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 flex justify-center items-center border border-white rounded mr-2"
                onClick={saveSkills}
              >
                Save
              </button>
              <button
                className="bg-[rgba(255,255,255,0.11)] hover:bg-[rgb(90,114,118)] h-12 text-white font-bold py-2 px-4 shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 flex justify-center items-center border border-white rounded"
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
