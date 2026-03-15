import { ReactNode } from "react";
import TOC from "./TOC";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LabsLayout({ children }:
  Readonly<{ children: ReactNode }>) {
 return (
<div>
      <TOC />
      <div>{children}</div>
    </div>
);}