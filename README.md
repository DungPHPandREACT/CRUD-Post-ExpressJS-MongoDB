Thiết kế Hệ thống quản lý bài viết

- Yêu cầu chức năng:

+ Quản lý người dùng: 
    - Người dùng có thể đăng ký tài khoản mới. 
    - Người dùng có thể đăng nhập để nhận token xác thực.
+ Quản lý bài viết: 
    - Người dùng đã đăng nhập có thể tạo bài viết mới. 
    - Người dùng có thể xem danh sách các bài viết đã tạo. 
    - Người dùng có thể chỉnh sửa bài viết của chính mình. 
    - Người dùng có thể xóa bài viết của chính mình.
+ Phân quyền: 
    - Quản lý quyền truy cập cho người dùng: 
    - Người dùng có quyền tạo bài viết mới. 
    - Người dùng có quyền đọc tất cả các bài viết. 
    - Chỉ người dùng đã tạo bài viết mới có quyền chỉnh sửa và xóa bài viết đó. 
    - Nếu người dùng không có quyền thực hiện thao tác, hệ thống sẽ trả về thông báo lỗi.

- Note: Tìm hiểu thêm về thư viện CASL để quản lý phần phân quyền được tốt hơn.