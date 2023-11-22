import logo from './logo.svg';
import './App.css';
import Transfer from './components/Transfer';
import MyNav from './components/Navbar';
import {Switch,Route} from "react-router-dom"
import Transaction from './components/Transaction';
import Addresses from './components/Addresses';
import Wallet from './components/Wallet';
function App() {
  return (
    <>
    <div className='App'>
      	<MyNav/>
		<Switch>
			<Route path="/transaction">
				<Transaction/>				
			</Route>
			<Route path="/addresses" exact>
				<Addresses/>
			</Route>
			<Route path="/addresses/:add">
				<Transfer/>
			</Route>
			<Route path="*">
				{/* Render your default component here */}
				<Wallet/>
			</Route>
        </Switch>
    </div>
    </>
  );
}

export default App;
