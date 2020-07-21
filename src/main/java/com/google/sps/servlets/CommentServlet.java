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

package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;

/** Servlet that returns comments*/
@WebServlet("/data")
public class CommentServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    // Query for comment storage through datastore.
    Query query = new Query("Comments");
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);
    
    // Populate comments with titles from Datastore.
    ArrayList<String> comments = new ArrayList<String>();
    for (Entity entity : results.asIterable()) {
      String author = (String) entity.getProperty("comment_author");
      String email = (String) entity.getProperty("email");
      String title = (String) entity.getProperty("comment");
      comments.add(author);
      comments.add(email);
      comments.add(title);
    }

    response.setContentType("application/json;");
    Gson gson = new Gson();
    response.getWriter().println(gson.toJson(comments));
   }


  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String author = request.getParameter("comment_author");
    String email = request.getParameter("email");
    String userComment = request.getParameter("comment");

    // Create entity with author, email, and comment properties.
    Entity taskEntity = new Entity("Comments");
    taskEntity.setProperty("comment_author", author);
    taskEntity.setProperty("email", email);
    taskEntity.setProperty("comment", comment);

    // Add comments to the Datastore for longterm storage. 
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(taskEntity);

    // Send the user back to the blog page after adding a comment.
    response.sendRedirect("/blog.html");
  }
}

