


//FORMAT FOR GET REQUEST

 const response2 = await fetch("http://api/data");


//  format for post request


 const response = await fetch("http://api/data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "rj",
            age: 30
        })
    });


    //PATCH

    const response3= await fetch("http://api/data", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: "raj",
        })
    });