import React, { useEffect, useRef } from "react";
import Neovis from "neovis.js/dist/neovis.js";

const NeoGraph = (props) => {
  const {
    width,
    height,
    containerId,
    backgroundColor,
    neo4jUri,
    neo4jUser,
    neo4jPassword,
  } = props;

  const visRef = useRef();

  useEffect(() => {
    const config={
        containerId: "viz",
        neo4j: {
            serverUrl: "neo4j+s://18f4b03e.databases.neo4j.io",
            serverUser: "neo4j",
            serverPassword: "u1_rMzco54I1jH-Eiz7bEhWV32fiJLhhnmkOzBnHgv4"
        },
        labels: {
            Person:{
                label:"name"
            },
            Publish:{
                label:"name"
            },
        },
        relationships:{
            INTERACTS:{
                value: "Publish"
            }
        },
        initialCypher: `match (n) return n limit 25`,

    };
    const vis = new Neovis(config);
    vis.render();
  }, [neo4jUri, neo4jUser, neo4jPassword]);

  return (
    <div
      id={containerId}
      ref={visRef}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: `${backgroundColor}`,
      }}
    />
  );
};

NeoGraph.defaultProps = {
  width: 600,
  height: 600,
  backgroundColor: "#d3d3d3",
};


export { NeoGraph };