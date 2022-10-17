import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';



const Homepage = () => {
   

    const [players, setPlayer] = useState([])

   
    useEffect(() => {
      

        async function fetchPlayerData () {
            try {
                
                const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2209-ftb-mt-web-ft/players");
                
                const playerData = await response.json(); 
                console.log("I am the translated data from the response: ", playerData)
                console.log("I am the REAL data from the translated data variable", playerData.data.players)

                setPlayer(playerData.data.players)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPlayerData(); 
    }, [])

    return (
        <div>
            <h1>Puppy Bowl</h1>
            
            <div id='mainBody'>
                {
                    players && players.length ? players.map((indivPlayer, idx) => {
                        console.log(indivPlayer)
                        return <div id='pupList' key={idx}>
                             <img src={indivPlayer.imageUrl}></img>
                            <div id='info'>
                                <p>Player: {indivPlayer.id}</p>
                                <p>Name: {indivPlayer.name}</p>
                                <p>Breed: {indivPlayer.breed}</p>
                                <p>Status: {indivPlayer.status}</p> 
                           
                            {/* <p>Created: {indivPlayer.createdAt}</p> */}
                             {/* <p>Img: {indivPlayer.teamId}</p> */}
                             </div>
                        </div>
                    }) : <div>ERRRRRRRRRRRRRROOOOOOOORRRR.</div>
                }
            </div>
          
        </div>
    )
};

ReactDOM.render(<Homepage />, document.getElementById("app"))