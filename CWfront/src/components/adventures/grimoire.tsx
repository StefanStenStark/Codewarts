import { Adventure } from "../../data/types";

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
        <div className="modal-box bg-purple-950">
          <img src="/MagicWant.png" width={40} />
          <h3 className="font-bold text-2xl font-serif ms-6">
            {adventure.name}
          </h3>
          <p className="py-4 ms-6 me-6 mb-6">{adventure.documentation}</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
