document.getElementById('error-text').style.display = 'none';

document.getElementById('phoneDetailContainer').style.display = 'none';

document.getElementById('showMore').style.display = 'none';


document.getElementById('spinner').style.display = 'none';


document.getElementById('phoneSearchBtn').addEventListener("click", function (event) {

    event.preventDefault();

    const searchField = document.getElementById("phoneInput");

    const searchedPhone = searchField.value;

    searchField.value = '';

    document.getElementById('spinner').style.display = 'block';

    document.getElementById('error-text').style.display = 'none';

    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchedPhone}`)

        .then(response => response.json())

        .then(function (response) {

            document.getElementById('spinner').style.display = 'none';

            let totalRecords = response.data;

            let totalNoOfPhones = document.getElementById("noOfPhones");

            if (totalNoOfPhones) {
                totalNoOfPhones.innerHTML = `${totalRecords.length} results found for the searched Brand!`;
            }


            if (`${totalRecords.length}` > 20) {
                document.getElementById('showMore').style.display = 'block';
                //show first 20 results


            } else {
                document.getElementById('showMore').style.display = 'none';
            }

            let phoneSD = '';

            for (const phone of totalRecords) {


                let phoneSDSegment = `<div class="col-sm-6 col-md-4">
            <div class="card">

            <img class="card-img-top" src="${phone.image}" alt="Card image cap">

            <div class="card-body">
            <h4 id ="phoneName">${phone.phone_name}</h4>  
            <h4 id ="phoneName">${phone.brand}</h4>  
            <button id ="showDetailsBtn" type="submit" onclick="loadPhoneBySlug('${phone.slug}')">Show Details</button>
            </div>

                    </div>
                    </div>`;

                phoneSD += phoneSDSegment;

            }

            let phoneShortDesc = document.querySelector('#phonesContainer');
            phoneShortDesc.innerHTML = phoneSD;

        })
}, false)


toggleSpinner('block');
toggleSeachResult('none');

//.catch(error => displayError(error))

const displayError = error => {
    document.getElementById('error-text').style.display = 'none';

}


const loadPhoneBySlug = slug => {

    document.getElementById('phoneDetailContainer').style.display = 'block';

    const url = `https://openapi.programming-hero.com/api/phone/${slug}`

    fetch(url)

        .then(response => response.json())

        .then(function (response) {

            const phone = response.data;

            const phoneDiv = document.getElementById('phoneDetailContainer');

            phoneDiv.innerHTML = `
                <h5>Selected Phone's Details:</h5>
            <p id="name-info"><b>Phone Name:</b> ${phone.name}</p>
            <p id="releaseDate-info"></p>
            <p class ="mainFeatures-info"></p>
            <p class ="sensors-info"></p>
            <p class ="others-info"></p>
            `;

            //  Display these infos conditionally
            if (phone.releaseDate !== undefined) {
                document.getElementById('releaseDate-info').style.display = 'block';
                document.getElementById('releaseDate-info').innerHTML = `<b>Release date: </b>${phone.releaseDate}`;
            } else {
                document.getElementById('releaseDate-info').style.display = 'block';
                document.getElementById('releaseDate-info').innerHTML = 'No Release date found';
            }

            if (phone.mainFeatures !== undefined) {
                document.getElementsByClassName('mainFeatures-info').style.display = 'block';
                document.getElementsByClassName('mainFeatures-info').innerHTML = `<b>Main Features: </b>${phone.mainFeatures}`;
            } else {
                document.getElementsByClassName('mainFeatures-info').style.display = 'block';
                document.getElementsByClassName('mainFeatures-info').innerHTML = 'No Main Features found';
            }


            if (phone.sensors !== undefined) {
                document.getElementsByClassName('sensors-info').style.display = 'block';
                document.getElementsByClassName('sensors-info').innerHTML = `<b>Sensors: </b>${phone.sensors}`;
            } else {
                document.getElementsByClassName('sensors-info').style.display = 'block';
                document.getElementsByClassName('sensors-info').innerHTML = 'No Sensors found';
            }


            if (phone.others !== undefined) {
                document.getElementsByClassName('others-info').style.display = 'block';
                document.getElementsByClassName('others-info').innerHTML = `<b>Others: </b>${phone.others}`;
            } else {
                document.getElementsByClassName('others-info').style.display = 'block';
                document.getElementsByClassName('others-info').innerHTML = 'No others info found';
            }


        })

}