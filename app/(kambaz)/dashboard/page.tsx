import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">  <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/course2img.png" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS3800 Theory of Comp. </h5>
              <p className="wd-dashboard-course-title">
                Theory of Computation
              </p>
              <button> Go </button>
            </div>
          </Link> 
        </div>
        <div className="wd-dashboard-course">  <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/course3img.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS3000 Algo </h5>
              <p className="wd-dashboard-course-title">
                Algorithms
              </p>
              <button> Go </button>
            </div>
          </Link> 
        </div>
        <div className="wd-dashboard-course">  <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/course4img.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS2484 HCI </h5>
              <p className="wd-dashboard-course-title">
                Human Centered Interaction
              </p>
              <button> Go </button>
            </div>
          </Link> 
        </div> 
        <div className="wd-dashboard-course">  <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/course5img.png" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS4550 Web Dev</h5>
              <p className="wd-dashboard-course-title">
                Website Development
              </p>
              <button> Go </button>
            </div>
          </Link> 
        </div>
        <div className="wd-dashboard-course">  <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/course6img.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS3500 OOD </h5>
              <p className="wd-dashboard-course-title">
                Object Oriented Design 
              </p>
              <button> Go </button>
            </div>
          </Link> 
        </div>
        <div className="wd-dashboard-course">  <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/course7img.jpg" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS1210 PDC </h5>
              <p className="wd-dashboard-course-title">
                Proffesional Development for Co-op
              </p>
              <button> Go </button>
            </div>
          </Link> 
        </div>
        <div className="wd-dashboard-course">  <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/course8img.png" width={200} height={150} alt="reactjs" />
            <div>
              <h5> CS5678 Python </h5>
              <p className="wd-dashboard-course-title">
                Data Science and Data Bases
              </p>
              <button> Go </button>
            </div>
          </Link> 
        </div>
      </div>
    </div>
);}
