# Basic Authentication FullStack Project

โปรเจคนี้แสดงตัวอย่างการสร้างระบบการยืนยันตัวตน (Authentication) แบบ Full-Stack โดยใช้ Spring Boot สำหรับ Backend และ React สำหรับ Frontend

## เทคโนโลยีที่ใช้

**Backend:**
- Java 17 (JDK)
- Spring Boot v3.5.3
- IDE: IntelliJ IDEA

**Frontend:**
- React
- Node.js v22.18.0
- NPM v11.5.2
- IDE: VS Code

## วิธีการติดตั้ง

### การติดตั้ง Backend
1. Clone โปรเจค:
    ```bash
    git clone https://github.com/0xPunnawit/Project-Basic-Auth-FullStack.git
    ```
2. เข้าไปที่โฟลเดอร์ backend:
    ```bash
    cd backend
    ```

3. ตั้งค่า IntelliJ IDEA เพื่อเปิดใช้งาน Annotation Processing:
   - เปิด IntelliJ IDEA แล้วไปที่ **File > Settings** (หรือ **Ctrl + Alt + S**).
   - ไปที่ **Build, Execution, Deployment > Compiler > Annotation Processors**.
   - ตั้งค่า **Enable annotation processing** และเลือก **Obtain processors from project classpath**.
   
   ดูตัวอย่างการตั้งค่าจากรูปนี้: [Link รูป](https://media.discordapp.net/attachments/1359450746810011680/1409579968559579259/content.png?ex=68ade525&is=68ac93a5&hm=04e70cd1d4997320f3f1cc1ef4143fb940fc99a2c35fcdc06447f47b467588ee&=&format=webp&quality=lossless)

4. รันโปรเจคโดยไปที่ `Backend/src/main/java/com/punnawit/auth/AuthApplication.java` แล้วคลิก **Run**.

### การติดตั้ง Frontend
1. เข้าไปที่โฟลเดอร์ frontend:
    ```bash
    cd frontend
    ```
2. ติดตั้ง dependencies:
    ```bash
    npm install
    ```
3. รัน React Development Server:
    ```bash
    npm start
    ```

## Environment Variables
- `REACT_APP_BACKEND_URL` = URL ของ backend ที่ใช้เชื่อมต่อกับ React (เช่น `localhost:8080`).

## วิธีการใช้งาน
- เมื่อทั้ง backend และ frontend ตั้งค่าเรียบร้อยแล้ว คุณสามารถเข้าถึงโปรเจคได้ที่:
  - Backend URL: `http://localhost:8080`
  - Frontend URL: `http://localhost:3000`


### การ Login
ภาพตัวอย่างการ Login:
![Login](https://media.discordapp.net/attachments/1359450746810011680/1409567493357309962/image.png?ex=68add986&is=68ac8806&hm=37e5d013fbe210ccadbedcdd3bcf4ab29e0fa832bf85955ecd694c63527c1d40&=&format=webp&quality=lossless&width=1027&height=545)

### การ Register
ภาพตัวอย่างการ Register:
![Register](https://media.discordapp.net/attachments/1359450746810011680/1409567694570655834/image.png?ex=68add9b6&is=68ac8836&hm=b26c3bbb1413284a828af667cfc3c915658c9f6710b134abda6ceb18abd3266e&=&format=webp&quality=lossless&width=995&height=545)

### การ Login สำเร็จ
ภาพตัวอย่างการ Login สำเร็จ:
![Login Success](https://media.discordapp.net/attachments/1359450746810011680/1409567707564609658/image.png?ex=68add9b9&is=68ac8839&hm=ee1a95b6bd84763aa04c8e72a179959183fad8e5d9428d9eb5beb3288b8ae987&=&format=webp&quality=lossless&width=999&height=545)

### การแสดงข้อมูล
ภาพตัวอย่างการแสดงข้อมูล:
![Display Data](https://media.discordapp.net/attachments/1380949650252763289/1409582579170017290/image.png?ex=68ade793&is=68ac9613&hm=a304dccfeee2716773435612b22980e78e80781569c4ab934a406dd5eb1e6a58&=&format=webp&quality=lossless)

### การแก้ไขข้อมูล
ภาพตัวอย่างการแก้ไขข้อมูล:
![Edit Data](https://media.discordapp.net/attachments/1380949650252763289/1409582628381655181/image.png?ex=68ade79f&is=68ac961f&hm=cf4745d88f5c3b0f3cd5037217bfebe99012d0159aa7cdabf3d9ca411e48a75d&=&format=webp&quality=lossless)

### ระบบแอดมิน
ภาพตัวอย่างระบบแอดมิน:
![Admin](https://media.discordapp.net/attachments/1359450746810011680/1409568257312034816/image.png?ex=68adda3d&is=68ac88bd&hm=d5cdd725bef06bb1c8bac9e4d0f178da567dae2f463fcad810be63488edb92f5&=&format=webp&quality=lossless&width=1036&height=545)

### การจัดการผู้ใช้
ภาพตัวอย่างการจัดการผู้ใช้:
![Manage Users](https://media.discordapp.net/attachments/1359450746810011680/1409568313285148672/image.png?ex=68adda4a&is=68ac88ca&hm=7d34f5cd84b716cabab255ee0683bf355ca512e29c47d71e723af48dd7e5c49b&=&format=webp&quality=lossless&width=1117&height=545)

### การดึงข้อมูลผู้ใช้
ภาพตัวอย่างการดึงข้อมูลผู้ใช้:
![Fetch Users](https://media.discordapp.net/attachments/1359450746810011680/1409568346592116777/image.png?ex=68adda52&is=68ac88d2&hm=d0ea2a6180857f9edb5f5fd3e0e5b2efbebc8956fdd6b61ee13542857d9d25a6&=&format=webp&quality=lossless)