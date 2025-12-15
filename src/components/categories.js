function categories(link, color, name) {
  return `
  <a
        href=${link}
        class="flex items-center bg-[#292929] h-12 rounded-lg overflow-hidden"
      >
        <span class="block h-full w-2 bg-[${color}]"></span>
        <span
          class="block w-full px-2 text-[14px] font-semibold text-white text-center"
        >${name}</span
        >
      </a>    
  
  `;
}
export default categories;
