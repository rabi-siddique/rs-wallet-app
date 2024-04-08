#!/bin/bash
source ./test/e2e/test-scripts/common.sh


createAndCheckVault() {
    wantMinted=$1
    giveCollateral=$2

    echo "Creating Vault..."
    agops vaults open --wantMinted "$wantMinted" --giveCollateral "$giveCollateral" >/tmp/want-ist.json
    echo "Broadcasting..."
    output=$(agops perf satisfaction --executeOffer /tmp/want-ist.json --from $user1Address --keyring-backend=test)
    
    if [ $? -eq 0 ]; then
        echo "Vault created successfully"
    else
        echo "Command failed"
        echo "$output"
        exit 1
    fi
}

createAndCheckVault 100 15
createAndCheckVault 103 15
createAndCheckVault 105 15
