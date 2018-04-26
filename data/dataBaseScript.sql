CREATE TABLE Users (
	fName VARCHAR(30) NOT NULL,
    lName VARCHAR(30) NOT NULL,
    username VARCHAR(250) NOT NULL PRIMARY KEY,
    email VARCHAR(30) NOT NULL,
    passwrd VARCHAR(250) NOT NULL    
);

CREATE TABLE Comment(
	username VARCHAR(50) NOT NULL,
	commentText VARCHAR(256) NOT NULL,
	id INT NOT NULL AUTO_INCREMENT,
	FOREIGN KEY(username) REFERENCES Users(username),
	PRIMARY KEY(id)
);

CREATE TABLE Orders(
	orders VARCHAR(1000) NOT NULL,
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(50) NOT NULL,
	FOREIGN KEY(username) REFERENCES Users(username),
	PRIMARY KEY(id)
);

INSERT INTO Comment(username, commentText)
VALUES ('pedro_martinez', 'Great Service!');