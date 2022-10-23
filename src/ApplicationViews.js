import React from "react"
import { Route} from "react-router-dom";
import { MyBuiltTacoCard } from './components/builtTaco/BuiltTacoCard';
import { MyBuiltTacoList } from './components/builtTaco/BuiltTacoList';
import { MyBuiltTacoEdit } from "./components/builtTaco/BuiltTacoEdit";
import { BuiltTacoForm } from "./components/builtTaco/BuiltTacoForm";


export const ApplicationViews = () => {
  
  return <>
        <main style={{
            // margin: "5rem 2rem",
            // lineHeight: "1.75rem"
            margin: "3rem 3rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path={["/"]}>
                <MyBuiltTacoList  />
            </Route>
            <Route exact path="/mybuilttacos">
                <MyBuiltTacoList />
            </Route>
            <Route exact path="/mybuilttacos/edit/:tacoId(\d+)">
                <MyBuiltTacoEdit /> 
            </Route>  
            <Route exact path="/mybuilttacos/new">
                <BuiltTacoForm /> 
            </Route>  
        </main>
    </>
}