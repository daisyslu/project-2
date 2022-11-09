//console.log("hello from app.js");
window.addEventListener('load',()=> {
    document.getElementById('proceed').addEventListener('click', ()=>{
        let names = document.getElementById('name').value;
        console.log(names);

        //creaing the object
        let obj = {"number" : names};

        //stringify the object
        let jsonData = JSON.stringify(obj);

        //fetch to route names
        fetch('/names', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)})

        //make a fetch request of type POST so that we can send the (names) info to the server
    })

    document.getElementById('get-players').addEventListener('click',()=>{
        //get info on ALL the players we've had so far
        fetch('/getNames')
        .then(res => res.json())
        .then(data => {
            document.getElementById('player-info').innerHTML = '';
            console.log(data.data);
            for (let i=0; i<data.data.length; i++){
                let string = data.data[i].date + ":" + data.data[i].names;
                let elt = document.createElement('p');
                elt.innerHTML = string;
                document.getElementById('player-info').appendChild(elt);
            }
        })
    })
})