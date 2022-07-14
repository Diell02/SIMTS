import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                <NavLink to="/subjects" className="nav-item nav-link">Subjects</NavLink>
                <NavLink to="/grades" className="nav-item nav-link">Grades</NavLink>
                <NavLink to="/shortages" className="nav-item nav-link">Shortages</NavLink>
                <NavLink to="/departments" className="nav-item nav-link">Departments</NavLink>
                <NavLink to="/classes" className="nav-item nav-link">Classes</NavLink>
                <NavLink to="/books" className="nav-item nav-link">Books</NavLink>
                <NavLink to="/notes" className="nav-item nav-link">Notes</NavLink>
                <NavLink to="/clubs" className="nav-item nav-link">Clubs</NavLink>
                <NavLink to="/activities" className="nav-item nav-link">Activities</NavLink>
                <NavLink to="/feedbacks" className="nav-item nav-link">Feedbacks</NavLink>
                <NavLink to="/informations" className="nav-item nav-link">Informations</NavLink>
                <NavLink to="/schedules" className="nav-item nav-link">Schedules</NavLink>
                <NavLink to="/competitions" className="nav-item nav-link">Competitions</NavLink>
                <NavLink to="/trainings" className="nav-item nav-link">Trainings</NavLink>
            </div>
        </nav>
    );
}

export { Nav };