// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["/assets/styles/app.scss"],
  modules: ["@nuxtjs/supabase", "nuxt-icon"],
  app: {
    head: {
      title: "Pokemon POC",
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
        },
      ],
    },
  },
});
