#!/bin/bash
source ./test/e2e/test-scripts/common.sh

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <wantMinted> <giveCollateral>"
    exit 1
fi

wantMinted=$1
giveCollateral=$2

echo "Creating Vault..."
agops vaults open --wantMinted "$wantMinted" --giveCollateral "$giveCollateral" >/tmp/want-ist.json
echo "Broadcasting..."
output=$(agops perf satisfaction --executeOffer /tmp/want-ist.json --from "$user1Address" --keyring-backend=test 2>&1)
errorMessage=$(echo "$output" | grep -oP "error: '\K.*?(?=')" | sed "s/', id:.*//")

if [ $? -eq 0 ] && [ -z "$errorMessage" ]; then
    echo "Vault created successfully"
else
    if [ -n "$errorMessage" ]; then
        echo "Command failed with the following error:"
        echo "$errorMessage"
    else
        echo "Command failed with unknown error."
    fi
    exit 1
fi
