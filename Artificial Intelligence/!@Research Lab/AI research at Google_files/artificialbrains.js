/* <![CDATA[ */

  //
  //
  //
  function toggleNewsAlertForm() {
    var alertForm = document.getElementById('newsalertform');
    if (alertForm.style.display == 'block') {
      alertForm.style.display = 'none';
      document.getElementById('formerror').innerHTML = '';
    } else {
      alertForm.style.display = 'block';
    }
  }

  //
  //
  //
  function toggleJobPostForm() {
    var jobPostForm = document.getElementById('jobpostform');
    var jobAlertForm = document.getElementById('jobalertform');

    if (jobPostForm.style.display == 'block') {
      jobPostForm.style.display = 'none';
    } else {
      jobPostForm.style.display = 'block';
      jobAlertForm.style.display = 'none';
    }
  }

  //
  //
  //
  function toggleJobAlertForm() {
    var jobAlertForm = document.getElementById('jobalertform');
    var jobPostForm = document.getElementById('jobpostform');

    if (jobAlertForm.style.display == 'block') {
      jobAlertForm.style.display = 'none';
    } else {
      jobAlertForm.style.display = 'block';
      jobPostForm.style.display = 'none';
    }
  }

  //
  //
  //
  function submitNewsAlertForm(newsquery) {

    // Disable all the form parts
    // Display a "working" animated gif
    // send request via AJAX
    // Display response

    var objXml = new XMLHttpRequest();
    var datasource = "http://www.artificialbrains.com/news/subscribe/";

    var params = "email=" + encodeURIComponent(document.getElementById('email').value) + "&";
    params += "newsquery=" + encodeURIComponent(newsquery);

    objXml.open("GET", datasource + "?" + params, true);

    objXml.onreadystatechange=function() {
      if (objXml.readyState == 4) {
        if (objXml.responseText == 'OK') {
          var confirmText = "<span style='color: #060;'><b>Success:</b> Your subscription has been updated.</span>";
          document.getElementById('newsalertform').innerHTML = confirmText;
        } else {
          document.getElementById('newsalertform').innerHTML = objXml.responseText;
        }
      }
    }
    objXml.send(null);
  }

  //
  //
  //
  function submitJobAlertForm(jobquery) {

    // Disable all the form parts
    // Display a "working" animated gif
    // send request via AJAX
    // Display response

    var objXml = new XMLHttpRequest();
    var datasource = "http://www.artificialbrains.com/jobs/subscribe/";

    var params = "email=" + encodeURIComponent(document.getElementById('email').value) + "&";
    params += "jobquery=" + encodeURIComponent(jobquery);

    objXml.open("GET", datasource + "?" + params, true);

    objXml.onreadystatechange=function() {
      if (objXml.readyState == 4) {
        if (objXml.responseText == 'OK') {
          var confirmText = "<span style='color: #060;'><b>Success:</b> Your subscription has been updated.</span>";
          document.getElementById('jobalertform').innerHTML = confirmText;
        } else {
          document.getElementById('jobalertform').innerHTML = objXml.responseText;
        }
      }
    }
    objXml.send(null);
  }

  function toggleContents() {
    var e = document.getElementById('contents-list');
    var f = document.getElementById('hide-contents');
    var g = document.getElementById('show-contents');
    if(e.style.display == 'block') {
      e.style.display = 'none';
      f.style.display = 'none';
      g.style.display = 'inline';
    } else {
      e.style.display = 'block';
      f.style.display = 'inline';
      g.style.display = 'none';
    }
    return false;
  }

/* ]]> */
