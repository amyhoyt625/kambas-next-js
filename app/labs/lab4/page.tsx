"use client"
import { Suspense } from "react";
import BooleanStateVariables from "./BooleanStateVariables";
import ClickEvent from "./ClientEvent";
import Counter from "./Counter";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import Link from "next/link";
import store from "./store";
import { Provider } from "react-redux";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import QueryCalculator from "./url-encoding/query-params/page";
import PathCalculator from "./url-encoding/path-params/[a]/[b]/page";
import UrlEncoding from "./query-parameters";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

  return (
    <Provider store={store}>
      <div id="wd-lab4" className="ms-5">
        <h3>Lab 4</h3>
        <ClickEvent/>
        <PassingDataOnEvent/>
        <PassingFunctions theFunction={sayHello} />
        <Counter />
        <BooleanStateVariables/>
        <StringStateVariables/>
        <DateStateVariable/>
        <ObjectStateVariable/>
        <ArrayStateVariable/>
        <ParentStateComponent/>
        <Suspense fallback={<div>Loading...</div>}>
          <QueryCalculator/>
          <PathCalculator/>
          <UrlEncoding/>
        </Suspense>
        <Link href="/labs/lab4/redux">Redux Examples</Link>
        <br/>
        <Link href="/labs/lab4/react-context">React Context Examples</Link>
        <br/>
        <Link href="/labs/lab4/zustand">Zustand Examples</Link>
      </div>
    </Provider>
  );
}