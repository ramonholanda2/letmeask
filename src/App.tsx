import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./pages/Home";
import NewRoom from "./pages/NewRoom";

import { AuthContextProvider } from "./contexts/AuthContext";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import Rooms from "./pages/Rooms";
import AdminRoom from "./pages/AdminRoom";

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <DarkModeProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" exact component={NewRoom} />
            <Route path="/rooms/:id" component={Rooms} />
            <Route path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>
        </DarkModeProvider>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
