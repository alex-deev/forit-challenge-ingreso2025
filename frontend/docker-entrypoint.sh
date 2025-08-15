#!/bin/sh

###############################################################################
##
##  Stricpt to add all environment variables with APP_ prefix inside a
## 'config.js' file at the Nginx html servring directory.
##  Then, 'config.js' gets requested by the web client to read the previously
##  loaded variables. 
##

# Start the JSON object
echo "window.config = {" > /usr/share/nginx/html/config.js

# Loop through all environment variables
for env_var in $(printenv); do
  # Check if the variable starts with 'APP_'
  if [[ $env_var == APP_* ]]; then
    # Extract the name and value
    key=$(echo "$env_var" | cut -d'=' -f1)
    value=$(echo "$env_var" | cut -d'=' -f2)

    # Add the variable to the config.js file
    echo "  $key: \"$value\"," >> /usr/share/nginx/html/config.js

    # Log output: var read
    echo "script: variable $key added to config.js"
  fi
done

# End the JSON object (and handle the trailing comma if needed)
# A simple way is to remove the last comma and add the closing brace
sed -i '$ s/,$//' /usr/share/nginx/html/config.js
echo "}" >> /usr/share/nginx/html/config.js

# Execute the main Nginx command
exec nginx -g "daemon off;"