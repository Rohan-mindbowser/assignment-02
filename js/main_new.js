// selecting main table
const user_table = document.querySelector("table");

async function getUsers() {
  //FETCHING DATA
  const response = await fetch(
    "https://run.mocky.io/v3/010e898c-a05c-4a0a-b947-2a65b5a267c5"
  );
  const data = await response.json(); // PARSING JSON RESPONSE INTO NATIVE JS OBJ.

  return data;
}

getUsers().then((users) => {
  //   console.log(users);
  FetchData(users, user_table);
});

// function for greeting user
const greetUser = (first_name) => {
  const greetings = document.querySelector(".greeting");
  let time = new Date();
  let greet = "Good";

  if (time.getHours() < 12) {
    greet = `${greet} Morning ${first_name}`;
  } else if (time.getHours() < 18) {
    greet = `${greet} Afternoon ${first_name}`;
  } else {
    greet = `${greet} Evening ${first_name}`;
  }
  greetings.innerHTML = greet;
};

// **************************** fetching user data in table **********************

function FetchData(users, table) {
  const tableHead = table.querySelector("thead");
  const tableBody = table.querySelector("tbody");

  // console.log(user_details)
  let idx_num = 0;
  users.forEach((user) => {
    // console.log(user)
    const rowElement = document.createElement("tr");

    rowElement.setAttribute("key", user["id"]);

    // first_name column
    const first_name = document.createElement("td");
    first_name.textContent = user["first_name"];
    rowElement.appendChild(first_name);
    tableBody.appendChild(rowElement);

    // last name column
    const last_name = document.createElement("td");
    last_name.textContent = user["last_name"];
    rowElement.appendChild(last_name);
    tableBody.appendChild(rowElement);

    // username column
    const username = document.createElement("td");
    username.textContent = user["username"];
    rowElement.appendChild(username);
    tableBody.appendChild(rowElement);

    // employement title column
    const employement_title = document.createElement("td");
    employement_title.textContent = user["employment"]["title"];
    rowElement.appendChild(employement_title);
    tableBody.appendChild(rowElement);

    // country column
    const user_country = document.createElement("td");
    user_country.textContent = user["address"]["country"];
    rowElement.appendChild(user_country);
    tableBody.appendChild(rowElement);

    // view button
    // const view_btn = document.createElement("button");
    // view_btn.textContent = 'View'
    // rowElement.appendChild(view_btn)
    // tableBody.appendChild(rowElement)

    // view_btn.addEventListener('click',userDetailsRightSide(url,idx_num))
  });

  createDtailsCard(users[0].id, users);

  const a = document.getElementsByTagName("tr");
  // console.log(a);

  //SET ONCLICK EVENT ON EACH ROW
  for (let i = 1; i <= users.length; i++) {
    a[i].addEventListener("click", function (e) {
      // const id = e.path[1].attributes[0].nodeValue;
      const id = e.target.parentElement.attributes[0].nodeValue;
      createDtailsCard(id, users);
    });
  }
}

// **************************** fetching user data in table ends**********************

const createDtailsCard = (id, users) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      let avatar = document.getElementById("avatar");
      avatar.setAttribute("src", users[i].avatar);

      greetUser(users[i]["first_name"]);
      //GETTING ELEMENTS TO SET DATA
      let id = document.getElementById("id");
      let uid = document.getElementById("uid");
      let pass = document.getElementById("pass");
      let uname = document.getElementById("uname");
      let username = document.getElementById("username");
      let mail = document.getElementById("mail");
      let mf = document.getElementById("mf");
      let phno = document.getElementById("phno");
      let sin = document.getElementById("sin");
      let dob = document.getElementById("dob");
      let title = document.getElementById("title");
      let skill = document.getElementById("skill");
      let addr = document.getElementById("addr");
      let ccn = document.getElementById("ccn");
      let ss = document.getElementById("ss");

      //SETTING DATA TO SPAN ELEMENTS
      id.innerHTML = users[i].id;
      uid.innerHTML = users[i].uid;
      pass.innerHTML = users[i].password;
      uname.innerHTML = `${users[i].first_name} ${users[i].last_name}`;
      username.innerHTML = users[i].username;
      mail.innerHTML = users[i].email;
      mf.innerHTML = users[i].gender;
      phno.innerHTML = users[i].phone_number;
      sin.innerHTML = users[i].social_insurance_number;
      dob.innerHTML = users[i].date_of_birth;
      title.innerHTML = users[i].employment.title;
      skill.innerHTML = users[i].employment.key_skill;
      addr.innerHTML = `${users[i].address.city}, ${users[i].address.state}, ${users[i].address.country}`;
      ccn.innerHTML = users[i].credit_card.cc_number;
      ss.innerHTML = users[i].subscription.status;

      //SCROLLING ONLY WHEN CARDS ARE ON TOP OF EACH OTHER || MOBILE VIEW
      if (document.documentElement.clientWidth <= 995) {
        scrollToDetails();
      }
    }
  }
};

//SCROLL FUNCTION

const scrollToDetails = () => {
  let pos = document.querySelector(".full_user_details");
  let elemPos = pos.getBoundingClientRect();
  console.log(elemPos);
  window.scrollTo(0, elemPos.top);
};
