# Name: Yojana Patil jadrn040
# CS 645
# Project #1
# logout.cgi

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);

my $q = new CGI;
my $sid = $q->cookie("jadrn040SID") || undef;
$session = new CGI::Session( undef, $sid, { Directory => '/tmp' } );
$session->delete();
my $cookie = $q->cookie( jadrn040SID => '' );
print $q->header( -cookie => $cookie );  #send cookie with session ID to browser

print <<END;
    
<html>
<head>
<meta charset="utf-8">
    <title>Shopify Login</title>
     <link rel="stylesheet" href="http://jadran.sdsu.edu/~jadrn040/proj1/tabs.css">
</head>
<body background="http://jadran.sdsu.edu/~jadrn040/proj1/images/back.jpg">
<div id="logo2">
<div class="logo">
      <img src="http://jadran.sdsu.edu/~jadrn040/proj1/images/cart.jpg"/>
</div>
<a class='button' href='http://jadran.sdsu.edu/~jadrn040/proj1/'><b>You are logged out. Please login again !</b></a>
</div>
</body>
</html>

END
