@echo off
cls
if "%1"=="" goto STARTSERVER
cd %1
echo Moving to %1

:STARTSERVER
echo starting server
python -m http.server 8000