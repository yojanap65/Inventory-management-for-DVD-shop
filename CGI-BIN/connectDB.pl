use DBI;
use CGI;

sub get_db_handle {
my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn040";
my $username = "jadrn040";
my $password = "paint";
my $database_source = "dbi:mysql:$database:$host:$port";
my $response = "";

my $dbh = DBI->connect($database_source, $username, $password)
or die 'Cannot connect to database. Please try again!';
return $dbh;
}

sub db_insert {
    my $sql = shift @_;
    my $dbh = get_db_handle();
    my $num_rows_affected = $dbh->do($sql);
    return $num_rows_affected;
}
    
sub db_query_array {
    my @arr;
    my $sql = shift @_; 
    my $dbh = get_db_handle();         
    my $sth = $dbh->prepare($sql);
    $sth->execute();
    while(my @row=$sth->fetchrow_array()) {   
        push(@arr, \@row);
    }    
    return @arr;    
}   
1;

