import { useRef } from "react"

export default function EditGraph(){
    const Academician = useRef();
    const Publish = useRef();
    
    const sendPublish = async () => {
        const response = await fetch(
            
            "http://localhost:5000/api/v1/createPublish",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: Academician.current.value,
                    publish: Publish.current.value
                })
            }
        );
        const json = await response.json();
        console.log(json);
    }
    

    return(
        <div className="graphEditor">
            <form>
                <input placeholder="Akademisyen İsmi" required ref={Academician}></input>
                <input placeholder="Yayın İsmi" required ref={Publish}></input>
                <button onClick={sendPublish}>Gönder</button>
            </form>
        </div>
    )

}