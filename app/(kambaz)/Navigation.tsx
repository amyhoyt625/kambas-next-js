import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { GoBeaker } from "react-icons/go";

import Link from "next/link";
export default function KambazNavigation() {
 return (
   <ListGroup className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2" style={{ width: 115 }}
              id="wd-kambaz-navigation">

     <ListGroupItem className="bg-black border-0 text-center" as="a"
              target="_blank" href="https://www.northeastern.edu/" id="wd-neu-link">
       <img src="/images/neu.png" width="75px" alt="Northeastern University" />
     </ListGroupItem>

     <ListGroupItem className="border-0 bg-black text-center">
       <Link href="/account" id="wd-account-link" className="text-white text-decoration-none">
         <FaRegCircleUser className="fs-1 text-white" />
         <br />
         Account
       </Link>
     </ListGroupItem>

     <ListGroupItem className="border-0 bg-black text-center wd-nav-item">
        <Link href="/dashboard" id="wd-dashboard-link" className="wd-nav-link">
          <AiOutlineDashboard className="fs-1" />
          <br />
          Dashboard
        </Link>
      </ListGroupItem>

      <ListGroupItem className="border-0 bg-black text-center wd-nav-item">
        <Link href="/dashboard" id="wd-courses-link" className="wd-nav-link">
          <LiaBookSolid className="fs-1" />
          <br />
          Courses
        </Link>
      </ListGroupItem>

      <ListGroupItem className="border-0 bg-black text-center wd-nav-item">
        <Link href="/calendar" id="wd-calendar-link" className="wd-nav-link">
          <IoCalendarOutline className="fs-1" />
          <br />
          Calendar
        </Link>
      </ListGroupItem>

      <ListGroupItem className="border-0 bg-black text-center wd-nav-item">
        <Link href="/inbox" id="wd-inbox-link" className="wd-nav-link">
          <FaInbox className="fs-1" />
          <br />
          Inbox
        </Link>
      </ListGroupItem>

      <ListGroupItem className="border-0 bg-black text-center wd-nav-item">
        <Link href="/labs" id="wd-labs-link" className="wd-nav-link">
          <GoBeaker className="fs-1" />
          <br />
          Labs
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}
