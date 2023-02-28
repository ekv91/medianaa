# medianaa

App with NodeJS, ExpressJS, MySQL, dotenv NodeJs module.

At first there appears 5 random numbers between 1 and 1000, every time when you refresh page it will give new 5 random numbers.
There is input with value of number and add button on right side of input, witch will add new random number between 1 and 1000 to list of numbers.
There is also button to add 1 random number to list.
And one button to remove 1 random number from the list, and one button to remove all numbers from the list.

Finally there is button witch will calculate median from those number in list and post it into database and than fetch it into table with calculated value of median, with date and time of creation.
Every time when you press the button it will calculate median and do post and fetch method.
On right side of every added row in there is buttton delete that will delete that row from the table based on id of calculated row.. it will also delete it from database.

In file instructions located in client folder you can find info about creating same database and table with same columns and datatype of rows. Also you have details of port used by mysql and server, if you want to change it you will also need to change it in dotenv file and also change port in index.js file in block code that fetch API to make an HTTP GET request.

There is also border around made by css animation using keyframes and same border-bottom to seperate list of numbers with other part of app.
Every button have :hover style to change color of text, and also have box-shadow.
Input file have focus when click on it to change color of input borders.
Body of app and button to calculate median have linear-gradient color.
App with NodeJS, ExpressJS, MySQL, and the dotenv NodeJS module.

At first, the app displays 5 random numbers between 1 and 1000. Every time you refresh the page, it generates a new set of 5 random numbers. There is an input field where you can add a new number between 1 and 1000 to the list of numbers by clicking the "Add" button next to it. There is also a "Random" button that adds a single random number to the list. You can remove a single number from the list using the "Remove" button, and you can remove all the numbers using the "Clear" button.

Finally, there is a button that calculates the median of the numbers in the list and posts it into a MySQL database. The app then fetches the median value from the database and displays it in a table with the date and time of creation. Every time you press the button, the app recalculates the median and performs the post and fetch methods. Each row in the table has a delete button on the right-hand side that deletes that row from the table based on its id. It also deletes the row from the database.

In the instructions file located in the client folder, you can find information about how to create the same database and table with the same columns and datatype of rows. You can also find details of the port used by MySQL and the server. If you want to change it, you will need to change it in the dotenv file and also change the port in the index.js file in the block of code that uses the fetch API to make an HTTP GET request.

The app has a border around it made by a CSS animation using keyframes, and a similar border-bottom separates the list of numbers from the other parts of the app. Each button has a hover style to change the color of the text, and they also have box-shadow. The input field changes color of input borders when clicked on, indicating that it has focus. The body of the app and the button to calculate the median have a linear-gradient color.




