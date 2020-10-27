const playerOne = document.querySelector(".player-one");
const playerTwo = document.querySelector(".player-two");
const submitBtn = document.getElementById("continue");
const titleName = document.querySelector("#title");
const battle = document.getElementById("battles");
const body = document.getElementById("body");
const inputGroup = document.getElementById("inputgroup");
const containerGroup = document.getElementById("containerGroup");
const confirmPlayer = document.querySelector(".confirmit");
const buttonGroup = document.querySelector('#buttongroup');
const initiateBattle = document.querySelector('.initiatebattle');
const reselectPlayer = document.querySelector('.reselectplayer')
const loader = document.querySelector('.loading')
console.log(loader)
// console.log(userInput)
function enterPlayer(e) {
    e.preventDefault();
    userName1 = playerOne.value;
    userName2 = playerTwo.value;

    if (submitBtn.innerHTML == "Get Started") {
        titleName.innerHTML = "Player One";
        battle.style.display = "none";
        playerOne.style.display = "block";
        playerTwo.style.display = "none";
        submitBtn.innerHTML = "continue";
        playerOne.focus()
    } else if (userName1 !== "" && playerOne.style.display == "block") {
        
            handleResponse()
            
    } else if (userName2 !== "" && playerTwo.style.display == "block") {
                    handleAnotherResponse()
            
    }
};

function handleResponse() {
    fetch(`https://api.github.com/users/${userName1}`)
      .then(res => {
        if (res.ok) {
          return res.json()
        .then((data) => {
          console.log("data", data);
    
         let user_one = document.createElement("div");
         user_one.innerHTML = `<p class="plays" id="playone">Player One</p>
                                  <div id="container">
                                  <li id="scoreOne"></li>
                                  <li><img src="${data.avatar_url}"></li>
                                  <li>Name: ${data.login}</li>
                                  <li>Username: ${userName1}</li>
                                  <li>Location: ${data.location}</li>
                                  <li>Company: ${data.company}</li>
                                  <li>Followers: ${data.followers}</li>
                                  <li>Following: ${data.following}</li>
                                  <li>Public Repos: ${data.public_repos}</li>
                                  <li>Blog: ${data.blog}</li>
                                  </div>`;
                    //   inputGroup.style.display = "none";
                    containerGroup.appendChild(user_one);
                    titleName.innerHTML = "Player Two";
                    playerOne.style.display = "none";
                    playerTwo.style.display = "block";
            
                    const element = document.getElementById("scoreOne");
                    const scoreValue = "value1";
                    getWinner(element, data, data.followers, data.following, data.public_repos, scoreValue)
                });

        } else {
          return Promise.reject({ 
            status: res.status,
            statusText: res.statusText
        })
      .catch(error => {
        if(error.status === 404){
            console.log('error is', error)
            // document.getElementById('msg').innerHTML = 'Enter a valid username'
            alert('Please enter a valid username')
            return false
        }
    })
        }
      })
  }

  function handleAnotherResponse(res) {
    fetch(`https://api.github.com/users/${userName2}`)
      .then(res => {
        if (res.ok) {
            return res.json()
            .then((data) => {
                let user_two = document.createElement("div");
                user_two.innerHTML = `<p class="plays" id="playtwo">Player Two</p>
                           <div id="container2">
                           <li id="scoreTwo"></li>
                          <li><img src="${data.avatar_url}"></li>
                          <li>Name: ${data.login}</li>
                          <li>Username: ${userName2}</li>
                          <li>Location: ${data.location}</li>
                          <li>Company: ${data.company}</li>
                          <li>Followers: ${data.followers}</li>
                          <li>Following: ${data.following}</li>
                          <li>Public Repos: ${data.public_repos}</li>
                          <li>Blog: ${data.blog}</li>
                          </div>`;
                          
                inputGroup.style.display = "none";
                confirmPlayer.style.display = "block";
                loader.classList.add('showItem');
                
                containerGroup.appendChild(user_two);

                containerGroup.style.display = "flex";
                const element = document.getElementById("scoreTwo");
                const scoreValue = "value2";
                getWinner(element, data, data.followers, data.following, data.public_repos, scoreValue)
                buttonGroup.style.display = "block";
                setTimeout(function () {
                    loader.classList.remove('showItem')
                }, 500)
            });
        }else{
            return Promise.reject({ 
                status: res.status,
                statusText: res.statusText
            })
          .catch(error => {
            if(error.status === 404){
                console.log('error is', error)
                // document.getElementById('msg').innerHTML = 'Enter a valid username'
                alert('Please enter a valid username')
                return false
    
        }
    })
}
})
  };
function getWinner(element, data, firstScore, secondScore, thirdScore, scoreValue) {
    firstScore = Number.parseInt(data.followers)
    secondScore = Number.parseInt(data.following)
    thirdScore = Number.parseInt(data.public_repos);
    totalScore = (firstScore + secondScore + (thirdScore / 2));
    element.innerHTML = `<h4>Score: <span id="${scoreValue}">${totalScore}</span></h4>`
};



submitBtn.addEventListener("click", enterPlayer);
reselectPlayer.addEventListener('click', function () {
    window.location.reload()
    // inputGroup.style.display = "block"
});

initiateBattle.addEventListener('click', function () {
    if (initiateBattle.innerHTML === "Initiate battle") {
        let scoreOne = document.getElementById("scoreOne");
        let scoreTwo = document.getElementById("scoreTwo");
        loader.classList.add('showItem')
        scoreOne.style.display = "block";
        scoreTwo.style.display = "block";
        detectWinner();
        reselectPlayer.style.display = "none";
        setTimeout(function () {
            loader.classList.remove('showItem')
        }, 1000)
        window.scrollTo({top: 0, behavior: 'smooth'});
        initiateBattle.innerHTML = "Start over"
    } else if (initiateBattle.innerHTML === "Start over") {
        window.location.reload()
    }
});

function detectWinner() {
    let firstPlayer = document.querySelector('#playone');
    let secondPlayer = document.querySelector('#playtwo');
    let value1 = document.getElementById("value1")
    let value2 = document.getElementById("value2")
    value1 = Number.parseInt(value1.innerText)
    value2 = Number.parseInt(value2.innerText)

    if (value1 > value2) {
        firstPlayer.innerHTML = "Winner";
        secondPlayer.innerHTML = "Loser";
    } else if (value2 > value1) {
        firstPlayer.innerHTML = "Loser";
        secondPlayer.innerHTML = "Winner";
    }


    //firstPlayer.innerHTML = "Winner";
    //secondPlayer.innerHTML = "Loser";    
    
};