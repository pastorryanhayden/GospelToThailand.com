#!/bin/bash

path="/Users/ryanhayden/github/delanobaptist.org/";
git_path="git@github.com:pastorryanhayden/delanobaptist.org.git";
need_build=false;
#!/usr/bin/env bash

echo "Navigate to web root: $path";

cd $path;

echo "Update repo ...";
git pull $git_path;

echo "Update Data and Upload";
glynn;

# echo "Sync";
# osascript upload.scpt;
# echo -e '\n Complete all scripts';