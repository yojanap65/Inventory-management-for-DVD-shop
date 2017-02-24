#!/usr/bin/perl

# Name: Yojana Patil jadrn040
# CS 645
# Project #1
# add.cgi

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
      <title>Add New DVD</title>
    <link rel="stylesheet" href="http://jadran.sdsu.edu/~jadrn040/proj1/tabs.css">
      <script src="/jquery/jquery.js"></script>
      <script src="/jquery/jQueryUI.js"></script>    
      <script src="http://jadran.sdsu.edu/~jadrn040/proj1/tabs.js"></script>
</head>
<body background="http://jadran.sdsu.edu/~jadrn040/proj1/images/back.jpg">

<div class="tab">

<a href="/perl/jadrn040/add.cgi"><b>Add Record</b></a>
<a href="/perl/jadrn040/edit.cgi"><b>Edit Record</b></a>
<a href="/perl/jadrn040/delete.cgi"><b>Delete Record</b></a>

</div>
<div id="logospace">
<img id="logo" src="http://jadran.sdsu.edu/~jadrn040/proj1/images/logo1.png"/>
</div>



<div id="logout">
<a href="/perl/jadrn040/logout.cgi"><input type=button class="button" id="logoutbtn" value="Logout"/></a>
<!-- </br><font color="red">*</font>fields are compulsory  -->
</div>

<div id="tabs-1">
<form method="post" id="form-1" name="form-1" enctype="multipart/form-data" >

            <h2>Add New DVD</h2>
            <div id="tab1">
			<table>
			<tr>
               <td><table id="part1">
                  <tr>
                     <td><b>SKU:<font color="red">*</font></td>
                     <td><input type="text" class="height1"  Placeholder='CAT-123' id="sku" name="sku" size="7"/></td>
                  </tr>
				  
                  <tr>
                     <td><b>Vendor:<font color="red">*</font></td>
                     <td><select id="vendor"  name="vendor" class="vendor">
                        </select>
                     </td>
                  </tr>
                  <tr>
                     <td><b>Manufacturer ID:<font color="red">*</font></td>
                     <td><input type="text" class="height1"  id="mid" name="mid" size="10"/></td>
                  </tr>
                  <tr>
                     <td><b>Category:<font color="red">*</font></td>
                     <td><select id ="category" name="category" class="category"></select></td>
                  </tr>
				  <tr>
                     <td><b>Cost(&#36;):<font color="red">*</font></td>
                     <td><input type="number" step="any" min="0" id="cost" class="height1"  name="cost" size="10"/></td>
                  </tr>
                  <tr>
                     <td><b>Retail(&#36;):<font color="red">*</font></td>
                     <td><input type="number" step="any" min="0" id="retail" class="height1"  name="retail" size="10"/></td>
                  </tr>
				  </table> </td>
				  
				 <td> <table id="part2">
                  <tr>
                     <td><b>Description:<font color="red">*</font></td>
                     <td><textarea id="description" name="description" rows="7" cols="25" ></textarea></td>
                  </tr>
                  <tr>
                     <td><b>Features:<font color="red">*</font></td>
                     <td><textarea id="features" name="features" rows="7" cols="25" ></textarea></td>
                  </tr>
                  
                  <tr>
                     <td><b>DVD Image:<font color="red">*</font></b></td>
                     <td><input type="file"  id="image" class="button" name="image"/>
                  </tr>
               </table> </td>
			   
			   </table>
               <div id="buttons">
                  <input type="reset" id="reset1" name="resetbtn" class="button" value="Clear"/>		   
                  <input type="submit" id="add_btn" name="addbtn" class="button" value="Add"/>
                  <font color="red"><b>*Required</b></font></td>
               </div>
			   
               <div id="upload_img1"></div>
               <div id="error_message1"> </div>
            </div>
		</form>
         </div>
</body>
</html>

END