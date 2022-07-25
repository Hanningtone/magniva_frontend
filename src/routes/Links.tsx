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
  BusinessSettings,
} from "../pages";
import ProtectedRoute from './ProtectedRoutes';
import { Context } from "../context";
import HotelBranchPage from "../pages/HotelBranchPage";
import RoomsPage from "../pages/RoomsPage";
import AmenitiesPage from "../pages/AmenitiesPage";
import HouseRulesPage from "../pages/HouseRulesPage";
import PromotionsPage from "../pages/PromotionsPage";
import PerksPage from "../pages/PerksPage";
import RoomTypesPage from "../pages/RoomTypesPages";
import BookingInventoryPage  from '../pages/HotelInventory';
import MagnivaEvents from "../pages/MagnivaEvents";
import AttendeesPage from "../pages/AttendeesPage";

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
          <Route path="/inventory" element={<BookingInventoryPage user={state.user}/>}/>
          <Route path="/payments" element={<PaymentsPage user={state.user}/>}/>
          <Route path="/settings" element={<SettingsPage user={state.user}/>}/>
          <Route path="/customers" element={<CustomersPage user={state.user}/>} />
          <Route path='/users' element={<UsersPage user={state.user}/>} />
          <Route path="/business-settings" element={<BusinessSettings user={state.user}/>} />
          <Route path="/hotel-branches" element={<HotelBranchPage user={state.user}/>} />
          <Route path="/rooms" element={<RoomsPage user={state.user}/>} />
          <Route path="/house-rules" element={<HouseRulesPage user={state.user}/>} />
          <Route path="/promotions" element={<PromotionsPage user={state.user}/>} />
          <Route path="/room-perks" element={<PerksPage user={state.user}/>} />
          <Route path="/room-types" element={<RoomTypesPage user={state.user}/>} />
          <Route path="/attendees" element={<AttendeesPage user={state.user}/>} />
          <Route path="/attendance" element={<AmenitiesPage user={state.user}/>} />
        </Route>
      </Routes>
    </Router>
  )
};

export default Links;
