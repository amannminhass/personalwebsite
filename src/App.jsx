import { useState, useEffect, useRef } from "react";

const BG = "#fffdfb";
const TEXT_PRIMARY = "#1c1816";
const TEXT_MUTED = "#9a9189";
const TEXT_BODY = "#3d3530";
const LINE = "#ebe6df";

const sections = ["about", "experience", "projects", "skills", "contact"];

function useInView() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    });

    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

function FadeIn({ children }) {
  const [ref, visible] = useInView();

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "all 0.7s ease",
      }}
    >
      {children}
    </div>
  );
}

function Tag({ children, color }) {
  return (
    <span className="tag" style={{ background: color }}>
      {children}
    </span>
  );
}

function SectionLabel({ children }) {
  return <p className="section-label">{children}</p>;
}

function Polaroids() {
  const photos = [
    { src: "/images/photo1.jpg", top: "10px", left: "5px", rotate: "-6deg", z: 1 },
    { src: "/images/photo2.jpg", top: "95px", left: "125px", rotate: "5deg", z: 3 },
    { src: "/images/photo3.jpg", top: "215px", left: "35px", rotate: "-3deg", z: 2 },
  ];

  return (
    <div className="polaroids">
      {photos.map((photo, i) => (
        <div
          key={i}
          className="polaroid"
          style={{
            top: photo.top,
            left: photo.left,
            transform: `rotate(${photo.rotate})`,
            zIndex: photo.z,
          }}
        >
          <img src={photo.src} alt={`photo ${i + 1}`} />
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);

      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom > 120;
      });

      if (current) setActive(current);
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,400&family=Cormorant+Garamond:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background: ${BG};
        }

        .page {
          min-height: 100vh;
          background: ${BG};
          color: ${TEXT_PRIMARY};
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 1.2rem 3rem;
          background: ${scrolled ? "rgba(255,253,251,0.92)" : "transparent"};
          backdrop-filter: ${scrolled ? "blur(12px)" : "none"};
          border-bottom: ${scrolled ? `1px solid ${LINE}` : "none"};
        }

        .nav-name {
          font-size: 1rem;
          font-style: italic;
          color: ${TEXT_PRIMARY};
        }

        .nav-links {
          display: flex;
          gap: 2rem;
          justify-content: center;
        }

        .nav-links button {
          font-family: 'DM Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          background: none;
          border: none;
          cursor: pointer;
        }

        .nav-icons {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 1rem;
        }

        .nav-icons a {
          color: ${TEXT_MUTED};
          text-decoration: none;
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .nav-icons a:hover {
          color: ${TEXT_PRIMARY};
          transform: translateY(-1px);
        }

        .intro {
          max-width: 1040px;
          margin: 0 auto;
          padding: 16vh 3rem 7rem;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 4.5rem;
          align-items: center;
        }

        .name {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3.4rem, 8vw, 6.6rem);
          font-weight: 300;
          line-height: 0.92;
          letter-spacing: -0.035em;
          margin-bottom: 1.3rem;
          text-align: center;
          max-width: 520px;
          font-style: italic;
        }

        .tags {
          display: flex;
          gap: 0.55rem;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 520px;
          margin-bottom: 2.2rem;
        }

        .tag {
          color: #fffdfb;
          padding: 3px 9px;
          border-radius: 3px;
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.08em;
        }

        .jots {
          margin-top: 2rem;
          max-width: 620px;
        }

        .jot {
          display: grid;
          grid-template-columns: 2rem 1fr;
          gap: 0.9rem;
          padding: 0.38rem 0;
          font-size: 1.15rem;
          line-height: 1.45;
          color: ${TEXT_BODY};
        }

        .jot span {
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          color: ${TEXT_MUTED};
          padding-top: 0.35rem;
        }

        .polaroids {
          position: relative;
          height: 430px;
          width: 100%;
        }

        .polaroid {
          position: absolute;
          width: 190px;
          background: white;
          padding: 10px 10px 34px;
          box-shadow: 0 8px 24px rgba(28, 24, 22, 0.10);
          transition: transform 0.25s ease;
        }

        .polaroid:hover {
          transform: rotate(0deg) translateY(-4px) !important;
        }

        .polaroid img {
          width: 170px;
          height: 150px;
          object-fit: cover;
          display: block;
          background: #f2ede7;
        }

        section {
          max-width: 880px;
          margin: 0 auto;
          padding: 5.5rem 3rem;
          border-top: 1px solid ${LINE};
        }

        .section-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${TEXT_MUTED};
          margin-bottom: 2rem;
          text-align: center;
        }

        .about-text {
          max-width: 650px;
          font-size: 1.35rem;
          line-height: 1.75;
          color: ${TEXT_BODY};
          text-align: center;
          margin: 0 auto;
        }

        .experience-list,
        .project-list {
          display: flex;
          flex-direction: column;
          gap: 3.2rem;
        }

        .experience-item {
          display: grid;
          grid-template-columns: 0.8fr 1.6fr;
          gap: 3rem;
        }

        .company,
        .project-title {
          font-size: 1.45rem;
          font-weight: 500;
          margin-bottom: 0.35rem;
        }

        .meta {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: ${TEXT_MUTED};
          margin-bottom: 0.8rem;
        }

        ul {
          list-style: none;
        }

        li {
          position: relative;
          padding-left: 1.1rem;
          margin-bottom: 0.45rem;
          font-size: 1.05rem;
          line-height: 1.65;
          color: ${TEXT_BODY};
        }

        li::before {
          content: "—";
          position: absolute;
          left: 0;
          color: #c5beb6;
        }

        .project-item {
          display: grid;
          grid-template-columns: 3rem 1fr;
          gap: 1.4rem;
          max-width: 760px;
        }

        .project-num {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          color: #c5beb6;
          padding-top: 0.45rem;
        }

        .project-desc {
          font-size: 1.02rem;
          line-height: 1.7;
          color: ${TEXT_BODY};
          max-width: 620px;
        }

        .tool-line {
          font-family: 'DM Mono', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          color: ${TEXT_MUTED};
          margin-top: 0.8rem;
        }

        .skills {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 3rem;
        }

        .skill-group h3 {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: ${TEXT_MUTED};
          margin-bottom: 1rem;
          font-weight: 400;
        }

        .skill-group p {
          font-size: 1.08rem;
          line-height: 1.7;
          color: ${TEXT_BODY};
        }

        .contact-list {
          display: flex;
          gap: 3.5rem;
          flex-wrap: wrap;
        }

        .contact-list a {
          display: block;
          font-size: 1.35rem;
          color: ${TEXT_PRIMARY};
          text-decoration: none;
          border-bottom: 1px solid transparent;
          margin-top: 0.25rem;
        }

        .contact-list a:hover {
          border-color: ${TEXT_PRIMARY};
        }

        footer {
          max-width: 880px;
          margin: 0 auto;
          padding: 2rem 3rem 3rem;
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          font-family: 'DM Mono', monospace;
          font-size: 0.58rem;
          letter-spacing: 0.12em;
          color: #c5beb6;
        }

        @media (max-width: 850px) {
          nav {
            display: flex;
            padding: 1rem 1.5rem;
          }

          .nav-links {
            display: none;
          }

          .nav-icons {
            gap: 0.85rem;
          }

          .intro {
            grid-template-columns: 1fr;
            padding: 13vh 1.5rem 4rem;
            gap: 2.5rem;
          }

          .name,
          .tags {
            max-width: 100%;
          }

          .polaroids {
            height: 330px;
            max-width: 330px;
          }

          .polaroid {
            width: 155px;
            padding: 8px 8px 28px;
          }

          .polaroid img {
            width: 139px;
            height: 125px;
          }

          section {
            padding: 4rem 1.5rem;
          }

          .experience-item {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .project-item {
            grid-template-columns: 2.4rem 1fr;
          }

          .skills {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          footer {
            padding: 2rem 1.5rem;
            flex-direction: column;
          }
        }
      `}</style>

      <nav>
        <div className="nav-name">aman minhas</div>

        <div className="nav-links">
          {sections.slice(0, 4).map((sec) => (
            <button
              key={sec}
              onClick={() => scrollTo(sec)}
              style={{ color: active === sec ? TEXT_PRIMARY : TEXT_MUTED }}
            >
              {sec}
            </button>
          ))}
        </div>

        <div className="nav-icons">
          <a href="mailto:minhaaa@mcmaster.ca" aria-label="email">mail</a>
          <a href="https://linkedin.com/in/amanminhas" target="_blank" rel="noreferrer" aria-label="linkedin">in</a>
          <a href="https://github.com/amannminhass" target="_blank" rel="noreferrer" aria-label="github">gh</a>
        </div>
      </nav>

      <main className="page">
        <div className="intro">
          <div>
            <h1 className="name">
              Aman
              <br />
              Minhas
            </h1>

            <div className="tags">
              <Tag color="#6b2737">electrical engineering @ mcmaster</Tag>
              <Tag color="#1a2d4d">data & analytics @ pepsico</Tag>
            </div>

            <div className="jots">
              <div className="jot">
                <span>interested in data engineering, automation, and technical project management</span>
              </div>
            </div>
          </div>

          <Polaroids />
        </div>

        <section id="about">
          <FadeIn>
            <SectionLabel>i. about</SectionLabel>
            <p className="about-text">
              electrical engineering student focused on applying data and automation to real-world systems.
              experienced in building dashboards, working with large-scale datasets, and improving processes in enterprise environments.
              interested in the space between engineering, data, and operations.
            </p>
          </FadeIn>
        </section>

        <section id="experience">
          <FadeIn>
            <SectionLabel>ii. experience</SectionLabel>
          </FadeIn>

          <div className="experience-list">
            <FadeIn>
              <div className="experience-item">
                <div>
                  <h2 className="company">pepsico</h2>
                  <p className="meta">procurement intern · incoming</p>
                  <Tag color="#1a2d4d">2025</Tag>
                </div>

                <ul>
                  <li>working on data-driven procurement processes and dashboards</li>
                  <li>supporting project-based initiatives at hq</li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="experience-item">
                <div>
                  <h2 className="company">pepsico</h2>
                  <p className="meta">supply planning analyst intern</p>
                  <Tag color="#6b2737">2024</Tag>
                </div>

                <ul>
                  <li>built power bi dashboards and excel automation tools to support supply planning workflows</li>
                  <li>worked with large-scale supply chain datasets across enterprise systems</li>
                  <li>supported tracking systems including days on hand metrics and purchase order management</li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </section>

        <section id="projects">
          <FadeIn>
            <SectionLabel>iii. projects</SectionLabel>
          </FadeIn>

          <div className="project-list">
            <FadeIn>
              <div className="project-item">
                <p className="project-num">01</p>
                <div>
                  <h2 className="project-title">3d mapping system</h2>
                  <p className="meta">embedded systems</p>
                  <p className="project-desc">
                    spatial mapping pipeline using a time-of-flight sensor and microcontroller.
                    data transmitted through uart to matlab for 3d point-cloud visualization.
                  </p>
                  <p className="tool-line">c / embedded / matlab</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="project-item">
                <p className="project-num">02</p>
                <div>
                  <h2 className="project-title">c++ snake game</h2>
                  <p className="meta">object-oriented design</p>
                  <p className="project-desc">
                    terminal-based snake game built with custom classes, data structures,
                    finite state movement, and manual memory management.
                  </p>
                  <p className="tool-line">c++ / oop</p>
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="project-item">
                <p className="project-num">03</p>
                <div>
                  <h2 className="project-title">data + automation work</h2>
                  <p className="meta">analytics tooling</p>
                  <p className="project-desc">
                    dashboards and workflows focused on making operational processes easier to track,
                    understand, and improve.
                  </p>
                  <p className="tool-line">python / power bi / excel</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <section id="skills">
          <FadeIn>
            <SectionLabel>iv. skills</SectionLabel>
          </FadeIn>

          <div className="skills">
            <div className="skill-group">
              <h3>data</h3>
              <p>python, sql, power bi, excel, power query, macros</p>
            </div>

            <div className="skill-group">
              <h3>engineering</h3>
              <p>c / c++, embedded systems, matlab, uart, microcontrollers</p>
            </div>

            <div className="skill-group">
              <h3>other</h3>
              <p>dashboarding, process optimization, data analysis, technical project management</p>
            </div>
          </div>
        </section>

        <footer>
          <span>aman minhas · {new Date().getFullYear()}</span>
          <span>electrical engineering @ mcmaster</span>
        </footer>
      </main>
    </>
  );
}