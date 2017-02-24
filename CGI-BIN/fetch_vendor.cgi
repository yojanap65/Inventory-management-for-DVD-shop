#!/usr/bin/perl

# Name: Yojana Patil jadrn040
# CS 645
# Project #1
# fetch_vendor.cgi

use DBI;
use CGI;

my $host            = "opatija.sdsu.edu";
my $port            = "3306";
my $database        = "jadrn040";
my $username        = "jadrn040";
my $password        = "paint";
my $database_source = "dbi:mysql:$database:$host:$port";
my $response        = "";

my $dbh = DBI->connect( $database_source, $username, $password )
  or die 'Cannot connect to db';

my $query = "select vendorId,vendorName from vendor";

my $sth = $dbh->prepare($query);
$sth->execute();

while ( my @row = $sth->fetchrow_array() ) {
    $response .= $row[0] . "=" . $row[1] . "||";
}
if ($response) {
    $response = substr $response, 0, ( length($response) - 2 );
}
unless ($response) {
    $response = "invalid";
}
$sth->finish();
$dbh->disconnect();

print "Content-type: text/html\n\n";
print $response;
