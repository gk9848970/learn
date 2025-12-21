import { CurrentForm } from "./modules/future/hooks/current";
import { Transition } from "./modules/future/hooks/use-transition";

function App() {
  return (
    <div>
      <h1>Current Form</h1>
      <CurrentForm />
      <h1>Transition</h1>
      <Transition />
    </div>
  );
}

export default App;
