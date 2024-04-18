#!/bin/bash

source ./test/e2e/test-scripts/common.sh

fieldName="$1"
expectedValue="$2"

output=$(agops inter auction status)
checkFieldValue "$fieldName" "$expectedValue"
echo "Field is present and expected value is matched"


#!/bin/bash

source ./test/e2e/test-scripts/common.sh

output=$(agops inter auction status)

checkFieldValue "book0.startPrice" "9.99 IST/ATOM"
checkFieldValue "book0.startProceedsGoal" "309.54 IST"
checkFieldValue "book0.startCollateral" "45 ATOM"
checkFieldValue "book0.collateralAvailable" "45 ATOM"

echo "All required fields are present"