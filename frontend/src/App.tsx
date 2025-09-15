import { useEffect, useState } from "react";

import "./App.css";
import Layout from "./assets/components/layout";
import TodoComponent from "./assets/components/todo/todo";

function App() {
  return (
    <>
      <Layout>
        <TodoComponent />
      </Layout>
    </>
  );
}

export default App;
