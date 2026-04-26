import { Link } from "react-router-dom";

const BG = "#fffdfb";
const TEXT_PRIMARY = "#1c1816";
const TEXT_MUTED = "#9a9189";
const TEXT_BODY = "#3d3530";
const LINE = "#ebe6df";

const projects = [
  {
    name: "project name here",
    course: "course / event here",
    details:
      "write a short description of what the project was, what you built, and what tools or skills you used.",
  },
  {
    name: "project name here",
    course: "course / event here",
    details:
      "write a short description of what the project was, what you built, and what tools or skills you used.",
  },
  {
    name: "project name here",
    course: "course / event here",
    details:
      "write a short description of what the project was, what you built, and what tools or skills you used.",
  },
];

export default function MoreProjects() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,400&family=Cormorant+Garamond:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');

        body {
          background: ${BG};
        }

        .more-page {
          min-height: 100vh;
          background: ${BG};
          color: ${TEXT_PRIMARY};
          font-family: 'Cormorant Garamond', Georgia, serif;
          padding: 6rem 3rem;
        }

        .more-wrap {
          max-width: 1000px;
          margin: 0 auto;
        }

        .back {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-decoration: none;
          color: ${TEXT_MUTED};
        }

        .title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-style: italic;
          font-weight: 300;
          margin: 3rem 0 1rem;
        }

        .subtitle {
          max-width: 560px;
          font-size: 1.2rem;
          line-height: 1.6;
          color: ${TEXT_BODY};
          margin-bottom: 4rem;
        }

        .project-table {
          display: grid;
          grid-template-columns: 1fr 1fr 2fr;
          gap: 2rem;
          border-top: 1px solid ${LINE};
        }

        .table-head {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: ${TEXT_MUTED};
          padding: 1.2rem 0;
          border-bottom: 1px solid ${LINE};
        }

        .cell {
          padding: 1.7rem 0;
          border-bottom: 1px solid ${LINE};
          font-size: 1.08rem;
          line-height: 1.6;
          color: ${TEXT_BODY};
        }

        .project-name {
          color: ${TEXT_PRIMARY};
          font-weight: 500;
        }

        @media (max-width: 750px) {
          .more-page {
            padding: 5rem 1.5rem;
          }

          .project-table {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .table-head {
            display: none;
          }

          .cell {
            border-bottom: none;
            padding: 0.25rem 0;
          }

          .cell:nth-child(3n) {
            border-bottom: 1px solid ${LINE};
            padding-bottom: 2rem;
            margin-bottom: 1.5rem;
          }
        }
      `}</style>

      <main className="more-page">
        <div className="more-wrap">
          <Link to="/" className="back">← back home</Link>

          <h1 className="title">more projects</h1>

          <p className="subtitle">
            smaller builds, course projects, experiments, and things i’m currently working on.
          </p>

          <div className="project-table">
            <div className="table-head">name</div>
            <div className="table-head">course / event</div>
            <div className="table-head">details</div>

            {projects.map((project, index) => (
              <>
                <div className="cell project-name" key={`name-${index}`}>
                  {project.name}
                </div>
                <div className="cell" key={`course-${index}`}>
                  {project.course}
                </div>
                <div className="cell" key={`details-${index}`}>
                  {project.details}
                </div>
              </>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}