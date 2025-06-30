import React, { useEffect, useRef, useState } from 'react';
import { TextField, Box, Button } from '@mui/material';

export default function App() {
  const [length, setLength] = useState(100);
  const [width, setWidth] = useState(10);
  const [depth, setDepth] = useState(5);
  const [color, setColor] = useState('#000000');
  const [drawing, setDrawing] = useState(false);
  const canvasRef = useRef(null);

  // Hàm vẽ vạch trên canvas
  // Vẽ 1 đường có độ cao h ở vị trí pos
  const draw = (h, pos, ctx) => {
    ctx.beginPath();
    ctx.moveTo(pos, 0); // Đặt bút vẽ ở vị trí pos
    ctx.lineTo(pos, h * 10); // Vẽ lên trên 1 đoạn = h
    ctx.strokeStyle = color; // Màu vạch
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  // Hàm VachThuoc đệ quy
  const vachThuoc = (l, r, h, ctx) => {
    if (h === 0) return;
    const mid = (l + r) / 2;
    draw(h, mid, ctx);
    vachThuoc(l, mid, h - 1, ctx);
    vachThuoc(mid + 1, r, h - 1, ctx);
  };

  // Xử lý vẽ khi drawing = true
  useEffect(() => {
    if (depth >= width) alert('Chiều sâu tối đa nên nhỏ hơn chiều rộng thước');
    if (depth >= 15)
      alert('Chiều sâu tối đa nên nhỏ hơn 15 để tránh bị đứng máy');
    if (drawing && canvasRef.current && depth <= 15) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      // Xóa canvas trước khi vẽ lại
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Vẽ nền thước
      ctx.fillStyle = '#ffffff'; // Màu nền thước
      // Tạo không gian thước (chiều dài x chiều rộng)
      ctx.fillRect(0, 0, length * 10, width * 10);
      // Vẽ viền thước
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, length * 10, width * 10);
      // Gọi hàm VachThuoc để vẽ các vạch
      vachThuoc(0, length * 10, depth, ctx);
    }
  }, [drawing, length, width, depth, color]);

  const handleDraw = () => {
    setDrawing(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '50px',
          gap: '10px',
        }}
      >
        <TextField
          type="number"
          value={length}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (!isNaN(val)) setLength(val);
            else setLength(0);
          }}
          variant="outlined"
          label="Chiều dài"
        />
        <TextField
          type="number"
          value={width}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (!isNaN(val)) setWidth(val);
            else setWidth(0);
          }}
          variant="outlined"
          label="Chiều rộng"
        />
        <TextField
          type="number"
          value={depth}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (!isNaN(val)) setDepth(val);
            else setDepth(0);
          }}
          variant="outlined"
          label="Chiều sâu tối đa"
        />
        <TextField
          value={color}
          onChange={(e) => setColor(e.target.value)}
          variant="outlined"
          label="Màu"
          type="color"
          sx={{ width: '50px' }}
        />
        <Button variant="contained" onClick={handleDraw}>
          Vẽ Thước
        </Button>
      </Box>
      {drawing && (
        <Box>
          <canvas
            ref={canvasRef}
            width={length * 10} /// chiều dài
            height={width * 10} /// chiều rộng
            style={{ display: 'block' }}
          />
        </Box>
      )}
    </Box>
  );
}
