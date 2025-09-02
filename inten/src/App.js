import './App.css';

//llama a los distintos componentes, los que estan en corchetes no ocupan librerias, miestras que las otras si

import { IndexNavbar } from "./components/IndexNavbar.js";
import { IndexHeader } from "./components/IndexHeader.js";
import { DemoFooter } from "./components/DemoFooter.js";
//import SectionJavaScriptf from "./components/SectionJavaScript";
import SectionJavaScriptR from "./components/SectionJavaScriptR";


function App() {

  return (
    <>
      <IndexHeader />
    <div className="App">
        <SectionJavaScriptR />
      </div>
      <DemoFooter />
      <IndexNavbar />
      </>
  );
}

export default App;
