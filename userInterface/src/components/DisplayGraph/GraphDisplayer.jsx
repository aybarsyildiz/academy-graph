import NeoVis from "neovis.js";
//https://github.com/neo4j-contrib/neovis.js/
import { useEffect, useState } from "react";
import { Link  } from "react-router-dom";

// function DrawViz(){
//     var config={
//         containerId: "viz",
//         neo4j: {
//             serverUrl: "neo4j+s://18f4b03e.databases.neo4j.io",
//             serverUser: "neo4j",
//             serverPassword: "u1_rMzco54I1jH-Eiz7bEhWV32fiJLhhnmkOzBnHgv4"
//         },
//         labels: {
//             Person:{
//                 label:"name"
//             },
//             Publish:{
//                 label:"name"
//             },
//         },
//         relationships:{
//             INTERACTS:{
//                 value: "Publish"
//             }
//         },
//         initialCypher: `match (n) return n limit 25`,

//     };
//     //get configuration and use them on Neovis
//     var viz = new Neovis(config);
//     console.log(viz);

//     //if there is context in viz render viz else render something else
//     if(viz != null){
//         return viz.render();
//     }
//     else{
//         return(
//             <div>
//                 <h1>Veriler Getirilemedi</h1>
//             </div>
//         )
//     }

// }

export default function DisplayGraph() {
  const [data, setData] = useState([]);

//   const history = useHistory ();
//   const routeChange = () => {
    
//     history('/login');
//   };

  const fetchData = async () => {
    const response = await fetch("http://localhost:5000/api/v1/getNodes");
    const json = await response.json();
    setData(json);
    console.log(json);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="graphDisplayer">
      <div className="graphDisplayerWrapper">
        <div
          className="graphDisplayerLeft"
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <h3 className="graphDisplayerLogo">Academian Graph</h3>
          <Link to="/login" className="loginButton">
            admin girişi
          </Link>
        </div>
        <div className="graphDisplayerReal"></div>
      </div>
    </div>
  );
}
