import Builder from "./pages/Builder";
import "@xyflow/react/dist/style.css";
import "./App.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-[100vh]">
      <Builder />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1f1f1f",
            color: "#fff",
            border: "0.5px solid #333",
          },
          success: {
            style: {
              border: "0.5px solid #22c55e",
            },
          },
          error: {
            style: {
              border: "0.5px solid #ef4444",
            },
          },
        }}
      />
    </div>
  );
}

export default App;
