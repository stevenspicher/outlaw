import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Event from "./pages/Event/Event.jsx"
import backgroundImage from "./assets/background.webp"

function App() {
    return (
        <div className="App" style={{backgroundColor: `light grey`}}>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Event/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
