import { NavLink }  from 'react-router';

export default function NavBar() {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/project">Project</NavLink>
        </nav>
    );
}