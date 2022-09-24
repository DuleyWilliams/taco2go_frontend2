import React from "react"
import { Route} from "react-router-dom";
import { Taco2Go } from "./components/Taco2Go"
import { MyBuiltTacoCard } from './components/builtTaco/BuiltTacoCard';
import { MyBuiltTacoList } from './components/builtTaco/BuiltTacoList';


export const ApplicationViews = () => {
  
  return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path={["/"]}>
                <Taco2Go/>
            </Route>
            <Route exact path="/mybuilttacos">
                <MyBuiltTacoCard  />
            </Route>
            <Route exact path="/mybuilttaco">
                <MyBuiltTacoList />
            </Route>
            {/* <Route exact path="/games/:gameId/update">
                <UpdateGameForm />
            </Route>
            <Route exact path="/games/:gameId(\d+)">
                <GameDetails /> 
            </Route>  
            <Route exact path="/events">
                <EventList />
            </Route>
            <Route exact path="/events/new">
                <EventForm />
            </Route>
            <Route exact path="/events/:eventId/update">
                <UpdateEventForm />
            </Route>
            <Route exact path="/events/:eventId(\d+)">
                <EventDetails />
            </Route> */}
        </main>
    </>
}