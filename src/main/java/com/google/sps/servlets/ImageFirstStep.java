
package com.google.sps.servlets;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.appengine.api.blobstore.BlobKey;

@WebServlet("/ImageFirstStep")
public class ImageFirstStep extends HttpServlet {
  private BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
 
  @Override
  public void doGet(HttpServletRequest req, HttpServletResponse res)
    throws IOException {
      BlobKey blobKey = new BlobKey(req.getParameter("blob-key"));
      blobstoreService.serve(blobKey, res);
  }
}
