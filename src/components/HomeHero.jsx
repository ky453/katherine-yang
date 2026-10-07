import { assetUrl } from "../lib/assets";
import "./HomeHero.css";

const IDEAS = [
  {
    id: "product",
    title: "Product thinking",
    text: "what matters before we build",
    note: "start with a better question",
    href: "#/work",
  },
  {
    id: "people",
    title: "People",
    text: "what people expect from a product",
    note: "what would someone expect here?",
    href: "#/work",
  },
  {
    id: "making",
    title: "Design + making",
    text: "making ideas tangible enough to learn from",
    href: "#/work",
  },
  {
    id: "details",
    title: "Details",
    text: "the small decisions that help people find their way",
    href: "#/projects/cloudsky",
  },
  {
    id: "curiosity",
    title: "Personal curiosity",
    text: "cooking, travel, and things I notice",
    href: "#/playground",
  },
];

export default function HomeHero() {
  return (
    <section className="home-mindmap" id="top" aria-labelledby="home-hero-title">
      <div className="home-mindmap-stage">
        <div className="home-mindmap-intro">
          <h1 id="home-hero-title"><span>Katherine</span>{" "}<span>Yang</span></h1>
          <p className="home-mindmap-statement">
            I make things to understand how they work. I&apos;m curious about
            what people expect from a product, and the small details that help
            them find their way.
          </p>
          <p className="home-mindmap-studies">
            Information Science + History of Art at Cornell
          </p>
        </div>

        <svg className="home-mindmap-lines" viewBox="0 0 1400 640"
          preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path className="home-mindmap-line--product" d="M795 170 C838 192 807 207 839 229" />
          <path className="home-mindmap-line--people" d="M1116 267 C1081 279 1120 292 1081 321" />
          <path className="home-mindmap-line--making" d="M1118 413 C1094 408 1111 387 1081 382" />
          <path className="home-mindmap-line--details" d="M758 421 C792 413 748 375 783 366" />
          <path className="home-mindmap-line--curiosity" d="M932 504 C946 518 922 524 928 541" />
        </svg>

        <figure className="home-mindmap-portrait">
          <img src={assetUrl("/assets/photos/me/head-shot.jpg")}
            alt="Katherine Yang" width="2831" height="4244" fetchPriority="high" />
        </figure>

        {IDEAS.map((idea) => (
          <div className={`home-mindmap-branch home-mindmap-branch--${idea.id}`} key={idea.id}>
            <a className="home-mindmap-bubble" href={idea.href}
              aria-labelledby={`hero-${idea.id}-title`}
              aria-describedby={`hero-${idea.id}-text`}>
              <h2 id={`hero-${idea.id}-title`}>{idea.title}</h2>
              <p id={`hero-${idea.id}-text`}>{idea.text}</p>
            </a>
            {idea.note && <p className="home-mindmap-note hand">{idea.note}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
