export const formLogin = () => {
  return `
  <div class="js-login flex flex-col items-center p-10 w-full rounded-lg bg-white/20 text-white transition-all duration-500  opacity-100 visible ">
    <h2
                    class="w-full mb-6 text-xl text-center font-semibold uppercase"
                  >
                    Đăng nhập
                  </h2>
                  <form class="js-form-login form-login flex flex-col justify-center w-full">
                    <label>
                      <span class="block mb-1 text-sm font-medium">Email</span>
                      <input
                        type="email"
                        placeholder="Email của bạn"
                        name="email"
                        
                        class="js-email w-full outline-0 border border-neutral-500 px-4 py-2 rounded-md bg-white/70 text-gray-600 focus:outline-2 focus:outline-black focus:border-black"
                      />
                    </label>
                    <label class="mt-6">
                      <span class="block mb-1 text-sm font-medium"
                        >Mật khẩu</span
                      >
                      <input
                        type="password"
                        placeholder="Mật khẩu"
                        name="password"
                        class="js-password w-full outline-0 border border-neutral-500 px-4 py-2 rounded-md bg-white/70 text-gray-600 focus:outline-2 focus:outline-black focus:border-black"
                      />
                    </label>
                    <button
                      type="submit"
                      class="js-login-btn w-full mt-8 px-4 py-2 bg-black/80 rounded-xl text-base hover:bg-red-400 cursor-pointer"
                    >
                      Đăng nhập
                    </button>
                  </form>
                  <div
                    class="mt-10 flex items-center justify-center gap-1.5 w-full text-sm"
                  >
                    <span class="text-gray-500">Bạn chưa có tài khoản?</span>
                    <button
                      class="js-go-register text-white font-semibold underline hover:text-red-400 cursor-pointer"
                      >Đăng ký</button
                    >
                  </div>
  </div>
  `;
};
