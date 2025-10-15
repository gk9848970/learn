/** @jsx DOMcreateElement */
// Import the JSX factory
import { DOMcreateElement } from "./lessons/jsx-factory.jsx";

function Counter({ count }) {
  return <div>Counter: {count}</div>;
}

// Example functional component
function Welcome({ name, age }) {
  return (
    <div className="welcome-card">
      <h2>Welcome, {name}!</h2>
      <p>You are {age} years old.</p>
      <button onclick={() => alert(`Hello ${name}!`)}>Say Hello</button>
      <Counter count={10} />
    </div>
  );
}

// Example usage with both HTML elements and custom components
function createApp() {
  const app = (
    <div id="main-content">
      <header>
        <h1>My JSX Factory App</h1>
        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <main>
        <Welcome name="TypeScript Learner" age={25} />

        <div className="content">
          <p>This is rendered using our custom JSX factory!</p>
          <ul>
            <li>No React needed</li>
            <li>Direct DOM manipulation</li>
            <li>TypeScript support</li>
          </ul>
        </div>

        <div className="interactive">
          <input type="text" placeholder="Enter your name" id="nameInput" />
          <button
            onclick={() => {
              const input = document.getElementById("nameInput");
              alert(`Hello ${input.value || "there"}!`);
            }}
          >
            Greet Me
          </button>
        </div>
      </main>
    </div>
  );

  return app;
}

// Render to the DOM
function renderApp() {
  const appContainer = document.getElementById("app");
  const appElement = createApp();

  if (appContainer) {
    // Clear existing content
    appContainer.innerHTML = "";
    // Append the new JSX-created element
    appContainer.appendChild(appElement);
  }
}

// Initialize the app immediately (module scripts are deferred by default)
renderApp();

export { renderApp };
