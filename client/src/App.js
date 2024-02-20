import logo from './logo.svg';
import {useEffect, useState} from 'react'
import './App.css';
import Auth from './components/auth/Auth';

function App() {

  // const [loading, setIsLoading] = useState(true);
  // const [data, setData] = useState({});

  // useEffect(() => {
  //   console.log("use ffect called")
  //   fetch("/api").then((data) => {
  //     console.log("data from fetch = ", data.json())
  //     console.log('data = ', data);

  //     setIsLoading(false);
  //     setData(data);
  //   }).catch((e) => console.log("error getting data from api. ", e))
  // }, [])

  return (
    <div className="App">
      {/* <Auth data={data}/> */}
    </div>
  );
}

export default App;
