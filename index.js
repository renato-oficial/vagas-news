import { scrapping } from "./scrapping.js";

const isTodayJob = (date) => {
  const job_data = new Date(date);
  const day_job = job_data.getUTCDate();
  const current_date = new Date();
  const current_day = current_date.getDate();
  return day_job.toString() === current_day.toString();
};

let page = 1;
const jobs_today = [];
while (true) {
  const response = await scrapping(
    `https://riovagas.com.br/category/riovagas/page/${page}`
  );
  const { today_url_jobs, datetime_posts } = response;
  const same_day = datetime_posts.map((date) => isTodayJob(date));
  console.log(today_url_jobs);
  if (same_day.some(same_day === false)) break;
  jobs_today.concat(today_url_jobs);
}

console.log(jobs_today);
/*
scrapping("https://riovagas.com.br/category/riovagas/")
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
*/

const response = {
  today_url_jobs: [
    "https://riovagas.com.br/riovagas/gerente-administrativo-temporario-construcao-civil-pretensao-salarial-barra-da-tijuca/",
    "https://riovagas.com.br/riovagas/mecanico-de-refrigeracao-metalurgica-e-refrigeracao-pretensao-salarial-duque-de-caxias/",
    "https://riovagas.com.br/riovagas/nutricionista-de-producao-cozinha-industrial-pretensao-salarial-jardim-america-5-vagas/",
    "https://riovagas.com.br/riovagas/vendedor-distribuidora-de-racoes-ate-r-5-00000-zona-oeste/",
    "https://riovagas.com.br/riovagas/mecanico-de-manutencao-e-instalacao-refrigeracao-empresa-de-refrigeracao-pretensao-salarial-zona-sul-2-vagas/",
  ],
  datetime_posts: [
    "2023-03-22T13:47:03-03:00",
    "2023-03-22T13:46:45-03:00",
    "2023-03-22T13:46:36-03:00",
    "2023-03-22T13:44:41-03:00",
    "2023-03-22T13:42:05-03:00",
  ],
};

console.log(same_day);
