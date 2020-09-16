fetch("https://andrehaguiar.github.io/AppZenvaLove/jsons/birds.json", {
    credentials: 'include', // Useful for including session ID (and, IIRC, authorization headers)
})
    .then(res => res.json())
    .then(data => {
        users = data
        return users;
    })
    .catch(error => console.error(error))

window.addEventListener('load', function () {

    function setContent(args = { "gender": 'A', "flock": '' }) {
        let resultsHTML = '';
        let gender = args.gender;
        let flock = args.flock;
        for (let u of users) {
            if (gender == 'A' || gender == u.gender) {
                if (flock == '' || flock == u.flock) {
                    resultsHTML += `
                    <div class="person-row">
                        <div id="avatar">
                            <img src="../img/${u.avatar}" alt="${u.name}" />
                        </div>
                        <div class="person-info">
                            <div id="name">${u.name} - ${u.flock}</div>
                            <hr>
                            <div>${u.ability}</div>
                        </div>
                        <button class="btn">Add as friend</button>
                    </div>`;
                }
            }
        }

        return resultsHTML;
    }

    const searchBtn = document.getElementById('searchBtn');
    const results = document.getElementById('results');

    results.innerHTML = setContent();

    let search = function () {

        const flockField = document.getElementById('flock');
        let flock = flockField.value;

        const genderField = document.getElementById('gender');
        let genderId = genderField.selectedIndex;
        let gender = genderField.options[genderId].value;

        let args = { "flock": flock, "gender": gender };

        results.innerHTML = setContent(args);
    }

    searchBtn.addEventListener('click', search);

});
