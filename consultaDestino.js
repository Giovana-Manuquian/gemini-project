import { inicializaModelo } from './modelo.js';
import { fazerPergunta } from './pergunta.js';

const model = await inicializaModelo("gemini-1.5-flash")

export async function consultar() {

  const categorias = await fazerPergunta("Me fale as categorias que deseja visualizar sobre um determinado destino: ");
  const prompt = await fazerPergunta("Me fale sobre o destino que deseja conhecer: ");

  const parts = [
    {
      text: "Você é o chatbot de um site que vende pacotes de viagem. Ao ser perguntado sobre algum destino, como bairro, cidade, estado, país, continente e pontos turísticos diversos, você poderá fornecer informações. Caso seja perguntado sobre algo que não tem relação com viagem e turismo, informe que não pode responder a essa dúvida.\n\nPara formular a resposta, quero que os tópicos apareçam como lista com marcadores e sempre deve conter apenas as categorias que forem solicitadas no momento da pergunta.\n\nAlguns exemplos de categorias: características, localização, cultura, pontos turísticos, culinária, clima, dicas, como chegar, curiosidades."
    },
    {
      text: "input: me fale sobre o bairro do Flamengo, no Rio de Janeiro"
    },
    {
      text: "output: ##Flamengo, Rio de Janeiro##\n\n **Características:** Bairro tradicional e charmoso, localizado na Zona Sul do Rio de Janeiro. Conhecido por suas ruas arborizadas, casas coloniais, atmosfera boêmia e pela proximidade com a Praia do Flamengo, um dos cartões postais da cidade.\n **Localização:** Localizado na Zona Sul do Rio de Janeiro, entre o centro da cidade e a Praia de Copacabana. Faz divisa com os bairros de Botafogo, Catete, Glória, Laranjeiras e Cosme Velho.\n **Cultura:** O Flamengo é um bairro com uma rica história cultural, com muitas casas de artistas, museus e teatros. Abriga o Museu do Futebol, o Museu Histórico Nacional e o Theatro Municipal do Rio de Janeiro.\n **Pontos turísticos:**\n     **Praia do Flamengo:** Uma das praias mais famosas do Rio de Janeiro, com vista para o Pão de Açúcar e a Praia de Botafogo.\n     **Parque do Flamengo:** Um dos maiores parques urbanos do mundo, com áreas verdes, ciclovias, quadras esportivas e o Monumento aos Mortos da Segunda Guerra Mundial.\n     **Museu do Futebol:** Um museu dedicado à história do futebol brasileiro, com exposições interativas e acervos de grandes jogadores.\n    **Museu Histórico Nacional:** Abriga um acervo rico sobre a história do Brasil, com documentos, pinturas e objetos históricos.\n    **Theatro Municipal do Rio de Janeiro:** Um dos teatros mais importantes do país, com arquitetura neoclássica e programação diversificada.\n **Culinária:** O Flamengo oferece uma variedade de restaurantes, cafés e bares. É possível encontrar desde restaurantes sofisticados até botecos tradicionais, com pratos típicos da culinária carioca como feijoada, moqueca e acarajé."
    },
    {
      text: `input: me fale sobre ${categorias} o destino ${prompt}`
    },
    {
      text: "output: "
    },
  ];

  const result = await model.generateContent(
    { contents: [{ role: "user", parts }] }
  );
  const response = await result.response;
  const text = response.text();
  console.log(text);
}
