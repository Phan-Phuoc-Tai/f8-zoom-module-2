export default function section(title, content) {
  return `
  <section class="mt-10 lg:mt-20">
    <h2 class="mb-4 text-white font-bold text-[22px] md:text-[32px] lg:text-[45px]">${title}</h2>
    ${content}
  </section>
  `;
}
