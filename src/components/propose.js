export default function propose(tagName, link) {
  return `
    <li class="w-[calc(100%/3)]">
       <a
         href=${link}
         class="flex items-center gap-3 py-4 px-6 w-full bg-white/10 rounded-lg text-xl text-center text-white font-bold hover:bg-white/20 cursor-pointer"
       >
         <i class="fa-solid fa-compact-disc"></i>
         <span>${tagName}</span>
       </a>
     </li>
  `;
}
