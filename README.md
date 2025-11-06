# web_b3  
Bài tập 3   : môn Phát triển ứng dụng trên nền web  
Giảng viên  : Đỗ Duy Cốp  
Lớp học phần: 58KTPM  
sinh viên   : Đặng Đình Đạt  
Ngày giao   : 2025-10-24 13:50  
Hạn nộp     : 2025-11-06 00:00  
1. Khởi tạo Môi trường  
Bắt đầu dự án bằng cách mở Terminal WSL (Ubuntu) trong thư mục dự án dinhdat-shot và khởi động VS Code (code .).   
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4689804e-ea9e-488d-ad70-a96272ed1408" />   

2. Cài đặt & Khởi chạy Docker (ảnh image_ce1226.jpg & image_ce1242.jpg)   
Định nghĩa Dịch vụ: Cấu hình file docker-compose.yml để định nghĩa toàn bộ 6 dịch vụ theo yêu cầu: phpmyadmin, mariadb, nodered, influxdb, grafana, và nginx.  
Khởi chạy: Chạy lệnh docker-compose up -d trong terminal của VS Code.  
Kiểm tra: Mở Docker Desktop để xác nhận 6 container đã được tạo và đang ở trạng thái "Running" (màu xanh lá), chứng tỏ môi trường đã sẵn sàng.  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/7078ea69-66c1-426c-a375-e9299835829e" />  

 3. Ảnh này chụp Docker Desktop. Nó giúp em xác nhận một cách trực quan là cả 6 container của em đều đang "Running" (màu xanh lá) và các cổng đã được map chính xác (ví dụ 1880:1880, 8081:80, 3000:3000...). Môi trường của em đã sẵn sàng.  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/fb2ac89f-819a-46f4-9ff5-30c15735295f" />  

4. Đây là ảnh em truy cập http://localhost:8080 (PhpMyAdmin). Nó chứng minh em đã kết nối được vào CSDL MariaDB. Em đã tạo my_database và bên trong có 2 bảng quan trọng:  
iot_latest: Để lưu giá trị cảm biến mới nhất.  
users: Để làm chức năng đăng nhập.  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/65e730ce-32cc-4a0c-b14f-8614fd9595c2" />  

5. Em truy cập http://localhost:8086 để kiểm tra container influxdb. Giao diện "Get Started" hiện ra, chứng tỏ dịch vụ đã chạy. Đây là nơi em sẽ lưu lịch sử dữ liệu cảm biến để chuẩn bị cho Grafana vẽ biểu đồ.  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/cac7495b-eef4-438b-ba38-6fdea73b2369" />  

6. Ảnh này em truy cập Grafana tại http://dangdinhdat.com:3000.  
Nội dung: Giao diện "Welcome to Grafana".  
Ý nghĩa: Xác nhận container grafana đã chạy và sẵn sàng để kết nối vào InfluxDB (ở ảnh 5) để vẽ biểu đồ.  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/31d9c4db-0d0b-44fc-831d-6e78cb339af7" />   

7. Đây là "não" của hệ thống, em truy cập Node-RED tại http://dangdinhdat.com:1880.  
Nội dung: Flow logic xử lý IOT và API.  
Ý nghĩa: Chứng minh em đã hoàn thành backend:  
Luồng Sim IOT: Inject (Every 3s) -> Function (tạo nhiệt độ) -> Ghi song song vào 2 CSDL (MariaDB và InfluxDB).  
Luồng API: Tạo API POST /authen/login và GET /iot/latest (có bảo mật auth check).  
Thông báo "Successfully deployed" cho thấy flow đã được lưu và đang chạy.  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5936cee5-0dde-454d-b734-968b1b0b9f28" />  

8. Đây là 2 ảnh chụp kết quả cuối cùng, là trang web của em chạy trên http://localhost:8081 (cổng nginx).  
Nội dung: Giao diện web IOT hiển thị đã đăng nhập ("Xin chào, dat"), token, và dữ liệu nhiệt độ.  
Ý nghĩa: Chứng minh sự tích hợp thành công:  
nginx đang phục vụ file web.  
Frontend (Javascript) đã gọi API của Node-RED thành công.  
Dữ liệu trả về (Nhiệt độ, thời gian) được hiển thị chính xác.  
Việc có 2 nhiệt độ khác nhau (ảnh 8 là 28.22°C và ảnh 9 là 30.95°C) chứng minh tính năng "Tự làm mới 3 giây" hoạt động đúng.  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/fe5d9a1f-6588-4de0-a43e-0af116304103" />  

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0ee087a1-043c-4160-bc3f-9edc50832928" />  

9. trang web của em chạy trên http://dangdinhdat.com  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/14d9030e-6f33-4c3f-8fe0-3d052e2f35e1" />  

10. Nhận xét Cuối cùng & Kết luận  
Qua quá trình hoàn thành Bài tập 03, em đã học hỏi và rút ra được rất nhiều kiến thức thực tế.  
Những điều em đã làm được:  
Làm chủ Docker Compose: Em đã hiểu rõ sức mạnh của Docker. Thay vì phải cài đặt 6 phần mềm (Nginx, MariaDB, InfluxDB, v.v.) thủ công trên máy, em chỉ cần định nghĩa chúng trong 1 file docker-compose.yml và chạy bằng 1 lệnh docker-compose up -d. Điều này giúp môi trường phát triển nhất quán và dễ dàng triển khai.  
Hiểu rõ kiến trúc Backend IOT: Em đã phân biệt và sử dụng đúng mục đích của 2 loại cơ sở dữ liệu:  
MariaDB: Dùng để lưu dữ liệu quan hệ (bảng users) và trạng thái mới nhất của cảm biến (bảng iot_latest với lệnh UPDATE).  
InfluxDB: Dùng để lưu lịch sử dữ liệu theo thời gian (với lệnh INSERT), phục vụ cho việc thống kê, vẽ biểu đồ sau này.  
Xây dựng API bảo mật: Em đã tự xây dựng được luồng API hoàn chỉnh bằng Node-RED, từ việc giả lập cảm biến, tạo API đăng nhập (/authen/login) trả về JWT Token, và tạo API lấy dữ liệu (/iot/latest) yêu cầu xác thực bằng Token đó.  
Hiểu luồng Front-end gọi Back-end: Em đã hiểu rõ cách một trang Single Page Application (SPA) tương tác với hệ thống. Javascript trên frontend đã gọi API (có đính kèm token) đến Nginx, Nginx điều hướng (proxy) đến Node-RED, Node-RED truy vấn CSDL và trả về JSON, sau đó Javascript lại nhận JSON và cập nhật giao diện.  
Khó khăn gặp phải:  
Trong quá trình làm, em đã gặp khó khăn trong việc xử lý xung đột cổng (port conflict). Cụ thể là cổng 80 bị dịch vụ Apache (của Bài tập 2) chiếm, và cổng 1880 bị Node-RED (chạy trên máy thật) chiếm. Em đã khắc phục bằng cách vào Services của Windows để dừng và vô hiệu hóa Apache, và dùng taskkill để tắt tiến trình Node-RED trên máy thật, giải phóng cổng cho các container Docker.  
Kết luận:  
Bài tập này đã giúp em kết nối tất cả các kiến thức lại với nhau để tạo ra một sản phẩm hoàn chỉnh, từ hạ tầng (Docker) đến backend (Node-RED), CSDL (MariaDB, InfluxDB) và frontend (SPA). Em đã hoàn thành mục tiêu của đề bài.  
