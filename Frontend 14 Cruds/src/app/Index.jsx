import React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';

import { Nav, Alert } from '@/_components';
import { Home } from '@/home';
import { Subjects } from '@/subjects';
import { Grades } from '@/grades';
import { Shortages } from '@/shortages';
import { Departments } from '@/departments';
import { Classes } from '@/classes';
import { Books } from '@/books';
import { Notes } from '@/notes';
import { Clubs } from '@/clubs';
import { Activities } from '@/activities';
import { Feedbacks } from '@/feedbacks';
import { Informations } from '@/informations';
import { Schedules } from '@/schedules';
import { Competitions } from '@/competitions';
import { Trainings } from '@/trainings';

function App() {
    const { pathname } = useLocation();  

    return (
        <div className="app-container bg-light">
            <Nav />
            <Alert />
            <div className="container pt-4 pb-4">
                <Switch>
                    <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />
                    <Route exact path="/" component={Home} />
                    <Route path="/subjects" component={Subjects} />
                    <Route path="/shortages" component={Shortages} />
                    <Route path="/grades" component={Grades} />
                    <Route path="/departments" component={Departments} />
                    <Route path="/classes" component={Classes} />
                    <Route path="/books" component={Books} />
                    <Route path="/notes" component={Notes} />
                    <Route path="/clubs" component={Clubs} />
                    <Route path="/activities" component={Activities} />
                    <Route path="/feedbacks" component={Feedbacks} />
                    <Route path="/informations" component={Informations} />
                    <Route path="/schedules" component={Schedules} />
                    <Route path="/competitions" component={Competitions} />
                    <Route path="/trainings" component={Trainings} />
                    <Redirect from="*" to="/" />
                </Switch>
            </div>
        </div>
    );
}

export { App }; 