CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    balance DECIMAL(10,2) DEFAULT 0,
    points INT DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    resourceId VARCHAR(50) UNIQUE,
    phone VARCHAR(20) UNIQUE,
    wechat VARCHAR(50) UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO Users (username, password, email, balance, points, status) 
VALUES 
('testuser', 
'$2b$10$N9qo8uLOickgx2ZMRZOweu5lYhfJjpe4g9wM9D9OqJTpa3jQcFSyW', # password: test123
'testuser@example.com', 
100.00, 
50, 
'active');

