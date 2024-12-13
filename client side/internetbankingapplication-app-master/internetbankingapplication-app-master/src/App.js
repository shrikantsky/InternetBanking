import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

//Pranav


import AdminLogin from './Components/banking/admin/AdminLogin';
import AdminTransaction from './Components/banking/admin/AdminTransaction';


//sHrikant
import AddCustomer from './Components/banking/customer/AddCustomer';
import CustomerWithMinBalance from './Components/banking/admin/CustomerWithMinBalance';
import FindCustomer from './Components/banking/customer/FindCustomer';
import UpdateCustomer from './Components/banking/customer/UpdateCustomer';
import DeleteCustomer from './Components/banking/customer/DeleteCustomer';
import CustMinBalance from './Components/banking/admin/CustMinBalance';

//tanmay //Affan
import CustomerDashboard from './Components/banking/customer/CustomerDashboard';
import Accounts from './Components/banking/accounts/Accounts';
import AccountDetails from './Components/banking/accounts/AccountDetails';
import Withdraw from './Components/banking/transactions/Withdraw';
import Deposit from './Components/banking/transactions/Deposit';
import Transfer from './Components/banking/transactions/Transfer';
import Transactions from './Components/banking/transactions/Transactions';
import Settings from './Components/banking/customer/Settings';
import Homepage from './Components/banking/dashboard/Homepage';





// Beneficiary

import AddBeneficiary from './Components/banking/beneficiary/AddBeneficiary';
import FetchAllBeneficiary from './Components/banking/beneficiary/FetchAllBeneficiary';
import FetchBeneficiary from './Components/banking/beneficiary/FetchBeneficiary';
import UpdateBeneficiary from './Components/banking/beneficiary/UpdateBeneficiary';
import DeleteBeneficiary from './Components/banking/beneficiary/DeleteBeneficiary';



// Nominee

import AddNominee from './Components/banking/nominee/AddNominee';
import FetchAllNominee from './Components/banking/nominee/FetchAllNominee';
import FetchNominee from './Components/banking/nominee/FetchNominee';
import UpdateNominee from './Components/banking/nominee/UpdateNominee';
import DeleteNominee from './Components/banking/nominee/DeleteNominee';



// reshma
import FetchAlltransactionsByAccountId from './Components/banking/reportoftransactions/FetchAlltransactionsByAccountId';
import FetchTransactionByTransactionId from './Components/banking/reportoftransactions/FetchTransactionByTransactionId';
import AdmintransactionById from './Components/banking/reportoftransactions/AdmintransactionById';
import AdminTransactionAccountId from './Components/banking/reportoftransactions/AdminTransactionAccountId';
import AdminAccountIdDate from './Components/banking/reportoftransactions/AdminAccountIdDate';
import ReportTransaction from './Components/banking/transactions/ReportTransaction';
import TransactionByid from './Components/banking/reportoftransactions/TransactionByid';
import TransactionByAccountId from './Components/banking/reportoftransactions/TransactionByAccountId';

//aboutus
import AboutUs from './Components/banking/dashboard/AboutUs';
import ContactUs from './Components/banking/dashboard/ContactUs';










function App() {
  return (


    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path='/customer/add/' element={<AddCustomer />} />
        <Route path='/admin/customer/' element={<CustMinBalance/>} />
        <Route path='/admin/customer/all/:bal' element={<CustomerWithMinBalance />} />
        <Route path='/admin/customer/find/:id' element={<FindCustomer />} />
        <Route path='/admin/customer/update/:id' element={<UpdateCustomer />} />
        <Route path='/admin/customer/delete/:id' element={<DeleteCustomer />} />



        {/* //tanmay //Affan */}

        <Route path='/' element={<Homepage />}></Route>
        <Route path='/customer/dashboard' element={<CustomerDashboard />}></Route>
        <Route path='/customer/accounts/:id' element={<Accounts />}></Route>
        <Route path='/customer/accounts/details/:id' element={<AccountDetails />}></Route>
        <Route path='/customer/withdraw' element={<Withdraw />}></Route>
        <Route path='/customer/deposit' element={<Deposit />}></Route>
        <Route path='/customer/transfer' element={<Transfer />}></Route>
        <Route path='/customer/transactions' element={<Transactions />}></Route>
        <Route path='/customer/settings' element={<Settings />}></Route>

        {/* Pranav */}
        {/* Admin */}
        <Route path='/admin/login' element={<AdminLogin />}></Route>
        <Route path='/admin/transaction' element={<AdminTransaction />}></Route>


        {/* swapnali */}
        {/* beneficiary */}

        <Route path='/customer/account/addbeneficiary' element={<AddBeneficiary />}></Route>
        <Route path='/customer/account/beneficiaries' element={<FetchAllBeneficiary />}></Route>
        <Route path='/customer/account/beneficiary/:id' element={<FetchBeneficiary />}></Route>
        <Route path='/customer/account/beneficiary/update/:id' element={<UpdateBeneficiary />}></Route>
        <Route path='/customer/account/beneficiary/delete/:id' element={<DeleteBeneficiary />}></Route>


        {/* neha */}
        {/* nominee */}

        <Route path='/customer/account/addnominee' element={<AddNominee />}></Route>
        <Route path='/customer/account/nominees' element={<FetchAllNominee />}></Route>
        <Route path='/customer/account/nominee/:id' element={<FetchNominee />}></Route>
        <Route path='/customer/account/nominee/update/:id' element={<UpdateNominee />}></Route>
        <Route path='/customer/account/nominee/delete/:id' element={<DeleteNominee />}></Route>



        {/* Reshma */}
        <Route path="/report" element={<ReportTransaction />} />
        <Route path="/admin/transaction" element={<AdminTransaction />} />


        {/* use for  Admin */}
        <Route path="/admin/transaction/details" element={<AdmintransactionById />}></Route>
        <Route path="/admin/transaction/account" element={<AdminTransactionAccountId />}></Route>
        <Route path="/admin/transaction/acccount/date" element={<AdminAccountIdDate />}></Route>

        <Route path="/admin/transaction/details/:id" element={<TransactionByid/>}></Route>
        <Route path="/admin/transaction/account/:id" element={<TransactionByAccountId/>}></Route>


        {/* use for  Customer */}
        <Route path="/customer/all/transaction/account/:id" element={<FetchAlltransactionsByAccountId />} />
        <Route path="/customer/transaction/details/:id" element={<FetchTransactionByTransactionId />} />

       
          {/* //aboutus */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />

       


















      </Routes>

    </BrowserRouter>

  );
}

export default App;
