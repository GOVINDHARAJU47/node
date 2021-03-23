// import React from 'react';

// class App extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             items:[],
//             isLoaded: false,
//         }
//     }

//     componentDidMount() {

//         fetch('https://northwind.now.sh/api/categories')
//             .then(res=> res.json())
//             .then(json => {
//                 this.setState({
//                     isLoaded: true,
//                     items: json,

//             })

//         });
//     }
//     render(){

//         var{isLoaded,items} = this.state;

//         if(!isLoaded){
//             return <div>Loading...</div>;
//         }
//         else{
//             return(
//                 <div className = 'App'>

//                     <ul>
//                         {items.map(item =>(
//                             <li key ={item.id}>

//                                 id:{item.id} | name:{item.name} | description:{item.description}

//                             </li>
//                         ))};

//                     </ul>

//                </div>
//             );
//         }
//     }


// }

// export default App;
