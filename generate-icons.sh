#!/bin/bash

# unnecessary and buggy src-cordova/config.xml modification fix (backup file)
cp src-cordova/config.xml src-cordova/config.xml.backup

# generate icons with icon genie
icongenie generate --icon ./icon.png --splashscreen-color e5e5e5

#fix linux icons
echo fix for linux icons...
sizes=(512x512 256x256 128x128 64x64 32x32 16x16)
mkdir -p src-electron/icons/linux
for size in "${sizes[@]}"
do
	# shellcheck disable=SC2086 # there never will be spaces or something like that in $size
	convert src-electron/icons/icon.png -resize $size src-electron/icons/linux/$size.png
done
echo done. generated 6 icons in src-electron/icons/linux/

# unnecessary and buggy src-cordova/config.xml modification fix (restore file)
cp src-cordova/config.xml.backup src-cordova/config.xml
