  import {useState} from 'react';
    import {BrowserRouter as Router, Link, Switch, Route, useLocation} from 'react-router-dom';
  import ApplyStepper from "./Pages/StepPages/Apply_page";
  // import FillPage from '. /Pages/StepPages/FillPage';
  import FillPage from './Pages/StepPages/FillPage';
  import './Sass/app.scss';
  import UploadDocuments from './Pages/StepPages/upload';
  import BookAppointment from './Pages/StepPages/bookappointment';
  import Payment from './Pages/StepPages/payment';
  import {Nav} from './Component/Nav/Nav';
  import ManageNav from '../src/Component/Nav/manageNav';
  import Success from './Pages/StepPages/SuccessPage';
  import ScrollToTop from './Component/scrollToTop';
  import History from './Pages/Manage/history';
  import ManageClients from './Pages/Manage/ManageClients';
  import ManagePayments from './Pages/Manage/ManagePayment';
  import ManageApplication from './Pages/Manage/ManageApplication';
  import ManageService from './Pages/Manage/ManageService';
  import ManageAppointments from './Pages/Manage/ManageAppointment';
  import ManageFaq from './Pages/Manage/ManageFaq';
  import ManageQuery from './Pages/Manage/ManageQuery';
  import ManageOffer from './Pages/Manage/ManageOffer';

  import Home from './Pages/Main/Home';
  import ToggleNav from './Component/toggle_nav';
  import Service from './Pages/Main/Service';
  import About from './Pages/Main/About';
  import Contact from './Pages/Main/Contact';
  import Company from './Pages/Main/Company';
  import Login from './Component/Main-Component/Login'; 
  import Login3 from './Component/Main-Component/Fgpasswd';
  import Register from './Component/Main-Component/Register'; 
  import Fgpasswd from './Component/Main-Component/Fgpasswd'; 
  import Reset from './Component/Main-Component/Reset';
  import Account from './Pages/Main/Account';
  import Accept from './Component/Main-Component/Accept';
  import Reject from './Component/Main-Component/Reject';
  import Verification from './Component/Main-Component/Verification';
  import Admin_dashboard from './Pages/Main/Admin_dashboard';
  import View_details from './Pages/Main/View_details';
  import FAQ_modal from './Component/Main-Component/FAQ_modal';
  import Service_modal from './Component/Main-Component/Add_service_modal';
  import View_all_client from './Component/Main-Component/View_all_client';
  import View_all_application from './Component/Main-Component/View_all_application';
  import Type from './Pages/StepPages/Type';
  import Mode from './Pages/StepPages/ChooseMode';
  import ViewDocuments from './Component/Main-Component/ViewDocuments';
    {/* import Username from './Component/Main-Component/Username'; */}

  function App() {
    const [token, setToken] =  useState();

    

    return (
      <>
      <Router>
        

              <Nav/>
              <ScrollToTop></ScrollToTop>
              <Switch>
                  <Route exact path='/service' component={Service} />
                  <Route exact path='/about' component={About} />
                  <Route exact path='/contact' component={Contact} />
                  <Route exact path='/service/:slug' component={Company} />
                  <Route exact path='/view/:requestId' component={View_details}/>
                  <Route exact path='/login' component={Login} />
                  <Route exact path='/register' component={Register} />
                  <Route exact path='/forgot' component={Fgpasswd} />
                  <Route exact path='/reset' component={Reset} />
                  <Route exact path='/account' component={Account} />  
                  <Route exact path='/admin' component={Admin_dashboard}/>
                  <Route exact path='/apply' component={ApplyStepper}/>
                  <Route exact path='/type' component={Type}/>
                  <Route exact path='/mode' component={Mode}/>
                  <Route exact path='/fill' component={FillPage}/>
                  <Route exact path='/upload' component={UploadDocuments}/>
                  <Route exact path='/book' component={BookAppointment}/>
                  <Route exact path='/payment' component={Payment}/>
                  <Route exact path='/Success' component={Success}/>
                  <Route exact path='/faq' component={FAQ_modal} />
                  <Route exact path="/docs" component={ViewDocuments} />
                  <Route exact path='/history'><History title='History'/></Route>
                  <Route exact path='/admin/clients'><ManageClients title='Manage Clients'/></Route>
                  <Route exact path='/admin/payments'><ManagePayments title='Manage Payments'/></Route>
                  <Route exact path='/admin/application'><ManageApplication title='Manage Applications'/></Route>
                  <Route exact path='/admin/appointment'><ManageAppointments title='Manage Appointments'/></Route>
                  <Route exact path='/admin/query'><ManageQuery title='Manage Query'/></Route>
                  <Route exact path='/admin/faq'><ManageFaq title='Manage Faq'/></Route>
                  <Route exact path='/admin/service'><ManageService title='Manage Service'/></Route>
                  <Route exact path='/admin/offer'><ManageOffer title='Manage Offers'/></Route>
                  <Route exact path='/add' component={Service_modal}/>
                  <Route exact path='/client/:clientId'><View_all_client/></Route>
                  <Route exact path='/application/:applicationId'><View_all_application/></Route>
                  <Route exact path="/" component={Home} />
                  


                  {/* <Route exact path="/user" component={Username} /> */}
            </Switch>
        </Router>      
        </>
    );
  }

  export default App;
