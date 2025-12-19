import { formLogin } from "../components/formLogin";
import { formRegister } from "../components/formRegister";

async function loginPage() {
  return `<div class="fixed inset-0 -z-1 bg-black">
        <div
          class="absolute inset-0 ml-24 flex items-center justify-center bg-[url('../../public/images/bg-primary.jpg')] bg-no-repeat bg-position-[50%] bg-cover"
        >
          <div class="form-wrapper backdrop-blur-lg w-100">
            ${formLogin()}
            ${formRegister()}
          </div>
        </div>
      </div>
  `;
}

export default loginPage;
