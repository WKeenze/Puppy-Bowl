import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

// const playerArr = [players, ]

const Homepage = () => {
    // STEP 1 - Declaring your state
    // This step is kind of like setting up and renting your empty storefront. 

    const [players, setPlayer] = useState([])

    // STEP 2 - FETCHING YOUR DATA 
    // This step is kind of like calling up your middleman who can get you a bunch of products to sell in your storefront. 

    useEffect(() => {
        // Fetch some data and then set the state

        async function fetchPlayerData () {

            // THE try/catch block of code does 2 things
                // 1) The try section will literally TRY to run some chunk of code 
                // 2) The catch section will run if the TRY section fails to run
                    // Note: You will notice that inside of the catch chunk of code, we have a parameter called error. This parameter contains information about the error that just occured in your try block.

            try {
                // STEP 2A) Write a fetch method that will get some data from a specific API url. 
                const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2209-ftb-mt-web-ft/players");
                // console.log("This is our response var: ", response)

                // STEP 2B) We need to convert our promise response into a language that is readable by JavaScript (aka JSON) 
                const playerData = await response.json(); 
                console.log("I am the translated data from the response: ", playerData)
                console.log("I am the REAL data from the translated data variable", playerData.data.players)

                // STEP 2C) Save the data from the response promise to your state. 
                setPlayer(playerData.data.players)
            } catch (error) {
                console.log(error)
            }
        }
        fetchPlayerData(); 
    }, [])

    // STEP 3: Once you have your data inside of your state, now we want to show our users all of that data. 
    // This step is kind of like, once you get all your products to sell delivered to your storefront, you set up your storefront and display all of your products on the floor. 
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