# 🌿 Bách Hóa Online - E-Commerce Web Application

Bách Hóa Online là ứng dụng thương mại điện tử mua sắm thực phẩm tươi sạch, nông sản hữu cơ và nhu yếu phẩm hàng ngày, được xây dựng trên nền tảng **Next.js 16 (App Router)**, **Tailwind CSS**, **Zustand**, và **Prisma**.

---

## ✨ Tính năng nổi bật

- 🛒 **Giỏ hàng trực quan & Thời gian thực**: Thêm/sửa/xóa sản phẩm, tự động tính toán tổng tiền, duy trì trạng thái giỏ hàng qua `localStorage` (Zustand Persist).
- 🏷️ **Danh mục & Chi tiết sản phẩm động**: Render chi tiết sản phẩm theo ID (`/product/[id]`), lọc sản phẩm theo từng danh mục (`Thịt cá`, `Rau củ`, `Trái cây`, `Đồ uống`).
- 🖼️ **Hình ảnh & Gallery sắc nét**: Xem ảnh sản phẩm độ phân giải cao kèm tính năng chuyển đổi thumbnail trực quan.
- 🔐 **Hệ thống Auth & Khách hàng**: Đăng nhập, đăng ký và bảo vệ các tuyến đường riêng tư (`/profile`, `/orders`, `/checkout`).
- 📝 **Xác thực biểu mẫu (Form Validation)**: Kiểm tra thông tin giao hàng đầy đủ trước khi hoàn tất đơn hàng.
- 🎨 **Thiết kế chuẩn UX/UI**: Phối màu Emerald/Brand Green tươi sáng, hỗ trợ trải nghiệm mua sắm sảng khoái và hiện đại.

---

## 🛠️ Công nghệ sử dụng

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Database & ORM**: Prisma, SQLite (`dev.db`)
- **Authentication**: NextAuth.js / Auth.js
- **Animations & Icons**: Framer Motion, Lucide React

---

## 🚀 Hướng dẫn cài đặt & Chạy ứng dụng

### 1. Cài đặt phụ thuộc
```bash
npm install
```

### 2. Cấu hình biến môi trường
Tạo file `.env` tại thư mục gốc của dự án:
```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="super-secret-key-for-development-12345"
```

### 3. Khởi tạo Database & Seed Dữ liệu
```bash
npx.cmd prisma db push
npx.cmd tsx prisma/seed.ts
```

### 4. Chạy chế độ Development
```bash
npm run dev
```
Truy cập [http://localhost:3000](http://localhost:3000) trên trình duyệt của bạn.

