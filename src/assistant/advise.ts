import type { Product } from '../types';
import { formatNumber } from '../utils/helpers';

const fold = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

export const scoreProduct = (product: Product): number => {
  const price = product.price / 100;
  const excess = product.excess / 100;
  return (
    product.grade.total * 10 -
    price / 40 -
    excess / 80 +
    (product.final_price === 1 ? 4 : 0)
  );
};

export const rankProducts = (products: readonly Product[]): Product[] =>
  [...products].sort((a, b) => scoreProduct(b) - scoreProduct(a));

const describe = (product: Product): string => {
  const excess =
    product.excess === 0
      ? 'sin franquicia'
      : `franquicia ${formatNumber(product.excess)}`;
  const priceKind =
    product.final_price === 1 ? 'precio final' : 'precio orientativo';
  return `${product.company}, ${product.modality.name}, ${formatNumber(product.price)}, nota ${product.grade.total}, ${excess}, ${priceKind}`;
};

export const openingBrief = (products: readonly Product[]): string => {
  if (products.length === 0) {
    return 'Este filtro no deja tarifas. Afloja el precio o cambia la modalidad y vuelvo a leer el catálogo.';
  }
  const best = rankProducts(products)[0];
  return `Veo ${products.length} tarifas. Por nota, precio y franquicia me quedo con ${describe(best)}.`;
};

export const answerQuestion = (
  question: string,
  products: readonly Product[]
): string => {
  const text = fold(question.trim());
  if (!text) return 'Dime qué quieres mirar.';
  if (products.length === 0) return openingBrief(products);

  if (/barat|menor precio|cheap|precio bajo/.test(text)) {
    const cheapest = [...products].sort((a, b) => a.price - b.price)[0];
    return `La más barata de las que se ven es ${describe(cheapest)}.`;
  }

  if (/nota|valoraci|calidad|grade|puntu/.test(text)) {
    const bestGrade = [...products].sort(
      (a, b) => b.grade.total - a.grade.total
    )[0];
    return `La nota más alta es ${describe(bestGrade)}.`;
  }

  if (/sin franquicia|sin exceso|without excess/.test(text)) {
    const none = products.filter((product) => product.excess === 0);
    if (none.length === 0) return 'En este filtro todas tienen franquicia.';
    return `Sin franquicia, elijo ${describe(rankProducts(none)[0])}. Hay ${none.length}.`;
  }

  if (/compar|diferenc|versus| vs /.test(text)) {
    const ranked = rankProducts(products);
    if (ranked.length < 2) return 'Hacen falta dos tarifas para comparar.';
    const [first, second] = ranked;
    return `Las dos con mejor equilibrio son ${first.company} y ${second.company}. ${describe(first)}. Frente a ${describe(second)}.`;
  }

  const named = products.find((product) => {
    const company = fold(product.company);
    return text.includes(company) || company.includes(text);
  });
  if (named) {
    const extras =
      named.features.map((feature) => feature.description).join(', ') ||
      'sin extras listados';
    return `${describe(named)}. Incluye: ${extras}.`;
  }

  const byFeature = products.filter((product) =>
    product.features.some((feature) =>
      fold(feature.description).includes(text)
    )
  );
  if (byFeature.length > 0) {
    return `Encajan con eso: ${byFeature.map((product) => product.company).join(', ')}.`;
  }

  return `Sigo con la lectura actual: ${describe(rankProducts(products)[0])}. Puedes pedir la más barata, la mejor nota o una comparación.`;
};
