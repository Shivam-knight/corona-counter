import React from 'react';

// import Cards from './components/Cards/Cards';
// import Charts from './components/Chart/Chart';
// import CountryPicker from './components/CountryPicker/CountryPicker';

import coronaImage from './images/image.png';
import{
    Cards,Chart,CountryPicker
} from './components';
import styles from './App.module.css';
import{fetchData} from './api';
import ReactGA from 'react-ga'

function initilizeAnalytics(){
    ReactGA.initialize('UA-163807935-1')
    ReactGA.pageview('/app')
}
class App extends React.Component{


    state= {
        data:{},
        country:'',
    }
    async componentDidMount(){
        const fetchedData = await fetchData();
        this.setState({data:fetchedData});
    }
    handleCountryChange =async(country)=>{
        const fetchedData=await fetchData(country);
        this.setState({data:fetchedData, country: country});
    }
    render(){
        initilizeAnalytics();
        const{data, country}=this.state;
        return(

            <div className={styles.container}>
                <img className={styles.image} src = {coronaImage} alt="COVID-19"/>
                <Cards data={data}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
                <div class="row">
                    <div class="col text-light text-center">
                        <p>&copy; Copyright 2020,Made by Shivam bhatnagar</p>
                    </div>
                 </div>

            </div>
        )
    }
}



export default App;
