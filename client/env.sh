#!/bin/sh
# line endings must be \n, not \r\n !
echo "window._env_ = {" > ./web/env-config.js
awk -F '=' '{ print $1 ": \"" (ENVIRON[$1] ? ENVIRON[$1] : $2) "\"," }' ./.env.example >> ./web/env-config.js
echo "}" >> ./web/env-config.js