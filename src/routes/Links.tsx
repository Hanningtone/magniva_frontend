import {useState, useContext} from "react";
import {BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { 
  LoginPage,
  HomePage,
  InvitesPage,
  ThemePage,
  PaymentsPage,
  SettingsPage,
  CustomersPage,
  UsersPage,
  UploadExcel,
} from "../pages";
import ProtectedRoute from './ProtectedRoutes';
import { Context } from "../context";
import AttendancePage from "../pages/AttendancePage";
import MagnivaEvents from "../pages/MagnivaEvents";
import AttendeesPage from "../pages/AttendeesPage";
import EventDetailsPage from "../pages/detailed-pages/EventDetailsPage";

const Links= () => {

  const [state, dispatch] = useContext(Context);

  console.log(state.user);
  
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route element={<ProtectedRoute user={state.user} />}> 
          <Route path="/home" element={<HomePage user={state.user}/>}/>
          <Route path="/magniva-events" element={<MagnivaEvents user={state.user}/>}/>
          <Route path="/theme" element={<ThemePage user={state.user}/>}/>
          <Route path="/invites" element={<InvitesPage user={state.user}/>}/>
          <Route path="/payments" element={<PaymentsPage user={state.user}/>}/>
          <Route path="/settings" element={<SettingsPage user={state.user}/>}/>
          <Route path="/customers" element={<CustomersPage user={state.user}/>} />
          <Route path='/users' element={<UsersPage user={state.user}/>} />
          <Route path="/attendees" element={<AttendeesPage user={state.user}/>} />
          <Route path="/attendance" element={<AttendancePage user={state.user}/>} />
          <Route path="/magniva-events/detail/:id/" element={<EventDetailsPage user={state.user}/>} />
          <Route path="/magniva-events/detail/:id/:relations" element={<EventDetailsPage user={state.user}/>} />
          <Route path="/upload-excel" element={<UploadExcel user={state.user}/>} />

        </Route>
      </Routes>
    </Router>
  )
};

export default Links;
