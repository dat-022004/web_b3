# web_b3
1. Khởi tạo Môi trường  
Bắt đầu dự án bằng cách mở Terminal WSL (Ubuntu) trong thư mục dự án dinhdat-shot và khởi động VS Code (code .).  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/4689804e-ea9e-488d-ad70-a96272ed1408" />  

2. Cài đặt & Khởi chạy Docker (ảnh image_ce1226.jpg & image_ce1242.jpg)  
Định nghĩa Dịch vụ: Cấu hình file docker-compose.yml để định nghĩa toàn bộ 6 dịch vụ theo yêu cầu: phpmyadmin, mariadb, nodered, influxdb, grafana, và nginx.  
Khởi chạy: Chạy lệnh docker-compose up -d trong terminal của VS Code.  
Kiểm tra: Mở Docker Desktop để xác nhận 6 container đã được tạo và đang ở trạng thái "Running" (màu xanh lá), chứng tỏ môi trường đã sẵn sàng.  
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/7078ea69-66c1-426c-a375-e9299835829e" />

 3. Ảnh này chụp Docker Desktop. Nó giúp em xác nhận một cách trực quan là cả 6 container của em đều đang "Running" (màu xanh lá) và các cổng đã được map chính xác (ví dụ 1880:1880, 8081:80, 3000:3000...). Môi trường của em đã sẵn sàng.3
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/fb2ac89f-819a-46f4-9ff5-30c15735295f" />


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/65e730ce-32cc-4a0c-b14f-8614fd9595c2" />


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/cac7495b-eef4-438b-ba38-6fdea73b2369" />


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/31d9c4db-0d0b-44fc-831d-6e78cb339af7" />  


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/5936cee5-0dde-454d-b734-968b1b0b9f28" />  


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/fe5d9a1f-6588-4de0-a43e-0af116304103" />


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0ee087a1-043c-4160-bc3f-9edc50832928" />


<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/14d9030e-6f33-4c3f-8fe0-3d052e2f35e1" />
