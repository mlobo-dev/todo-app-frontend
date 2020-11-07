import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../views/Home";
import QrCode from "../views/QrCode";
import Tasks from "../views/Tasks";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tasks" exact component={Tasks} />
        <Route path="/tasks/:id" exact component={Tasks} />
        <Route path="/qrcode" exact component={QrCode} />
      </Switch>
    </BrowserRouter>
  );
}
