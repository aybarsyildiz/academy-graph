import { createDriver } from 'use-neo4j';

export default function GraphDisplayer() {
    const [data, setData] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [graphData, setGraphData] = useState([]);
    const [graphType, setGraphType] = useState("");
    const [graphTitle, setGraphTitle] = useState("");
    const [graphXAxis, setGraphXAxis] = useState("");
    const [graphYAxis, setGraphYAxis] = useState("");

    const fetchData = async () => {
        setIsFetching(true);
        setError(false);
        setErrorMessage("");
        const response = await fetch(
            "http://localhost:5000/api/v1/graph/getGraphData"
        );
        const json = await response.json();
        setData(json);
        setIsFetching(false);
        setGraphData(json.graphData);
        setGraphType(json.graphType);
        setGraphTitle(json.graphTitle);
        setGraphXAxis(json.graphXAxis);
        setGraphYAxis(json.graphYAxis);
    }
    useEffect(() => {
        fetchData();
    }
    , []);
    return (
        <div className="graphDisplayer">
            <div className="graphDisplayerWrapper">
                <div className="graphDisplayerLeft">
                    <h3 className="graphDisplayerLogo">Academian Graph</h3>
                </div>
                <div className="graphDisplayerRight">
                    <div className="graphDisplayerBox">
                        <div className="graphDisplayerTitle">{graphTitle}</div>
                        <div className="graphDisplayerXAxis">{graphXAxis}</div>
                        <div className="graphDisplayerYAxis">{graphYAxis}</div>
                        <div className="graphDisplayerGraph">
                            <Graph data={graphData} type={graphType} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
