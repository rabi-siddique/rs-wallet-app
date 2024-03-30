FROM ghcr.io/agoric/agoric-sdk:20240401190900-a3bdfb-linux_amd64

# Add the Agoric CLI to the PATH so that 'agops' can be accessed from anywhere in the command line.
ENV PATH="/usr/src/agoric-sdk/packages/agoric-cli/bin:${PATH}"

# Install necessary dependencies
RUN apt-get update \
    && apt-get install -y wget gnupg ca-certificates jq expect

# Install Chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable

# Setup Wallet App
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
