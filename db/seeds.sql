USE employee_tracker_db;

INSERT INTO department (name)
VALUES 
("Sales"),           
("Finance"),         
("Engineering"),      
("HR"),     
("Marketing"),     
("Customer Support");

INSERT INTO role (title, salary, department_id)
VALUES 
("CEO", 350000, 4),       
("HR", 150000, 4),        
("Software Engineer", 275000, 1),       
("Marketing", 120000, 3), 
("CFO", 275000, 5),      
("Accountant", 175000, 5),
("Sales", 105000, 1),     
("IT", 123000, 2),        
("CTO", 275000, 2),       
("Lawyer", 275000, 3);       

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Robert", "Downey. Jr.", 1, null),    
("Scarlett", "Johanssen", 2, 1),        
("Chris", "Hemsworth", 4, 1),    
("Chris", "Pine", 5, 1),     
("Mark", "Ruffalo", 8, 1),     
("Don", "Cheadle", 10, 1),   
("Gwyneth", "Paltrow", 6, 4),     
("Bri", "Larson", 7, 5),       
("Jeremy", "Renner", 9, 6)       

