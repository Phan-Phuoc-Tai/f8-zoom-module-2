function formChange(userInfo = true) {
  const title = userInfo ? "CẬP NHẬT THÔNG TIN" : "ĐỔI MẬT KHẨU";
  const actionName = userInfo ? "Cập Nhật" : "Đổi mật khẩu";
  const profile = `
    <form class="js-change-profile change-profile flex flex-col justify-center w-full">
                    <label>
                      <span class="block mb-1 text-sm font-medium"
                        >Tên hiển thị</span
                      >
                      <input
                        type="text"
                        placeholder="Tên hiển thị"
                        name="username"
                        spellcheck="false"
                        class="js-username w-full outline-0 border border-neutral-500 px-4 py-2 rounded-md bg-white/70 text-gray-600 focus:outline-2 focus:outline-black focus:border-black"
                      />
                    </label>
                    <label class="mt-6">
                      <span class="block mb-1 text-sm font-medium">Email</span>
                      <input
                        type="email"
                        placeholder="Email của bạn"
                        name="email"
                        
                        class="js-email w-full outline-0 border border-neutral-500 px-4 py-2 rounded-md bg-white/70 text-gray-600 focus:outline-2 focus:outline-black focus:border-black"
                      />
                    </label>
                    
                    <button
                      type="submit"
                      class="js-change-profile w-full mt-8 px-4 py-2 bg-black/80 rounded-xl text-base hover:bg-red-400 cursor-pointer"
                    >
                      ${actionName}
                    </button>
                  </form>
  `;
  const changePassword = `
  <form class="js-change-password change-password flex flex-col justify-center w-full">
                    <label >
                      <span class="block mb-1 text-sm font-medium"
                        >Mật khẩu hiện tại</span
                      >
                      <input
                        type="password"
                        name="oldPassword"
                        class="js-old-password w-full outline-0 border border-neutral-500 px-4 py-2 rounded-md bg-white/70 text-gray-600 focus:outline-2 focus:outline-black focus:border-black"
                      />
                    </label>
                    <label class="mt-6">
                      <span class="block mb-1 text-sm font-medium">Mật khẩu mới</span>
                      <input
                        type="password"
                        name="password"
                        class="js-password w-full outline-0 border border-neutral-500 px-4 py-2 rounded-md bg-white/70 text-gray-600 focus:outline-2 focus:outline-black focus:border-black"
                      />
                    </label>
                    
                    <label class="mt-6">
                      <span class="block mb-1 text-sm font-medium">Xác nhận mật khẩu mới</span>
                      <input
                        type="password"
                        name="confirmPassword"
                        class="js-confirm-password w-full outline-0 border border-neutral-500 px-4 py-2 rounded-md bg-white/70 text-gray-600 focus:outline-2 focus:outline-black focus:border-black"
                      />
                    </label>
                    <button
                      type="submit"
                      class="js-change-password w-full mt-8 px-4 py-2 bg-black/80 rounded-xl text-base hover:bg-red-400 cursor-pointer"
                    >
                      ${actionName}
                    </button>
                  </form>
  `;
  return `
  <div class="js-change flex flex-col items-center p-10 w-full rounded-lg bg-white/20 text-white transition-all duration-500  opacity-100 visible ">
    <h2
      class="w-full mb-6 text-xl text-center font-semibold uppercase"
    >
      ${title}
    </h2>
    ${userInfo ? profile : changePassword}      
  </div>
  `;
}

export default formChange;
