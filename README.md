VẤN ĐỀ REVALIDATE BY TAG:
chỉ tác dụng với các api call từ ssr mà có gắn tag tương ứng -> có hiệu ứng realtime
Đúng vậy! router.refresh() chỉ có hiệu quả khi dữ liệu được lấy thông qua cơ chế SSR (hoặc những API được gọi từ phía server khi render). Nếu bạn đang gọi API trực tiếp trong useEffect (hoặc từ phía client), router.refresh() sẽ không ảnh hưởng đến dữ liệu được tải bởi các lệnh fetch này. Để cập nhật dữ liệu trong trường hợp này, bạn sẽ cần gọi lại API trong useEffect hoặc sử dụng phương thức khác để lấy dữ liệu mới từ phía client.
