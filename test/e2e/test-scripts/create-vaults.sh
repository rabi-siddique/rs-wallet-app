#!/bin/bash
source ./test/e2e/test-scripts/common.sh


createAndCheckVault() {
    wantMinted=$1
    giveCollateral=$2

    echo "Creating Vault..."
    agops vaults open --wantMinted "$wantMinted" --giveCollateral "$giveCollateral" >/tmp/want-ist.json
    echo "Broadcasting..."
    output=$(agops perf satisfaction --executeOffer /tmp/want-ist.json --from $user1Address --keyring-backend=test 2>&1)
    wait
    
    errorMessage=$(echo "$output" | grep -oP "error: '\K.*?(?=')" | sed "s/', id:.*//")

    if [ -n "$errorMessage" ]; then
        echo "Command failed. Error message: $errorMessage"
        exit 1
    else
        echo "Vault created successfully"
    fi
}

createAndCheckVault 100 15
createAndCheckVault 103 15
createAndCheckVault 105 15
