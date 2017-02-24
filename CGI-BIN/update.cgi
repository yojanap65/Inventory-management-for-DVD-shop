#!/usr/bin/perl 

# Name: Yojana Patil jadrn040
# CS 645
# Project #1
# update.cgi

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

my $upload_dir  = '/home/jadrn040/public_html/proj1/images/';
my $cgi_obj     = new CGI;
my $update      = CGI->new;
my $sku         = $update->param('sku');
my $category    = $update->param('category');
my $vendor      = $update->param('vendor');
my $mid         = $update->param('mid');
my $description = $update->param('description');
my $features    = $update->param('features');
my $cost        = $update->param('cost');
my $retail      = $update->param('retail');
my $image       = $update->param('image');

print "Content-type: text/html\n\n";

my $query = "Select * from product where sku = '$sku'";
if ( db_insert($query) < 1 ) {
    print "FAIL";
}
else {
    db_insert("delete from product where sku='$sku'");
    my $statement ="insert into product values('$sku',$category,$vendor,'$mid','$description',"
      . "'$features',$cost,$retail,'$image');";
    db_insert($statement);

    print "SUCCESS";
}