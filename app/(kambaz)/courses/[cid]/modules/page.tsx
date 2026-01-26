export default function Modules() {
    return (
      <div>
        {/* Implement Collapse All button, View Progress button, etc. */}
        <button>Collapse All</button> <button>View Progress</button> <button>Publish All </button> <button>+ Module</button>
        <ul id="wd-modules">
          <li className="wd-module">
            <div className="wd-title">Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to the course</li>
                  <li className="wd-content-item">Learn what is Web Development</li>
                </ul>
                <span className="wd-title">READING</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Full Stack Developer - Chapter 1</li>
                  <li className="wd-content-item">Full Stack Developer - Chapter 2</li>
                </ul>
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to Web Development</li>
                  <li className="wd-content-item">Creating an HTTP server with Node.js</li>
                  <li className="wd-content-item">Creating a React ApplicationM</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="wd-module"> <div className="wd-title">Week 1, Lecture 2 - Formatting User Interfaces with HTML</div> 
          <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Learn how to create user interfaces</li>
                  <li className="wd-content-item">Deploy the assignment to Netlify</li>
                </ul>
                <span className="wd-title">READING</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Full Stack Developer - Chapter 3</li>
                </ul>
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to HTML and the DOM</li>
                  <li className="wd-content-item">Formatting Web content with Headings</li>
                  <li className="wd-content-item">Formatting content with Lists and Tables</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="wd-module"> <div className="wd-title">Week 3</div> </li>
        </ul>
      </div>
  );}
  