@echo off
cls
echo moving to dist
cd dist
echo starting server
python -m http.server 8000