#!/bin/bash
cd /home/kavia/workspace/code-generation/dark-mode-restaurant-website-38776-38785/restaurant_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

