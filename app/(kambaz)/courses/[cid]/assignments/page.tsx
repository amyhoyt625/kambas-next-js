import Link from 'next/link';
import { ListGroup, Button, ListGroupItem, InputGroup, FormControl } from "react-bootstrap";
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import { BsGripVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import LessonControlButtons from '../modules/LessonControlButtons';

export default function Assignments() {
  return (
    <div id="wd-assignments">
      {/* Controls Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
  <InputGroup style={{ maxWidth: '300px' }}>
    <InputGroupText>
      <FaSearch />
    </InputGroupText>
    <FormControl 
      type="text"
      placeholder="Search..."
      id="wd-search-assignment"
    />
  </InputGroup>
  <div>
          <Button variant="secondary" size="lg" className="me-2" id="wd-add-assignment-group">
            <FaPlus className="me-1" /> Group
          </Button>

          <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment-btn">
       <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
       Assignment
     </Button>
        </div>
      </div>

      {/* Assignments List */}
      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              ASSIGNMENTS 40% of Total
            </div>
            <div>
              <FaPlus className="me-2" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>

          <ListGroup className="rounded-0">
            {/* Assignment 1 */}
            <ListGroupItem className="wd-assignment-list-item p-3 ps-1 d-flex justify-content-between align-items-start">
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3" />
                <HiOutlinePencilSquare className="me-3 text-success" style={{ marginTop: '5px' }} />
                <div>
                  <Link href="/courses/1234/assignments/123" className="wd-assignment-link text-dark text-decoration-none fw-bold">
                    A1
                  </Link>
                  <div className="wd-assignment-meta text-muted small">
                    <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00am |
                    <br />
                    <b>Due</b> May 13 at 11:59pm | 100 pts
                  </div>
                </div>
              </div>
              <LessonControlButtons />
            </ListGroupItem>

            {/* Assignment 2 */}
            <ListGroupItem className="wd-assignment-list-item p-3 ps-1 d-flex justify-content-between align-items-start">
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3" />
                <HiOutlinePencilSquare className="me-3 text-success" style={{ marginTop: '5px' }} />
                <div>
                  <Link href="/courses/1234/assignments/123" className="wd-assignment-link text-dark text-decoration-none fw-bold">
                    A2
                  </Link>
                  <div className="wd-assignment-meta text-muted small">
                    <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 13 at 12:00am |
                    <br />
                    <b>Due</b> May 20 at 11:59pm | 100 pts
                  </div>
                </div>
              </div>
              <LessonControlButtons />
            </ListGroupItem>

            {/* Assignment 3 */}
            <ListGroupItem className="wd-assignment-list-item p-3 ps-1 d-flex justify-content-between align-items-start">
              <div className="d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3" />
                <HiOutlinePencilSquare className="me-3 text-success" style={{ marginTop: '5px' }} />
                <div>
                  <Link href="/courses/1234/assignments/123" className="wd-assignment-link text-dark text-decoration-none fw-bold">
                    A3
                  </Link>
                  <div className="wd-assignment-meta text-muted small">
                    <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 20 at 12:00am |
                    <br />
                    <b>Due</b> May 27 at 11:59pm | 100 pts
                  </div>
                </div>
              </div>
              <LessonControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}