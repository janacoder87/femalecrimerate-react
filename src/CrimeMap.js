import Home from "./Home";
import { RadioSVGMap } from "react-svg-map";
// import "react-svg-map/lib/index.css";
import India from "@svg-maps/india";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import stategeo from "./state.json";
import states from "./states.json";



const CrimeMap = () => {

    const [stateName, setStateName] = useState('Tamil Nadu');
    const [selectedState, setselectedState] = useState('Tamil Nadu');
    const [getAllInfo, setAllInfo] = useState([]);
    const [getStateCrimeData, setStateCrimeData] = useState([]);
    const [selectedStateStyle, setSelectedStateStyle] = useState([]);
    const mapSvg = useRef(null);
    const getTotalInfo = async () => {
    const { data } = await axios.get(
        "crimelist"
    );
    setAllInfo(data);
    onFindAverageData();
    };
    
    useEffect(() => {
        getTotalInfo();
      }, []);

    const onFindAverageData = () =>{
        let totalCrime = 0
        let averageCrime;
        const statesTotalCrime = [];
        let heapData = [];
        states.forEach(function(item, index){
            let stateTotalList = getAllInfo.filter((stateList) => stateList['state'] === states[index])
           let sum = stateTotalList.reduce(function (x, y) {
                return x + y.Rape + y.KA + y.AoM + y.AoW + y.DD + y.DV + y.WT;
            }, 0);
            totalCrime += sum;
            statesTotalCrime.push({state :states[index],total:sum,style:""})
            // console.log(totalCrime);
        })
        const maxArray = statesTotalCrime.map(ele => ele.total);        
        averageCrime = Math.round(totalCrime / 34);        
        heapData ={
                    Average:averageCrime,
                    MaxValue:Math.max(...maxArray),
                     MinValue:Math.min(...maxArray),
                    LowAvg:averageCrime - 60000,
                    AboveAvg:averageCrime+200000
                };
        for(const item of statesTotalCrime){
            if(item.total < heapData.Average){
                if(item.total < heapData.LowAvg){
                    item.style ="svg-location-low"
                }
                else{
                    item.style ="svg-location-belowavg"
                }
            }
            if(item.total > heapData.Average){
                if(item.total < heapData.AboveAvg){
                    item.style ="svg-location-above-avg"
                }
                else{
                    item.style ="svg-location-max"
                }
            }
        }
        mapSvg.current.locations.forEach(function(svgEle,index){
            for(const item of statesTotalCrime){
                if(svgEle.getAttribute('name') === item.state){
                    svgEle.className.baseVal = item.style;                    
                }
            }         

        });
    }

    const onLocationClick = (location) => {        
        setselectedState(stategeo.filter((stateList) => stateList['name'] === location.getAttribute("name")));
        setStateName(location.getAttribute("name"));
        setSelectedStateStyle(location.getAttribute("class"));
        let selectedStateData = getAllInfo.filter((stateDetails) => stateDetails['state'] === location.getAttribute("name"));
         let stateData = [{
            "Rape" : selectedStateData.reduce((totalData, currentValue) => totalData + currentValue.Rape, 0),
            "KidnapAndAssault" : selectedStateData.reduce((totalData, currentValue) => totalData + currentValue.KA, 0),
            "DowryDeaths" : selectedStateData.reduce((totalData, currentValue) => totalData + currentValue.DD, 0),
            "Assaultagainstwomen" : selectedStateData.reduce((totalData, currentValue) => totalData + currentValue.AoW, 0),
            "Assaultagainstmodestyofwomen" : selectedStateData.reduce((totalData, currentValue) => totalData + currentValue.AoM, 0),
            "Domesticviolence" : selectedStateData.reduce((totalData, currentValue) => totalData + currentValue.DV, 0),
            "WomenTrafficking" : selectedStateData.reduce((totalData, currentValue) => totalData + currentValue.WT, 0)
        }]
        setStateCrimeData(stateData);
    };
    const onLocationClickRadio = (event) => {
        console.log("Test");
    }
  return (
    <div className="container-fluid">
        
        <div>
            <div className="centermap">
                <div className="india-map">
                    <RadioSVGMap map={India} ref={mapSvg} className="svg-map" onLocationFocus={onLocationClickRadio} locationClassName="svg-location" viewBox ='0 0 500 500' onChange={onLocationClick}/>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="state-container">
                        <path transform='translate(0,0)' id={selectedState[0].id} d={selectedState[0].d} className={selectedStateStyle}></path>
                    </svg>
                    {getStateCrimeData.length > 0 &&(
                      <>
                        <table className="state-crime-container">
                            <thead>
                                <tr>
                                    <th scope="col">Crime</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>                    
                                <tr>
                                    <td>No of Rape cases</td>
                                    <td>{getStateCrimeData[0].Rape}</td>
                                </tr>  
                                <tr>
                                    <td>Kidnap And Assault</td>
                                    <td>{getStateCrimeData[0].KidnapAndAssault}</td>
                                </tr> 
                                <tr>
                                    <td>Dowry Deaths</td>
                                    <td>{getStateCrimeData[0].DowryDeaths}</td>
                                </tr> 
                                <tr>
                                    <td>Assault against women</td>
                                    <td>{getStateCrimeData[0].Assaultagainstwomen}</td>
                                </tr> 
                                <tr>
                                    <td>Assault against modesty of women</td>
                                    <td>{getStateCrimeData[0].Assaultagainstmodestyofwomen}</td>
                                </tr> 
                                <tr>
                                    <td>Domestic violence</td>
                                    <td>{getStateCrimeData[0].Domesticviolence}</td>
                                </tr> 
                                <tr>
                                    <td>Women Trafficking</
                                    td>
                                    <td>{getStateCrimeData[0].WomenTrafficking}</td>
                                </tr>                      
                            </tbody>
                        </table>
                      </>  
                    )}
                    
                </div>  
                 
            </div>
            <h3 className="text-center display-2">{stateName}</h3>
            
        </div>
        <Home state={stateName} allInfo={getAllInfo} />
    </div>
  );
};
export default CrimeMap;

