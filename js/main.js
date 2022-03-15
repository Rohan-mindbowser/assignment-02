// API URL 
const url = 'https://run.mocky.io/v3/010e898c-a05c-4a0a-b947-2a65b5a267c5';

// selecting main table 
const user_table = document.querySelector("table")




// **************************** Show user details on right side *********************


// function for greeting user 
const greetUser = (first_name)=>{
    const greetings = document.querySelector(".greeting")
    let time = new Date()
    let greet = 'Good';

    if(time.getHours()<12){
        greet = `${greet} Morning ${first_name}`;
    }
    else if(time.getHours() < 18){
        greet = `${greet} Afternoon ${first_name}`;
    }
    else{
        greet = `${greet} Evening ${first_name}`;
    }
    greetings.innerHTML = greet
}

async function userDetailsRightSide(url,id_num = 0){
    const response = await fetch(url);
    const user_details = await response.json()
    const first_name = user_details[id_num]['first_name']
    // console.log(user_details)
    // function call for greeting user 
    greetUser(first_name);


    for(let i=0;i<user_details.length;i++){
        if(user_details[i].id == id_num){
            console.log(user_details[i].id)
        }
    }

    // const avatar = document.createElement('img');

    // avatar.src = user_details[id_num]['avatar']
    // const right_div = document.querySelector(".right_details")
    // right_div.appendChild(avatar)


    // let id = document.createElement("h3");
    // id.innerHTML = `ID : ${user_details[id_num]['id']}`
    // right_div.appendChild(id)

    // let uid = document.createElement("p");
    // uid.innerHTML = `UID : ${user_details[id_num]['uid']}`
    // right_div.appendChild(uid)


    // let dob = document.createElement("p");
    // dob.innerHTML = `DOB : ${user_details[id_num]['date_of_birth']}`
    // right_div.appendChild(dob)

    // let emp_title = document.createElement("h2");
    // emp_title.innerHTML = `TITLE : ${user_details[id_num]['employment']['title']}`
    // right_div.appendChild(emp_title)

    // let address = document.createElement("p");
    // address.innerHTML = `Address : ${user_details[id_num]['address']['city']}, ${user_details[id_num]['address']['state']}, ${user_details[id_num]['address']['country']}`
    // right_div.appendChild(address)


    // let credit_card = document.createElement("p");
    // credit_card.innerHTML = `CC Number : ${user_details[id_num]['credit_card']['cc_number']}`
    // right_div.appendChild(credit_card)

    
    // let subs = document.createElement("h2");
    // subs.innerHTML = `Subscription : ${user_details[id_num]['subscription']['status']}`
    // right_div.appendChild(subs)

}

userDetailsRightSide(url,0)
// **************************** Show user details on right side ends*********************



// **************************** fetching user data in table **********************

async function FetchData(url, table){
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");

    const response = await fetch(url);
    const user_details = await response.json()

    // console.log(user_details)
    let idx_num = 0;
    user_details.forEach(user => {
        // console.log(user)
        const rowElement = document.createElement("tr");

        rowElement.setAttribute('key',user['id'])

        // first_name column
        const first_name = document.createElement("td");
        first_name.textContent = user['first_name']
        rowElement.appendChild(first_name)
        tableBody.appendChild(rowElement)

        // last name column 
        const last_name = document.createElement("td");
        last_name.textContent = user['last_name']
        rowElement.appendChild(last_name)
        tableBody.appendChild(rowElement)

        // username column 
        const username = document.createElement("td");
        username.textContent = user['username']
        rowElement.appendChild(username)
        tableBody.appendChild(rowElement)


        // employement title column 
        const employement_title = document.createElement("td");
        employement_title.textContent = user['employment']['title']
        rowElement.appendChild(employement_title)
        tableBody.appendChild(rowElement)


        // country column 
        const user_country = document.createElement("td");
        user_country.textContent = user['address']['country']
        rowElement.appendChild(user_country)
        tableBody.appendChild(rowElement)

        // view button
        // const view_btn = document.createElement("button");
        // view_btn.textContent = 'View'
        // rowElement.appendChild(view_btn)
        // tableBody.appendChild(rowElement)

        // view_btn.addEventListener('click',userDetailsRightSide(url,idx_num))
    });

    const a = document.getElementsByTagName("tr");
    // console.log(a);

    //SET ONCLICK EVENT ON EACH ROW
    for (let i = 1; i <= user_details.length; i++) {
        a[i].addEventListener('click', function (e) {
            // const id = e.path[1].attributes[0].nodeValue;
            const id = e.target.parentElement.attributes[0].nodeValue;
            userDetailsRightSide(url, i-1);
        });
    }
}

// function call for fetching the data 
FetchData(url,user_table)

// **************************** fetching user data in table ends**********************



