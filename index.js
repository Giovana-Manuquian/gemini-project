import { GoogleGenerativeAI } from '@google/generative-ai';
import { fazerPergunta } from './pergunta.js';

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = await fazerPergunta("Me fale sobre o destino que deseja conhecer: "); 

  const parts = [
    {text: "Você é um chatbot de um site que vende pacotes de viagens. Ao ser perguntado sobre algum destino, seja bairro, cidade, país ou continente, por exemplo, você poderá fornecer informações. Caso seja perguntado sobre algo que não corresponda a viagens, informe que não pode responder a respeito."},
    {text: "input: me fale sobre o Flamengo"},
    {text: "output: O Flamengo é um dos bairros mais vibrantes e históricos do Rio de Janeiro! \n\n**Cultura e História:**\n\n* **Estádio do Maracanã:** O famoso estádio, palco de momentos históricos do futebol brasileiro e mundial, está localizado no Flamengo.\n* **Museu do Futebol:** Um museu dedicado à história do futebol brasileiro, com exposições sobre os principais clubes e jogadores.\n* **Parque Lage:** Um oásis verde no coração do bairro, com áreas verdes, trilhas e um centro cultural.\n* **Jardim Botânico:** Um dos mais importantes jardins botânicos do mundo, com uma coleção rica de plantas de diversas partes do planeta.\n* **Museu de Arte Moderna:** Um museu com uma coleção de obras de arte moderna e contemporânea brasileira e internacional.\n\n**Praias:**\n\n* **Praia do Flamengo:** Uma praia urbana com ciclovia e uma vista incrível para a Ponte Rio-Niterói.\n* **Praia do Leblon:** Uma praia com uma atmosfera mais sofisticada, com restaurantes e bares de alto nível.\n* **Praia do Arpoador:** Famosa por seus pores do sol espetaculares e por ser um ponto de encontro para surfistas.\n\n**Vida Noturna:**\n\n* **Lapa:** O centro histórico da cidade, com bares, restaurantes e casas de show.\n* **Copacabana:** Uma área com uma vida noturna animada, com bares, restaurantes e casas de show.\n* **Ipanema:** Um bairro sofisticado com bares, restaurantes e casas de show.\n\n**Gastronomia:**\n\n* **Comida de Rua:** Experimente os famosos acarajés, pastel e tapioca.\n* **Restaurantes:** O bairro oferece uma variedade de restaurantes, de frutos do mar a comida internacional.\n* **Cafés:** Diversos cafés charmosos para um café da manhã ou um lanche.\n\n**Dicas:**\n\n* Visite o Flamengo durante o dia para aproveitar as áreas verdes e os museus.\n* À noite, aproveite a vida noturna vibrante do bairro.\n* Experimente a culinária local, com destaque para os frutos do mar.\n\n**Procurando um pacote de viagem para o Rio de Janeiro? Entre em contato conosco!**"},
    {text: `input: me fale sobre o destino ${prompt}`},
    {text: "output: "},
  ];

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();