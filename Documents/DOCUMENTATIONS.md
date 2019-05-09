                                                 CRYPTO-HATCHING

**Note-Use the Correct Private Key for admin section transactions because of Implementation of permission**

**UI User Guide**

1. Open http://localhost:4000 in the browser.
2. Navigate to the "Login".
3. Input the Admin Private key
4. Navigate to NewUnit page and Input Corresponding Game Unit Data.
5. Create atleast one production and Attacking unit.
6. Submit Form.
7. To Edit Saved Units go to Edit Page and Make changes and Submit form.
8. Now navigate to Log Out.
9. Click Register Link to get private key for gaming transactions.
10. Login With the above obtained private key.
11. Navigate to the Production Unit page to view the details of the Production Units( Birds ).
12. Here you can buy production units and upgrade it.
13. Similarly You can Buy Attacking/Defence Units (Piggs) from Barracks page.
14. After submitting the form, navigate to the Transaction Receipts Page and enter the Latest Transaction Id and the user can view the Transaction Receipt.
15. Now navigate to attack page to Steal Eggs (Production Unit) from Enemies.
16. Each Attacks logs corresponding transaction receipts.

**Client side Transaction Flow**

1. Add/Edit Units ---- When the admin enters the data in the "Add/Edit Unit" page the function "NewUnit" / "EditUnit" / "DelUnit" in admins.service.js file is triggered and the entered data is set into a payload , inputaddresslist, outputaddresslist, familyname, familyversion, etc are passed as parameter to trigger "createTransaction" function and the transactions is made into batches and batches are finally send to the Transaction Processors via rest-api port 8008/batches.

2. Buy/UpGrade Units ---- When the User enters the data in the "Buy/UpGrade Unit" page the function "BuyUnit" / "BuyPower" / "BuyMax" in game.service.js file is triggered and the entered data is set into a payload , inputaddresslist, outputaddresslist, familyname, familyversion, etc are passed as parameter to trigger "createTransaction" function and the transactions is made into batches and batches are finally send to the Transaction Processors via rest-api port 8008/batches.

3. Attack Enemies ---- When the user enters the data in the "Attack" page the function "AttackUser" in game.service.js file is triggered and the entered data is set into a payload , inputaddresslist, outputaddresslist, familyname, familyversion, etc are passed as parameter to trigger "createTransaction" function and the transactions is made into batches and batches are finally send to the Transaction Processors via rest-api port 8008/batches.

**Transaction Processor side Transaction Flow**

1. Add/Edit Units ---- When the transaction from the client side through rest-api arrives at the Transaction Family "AdminTP", and the action is 'NewUnit' / 'EditUnit' then it triggers the corresponding functions in the AdminTPHandler.js file. The address to which the data is to be written is generated using the Unique ID of the gaming unit in the payload and the transaction signer public key. After that, the current state of the generated address is queried and if the state data is empty or null a receipt data is added to the transaction and then triggers the function "\_setEntry".

2) Buy/UpGrade Units ---- When the transaction from the client side through rest-api arrives at the Transaction Family "ClientTP", then it triggers the Corresponding functions in the ClientTPHandler.js file. and it produces Corresponding Events like "ClientTP/BuyUnit" , "ClientTP/BuyMax" ,etc.

3. Attack User ---- When the transaction from the client side through rest-api arrives at the Transaction Family "ClientTP", then it triggers the Corresponding functions in the ClientTPHandler.js file. and it produces Events "ClientTP/AttackUser"

**Trusted Oracle side Transaction Flow**

1. when OracleServer receives Events from "ClientTP" the it triggers the corresponding functions in the Service.js file, and data is set into a payload , inputaddresslist, outputaddresslist, familyname, familyversion, etc are passed as parameter to trigger "createTransaction" function and the transactions is made into batches and batches are finally send to the "OracleTP" Transaction Processors via rest-api port 8008/batches.

2.When the transaction from the oracle side through rest-api arrives at the Transaction Family "OracleTP", then it triggers the Corresponding functions in the OracleTPHandler.js file.
