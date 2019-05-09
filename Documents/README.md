                        CRYPTO-HATCHING

**Brief description:**

This is an gaming application on private Sawtooth network that creates a distributed ledger with a decentralized browser game.

It is similar to the working of the game Trongoo and a revitalization of the popular Ethereum game EtherGoo or Cryptokitties. The goal for players in the game is to gather as much Eggs as they can, either by producing it themselves or by stealing it from others.The more Eggs players collect the more points they earn.

**Description:**

Crypto-Hatching is an ultimate Blockchain idle game and a free competative browser game. We use hyperledger sawtooth for building this project . Crypto-Hatching uses decentralised mechanism .

Players will produce Eggs in the game, but they will also be able to steal it from others. The aim is to collect as much Eggs as possible. Players can earn points by producing Eggs or by depositing it into the Egg Deposit Box. The most active players, thus, get rewarded the most.

The game works by allowing players to get Eggs . They can either produce it or steal it from other players in the game. Each player gets a free Eggs production unit to start with and a cute and different types of Birds, which work together to produce a small amount of Eggs each second. From that point, players are in a race to build their Bird empires. This can be used in order to purchase barracks and production units. The game’s strategy is not hard at all: the production units can increase the daily Eggs for players, while the barracks units can be used to defend and attack. Defend the Eggs using the Birds and Pigs units

As soon as the players start accumulating Eggs , they can use it to buy production units and barracks. With production units, the players can increase their output by buying more units or by upgrading them. With the barracks, you can build units for attack and defense which enables you to steal other peoples Eggs as well as protect your own.

Player can only attack once every 30 minutes; however, they must be strategic as their own defense will be halved during the cooldown period. Attacks will only be successful when the player’s attack status are higher than the other’s defense statuses. We can battle with other players to steal their produced Eggs which is left unguarded. The exciting part is that players have the opportunity to earn points while taking part in the game, the points that a player can earn are related to the Eggs that the player gathers.

There are two kinds of units: production units and barracks units. Most of units can be bought with produced Eggs , while only a few are bought with points. Production units will generate some Eggs per second, while barracks units comes in different shapes and have three main stats: attack, defense, steal capacity. Some barracks units will have more defenses like the Birds than attack, other will focus only on a single stat, like the Pigs which has only steal stat. Both production and barracks units can be upgraded via Eggs or points, increasing their stat value by fixed number or a percentage.

The produced Eggs is just unguarded and is suitable for other players to steal it. To benefit from produced Eggs , you need to invest in the deposit pot: this pot will collect Eggs produced from all players and it will split daily among them a share of pointsused in the game. The more Eggs you put in the pot, the more pointsyou get awarded at the end of the share distribution cycle. But there is also another way to earn points which involve the research pot: each day you will automatically get a percentage of points based on your production of Eggs per second relative to that of the other players.

Battling versus other players is the most fun and tactical thing of this game. You can attack a player once every 30 minutes, but be aware: your defense stat will be halved during the cooldown. You won’t be able to steal more Eggs than your stealing capacity, it can be increased by recruiting more units or improving them.

**System requirements:**

1. Operating system: Ubuntu 16.04
2. System RAM: 4 GB or above (recommended 8 GB)
3. Free System storage: 4 GB on /home

**Installation prerequisites:**

1. Docker must be installed in the system
2. docker compose must be installed

3) Ensure that NodeJS (version 8.15 ideally) is installed in the system. For more information about NodeJS, go to https://nodejs.org. To check if installed, open a terminal window: and give the command
   (-) node -v
4) If NodeJS is not installed, go to https://nodejs.org and download the compatible version (version 8.15) based on system OS, or in a terminal window: and give the command
   (-) sudo apt-get install -y nodejs
5) Ensure that Docker is installed. Docker is a platform for developers and system administrators to develop, ship, and run applications. For more information, go to https://www.docker.com/resources/what-container. To check if installed, in the terminal window: give the command
   (-) sudo docker --version
6) If Docker is not installed, in the terminal window:
   SET UP THE REPOSITORY
   Update the apt package index:
   (-) sudo apt-get update
   Install packages to allow apt to use a repository over HTTPS:
   (-) sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
   Add Docker’s official GPG key:
   (-) curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   Use the following command to set up the stable repository.
   (-) sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   (-)(lsb_release -cs) \
   stable"
   INSTALL DOCKER CE
   Update the apt package index.
   (-) sudo apt-get update
   Install the latest version of Docker CE.
   (-) sudo apt-get install docker-ce
   Verify that Docker CE is installed correctly by running the hello-world image.
   (-) sudo docker run hello-world
   This command downloads a test image and runs it in a container. When the container runs, it prints an informational message and exits.
7) Ensure that Docker Compose is installed. Compose is a tool for defining and running multi-container Docker applications. To check if installed, in the terminal window:
   (-) sudo docker-compose --version
8) If Docker Compose is not installed, in the terminal window:
   (-) sudo apt-get update
   (-) sudo apt-get install docker-compose

**Instructions for Installation of Application:**

1. Download the folder "CryptoHatching"
2. Open terminal from the folder "CryptoHatching" and give the command
3. (-) sudo docker-compose up
4. After running all the containers
5. Open another terminal from the same folder "CryptoHatching" and give the command
6. (-) sudo docker exec -it validator bash
7. This will open the validator bash and we have to set the permissions in this validator bash by giving the commands below
   **Permissioning commands**

8. Generate Public and Private Keys for AdminTP and OracleTP

(-) sawtooth keygen admin
(-) sawtooth keygen oracle

9. (-) sawset proposal create --key ~/.sawtooth/keys/my_key.priv sawtooth.identity.allowed_keys=\$(cat ~/.sawtooth/keys/my_key.pub) --url http://rest-api:8008

10. (-) sawtooth identity policy create --key /root/.sawtooth/keys/my_key.priv policy_1 "PERMIT_KEY $(cat /root/.sawtooth/keys/my_key.pub)" "PERMIT_KEY $(cat /root/.sawtooth/keys/admin.pub)" --url http://rest-api:800​8

11. Now set the role as transaction signer for Family name "AdminTP" for the keys under the policy file name policy_1

(-) sawtooth identity role create --key ~/.sawtooth/keys/my_key.priv transactor.transaction_signer.AdminTP policy_1 --url http://rest-api:8008

12. (-) sawtooth identity policy create --key /root/.sawtooth/keys/my_key.priv policy_2 "PERMIT_KEY $(cat /root/.sawtooth/keys/my_key.pub)" "PERMIT_KEY $(cat /root/.sawtooth/keys/oracle.pub)" --url http://rest-api:800​8

13. Now set the role as transaction signer for Family name "OracleTP" for the keys under the policy file name policy_2

(-) sawtooth identity role create --key ~/.sawtooth/keys/my_key.priv transactor.transaction_signer.OracleTP policy_2 --url http://rest-api:8008

14. Now give the below command to view the key of each admin part. Using these private key we can access the Admin UI

(-) cat ~/.sawtooth/keys/admin.priv

15. Now go to the browser and go to http://localhost:4000
16. Now you can access the application using the corresponding private key
17. To terminate the app execution, go to the terminal window (where docker-compose is running) and give CTRL+C
18. Wait for docker-compose to gracefully shutdown. Then: give the command
    (-) sudo docker-compose down
