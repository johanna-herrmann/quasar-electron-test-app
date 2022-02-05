#!/bin/bash

############### deb-icons.sh ##################
#                                             #
# adds icons to .deb target                   #
# (shown in tray, dock, app window, etc...)   #
# will be executed on yarn run build          #
#                                             #
# author: Mark Herrmann (digAnimo)            #
#                                             #
# version: 1.0                                #
#                                             #
###############################################

echo -e "\n re-building .deb target with icons"

# define icon matrix
icon_sizes=("16x16" "32x32" "64x64" "128x128" "256x256" "512x512")

# get .deb path
deb_path=$(ls dist/electron/Packaged/*.deb)

# extract .deb
echo "  extracting"
mkdir -p  dist/electron/Packaged/deb-extracted/
dpkg-deb -R "$deb_path" dist/electron/Packaged/deb-extracted/

# get icon name
# shellcheck disable=SC2012
icon_name=$(ls dist/electron/Packaged/deb-extracted/usr/share/icons/hicolor/0x0/apps/*.png | cut -d '/' -f 11)

# add icons
echo "  adding icons"
for icon_size in "${icon_sizes[@]}"
do
   # do whatever on "$i" here
   mkdir -p "dist/electron/Packaged/deb-extracted/usr/share/icons/hicolor/$icon_size/apps"
   cp "dist/electron/UnPackaged/icons/icons/$icon_size.png" "dist/electron/Packaged/deb-extracted/usr/share/icons/hicolor/$icon_size/apps/$icon_name"
done

# re-package .deb file
echo "  re-building"
rm "$deb_path"
dpkg-deb -b dist/electron/Packaged/deb-extracted/ "$deb_path" > /dev/null

# cleanup
rm -rf dist/electron/Packaged/deb-extracted

echo -e "\n done"
