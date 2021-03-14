import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import RootReducer from "../../../Redux/Reducers/index";

export function ComponentRender(
  component,
  { store = createStore(RootReducer), ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return render(component, { wrapper: Wrapper, ...renderOptions });
}
export const structureRender = ({ children }) => {
  return (
    <div>
      <div>{children}</div>
      <div>{children}</div>
      <h5 />
      <div>{children}</div>
      <div>{children}</div>
    </div>
  );
};
