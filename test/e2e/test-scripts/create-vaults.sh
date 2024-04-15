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
agops perf satisfaction --executeOffer /tmp/want-ist.json --from "$user1Address" --keyring-backend=test 2>&1
wait
