import { useRef, useState } from "react";
import PlaygroundItem from "../components/PlaygroundItem";
import PhotoDetail from "../components/PhotoDetail";
import BoardExperiment from "../components/BoardExperiment";
import { BOARD_PHOTOS, BOARD_LAYOUTS } from "../data/playgroundBoard";
import "./Playground.css";

export default function Playground() {
  const [activeId, setActiveId] = useState(null);
  const [layout, setLayout] = useState(0);
  const triggerRef = useRef(null);
  const activeIndex = BOARD_PHOTOS.findIndex((photo) => photo.id === activeId);
  const notedIds = BOARD_PHOTOS.filter((photo) => photo.note?.trim()).slice(0, 2).map((photo) => photo.id);

  function openPhoto(photo, event) {
    triggerRef.current = event.currentTarget;
    setActiveId(photo.id);
  }

  function surpriseMe(event) {
    const photo = BOARD_PHOTOS[Math.floor(Math.random() * BOARD_PHOTOS.length)];
    openPhoto(photo, event);
  }

  return (
    <div className="playground-board-page">
      <header className="playground-board-heading">
        <div>
          <h1>Playground</h1>
          <p>things I noticed, saved, ate, made, and almost walked past</p>
        </div>
        <div className="playground-board-actions">
          <button type="button" className="playground-surprise" onClick={surpriseMe} aria-haspopup="dialog">
            surprise me <span aria-hidden="true">↗</span>
          </button>
          <button
            type="button"
            className="playground-shuffle"
            onClick={() => setLayout((value) => (value + 1) % BOARD_LAYOUTS.length)}
            aria-label="Shuffle board layout"
            aria-controls="playground-board"
          >
            shuffle <span aria-hidden="true">↻</span>
          </button>
        </div>
      </header>
      <section className="playground-interactive playground-board" id="playground-board" aria-label="Personal visual board">
          {BOARD_PHOTOS.map((photo, index) => (
            <PlaygroundItem
              key={photo.id}
              photo={photo}
              onOpen={openPhoto}
              position={BOARD_LAYOUTS[layout][index]}
              index={index}
              showNote={notedIds.includes(photo.id)}
            />
          ))}
          <aside className="board-collecting-note hand">still collecting little things ↗</aside>
          <BoardExperiment />
          <span className="playground-sr-only" role="status">Board arrangement {layout + 1} of {BOARD_LAYOUTS.length}</span>
      </section>
      {activeIndex !== -1 && (
        <PhotoDetail
          photos={BOARD_PHOTOS}
          index={activeIndex}
          onNavigate={(index) => setActiveId(BOARD_PHOTOS[index].id)}
          onClose={() => setActiveId(null)}
          restoreFocusRef={triggerRef}
        />
      )}
    </div>
  );
}
