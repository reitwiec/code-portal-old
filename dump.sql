insert into users(name, password, username, access, email, organisation, regno, phone, created_at, updated_at) values('Jeet', 'sequelize', 'jeetmehta', 30, 'jeetmehta@gmail.com', 'MIT', '1909090', '7990644046', '2020-02-24 20:21:43' , '2020-02-24 20:21:43');

insert into contests(title, start, end, description, slug, created_at, updated_at) values('Practice', '2020-03-08 18:11:43', '2020-03-10 18:11:43', 'Sup', 'practice', '2020-02-24 20:21:43' , '2020-02-24 20:21:43');

INSERT INTO questions (title,body,input_format,constraints,output_format,level,score,time_limit,visibility,slug,is_practice,contest_id,author_id,created_at,updated_at)
VALUES("01. Simrans Memory Game",
"Simran likes to interact with her students. All her students enjoy her class.There are <strong>m</strong> students in her class.One day, she decides to make the students play a game to test their memory. She assigns each student a unique code from <strong>1 to 10<sup>9</sup></strong>.<br><br> She makes all the students stand in a row. Then she makes the 2nd student first says the code of the 1st student and then his own code. Successively, the third student says aloud the 1st student's, 2nd student's and then his own code. This process continues till the m-th student says his code.<br><br>Now, Simran wants to check their math skills. So, she asks the student to tell the n-th code to be announced.The students are not good at math, so they ask for your help.<br><br> Help the students crack the teachers question!",
"The first line contains two positive integers m and n.<br>The second line m codes- c<sub>1</sub>,c<sub>2</sub>.....c<sub>m</sub> where c<sub>i</sub> is the code of the i-th student.",
"1 ≤ m ≤ 10<sup>6</sup><br>1 ≤ n ≤ min(2·10<sup>9</sup>, m·(m + 1) / 2)<br>(1 ≤ c<sub>i</sub> ≤ 10<sup>9</sup>)", 
"Print the n-th pronounced code (assuming numbering starts from 1).", 
"EASY", 
100, 
2, 
0, 
"mem-game", 
0, 
1, 
2, 
NOW(),
NOW());

insert into languages(code, name, multiplier, created_at, updated_at) values(44, 'C++ 11',  1, NOW(), NOW());
insert into languages(code, name, multiplier, created_at, updated_at) values(45, 'C++ 14',  1, NOW(), NOW());
insert into languages(code, name, multiplier, created_at, updated_at) values(46, 'Java 8',  2, NOW(), NOW());
insert into languages(code, name, multiplier, created_at, updated_at) values(36, 'Python 2',  6, NOW(), NOW());
insert into languages(code, name, multiplier, created_at, updated_at) values(34, 'Python 3',  6, NOW(), NOW());
