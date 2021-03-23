import React, {useState, useEffect} from 'react';
import Datatable from "./datatable";
import { Blob } from 'react-blob'
// const schedule = require('node-schedule');


// require("es6-promise").polyfill();
// require("isomorphic-fetch");


export default function App() {
    const[data,setDData] = useState([])
    const[filteredData,setFilteredData] = useState([])
    const[q,setQ]= useState("")
    const [searchColumns, setSearchColumns] =useState(["id"])
    const download = function (data) {
        // debugger
        var str = '';
        data.forEach(g => {
         let m = JSON.stringify(g);
         str = str.concat(m)  
        })
        const blob = new Blob([data], {type : 'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'download.txt');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
     };
    
    useEffect(() => {
        fetch('https://northwind.now.sh/api/categories')
        .then(response => response.json())
        .then((json) => {
            setDData(json)
            setFilteredData(json)
        });

    //     schedule.scheduleJob('*/2 * * * * *', function(){
    //         //   console.log('The answer to life, the universe, and everything!');
    //         fetch('https://northwind.now.sh/api/categories')
    //         .then(res=> res.json())
    //         .then(json => {
    //             setDData(json)
    //             setFilteredData(json)
    //     }); 
    // })
    }, []);

    function onButtonClick(){
        if(q.length === 0){
            setFilteredData(data)
            return;
        }
        setFilteredData(search(data));
    }

//     (function(){
//     const button = document.getElementById('myButton');
//     button.addEventListener('click',getReport);
// })();\

// downloadTxtFile = () => {
//     const element = document.createElement("a");
//     const file = new Blob([document.getElementById('item').value],    
//                 {type: 'json'});
//     element.href = URL.createObjectURL(file);
//     element.download = "myFile.txt";
//     document.body.appendChild(element);
//     element.click();
//   }

    function search(rows) {
        return rows.filter((row) => 
       searchColumns.some(
           (column)=> 
            row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
       ) 
    );
}

  const columns = data[0] && Object.keys(data[0]);
//   download(data);
    return (
    <div>
        <div>
            <input type="text" value={q} onChange={(e) => setQ(e.target.value)}/>
            {columns && 
            columns.map((column) => (
                <label>
                <input type="checkbox" checked = {searchColumns.includes(column)}
                onChange={(e) => {
                    const checked = searchColumns.includes(column)
                    setSearchColumns(prev => checked
                     ? prev.filter(sc => sc !== column)
                     :[...prev, column])

                }}/>

                {column}</label>)
            )}
         </div>
         <button onClick={() => onButtonClick()} >Search</button>
         <button onClick={() => download(filteredData)} >download</button>
         {/* <button id = 'myButton'>Download</button> */}
        <div>
            <Datatable data={filteredData} />
        </div>
    </div>
    );
}   
