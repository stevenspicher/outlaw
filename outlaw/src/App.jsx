import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Event from "./pages/Event/Event.jsx"
import Backstage from "./pages/Backstage/Backstage.jsx"; // assuming you have this page under the same directory as Event

function App() {
    return (
        <div className="App" style={{backgroundColor: `light grey`}}>
            <Router>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Routes>
                                <Route path='/' element={<Event />} />
                                <Route path='/backstage' element={<Backstage />} />
                                <Route path='*' element={<div>404 Not found </div>} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </Router>
        </div>
    )
}

export default App;
