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
      // Print to the page if the current value is not empty.
      if (data[i] != null && data[i].length > 0) {
        // Format the three comment fields in a list and print to the page.
        // Add a new line and then bold the first field in the following comment. 
        if (i%3 == 0) {
          // Add a new line after every full comment.
          if (i != 0) {
            comments.appendChild(createListElement("\n"));
          }
          // Bold only the names in each comment.
          comments.appendChild(createBoldElement(data[i]));
        }
        else {
          comments.appendChild(createListElement(data[i]));
        }
      }
    }
  });
}

/** Create a <li> element containing text.*/
function createListElement(text) {
  const liElement = document.createElement('p');
  liElement.innerText = text;
  return liElement;
}

/** Create a bold element containing text.*/
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
      'width':450,
      'height':450
    };

    const chart = new google.visualization.PieChart(
        document.getElementById('chart-container'));
    chart.draw(data, options);
  });
}

/** Fetches vote data to make bar chart. */
function drawStudyChart() {
  fetch('/study-data').then(response => response.json())
  .then((study_votes) => {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Hobby');
    data.addColumn('number', 'Votes');
    Object.keys(study_votes).forEach((hours) => {
      data.addRow([hours, study_votes[hours]]);
    });

    const options = {
      'title': 'College Student Majors',
      'width':450,
      'height':450
    };

    const chart = new google.visualization.ColumnChart(
        document.getElementById('study-container'));
    chart.draw(data, options);
  });
}