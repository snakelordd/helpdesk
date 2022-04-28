import Auth from './pages/Auth'
import Current from './pages/Current'
import Home from './pages/Home'
import Manuals from './pages/Manuals'
import Settings from './pages/Settings'
import Tickets from './pages/Tickets'
import Users from './pages/Users'
import Create from './pages/Create'
import TicketPage from './pages/nested/TicketPage'

import { MANUAL_ROUTE, REGISTRATION_ROUTE, SETTINGS_ROUTE, TICKETS_ROUTE, USERS_ROUTE, CURRENT_ROUTE, HOME_ROUTE, LOGIN_ROUTE, CREATE_ROUTE, CLOSED_ROUTE, PROFILE_ROUTE } from "./utils/consts"
import Profile from './pages/Profile'

export const authRoutes = [
    {
        path: TICKETS_ROUTE,
        Component: <Tickets />
    },
    {
        path: CLOSED_ROUTE,
        Component: <Tickets />
    },
    {
        path: TICKETS_ROUTE + '/:id',
        Component: <TicketPage />
    },
    {
        path: CREATE_ROUTE,
        Component: <Create />
    },
    {
        path: SETTINGS_ROUTE,
        Component: <Settings />
    },
    {
        path: CURRENT_ROUTE,
        Component: <Current />
    },
    {
        path: CURRENT_ROUTE + '/:ticketId',
        Component: <Current />
    },
    {
        path: HOME_ROUTE,
        Component: <Home />
    },
    {
        path: USERS_ROUTE,
        Component: <Users />
    },
    {
        path: PROFILE_ROUTE,
        Component: <Profile />
    },
]

export const publicRoutes = [
    {
        path: MANUAL_ROUTE,
        Component: <Manuals />
    },
    {
        path: LOGIN_ROUTE,
        Component: <Auth />
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Auth />
    },
]