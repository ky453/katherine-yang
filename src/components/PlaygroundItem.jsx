import { assetUrl } from "../lib/assets";

export default function PlaygroundItem({ photo, onOpen, position, showNote }) {
  return (
    <figure
      className={`photo-figure playground-item board-photo board-photo--${photo.id}`}
      style={{
        "--photo-x": `${position.x}%`, "--photo-y": `${position.y}%`,
        "--photo-width": `${position.width}%`, "--photo-height": `${position.height}%`,
        "--photo-tilt": `${position.tilt}deg`,
      }}
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
      </button>
      <figcaption className="board-photo-caption">
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
