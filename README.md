# SmartyQuest
#### Video Demo: https://www.youtube.com/watch?v=1q5rq58YHRo
#### Introduction:
SmartyQuest is a web-based application developed with Flask, Python, JavaScript, and SQL. This project serves as a prototype for a gamified learning tool for elementary students to practice their reading and writing skills. It is designed to create an interactive environment where users can enhance their essential skills through engaging exercises. The essence of this web-based application lies in its ability to merge a captivating storyline with educational exercises, effectively testing students' comprehension.
#### Prerequisites and Installation
To embark on the SmartyQuest journey, a few prerequisites are essential. These include Python 3, Flask, an SQLite3 database, and a contemporary web browser. This project was built using the CS50 IDE.
#### User Account Management
The application features a user account management system, leveraging a SQL database to securely store user data, including hashed passwords. Hashing is achieved through the use of the werkzeug.security library. Python and Flask are integral in managing user authentication, form validation, and database interactions. The goal is to facilitate a seamless login experience for existing users, complemented by robust error handling for enhanced security. For newcomers, the signup process is straightforward, requiring a username and password, which are securely encrypted and stored.
#### Design Choices and User Interaction
At the core of SmartyQuest is its user-centric design. The home page greets users with a selection of stories, starting with one unlocked narrative. In future updates, SmartyQuest will introduce additional stories that will unlock as users progress.. This approach encourages continuous engagement.
The 'Rainy Day' story marks the beginning of the user's learning journey. This interactive exercise challenges users to fill in missing prefixes and suffixes in the story text. To aid in this task, a list of affixes, complete with audio pronunciation, is provided. As users interact with the story, they receive instant feedback. Correctly used affixes are grayed out, preventing repetition, and guiding the user towards new choices. Adding to the engagement is a JavaScript-powered timer, which tracks the duration of each game session. This timer introduces a subtle competitive element, motivating users to improve their speed and accuracy over time.
#### Data Collection
Using Python, each user input is evaluated and scored, with the results being stored in the database. The project database includes two tables: the users table and the game table. The 'users' table stores login information, while the 'game' table records the results for each game played by the logged-in user. The 'users' table communicates with the 'game' table to identify the logged-in user, whose data is then evaluated, scored, and displayed in the DOM.
This systematic data collection enables users to access a view of their performance on their profile page. Here, they can track their learning progress, displayed through a breakdown of their recent games and scores.  This feature not only provides users with insight into their improvement over time but also personalizes their learning journey, making it more engaging and rewarding.

#### Server-Side Logic
The server-side logic, written in Python, handles form submissions, user authentication, and data storage. The use of Python and Flask allows for efficient handling of HTTP requests and responses, error handling, and interaction with the SQL database. The decision to use Python stems from its readability and wide support for web development tasks.
#### Front-End Development
The front-end development is a mix of Bootstrap and custom CSS. Bootstrap is chosen for its ease of use, particularly for the login and registration forms. Custom CSS is applied to the rest of the application to create a more engaging and tailored user interface, suitable for the intended younger audience.
#### Future Enhancements
Looking ahead, SmartyQuest plans to introduce new features such as unlocking new stories upon achieving high scores and expanding the story library to provide a more diverse reading experience. Also, another important addition would be further expanding data collection of each user's performance with guidance for the next steps and a list of areas for improvement.
My next step would be creating a fully responsive and accessible experience. As of right now, the design does not reflow to fit mobile devices. Lots of thought went into designing screens for the most common device elementary students would use for such educational moments. Research shows that Chromebooks (often provided by the school district) are the most used among elementary students.
#### Acknowledgement
Special thanks are extended to ChatGPT for its contribution to the illustrations used on the home page and the story page, Bootstrap for its role in form design, and Werkzeug for its secure password hashing capabilities.

# Gamified-Language-Journey
