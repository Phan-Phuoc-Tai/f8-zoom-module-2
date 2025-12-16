function userAvatar(userName) {
  return `
  <button
    class="w-10 h-10 lg:mr-10 rounded-full bg-white/20 text-white text-center font-semibold hover:bg-white/40 cursor-pointer select-none"
  >
  ${userName}
  </button>
  <ul class="options absolute right-0 mt-2 w-52 rounded-xl overflow-hidden bg-[#1f1f1f] shadow-lg border border-white/10 text-white transition-all duration-150 z-50 opacity-0 translate-y-2">
    <li>
      <a href="/auth/profile" class="block px-4 py-3 text-sm hover:bg-white/10 transition">Thông tin người dùng</a>
    </li>
    <li>
      <a href="/auth/change-password" class="block px-4 py-3 text-sm hover:bg-white/10 transition">Đổi mật khẩu</a>
    </li> 
    <li>
      <a href="auth/logout" class="block px-4 py-3 text-sm text-red-400 hover:bg-white/10 transition">Đăng xuất</a>
    </li>
  </ul>
  
  `;
}

export default userAvatar;
