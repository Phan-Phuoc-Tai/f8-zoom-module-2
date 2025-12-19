import formChange from "../components/formChange";

async function changeProfile(password = false) {
  return `<div class="fixed inset-0 -z-1 bg-black">
          <div
            class="absolute inset-0 ml-24 flex items-center justify-center bg-[url('../../public/images/bg-primary.jpg')] bg-no-repeat bg-position-[50%] bg-cover"
          >
            <div class="form-wrapper backdrop-blur-lg w-100">
              ${password ? formChange(false) : formChange()}
            </div>
          </div>
        </div>
    `;
}

export default changeProfile;
