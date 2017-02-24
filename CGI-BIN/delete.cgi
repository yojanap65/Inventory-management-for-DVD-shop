#!/usr/bin/perl

# Name: Yojana Patil jadrn040
# CS 645
# Project #1
# delete.cgi

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
      <title>Delete Record</title>
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
<!-- </br><font color="red">*</font>fields are compulsory -->
</div>

<div id="tabs-3">
 <form method="post" id="form-3"  enctype="multipart/form-data" >
            <h2>Delete DVD Record</h2>
            <div id="tab3">
               <table>
                  <tr>
                     <td>
                        <table id="part1">
                           <tr>
                              <td><b>SKU:</b><font color="red">*</font></td>
                              <td><input type="text" class="height1" Placeholder="CAT-123" id="sku3" name="sku" size="7"/></td>
                           </tr>
                           <tr>
                              <td><b>Vendor:<b></td>
                              <td><select disabled id="vendor3"  class="vendor" name="vendor"></select></td>
                           </tr>
                           <tr>
                              <td><b>Manufacturer ID:</b></td>
                              <td><input type="text"  id="mid3" class="height1" readonly="readonly" name="mid" size="10"/></td>
                           </tr>
                           <tr>
                              <td><b>Category:</b></td>
                              <td>
                                 <select disabled id = "category3" class="category" name="category"></select>
                              </td>
                           </tr>
                           <tr>
                              <td><b>Cost(&#36;):</b></td>
                              <td><input type="number" step="any" min="0" id="cost3" class="height1" readonly="readonly" name="cost" size="10" /></td>
                           </tr>
                           <tr>
                              <td><b>Retail(&#36;):</b></td>
                              <td><input type="number" step="any" min="0" id="retail3" class="height1" readonly="readonly" name="retail" size="10"/></td>
                           </tr>
                        </table>
                     </td>
                     <td>
                        <table id="part2">
                           <tr>
                              <td><b>Description:</b></td>
                              <td><textarea readonly="readonly"  id="description3" name="description" rows="7" cols="25"></textarea></td>
                           </tr>
                           <tr>
                              <td><b>Features:</b></td>
                              <td><textarea  readonly="readonly" id="features3" name="features" rows="7" cols="25" ></textarea></td>
                           </tr>
                           <tr>
                              <td><b>DVD Image:</b></td>
                              <td><input type="text" class="height1" id="image3" readonly="readonly" name="image" size="10"/></td>
                           </tr>
                        </table>
                     </td>
               </table>
			   <div id="upload_img3"></div>
               <div id="buttons">
                  <input type="reset" id="resetbtn3" name="resetbtn" class="button" value="Clear"/>
                  <input type="submit" id="deletebtn" name="deletebtn"  class="button"  value="Delete"/><font color="red"><b>*Required</b></font>
               </div>
               
               <div id="error_message3"> </div>
            </div>
         </form>
         </div>
</body>
</html>

END