test -e build && rm -fr build
test -e build.zip && rm -f build.zip

mkdir build
cp index.html build

mkdir build/js
cat js/*.js | uglifyjs - > build/js/main.js 2> /dev/null

mkdir build/img
cp img/*.png build/img

zip -r build.zip build/

du -h build.zip
