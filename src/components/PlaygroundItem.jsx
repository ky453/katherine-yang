import { assetUrl } from "../lib/assets";

export default function PlaygroundItem({ photo, onOpen, position, index, showNote }) {
  return (
    <figure
      className={`photo-figure playground-item board-photo board-photo--${photo.id}`}
      style={{
        "--photo-x": `${position.x}%`, "--photo-y": `${position.y}%`,
        "--photo-width": `${position.width}%`, "--photo-height": `${position.height}%`,
        "--photo-tilt": `${position.tilt}deg`,
      }}
      data-fastener={index % 3 === 0 ? "pin" : index % 3 === 1 ? "tape" : "none"}
    >
      <button
        type="button"
        className="photo-frame playground-photo-button"
        onClick={(event) => onOpen(photo, event)}
        aria-label={`Open photo: ${photo.title}`}
        aria-describedby={`caption-${photo.id}`}
        aria-haspopup="dialog"
      >
        <img src={assetUrl(photo.path)} alt={photo.alt} loading="eager" />
        <span className="playground-photo-action" aria-hidden="true">open note ↗</span>
      </button>
      <figcaption className="board-photo-caption">
        <span className="board-photo-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <span className="board-photo-title" title={photo.title}>{photo.title}</span>
        <span className="playground-sr-only" id={`caption-${photo.id}`}>{photo.caption}</span>
      </figcaption>
      {showNote && photo.note?.trim() && (
        <p className="playground-observation">
          {photo.note}
        </p>
      )}
    </figure>
  );
}
