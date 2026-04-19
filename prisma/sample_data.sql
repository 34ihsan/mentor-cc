INSERT INTO Institution (id, name, country, city, description) 
VALUES ('oxford_id', 'Oxford School of English', 'UK', 'Oxford', 'Premier language school in the heart of Oxford.');

INSERT INTO Institution (id, name, country, city, description) 
VALUES ('berlin_id', 'Berlin Tech University', 'Germany', 'Berlin', 'Leading technical university with international master programs.');

INSERT INTO Program (id, name, category, price, currency, duration, institutionId)
VALUES ('prog_1', 'General English', 'LANGUAGE_SCHOOL', 1200, 'EUR', '4 Weeks', 'oxford_id');

INSERT INTO Program (id, name, category, price, currency, duration, institutionId)
VALUES ('prog_2', 'IELTS Preparation', 'LANGUAGE_SCHOOL', 1500, 'EUR', '6 Weeks', 'oxford_id');

INSERT INTO Program (id, name, category, price, currency, duration, institutionId)
VALUES ('prog_3', 'MSc in Data Science', 'MASTER', 0, 'EUR', '2 Years', 'berlin_id');
