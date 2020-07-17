// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Fetch and add comments to the page.
 */
function getComments() {
  fetch('/data').then(response=>response.json()).then((data)=> {
      const comments = document.getElementById('data-container');
      comments.innerHTML = '';
      
      // Display the maximum number of comments
      for (let i = 0; i < data.length; i++) {
          // Format i comments in a list and display to the webpage.
          if(i%3 == 0)
          {
            //bold only the names with each comment
            comments.appendChild(createBoldElement(data[i]));
          }
          else if (data[i] != "") {
            comments.appendChild(createListElement(data[i]));
          }
          //Add a space between every comment
          if((i+1)%3 == 0 && i > 0)
          {
            comments.appendChild(createListElement("\n"));
          }
        }
    });
}

/** Create an paragraph element containing text.*/
function createListElement(text) {
    const liElement = document.createElement('p');
    liElement.innerText = text;
    return liElement;
}

/** Create an bold element containing text.*/
function createBoldElement(text) {
    const liElement = document.createElement('h5');
    liElement.innerText = text;
    return liElement;
}

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

/** Fetches vote data and uses it to create a chart. */
function drawChart() {
  fetch('/voter-data').then(response => response.json())
  .then((votes) => {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Hobby');
    data.addColumn('number', 'Votes');
    Object.keys(votes).forEach((hobby) => {
      data.addRow([hobby, votes[hobby]]);
    });

    const options = {
      'title': 'Ways College Students Spend Time',
      'width':600,
      'height':500
    };

    const chart = new google.visualization.PieChart(
        document.getElementById('chart-container'));
    chart.draw(data, options);
  });
}