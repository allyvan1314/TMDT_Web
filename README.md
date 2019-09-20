# TMDT_Web

## Mô tả

Mục đích: Quản lý nhóm & thành viên trong nhóm

Chức năng:

- Thêm thành viên
- Sửa thành viên
- Xóa thành viên

## Setup

### Bước 1

Clone project.

### Bước 2

Cài đặt các exten liên quan:

1. Cài đặt nodejs.
2. Cài đặt npm.
3. Cd tới file project, gõ npm install. Nếu không được, copy `npm install express express-fileupload body-parser mysql ejs req-flash --save`
4. Cài đặt nodemon: `sudo npm install nodemon -g`

### Bước 3

1. Tạo database cho ứng dụng (sử dụng mySQL)

```sql
CREATE DATABASE TEAMMANAGER;
USE TEAMMANAGER;

CREATE TABLE TEAMINFOR
(
    ID INT PRIMARY KEY AUTO_INCREMENT,
    FIRSTNAME NVARCHAR(40),
    LASTNAME NVARCHAR(40),
    POS VARCHAR(40),
    PHONE VARCHAR(11),
    EMAIL VARCHAR(30),
    IMG VARCHAR(255)
);
```

2. Chỉnh thông tin kết nối db tại file app.js, dòng 14-19 cho phù hợp với connection của mySQL trong máy.
3. Chỉnh lại thông tin port tại file app.js, dòng 10 nếu gặp lỗi `port 1308 are already used`.

### Bước 4

Chạy ứng dụng

1. Cd tới file project, gõ nodemon app.js
2. Quan sát lỗi, nếu hệ thống báo `connected to database`, sử dụng trình duyệt truy cập localhost:1308.
