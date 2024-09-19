import { Adventure } from "./adventureAPI";

interface GrimoireProps {
  adventure: Adventure;
}

export default function Grimoire({ adventure }: GrimoireProps) {
  const openModel = () => {
    (
      document.getElementById(`model_${adventure.id}`) as HTMLDialogElement
    )?.showModal();
  };

  return (
    <>
      <img
        src="./spellbook.png"
        width={50}
        className=""
        alt="spellbook"
        onClick={openModel}
      ></img>
      <dialog id={`model_${adventure.id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{adventure.name}</h3>
          <p className="py-4">{adventure.documentation}</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
