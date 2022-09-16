ECHO OFF
echo "Starting Jade Watchers"
start jade -w -P -o .. index.jade
start jade -w -P -o .. teampage.jade
start jade -w -P -o .. allteams.jade
