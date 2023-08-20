import { ReactNode } from "react";
import ReactDOM from "react-dom";

const selector = 'portal';
function Portal ({ children }: { children: ReactNode}) {
  const element =
    typeof window !== "undefined" && document.querySelector(`#${selector}`);
  return element && children ? ReactDOM.createPortal(children, element) : null;
};

function Context () {
  return <div id={selector}/>;
}

Portal.Context = Context;

export { Portal };
