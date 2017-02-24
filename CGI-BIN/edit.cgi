#!/usr/bin/perl

# Name: Yojana Patil jadrn040
# CS 645
# Project #1
# edit.cgi

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use Crypt::SaltedHash;

my $q          = new CGI;
my $cookie_sid = $q->cookie('jadrn040SID');
my $session = new CGI::Session( undef, $cookie_sid, { Directory => '/tmp' } );
my $sid     = $session->id;

if ( $cookie_sid ne $sid ) {
    print <<END;
Content-type:  text/html

<html>
<head>
    <meta http-equiv="refresh" 
        content="0; url=http://jadran.sdsu.edu/~jadrn040/proj1/error.html" />
</head><body></body>
</html>

END
    return;
}

print <<END;
Content-type: text/html

<html>
<head>
    <meta charset="utf-8">
      <title>Edit Record</title>
	  <link rel="stylesheet" href="http://jadran.sdsu.edu/~jadrn040/proj1/tabs.css">
      <script src="/jquery/jquery.js"></script>
      <script src="/jquery/jQueryUI.js"></script>    
      <script src="http://jadran.sdsu.edu/~jadrn040/proj1/tabs.js"></script>
	  
	  
</head>
<body background="http://jadran.sdsu.edu/~jadrn040/proj1/images/back.jpg">

<div class="tab">

<a href="/perl/jadrn040/add.cgi">Add Record</a>
<a href="/perl/jadrn040/edit.cgi">Edit Record</a>
<a href="/perl/jadrn040/delete.cgi">Delete Record</a>


</div>
<div id="logospace">
<img id="logo" src="http://jadran.sdsu.edu/~jadrn040/proj1/images/logo1.png"/>
</div>

<div id="logout">
<a href="/perl/jadrn040/logout.cgi"><input type=button class="button" id="logoutbtn" value="Logout"/></a>
<!-- </br><font color="red">*</font>fields are compulsory  -->
</div>

<div id="tabs-2">
   <form method="post" id="form-2"  enctype="multipart/form-data" >
      <h2>Edit DVD record</h2>
      <div id="tab2">
         <table>
            <tr>
               <td>
                  <table id="part1">
                     <tr>
                        <td><b id="skub" >SKU:<font color= "red">*</font></b></td>
                        <td><input type= "text" class="height1"  Placeholder= "CAT-123" id= "sku2" name= "sku" size= "7"/></td>
                     </tr>
                     <tr>
                        <td><b class="hidecls">Vendor:<font color= "red ">*</font></b></td>
                        <td><select id= "vendor2"  name= "vendor" class="vendor hidecls" ></select></td>
                     </tr>
                     <tr>
                        <td ><b class="hidecls">Manufacturer ID:<font color="red">*</font></b></td>
                        <td><input type= "text " class="height1 hidecls"  id= "mid2" name= "mid" size= "10"/></td>
                     </tr>
                     <tr>
                        <td><b class="hidecls">Category:<font color= "red">*</font></b></td>
                        <td><select  id = "category2"  name= "category" class="category hidecls" ></select></td>
                     </tr>
                     <tr>
                        <td><b class="hidecls">Cost(&#36;):<font color= "red">*</font></b></td>
                        <td><input type="number" step="any" min="0" class="height1 hidecls"  id= "cost2" name= "cost" size= "10"/></td>
                     </tr>
                     <tr>
                        <td><b class="hidecls">Retail(&#36;):<font color= "red">*</font></b></td>
                        <td><input type="number" step="any" min="0" class="height1 hidecls" id="retail2" name= "retail" size= "10"/></td>
                     </tr>
                  </table>
               </td>
               <td>
                  <table id="part2">
                     <tr>
                        <td><b class="hidecls">Description:<font color= "red ">*</font></b></td>
                        <td><textarea id= "description2" class="hidecls" name= "description" rows= "7" cols= "25"></textarea></td>
                     </tr>
                     <tr>
                        <td><b class="hidecls">Features:<font color= "red ">*</font></b></td>
                        <td><textarea id= "features2" class="hidecls" name= "features"  rows= "7" cols= "25" ></textarea></td>
                     </tr>
                     <tr>
                        <td><b class="hidecls">DVD Image:</b></td>
                        <td><input type= "file" class="hidecls button" id= "image2" name= "image" ] /></td>
                        <td><input type="hidden" id= "edit_image" name= "image "/></td>
                        <!--<td colspan='2'>
                        <td>
                           <div id= "upload_img2"></div>
                        </td>
                        </td> -->
                     </tr>
                  </table>
               </td>
         </table>
		  
        <div id= "upload_img2"></div>
                       
         <div id="buttons">             
            <input type= "reset" id= "reset2" name= "resetbtn" class= "button" value= "Clear "/></td>
            <input type= "submit" id= "editbtn" name= "editbtn" class= "button" value= "Edit"/><font color="red">*Required</font>
         </div>
         <div id="error_message2"></div>
      </div>
   </form>
</div>

</body>
</html>

END