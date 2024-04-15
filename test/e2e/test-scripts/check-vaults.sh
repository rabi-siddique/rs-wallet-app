#!/bin/bash
source ./test/e2e/test-scripts/common.sh

pattern="published\.vaultFactory\.managers\.manager0\.vaults\.vault[0-9]+"

output=$(agops vaults list --from $user1Address)

if [ $? -eq 0 ] && [ $(echo "$output" | grep -cE "$pattern") -eq 3 ]; then
    echo "Command ran successfully and created 3 vaults matching the pattern."
else
    echo "Command did not run successfully or did not create 3 vaults matching the pattern."
fi
