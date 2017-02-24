#!/usr/bin/perl 

# Name: Yojana Patil jadrn040
# CS 645
# Project #1
# insert.cgi

use DBI;
use CGI;

sub get_db_handle {
    my $host            = "opatija.sdsu.edu";
    my $port            = "3306";
    my $database        = "jadrn040";
    my $username        = "jadrn040";
    my $password        = "paint";
    my $database_source = "dbi:mysql:$database:$host:$port";
    my $response        = "";

    my $dbh = DBI->connect( $database_source, $username, $password )
      or die 'Cannot connect to database. Please try again!';
    return $dbh;
}

sub db_insert {
    my $sql               = shift @_;
    my $dbh               = get_db_handle();
    my $num_rows_affected = $dbh->do($sql);
    return $num_rows_affected;
}

sub db_query_array {
    my @arr;
    my $sql = shift @_;
    my $dbh = get_db_handle();
    my $sth = $dbh->prepare($sql);
    $sth->execute();
    while ( my @row = $sth->fetchrow_array() ) {
        push( @arr, \@row );
    }
    return @arr;
}

my $cgi_obj     = new CGI;
my $qinsert     = CGI->new;
my $sku         = $qinsert->param('sku');
my $category    = $qinsert->param('category');
my $vendor      = $qinsert->param('vendor');
my $mid         = $qinsert->param('mid');
my $description = $qinsert->param('description');
my $features    = $qinsert->param('features');
my $cost        = $qinsert->param('cost');
my $retail      = $qinsert->param('retail');
my $img         = $qinsert->param('image');

print "Content-type: text/html\n\n";

my $duplicate = "select * from product where sku = '$sku'";
if ( db_insert($duplicate) > 0 ) {
    print "FAIL";
}
else {
    my $statement ="insert into product values('$sku',$category,$vendor,'$mid','$description',"
      . "'$features',$cost,$retail,'$img');";
    db_insert($statement);

    print "SUCCESS";
}