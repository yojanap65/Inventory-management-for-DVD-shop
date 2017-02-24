#!/usr/bin/perl

# Name: Yojana Patil jadrn040
# CS 645
# Project #1
# login.cgi

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use Crypt::SaltedHash;

authenticate_user();

sub authenticate_user {
    $q = new CGI;
    my $user     = $q->param("user");
    my $password = $q->param("password");
    open DATA, "</srv/www/cgi-bin/jadrn040/passwords.dat"
      or die "Cannot open file.";
    @file_lines = <DATA>;
    close DATA;

    $OK = 0;

    foreach $line (@file_lines) {
        chomp $line;
        ( $stored_user, $stored_pass ) = split /=/, $line;
		
#Check username and password from passwords.dat
        if ( $stored_user eq $user
            && Crypt::SaltedHash->validate( $stored_pass, $password ) )
        {
            $OK = 1;
            last;
        }
    }
    if ($OK) {
        my $session = new CGI::Session( undef, undef, { Directory => '/tmp' } );
        $session->expires('+1d');
        my $cookie = $q->cookie( jadrn040SID => $session->id );
        print $q->header( -cookie => $cookie );
        print "OK"; 
    }
    else {
        print $q->header();
        print "ERROR username " . $user . " password: " . $password;
    }
}