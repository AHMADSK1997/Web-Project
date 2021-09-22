# Web-Project
BTC and ETH buy and sell


Client side
-	ReactJS
-	Bootstrap

Server
-	 Node.js
-	ExpressJS

Database
-	MongoDB compass

Project:
The goal of the website is to make money through pairs trading strategy between two cryptocurrencies which are Bitcoin and Ethereum, the user invests an amount of money he wishes and then he gets 50% of the money he invested bitcoin and another 50% Ethereum.
The user can see the graphs of each currency and according to the graphs he can buy bitcoin and sell Ethereum or do the opposite, when sell/buy button is pressed, it sells 50% of the currency that is being sold and buys as much as it can from the other currency.

User:
The user can sign up and then log in, he can see two graphs of the currencies, he chooses how much money to invest and then he can choose between 3 options, buy BTC and sell ETH, sell BTC and buy ETH, and stop the trade.

Once the user opens the application, it displays the log in window, if he’s already registered, he can log in, if not he can sign up, once he signs in his data are saved into our database 
When the user invests money, the amount he invests is used to buy 50% BTC and 50% ETH, both amounts are saved into the user’s database.

Pages on the website:
Sign in page: where user can sign into the website.
Sign up page: user can sign up into the website.
Home page: two graphs, invest, with buy and sell buttons.

Functional requirements for users:
-	Log in.
-	Sign up.
-	View graphs.
-	Buy BTC and sell ETH.
-	Sell BTC and buy ETH.
-	Invest amount in dollar.
-	View portfolio.



How to run the project
To run the server: 
	npm install
	node server

To run the client:
	npm install
	npm start

