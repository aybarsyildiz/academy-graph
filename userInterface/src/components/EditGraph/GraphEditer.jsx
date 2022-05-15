import { useRef } from "react"

export default function EditGraph(){
    const Academician = useRef();
    const Publish = useRef();
    
    const sendPublish = async () => {
        const response = await fetch(
            
            "http://localhost:5000/api/v1/createRelation",
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
    const sendAcademician = async () => {
        const response = await fetch(
            
            "http://localhost:5000/api/v1/createNewAcademician",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: Academician.current.value,
                })
            }
        );
        const json = await response.json();
        console.log(json);
    }
    const sendJustPublish = async () => {
        const response = await fetch(
            
            "http://localhost:5000/api/v1/createPublish",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: Academician.current.value,
                })
            }
        );
        const json = await response.json();
        console.log(json);
    }
    

    return(
        <div className="graphEditor" style={{ padding: '20px'}}>
            <h3>Akademisyen Ekle</h3>
            <form>
                <input placeholder="Akademisyen İsmi" required ref={Academician}></input>
                <button onClick={sendAcademician}>Gönder</button>
            </form>
            <h3>Akademisyen Yayın Ekle</h3>
            <form>
                <input placeholder="Akademisyen İsmi" required ref={Academician}></input>
                <input placeholder="Yayın İsmi" required ref={Publish}></input>
                <button onClick={sendPublish}>Gönder</button>
            </form>
            <h3>Yayın Oluştur</h3>
            <form>
                <input placeholder="Yayın İsmi" required ref={Publish}></input>
                <button onClick={sendJustPublish}>Gönder</button>
            </form>
            <h3>Akademisyen Sil</h3>
            <form>
                <input placeholder="Akademisyen İsmi" required ref={Publish}></input>
                <button onClick={sendPublish}>Gönder</button>
            </form>
            <h3>Akademisyen Yayını Sil</h3>
            <form>
                <input placeholder="Akademisyen İsmi" required ref={Academician}></input>
                <input placeholder="Yayın İsmi" required ref={Publish}></input>
                <button onClick={sendPublish}>Gönder</button>
            </form>
        </div>
    )

}