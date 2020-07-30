<%@ page import="com.google.appengine.api.blobstore.BlobstoreService" %>
<%@ page import="com.google.appengine.api.blobstore.BlobstoreServiceFactory" %>
<% BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
   String uploadUrl = blobstoreService.createUploadUrl("/my-form-handler"); %>
   

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <script src="script.js"></script>
  </head>

  <body onload="getComments();drawChart()">
    <div class="header">
      <h1>College Connect</h1>
      <h4>By college students, for college students</h4>
    </div>
    <div class = "nav_bar">
      <a href="index.html">Home</a> |
      <a href="videos.html">Videos</a> |
      <a href="blog.html">Blog</a> |
      <a href="polls.html">Polls</a> |
      <a href="contact.html">Contact</a> 
    </div>
  </body>
  <body>
    <form action="<%= blobstoreService.createUploadUrl("/Blobstored") %>" method="post" enctype="multipart/form-data">
    <p> Please insert an image!</p>
    <br/><br/>
    <input type="file" name="myFile">
    <input type="submit" value="Submit">
    </form>
  </body>
</html>



