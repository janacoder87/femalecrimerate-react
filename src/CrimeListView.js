import React, { useState, useEffect } from "react";
import axios from "axios";
import crimedetails from "./crimedataonwomen.json";

const CrimeListView = ({ state }) => {
  const [allInfo, setAllInfo] = useState([]);
  const getInfo = async () => {
    const { data } = await axios.get(      
      "crimelist"
    );
   
    setAllInfo(data);
  };
  
  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="container-fluid">
       
      {state && allInfo.length > 0 && (
        <>
          
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">State</th>
                <th scope="col">Year</th>
                <th scope="col">No of Rape cases</th>
                <th scope="col">Kidnap And Assault</th>
                <th scope="col">Dowry Deaths</th>
                <th scope="col">Assault against women</th>
                <th scope="col">Assault against modesty of women</th>
                <th scope="col">Domestic violence</th>
                <th scope="col">Women Trafficking</th>
              </tr>
            </thead>
            <tbody>
              {allInfo
                .filter((name) => name["state"] === state)
                .map((el, index) => (
                  <tr key={index}>
                    <td>{el.Year}</td>
                    <td>{state}</td>
                    <td>{el.Rape}</td>
                    <td>{el.KA}</td>
                    <td>{el.DD}</td>
                    <td>{el.AoW}</td>
                    <td>{el.AoM}</td>
                    <td>{el.DV}</td>
                    <td>{el.WT}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default CrimeListView;
