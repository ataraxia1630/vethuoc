### WEB VẠCH THƯỚC

Vẽ ra một chiếc thước thẳng với kích thước được nhận từ input: Chiều dài, Chiều rộng, Chiều sâu tối đa (Chiều cao vạch thước dài nhất) và Màu sắc của chiếc thước (Màu viền + Màu vạch)

### Ý TƯỞNG

Bắt đầu từ chính giữa chiếc thước, vạch 1 vạch có độ cao = Chiều sâu tối đa => Chia chiếc thước làm đôi, vạch tương tự cho 2 bên trái phải với độ cao của vạch giảm đi 1 nửa
==> Dùng thuật toán Chia để trị

### MÃ GIẢ

VachThuoc(int l, int r, int h)
{
if(h == 0) return;
else
{
mid = (l+r) / 2;
draw(h, mid);
VachThuoc(l, mid, h-1);
VachThuoc(mid+1, r, h-1);
}
}

### CÁCH CHẠY
