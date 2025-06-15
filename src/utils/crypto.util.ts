import CryptoJS from 'crypto-js';

export function generateOTP(length = 6): string {
  const randomBytes = CryptoJS.lib.WordArray.random(length);
  const hex = randomBytes.toString(CryptoJS.enc.Hex);

  // Lấy chỉ số số từ hex, chỉ giữ số và cắt đúng độ dài
  const digitsOnly = hex.replace(/\D/g, '').slice(0, length);

  // Nếu chưa đủ độ dài thì thêm số 0 đằng trước
  return digitsOnly.padStart(length, '0');
}

