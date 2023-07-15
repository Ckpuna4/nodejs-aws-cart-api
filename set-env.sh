#!/bin/bash

# Path to the .env file
env_file=".env"

# Read the .env file and extract environment variables
while IFS= read -r line || [[ -n "$line" ]]; do
  # Remove leading/trailing spaces and quotes from the line
  line=$(echo "$line" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' -e 's/^"//' -e 's/"$//')

  # Split the line into key and value
  IFS='=' read -r key value <<< "$line"

  # Ignore empty or commented lines
  if [[ -n $key && ! $key =~ ^# ]]; then
    # Construct the environment variable assignment command
    command+=" $key='$value'"
  fi
done < "$env_file"

# Run the command to set environment variables using eb setenv
if [[ -n $command ]]; then
  eb setenv$command
fi
