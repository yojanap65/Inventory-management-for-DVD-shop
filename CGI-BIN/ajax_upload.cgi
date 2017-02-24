#!/usr/bin/perl 
# Name: Yojana Patil jadrn040
# CS 645
# Project #1
# ajax_upload.cgi

use CGI;
use CGI::Carp qw (fatalsToBrowser);
use File::Basename;

# constants
$CGI::POST_MAX = 1024 * 3000; # Limit file size to 3MB
my $upload_dir = '/home/jadrn040/public_html/proj1/images';
my $safe_filename_chars = "a-zA-Z0-9_.-";

my $q = new CGI;
my $filename = $q->param("image");
my $new_file_name = $q->param("image_name");

unlink $upload_dir . $sku;

unless($filename) {
    die "There was a problem uploading the image; ".
        "it's probably too big.";
    }

my $mimetype = $q->uploadInfo($filename)->{'Content-Type'};

# check the mime type and if it is not an image, reject it.
if($mimetype !~ /image/) {
    die "Invalid mime type, $mimetype";
    }

my ($name, $path, $extension) = fileparse($filename, '/..*/');
$filename = $name.$extension;
$filename =~ s/ //; #remove any spaces
if($filename !~ /^([$safe_filename_chars]+)$/) {
    die "Sorry, invalid character in the filename.";
    }

$filename = untaint($filename);
$filename = lc($filename);

# get a handle on the uploaded image     
my $filehandle = $q->upload("image");

unless($filehandle) { die "Invalid handle"; }

# save the file
open UPLOADFILE, ">$upload_dir/$filename" or die
    "Error, cannot save the file.";
binmode UPLOADFILE;
while(<$filehandle>) {
    if($_ =~ /\<\?php/) {
        die "Invalid file, php tag found!";
        }
    print UPLOADFILE $_;
    }
	rename($upload_dir."/".$filename, $upload_dir."/".$new_file_name);
close UPLOADFILE;

print <<EOF;
Content-type:  text/html

<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
        <meta http-equiv="content-type" 
                content="text/html;charset=utf-8" />    
</head>
<body>
<h2>Success, the file $filename has been uploaded</h2>
</body>
</html>
EOF

sub untaint {
    if($filename =~ m/^(\w+)$/) { die "Tainted filename!"; }
    return $1;
    }