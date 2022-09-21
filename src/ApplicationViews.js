import React from "react"
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route, Routes, useHistory } from "react-router-dom";
import { Home } from "./Home"
import { MyBuiltTacoCard } from './components/builtTaco/BuiltTacoCard';
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";


export const ApplicationViews = ({ isAuthenticated, setIsAuthenticated }) => {
    const PrivateRoute = ({ children }) => {
      return isAuthenticated ? children : <useHistory to="/login" />;
    };
  
    const setAuthUser = (user) => {
      sessionStorage.setItem("kickz2Kop_customer", JSON.stringify(user));
      setIsAuthenticated(sessionStorage.getItem("kickz2Kop_customer") !== null);
    };

    return (
        <>
          <Router>
            <Switch>
                <Route path="/" element={<Home />} />
        
                {/* <Route
                exact
                path="/mybuilttacos/"
                element={
                    <PrivateRoute>
                    <CollectionList />
                    </PrivateRoute>
                }
                />
        
                <Route
                exact
                path="/mybuilttacos/added"
                element={
                    <PrivateRoute>
                    <TacoAddedList />
                    </PrivateRoute>
                }
                />
        
                <Route
                exact
                path="/mybuilttacos/extra/:tacoId"
                element={
                    <PrivateRoute>
                    <TacoEditForm />
                    </PrivateRoute>
                }
                />
        
                <Route path="/myCollection/view" element={<CollectionView />} />
        
                <Route
                exact
                path="/myCollection/find"
                element={
                    <PrivateRoute>
                    <FindShoeList />
                    </PrivateRoute>
                }
                /> */}
        
                <Route
                exact
                path="/login"
                element={<Login setAuthUser={setAuthUser} />}
                />
                <Route exact path="/register" element={<Register />} />
            </Switch>
            </Router> 
        </>
      );
    };

// return (
//     <>
//           <Router> 
//             <Switch>
//                 <Route exact path="/" element={<Home />} />

//                 <Route path="/buildataco" element={<MyBuiltTacoCard />} />
//             </Switch>
//            </Router> 
//     </>
// )